﻿using System;
using System.Text;
using Antlr.Runtime.Tree;
using Et = System.Linq.Expressions.Expression;

namespace IronJS.Compiler.Ast
{
    public class AssignNode : Node
    {
        public Node Target { get; protected set; }
        public Node Value { get; protected set; }

        public AssignNode(Node target, Node value, ITree node)
            : base(NodeType.Assign, node)
        {
            Target = target;
            Value = value;
        }

        public override void Print(StringBuilder writer, int indent = 0)
        {
            var indentStr = new String(' ', indent * 2);

            writer.AppendLine(indentStr + "(" + Type + " ");

            Target.Print(writer, indent + 1);
            Value .Print(writer, indent + 1);

            writer.AppendLine(indentStr + ")");
        }

        public override Et Generate(EtGenerator etgen)
        {
            return etgen.GenerateAssign(
                Target,
                Value.Generate(etgen)
            );
        }
    }
}
