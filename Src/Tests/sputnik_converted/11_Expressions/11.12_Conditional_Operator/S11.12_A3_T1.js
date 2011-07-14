// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
* @name: S11.12_A3_T1;
* @section: 11.12;
* @assertion: If ToBoolean(x) is false, return z;
* @description: Type(y) and Type(z) are boolean primitives;
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S11.12_A3_T1",

path: "TestCases/11_Expressions/11.12_Conditional_Operator/S11.12_A3_T1.js",

assertion: "If ToBoolean(x) is false, return z",

description: "Type(y) and Type(z) are boolean primitives",

test: function testcase() {
   //CHECK#1
if ((false ? false : true) !== true) {
  $ERROR('#1: (false ? false : true) === true');
}

//CHECK#2
var z = new Boolean(true);
if ((false ? true : z) !== z) {
  $ERROR('#2: (var y = new Boolean(true); (false ? true : z) === z');
}

 }
});

