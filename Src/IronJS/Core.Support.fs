﻿namespace IronJS

open System
open System.Globalization
open System.Collections.Generic

type ExposeClassAttribute() =
  inherit Attribute()

type ExposeMemberAttribute(asName:string) =
  inherit Attribute()
  member x.AsName = asName

module Aliases = 
  
  #if CLR2
  #else
  open System.Collections.Concurrent;
  #endif
    
  type MutableList<'a> = List<'a>
  type MutableStack<'a> = Stack<'a>
  type MutableDict<'k, 'v> = Dictionary<'k, 'v>
  type MutableSorted<'k, 'v> = SortedDictionary<'k, 'v>
  type MutableSet<'a> = HashSet<'a>
  type Pair<'a, 'b> = Tuple<'a, 'b>

  #if CLR2
  type ConcurrentMutableDict<'k, 'v> = Clr2Support.ConcurrentDictionary<'k, 'v>
  #else
  type ConcurrentMutableDict<'k, 'v> = ConcurrentDictionary<'k, 'v>
  #endif

  let anyNumber = NumberStyles.Any
  let invariantCulture = CultureInfo.InvariantCulture

  let NaN = Double.NaN
  let NegInf = Double.NegativeInfinity 
  let PosInf = Double.PositiveInfinity

module Operators =

  let inline (<==) a b = a := b !a
  let inline (|!>) a b = b !a 
  let inline (|?>) a b = Option.map b a
  let inline (|?) a b = match a with Some a -> a | _ -> b()