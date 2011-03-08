﻿namespace IronJS.Compiler

open System

open IronJS
open IronJS.Dlr.Operators

module Utils =

  //----------------------------------------------------------------------------
  module Patterns =
    
    let (|IsBox|IsRef|IsVal|) (expr:Dlr.Expr) =
      if expr.Type = typeof<BoxedValue>
        then IsBox
        elif Dlr.Utils.isT<double> expr || Dlr.Utils.isT<bool> expr
          then IsVal
          else IsRef

    let (|IsIndex|_|) (expr:Dlr.Expr) =
      if expr.Type = typeof<uint32> then Some () else None
    
  //----------------------------------------------------------------------------
  module Constants =
  
    let zero = Dlr.dbl0
    let one = Dlr.dbl1
    let two = Dlr.dbl2
    let undefined = Dlr.propertyStaticT<Undefined> "Instance"

    module Boxed = 
      let null' = Dlr.propertyStaticT<BoxedConstants> "Null"
      let zero = Dlr.propertyStaticT<BoxedConstants> "Zero"
      let undefined = Dlr.propertyStaticT<Undefined> "Boxed"
      
  //----------------------------------------------------------------------------
  module Box =
    
    let isBool box      = box?Tag    .=  !!!TypeTags.Bool
    let isNumber box    = box?Marker .<  !!!Markers.Tagged
    let isClr box       = box?Tag    .=  !!!TypeTags.Clr
    let isString box    = box?Tag    .=  !!!TypeTags.String
    let isUndefined box = box?Tag    .=  !!!TypeTags.Undefined
    let isObject box    = box?Tag    .>= !!!TypeTags.Object
    let isFunction box  = box?Tag    .=  !!!TypeTags.Function

    let unboxNumber box = box?Number
    let unboxBool box = box?Bool
    let unboxClr box = box?Clr
    let unboxString box = box?String
    let unboxUndefined box = box?Undefined
    let unboxObject box = box?Object
    let unboxFunction box = box?Func

    let setTag expr t =
      match t with
      | TypeTags.Number -> Dlr.void'
      | _ -> let expr = expr |> Dlr.Ext.unwrap in expr?Tag .= !!!t

    let setTagOf expr (of':Dlr.Expr) = 
      setTag expr (of'.Type |> TypeTag.OfType)

    let setValue (expr:Dlr.Expr) (value:Dlr.Expr)= 
      let expr = Dlr.Ext.unwrap expr
      let field = value.Type |> TypeTag.OfType |> BV.FieldOfTag
      expr.->field .= value
      
  let isBoxed (expr:Dlr.Expr) = 
    Dlr.Utils.isT<BoxedValue> expr
    
  let voidAsUndefined (expr:Dlr.Expr) =
    if Dlr.Utils.isVoid expr
      then Dlr.blockSimple [expr; Constants.Boxed.undefined]
      else expr
  
  let normalizeVal (expr:Dlr.Expr) =
    if Dlr.Utils.isT<bool> expr 
      then Dlr.ternary expr !!!TaggedBools.True !!!TaggedBools.False
      else expr
    
  let box value = 
    if isBoxed value then value
    else
      Dlr.blockTmpT<IronJS.BoxedValue> (fun tmp ->
        [
          (Box.setTagOf tmp value)
          (Box.setValue tmp value)
          (tmp :> Dlr.Expr)
        ] |> Seq.ofList
      )

  let tempBlock (value:Dlr.Expr) (body:Dlr.Expr -> Dlr.Expr list) =
    if value |> Dlr.Ext.isStatic then
      Dlr.blockSimple (body value)

    else
      let name = Dlr.tmpName()
      let temp = Dlr.param name value.Type
      let assign = Dlr.assign temp value
      Dlr.block [temp] (assign :: (body temp))

  let tempBlockT<'a> (value:Dlr.Expr) (body:Dlr.Expr -> Dlr.Expr list) =
    if value.Type = typeof<'a> then
      tempBlock value body

    else
      let value = value |> Dlr.cast typeof<'a>
      tempBlock value body

  //----------------------------------------------------------------------------
  let assign (lexpr:Dlr.Expr) rexpr = 

    let setBoxClrNull expr = 
      Dlr.assign (Dlr.field (Dlr.Ext.unwrap expr) BoxFields.Clr) Dlr.null'

    let assignBox (lexpr:Dlr.Expr) (rexpr:Dlr.Expr) =
      if isBoxed rexpr then 
        Dlr.assign (Dlr.Ext.unwrap lexpr) rexpr

      else
        let typeCode = rexpr.Type |> TypeTag.OfType
        let box = Dlr.Ext.unwrap lexpr
        let val' = Dlr.Ext.unwrap rexpr
        if typeCode <= TypeTags.Number then
          Dlr.blockSimple
            [setBoxClrNull box; Box.setTagOf box val'; Box.setValue box val']

        else
          Dlr.blockSimple 
            [Box.setTagOf box val'; Box.setValue box val']

    if isBoxed lexpr 
      then assignBox lexpr rexpr 
      else Dlr.assign (Dlr.Ext.unwrap lexpr) rexpr

  //----------------------------------------------------------------------------
  let compileIndex (ctx:Ctx) indexAst =
    let mutable index = 0u
    match indexAst with
    | Ast.Number n when CoreUtils.TryConvertToIndex(n, &index) -> !!!index
    | Ast.String s when CoreUtils.TryConvertToIndex(s, &index) -> !!!index
    | _ -> ctx.Compile indexAst
    
  //----------------------------------------------------------------------------
  let ensureObject (ctx:Ctx) (expr:Dlr.Expr) ifObj ifClr =
    match expr.Type |> TypeTag.OfType with
    | TypeTags.Function
    | TypeTags.Object -> tempBlock expr (fun expr -> [ifObj expr])
    | TypeTags.Clr -> tempBlock expr (fun expr -> [ifClr expr])
    | TypeTags.Bool
    | TypeTags.String
    | TypeTags.Undefined
    | TypeTags.Number -> 
      let expr = TypeConverter.ToObject(ctx.Env, expr)
      tempBlock expr (fun expr -> [ifObj expr])

    | TypeTags.Box -> 
      tempBlock expr (fun expr ->
        [
          Dlr.ternary 
            (Box.isObject expr)
            (ifObj (Box.unboxObject expr))
            (Dlr.ternary
              (Box.isClr expr)
              (ifClr (Box.unboxClr expr))
              (ifObj (TypeConverter.ToObject(ctx.Env, expr))))
        ])

    | tag -> failwithf "Invalid TypeTag '%i'" tag

  //----------------------------------------------------------------------------
  let ensureFunction (expr:Dlr.Expr) ifFunc ifClr =
    match expr.Type |> TypeTag.OfType with
    | TypeTags.Function -> tempBlock expr (fun expr -> [ifFunc expr])
    | TypeTags.Clr -> tempBlock expr (fun expr -> [ifClr expr])
    | TypeTags.Object
    | TypeTags.Bool
    | TypeTags.String
    | TypeTags.Undefined
    | TypeTags.Number -> Constants.Boxed.undefined
    | TypeTags.Box -> 
      tempBlock expr (fun expr ->
        [
          Dlr.ternary 
            (Box.isFunction expr)
            (ifFunc (Box.unboxFunction expr))
            (Dlr.ternary
              (Box.isClr expr)
              (ifClr (Box.unboxClr expr))
              (Constants.Boxed.undefined))
        ])

    | tag -> failwithf "Invalid TypeTag '%i'" tag