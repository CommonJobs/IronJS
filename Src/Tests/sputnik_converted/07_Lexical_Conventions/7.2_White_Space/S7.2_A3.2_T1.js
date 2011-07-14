// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @name: S7.2_A3.2_T1;
 * @section: 7.2, 7.4;
 * @assertion: Single line comment can contain VERTICAL TAB (U+000B);
 * @description: Use VERTICAL TAB(\u000B);
 */


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S7.2_A3.2_T1",

path: "TestCases/07_Lexical_Conventions/7.2_White_Space/S7.2_A3.2_T1.js",

assertion: "Single line comment can contain VERTICAL TAB (U+000B)",

description: "Use VERTICAL TAB(\\u000B)",

test: function testcase() {
   // CHECK#1
eval("//\u000B single line \u000B comment \u000B");

//CHECK#2
var x = 0;
eval("//\u000B single line \u000B comment \u000B x = 1;");
if (x !== 0) {
  $ERROR('#1: var x = 0; eval("//\\u000B single line \\u000B comment \\u000B x = 1;"); x === 0. Actual: ' + (x));
}

 }
});

