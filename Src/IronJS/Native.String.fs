﻿namespace IronJS.Native

open System
open System.Text.RegularExpressions

open IronJS
open IronJS.Support.Aliases
open IronJS.DescriptorAttrs

(*
//  This module implements the javascript String objects functions and properties.
//
//  DONE:
//  15.5.1.1 String ( [ value ] )
//  15.5.2.1 new String ( [ value ] )
//  15.5.3.1 String.prototype
//  15.5.3.2 String.fromCharCode ( [ char0 [ , char1 [ , … ] ] ] )
//  15.5.4.1 String.prototype.constructor
//  15.5.4.2 String.prototype.toString ( )
//  15.5.4.3 String.prototype.valueOf ( )
//  15.5.4.4 String.prototype.charAt (pos)
//  15.5.4.5 String.prototype.charCodeAt (pos)
//  15.5.4.6 String.prototype.concat ( [ string1 [ , string2 [ , … ] ] ] )
//  15.5.4.7 String.prototype.indexOf (searchString, position)
//  15.5.4.8 String.prototype.lastIndexOf (searchString, position)
//  15.5.4.9 String.prototype.localeCompare (that)
//  15.5.4.13 String.prototype.slice (start, end)
//  15.5.4.15 String.prototype.substring (start, end)
//  15.5.4.16 String.prototype.toLowerCase ( )
//  15.5.4.17 String.prototype.toLocaleLowerCase ( )
//  15.5.4.18 String.prototype.toUpperCase ( )
//  15.5.4.19 String.prototype.toLocaleUpperCase ( )
//  15.5.4.12 String.prototype.search (regexp) 
//  15.5.4.14 String.prototype.split (separator, limit) 
//  15.5.4.10 String.prototype.match (regexp)
//  
//  NOT DONE:
//  15.5.4.11 String.prototype.replace (searchValue, replaceValue) - REGEXP/FUNCTION MISSING
*)

