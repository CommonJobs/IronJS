// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
* @name: S15.5.4.17_A1_T3;
* @section: 15.5.4.17;
* @assertion: String.prototype.toLocaleLowerCase();
* @description: Checking by using eval;
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S15.5.4.17_A1_T3",

path: "TestCases/15_Native/15.5_String_Objects/15.5.4_Properties_of_the_String_Prototype_Object/15.5.4.17_String.prototype.toLocaleLowerCase/S15.5.4.17_A1_T3.js",

assertion: "String.prototype.toLocaleLowerCase()",

description: "Checking by using eval",

test: function testcase() {
   //////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (eval("\"BJ\"").toLocaleLowerCase() !== "bj") {
  $ERROR('#1: eval("\\"BJ\\"").toLocaleLowerCase() === "bj". Actual: '+eval("\"BJ\"").toLocaleLowerCase() );
}
//
//////////////////////////////////////////////////////////////////////////////

 }
});

