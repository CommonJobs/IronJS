// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
* @name: S15.5.4.18_A1_T6;
* @section: 15.5.4.18;
* @assertion: String.prototype.toUpperCase();
* @description: Call toUpperCase() function of Number.NEGATIVE_INFINITY;
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S15.5.4.18_A1_T6",

path: "TestCases/15_Native/15.5_String_Objects/15.5.4_Properties_of_the_String_Prototype_Object/15.5.4.18_String.prototype.toUpperCase/S15.5.4.18_A1_T6.js",

assertion: "String.prototype.toUpperCase()",

description: "Call toUpperCase() function of Number.NEGATIVE_INFINITY",

test: function testcase() {
   Number.prototype.toUpperCase = String.prototype.toUpperCase;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if ((Number.NEGATIVE_INFINITY).toUpperCase() !== "-INFINITY") {
  $ERROR('#1: Number.prototype.toUpperCase = String.prototype.toUpperCase; (Number.NEGATIVE_INFINITY).toUpperCase() === "-INFINITY". Actual: '+(Number.NEGATIVE_INFINITY).toUpperCase() );
}
//
//////////////////////////////////////////////////////////////////////////////

 }
});

