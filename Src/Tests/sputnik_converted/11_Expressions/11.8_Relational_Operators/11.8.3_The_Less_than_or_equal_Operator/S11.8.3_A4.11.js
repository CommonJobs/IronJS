// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
* @name: S11.8.3_A4.11;
* @section: 11.8.3, 11.8.5;
* @assertion: If x is a prefix of y, return true;
* @description: x and y are string primitives;
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S11.8.3_A4.11",

path: "TestCases/11_Expressions/11.8_Relational_Operators/11.8.3_The_Less_than_or_equal_Operator/S11.8.3_A4.11.js",

assertion: "If x is a prefix of y, return true",

description: "x and y are string primitives",

test: function testcase() {
   //CHECK#1
if (("x" <= "x") !== true) {
  $ERROR('#1: ("x" <= "x") === true');
}

//CHECK#2
if (("" <= "x") !== true) {
  $ERROR('#2: ("" <= "x") === true');
}

//CHECK#3
if (("ab" <= "abcd") !== true) {
  $ERROR('#3: ("ab" <= abcd") === true');
}

//CHECK#4
if (("abcd" <= "abc\u0064") !== true) {
  $ERROR('#4: ("abcd" <= abc\\u0064") === true');
}

//CHECK#5
if (("x" <= "x" + "y") !== true) {
  $ERROR('#5: ("x" <= "x" + "y") === true');
}

//CHECK#6
var x = "x";
if ((x <= x + "y") !== true) {
  $ERROR('#6: var x = "x"; (x <= x + "y") === true');
}

//CHECK#7
if (("a\u0000" <= "a\u0000a") !== true) {
  $ERROR('#7: ("a\\u0000" <= "a\\u0000a") === true');
}

//CHECK#8
if (("x" <= " x") !== false) {
  $ERROR('#8: ("x" <= " x") === false');
}



 }
});

