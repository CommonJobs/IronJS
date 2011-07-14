// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
* @name: S15.5.1.1_A1_T1;
* @section: 15.5.1.1;
* @assertion: When String is called as a function rather than as a constructor, it performs a type conversion;
* @description: Call String(function(){}());
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S15.5.1.1_A1_T1",

path: "TestCases/15_Native/15.5_String_Objects/15.5.1_The_String_Constructor_Called_as_a_Function/S15.5.1.1_A1_T1.js",

assertion: "When String is called as a function rather than as a constructor, it performs a type conversion",

description: "Call String(function(){}())",

test: function testcase() {
   var __str = String(function(){}());

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __str !== "string") {
  $ERROR('#1: __str = String(function(){}()); typeof __str === "string". Actual: typeof __str ==='+typeof __str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__str !== "undefined") {
  $ERROR('#2: __str = String(function(){}()); __str === "undefined". Actual: __str ==='+__str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

 }
});

