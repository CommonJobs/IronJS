﻿using System;
using System.Linq;
using System.Text;
using IronJS.Runtime;
using IronJS.Runtime.Js;
using IronJS.Runtime.Utils;
using IronJS.Compiler.Ast;

namespace IronJS.Testing
{
    class Program
    {
        //TODO: fix pretty-print of AST tree for all nodes
        static void Main(string[] args)
        {
            var astGenerator = new Compiler.AstGenerator();
            var astOptimizer = new Compiler.AstOptimizer();

            var astNodes = astGenerator.Build("Testing.js", Encoding.UTF8);
                astNodes = astOptimizer.Optimize(astNodes);

            foreach (var node in astNodes)
                Console.WriteLine(node.Print());

            var globals = new JsObj();

            globals.Set(
                "time", 
                typeof(HelperFunctions).GetMethod("Timer")
            );

            globals.Set(
                "print",
                typeof(Console).GetMethod("WriteLine", new[] { typeof(int) })
            );

            var etGenerator = new Compiler.EtGenerator();
            var compiled = etGenerator.Build2(astNodes, new Context());

            compiled(globals);
            Console.ReadLine();
        }
    }
}
