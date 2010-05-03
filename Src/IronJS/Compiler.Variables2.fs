﻿namespace IronJS.Compiler

open IronJS
open IronJS.Aliases
open IronJS.Tools
open IronJS.Tools.Dlr
open IronJS.Compiler
open IronJS.Compiler.Types

module Variables =

  let setGlobal ctx name value =
    Object.setProperty ctx (ExpressionState.static' ctx.Internal.Globals) name value

  let getGlobal ctx name (typ:ClrType option) =
    ExpressionState.forceVolatile (Object.getProperty ctx (ExpressionState.static' ctx.Internal.Globals) name typ)