// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
* @name: S13.2_A1_T2;
* @section: 13.2;
* @assertion: A "prototype" property is automatically created for every function;
* @description: Using "var __func = function(){}" as a FunctionDeclaration;
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S13.2_A1_T2",

path: "TestCases/13_Function_Definition/13.2_Creating_Function_Objects/S13.2_A1_T2.js",

assertion: "A \"prototype\" property is automatically created for every function",

description: "Using \"var __func = function(){}\" as a FunctionDeclaration",

test: function testcase() {
   var __func = function(){};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__func.prototype === undefined) {
	$ERROR('#1: __func.prototype !== undefined');
}
//
//////////////////////////////////////////////////////////////////////////////

 }
});