module String =

  //----------------------------------------------------------------------------
  let internal constructor' (ctor:FunctionObject) (this:CommonObject) (value:BoxedValue) =
    let value = TypeConverter.ToString value
    match this with
    | null -> ctor.Env.NewString(value) |> BV.Box
    | _ -> value |> BV.Box
    
  //----------------------------------------------------------------------------
  let internal fromCharCode (args:BoxedValue array) =
    let buffer = Text.StringBuilder(args.Length)

    for i = 0 to args.Length-1 do
      buffer.Append(TypeConverter.ToUInt16 args.[i] |> char) |> ignore

    buffer.ToString()

  //----------------------------------------------------------------------------
  let internal toString (func:FunctionObject) (this:CommonObject) =
    this.CheckType<SO>()
    this |> ValueObject.GetValue
    
  //----------------------------------------------------------------------------
  let internal valueOf (func:FunctionObject) (this:CommonObject) = 
    toString func this
    
  //----------------------------------------------------------------------------
  let internal charAt (this:CommonObject) (pos:double) =
    let value = TypeConverter.ToString this
    let index = TypeConverter.ToInt32 pos
    if index < 0 || index >= value.Length then "" else value.[index] |> string

  //----------------------------------------------------------------------------
  let internal charCodeAt (this:CommonObject) (pos:double) =
    let value = TypeConverter.ToString this
    let index = TypeConverter.ToInt32 pos
    if index < 0 || index >= value.Length then nan else value.[index] |> double
    
  //----------------------------------------------------------------------------
  let internal concat (this:CommonObject) (args:BoxedValue array) =
    let buffer = new Text.StringBuilder(TypeConverter.ToString this)
    let toString (x:BoxedValue) = buffer.Append(TypeConverter.ToString x)
    args |> Array.iter (toString >> ignore)
    buffer.ToString()
    
  //----------------------------------------------------------------------------
  let internal indexOf (this:CommonObject) (subString:string) (index:double) =
    let value = this |> TypeConverter.ToString
    let index = index |> TypeConverter.ToInt32
    let index = Math.Min(Math.Max(index, 0), value.Length);
    value.IndexOf(subString, index, StringComparison.Ordinal) |> double
    
  //----------------------------------------------------------------------------
  let internal lastIndexOf (this:CommonObject) (subString:string) (index:double) =
    let value = this |> TypeConverter.ToString

    let index = 
      if Double.IsNaN index 
        then Int32.MaxValue 
        else TypeConverter.ToInteger index

    let index = Math.Min(index, value.Length-1)
    let index = Math.Min(index + subString.Length-1, value.Length-1)
    
    let index = 
      if index < 0 
        then  if value = "" && subString = "" then 0 else -1
        else value.LastIndexOf(subString, index, StringComparison.Ordinal)

    index |> double
      
  //----------------------------------------------------------------------------
  let internal localeCompare (this:CO) (that:CO) =
    let value = this |> TypeConverter.ToString
    let that = this |> TypeConverter.ToString
    String.Compare(value, that) |> double
    
  //----------------------------------------------------------------------------
  let private toRegExp (env:Env) (regexp:BV) =
    match regexp.Tag with
    | TypeTags.String -> env.NewRegExp(regexp.String) :?> RO
    | _ -> regexp.Object.CastTo<RO>()
    
  let internal match' (f:FO) (this:CO) (regexp:BV) =
    let regexp = regexp |> toRegExp f.Env
    RegExp.exec f regexp (this |> TC.ToString)
    
  //----------------------------------------------------------------------------
  let internal replace (this:CO) (search:BV) (replace:BV) =
    let value = this |> TC.ToString

    //replace(regex, _)
    if search.IsRegExp then 
      let search = search |> toRegExp this.Env
      let count = if search.Global then Int32.MaxValue else 1
      let lastIndex = search.Get("lastIndex") |> TC.ToInt32
      let lastIndex = if search.Global then 0 else Math.Max(0, lastIndex-1)
      if search.Global then search.Put("lastIndex", 0.0)

      //replace(regex, function)
      if replace.IsFunction then

        let matchEval (m:Match) =
          if not search.Global then
            search.Put("lastIndex", m.Index + 1 |> double)

          let params' = MutableList<BV>()

          for g in m.Groups do
            if g.Success 
              then params'.Add(g.Value |> BV.Box)
              else params'.Add(Undefined.Boxed)

          let args = params'.ToArray()
          let this = this.Env.Globals
          Utils.invoke replace.Func this args |> TC.ToString
        
        search.RegExp.Replace(value, MatchEvaluator(matchEval), count, lastIndex)

      //replace(regex, string)
      else
        ""
      
    //replace(string, _)
    else
      let search = search |> TC.ToString
      let index = value.IndexOf search

      if index <> -1 then
      
        //replace(string, function)
        if replace.IsFunction then 
          let replace = replace.Func.Call(this.Env.Globals, search, index, value) |> TC.ToString
          value.Substring(0, index) + replace + value.Substring(index + search.Length)
        
        //replace(string, string)
        else
          let replace = replace |> TC.ToString
          let startIndex = value.IndexOf search
          if startIndex = -1 then value
          else
            let endIndex = startIndex + search.Length
            let bufferSize = value.Length + (replace.Length - search.Length)
            let buffer = new Text.StringBuilder(bufferSize);
            buffer.Append(value, 0, startIndex) |> ignore
            buffer.Append(replace) |> ignore
            buffer.Append(value, endIndex, value.Length - endIndex) |> ignore
            buffer.ToString()

      else
        value
          
  //----------------------------------------------------------------------------
  let internal search (this:CO) (search:BoxedValue) =
    let value = this |> TypeConverter.ToString

    //search(regex)
    if search.Tag >= TypeTags.Object then 
      let regexp = search |> toRegExp this.Env
      let m = regexp.RegExp.Match(value)
      if m |> FSKit.Utils.notNull && m.Success 
        then m.Index |> double
        else 0.0
      
    //search(string)
    else
      let search = search |> TypeConverter.ToString
      value.IndexOf(search, StringComparison.Ordinal) |> double
      
  //----------------------------------------------------------------------------
  let internal slice (this:CommonObject) (start:double) (end':BoxedValue) =
    let value = this  |> TypeConverter.ToString
    let start = start |> TypeConverter.ToInteger

    let end' = if end'.IsUndefined then start else value.Length

    let start = Math.Min(Math.Max(start, 0), value.Length)
    let end'  = Math.Min(Math.Max(end', 0), value.Length)

    if end' <= start then "" else value.Substring(start, end' - start)
    
  //----------------------------------------------------------------------------
  let internal split (f:FO) (this:CO) (separator:BV) (limit:BV) =
    let value = this |> TC.ToString
    
    let limit =
      if limit.IsUndefined
        then Int32.MaxValue 
        else limit |> TC.ToInt32

    let parts = 
      if separator.IsRegExp then
        let separator = separator.Object.CastTo<RO>()
        separator.RegExp.Split(value, limit)

      else
        let separator =
          if separator.IsUndefined
            then "" 
            else separator |> TC.ToString

        value.Split([|separator|], limit, StringSplitOptions.None)

    let array = f.Env.NewArray(parts.Length |> uint32)
    for i = 0 to parts.Length-1 do
      array.Put(uint32 i, parts.[i])

    array
        
  //----------------------------------------------------------------------------
  let internal substring (this:CommonObject) (start:double) (end':double) =
    let value = this |> TypeConverter.ToString

    let start = start |> TypeConverter.ToInt32
    let start = if start < 0 then Math.Max(start + value.Length, 0) else start

    let end' = end' |> TypeConverter.ToInt32
    let end' = Math.Max(Math.Min(end', value.Length-start), 0)

    if end' <= 0 then "" else value.Substring(start, end')
    
  //----------------------------------------------------------------------------
  let internal toLowerCase (this:CommonObject) =
    let value = this |> TypeConverter.ToString
    value.ToLowerInvariant()
    
  //----------------------------------------------------------------------------
  let internal toLocaleLowerCase (this:CommonObject) =
    let value = this |> TypeConverter.ToString
    value.ToLower()
    
  //----------------------------------------------------------------------------
  let internal toUpperCase (this:CommonObject) =
    let value = this |> TypeConverter.ToString
    value.ToUpperInvariant()
    
  //----------------------------------------------------------------------------
  let internal toLocaleUpperCase (this:CommonObject) =
    let value = this |> TypeConverter.ToString
    value.ToUpper()
        
  //----------------------------------------------------------------------------
  let createPrototype (env:Environment) objPrototype =
    let prototype = env.NewString()
    prototype.Put("length", 0.0)
    prototype.Prototype <- objPrototype
    prototype
    
  //----------------------------------------------------------------------------
  let setupConstructor (env:Environment) =
    let ctor = new Func<FunctionObject, CommonObject, BoxedValue, BoxedValue>(constructor')
    let ctor = Utils.createHostFunction env ctor

    let fromCharCode = new Func<BoxedValue array, string>(fromCharCode)
    let fromCharCode = Utils.createHostFunction env fromCharCode
    ctor.Put("fromCharCode", fromCharCode, DontEnum)

    ctor.ConstructorMode <- ConstructorModes.Host
    ctor.Put("prototype", env.Prototypes.String, Immutable)

    env.Globals.Put("String", ctor)
    env.Constructors <- {env.Constructors with String=ctor}
    
  //----------------------------------------------------------------------------
  let setupPrototype (env:Environment) =
    let proto = env.Prototypes.String;

    proto.Put("constructor", env.Constructors.String, DontEnum) // 15.6.4.1

    let toString = new Func<FunctionObject, CommonObject, BoxedValue>(toString)
    let toString = Utils.createHostFunction env toString
    proto.Put("toString", toString, DontEnum)

    let valueOf = new Func<FunctionObject, CommonObject, BoxedValue>(valueOf)
    let valueOf = Utils.createHostFunction env valueOf
    proto.Put("valueOf", valueOf, DontEnum)

    let charAt = new Func<CommonObject, double, string>(charAt)
    let charAt = Utils.createHostFunction env charAt
    proto.Put("charAt", charAt, DontEnum)

    let charCodeAt = new Func<CommonObject, double, double>(charCodeAt)
    let charCodeAt = Utils.createHostFunction env charCodeAt
    proto.Put("charCodeAt", charCodeAt, DontEnum)

    let concat = new Func<CommonObject, BoxedValue array, string>(concat)
    let concat = Utils.createHostFunction env concat
    proto.Put("concat", concat, DontEnum)

    let indexOf = new Func<CommonObject, string, double, double>(indexOf)
    let indexOf = Utils.createHostFunction env indexOf
    proto.Put("indexOf", indexOf, DontEnum)

    let lastIndexOf = new Func<CommonObject, string, double, double>(lastIndexOf)
    let lastIndexOf = Utils.createHostFunction env lastIndexOf
    proto.Put("lastIndexOf", lastIndexOf, DontEnum)

    let localeCompare = new Func<CommonObject, CommonObject, double>(localeCompare)
    let localeCompare = Utils.createHostFunction env localeCompare
    proto.Put("localeCompare", localeCompare, DontEnum)

    let match' = JsFunc<BV>(match')
    let match' = Utils.createHostFunction env match'
    proto.Put("match", match', DontEnum)

    let replace = new Func<CommonObject, BoxedValue, BoxedValue, string>(replace)
    let replace = Utils.createHostFunction env replace
    proto.Put("replace", replace, DontEnum)

    let search = new Func<CommonObject, BoxedValue, double>(search)
    let search = Utils.createHostFunction env search
    proto.Put("search", search, DontEnum)

    let slice = new Func<CommonObject, double, BoxedValue, string>(slice)
    let slice = Utils.createHostFunction env slice
    proto.Put("slice", slice, DontEnum)

    let split = new Func<FunctionObject, CommonObject, BoxedValue, BoxedValue, CommonObject>(split)
    let split = Utils.createHostFunction env split
    proto.Put("split", split, DontEnum)

    let substring = new Func<CommonObject, double, double, string>(substring)
    let substring = Utils.createHostFunction env substring
    proto.Put("substring", substring, DontEnum)

    let toLowerCase = new Func<CommonObject, string>(toLowerCase)
    let toLowerCase = Utils.createHostFunction env toLowerCase
    proto.Put("toLowerCase", toLowerCase, DontEnum)
    
    let toLocaleLowerCase = new Func<CommonObject, string>(toLocaleLowerCase)
    let toLocaleLowerCase = Utils.createHostFunction env toLocaleLowerCase
    proto.Put("toLocaleLowerCase", toLocaleLowerCase, DontEnum)

    let toUpperCase = new Func<CommonObject, string>(toUpperCase)
    let toUpperCase = Utils.createHostFunction env toUpperCase
    proto.Put("toUpperCase", toUpperCase, DontEnum)

    let toLocaleUpperCase = new Func<CommonObject, string>(toLocaleUpperCase)
    let toLocaleUpperCase = Utils.createHostFunction env toLocaleUpperCase
    proto.Put("toLocaleUpperCase", toLocaleUpperCase, DontEnum)
