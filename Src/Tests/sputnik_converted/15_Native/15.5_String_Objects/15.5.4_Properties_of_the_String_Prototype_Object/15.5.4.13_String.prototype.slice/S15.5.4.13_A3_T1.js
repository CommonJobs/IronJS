// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
* @name: S15.5.4.13_A3_T1;
* @section: 15.5.4.13;
* @assertion: String.prototype.slice (start, end) can be applied to object instances;
* @description: Apply String.prototype.slice to Object instance;
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S15.5.4.13_A3_T1",

path: "TestCases/15_Native/15.5_String_Objects/15.5.4_Properties_of_the_String_Prototype_Object/15.5.4.13_String.prototype.slice/S15.5.4.13_A3_T1.js",

assertion: "String.prototype.slice (start, end) can be applied to object instances",

description: "Apply String.prototype.slice to Object instance",

test: function testcase() {
   var __instance = new Object();

__instance.slice = String.prototype.slice;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.slice(0,8) !== "[object ") {
  $ERROR('#1: __instance = new Object(); __instance.slice = String.prototype.slice; __instance.slice(0,8) === "[object ". Actual: '+__instance.slice(0,8) );
}
//
//////////////////////////////////////////////////////////////////////////////

 }
});

