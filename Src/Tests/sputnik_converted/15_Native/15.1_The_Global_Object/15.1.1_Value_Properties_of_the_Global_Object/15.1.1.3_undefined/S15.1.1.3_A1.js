// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @name: S15.1.1.3_A1;
 * @section: 15.1.1.3, 11.4.3, 15.1.2.4, 15.1.2.5;
 * @assertion: The initial value of undefined is undefined;
 * @description: Use typeof, isNaN, isFinite;
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S15.1.1.3_A1",

path: "TestCases/15_Native/15.1_The_Global_Object/15.1.1_Value_Properties_of_the_Global_Object/15.1.1.3_undefined/S15.1.1.3_A1.js",

assertion: "The initial value of undefined is undefined",

description: "Use typeof, isNaN, isFinite",

test: function testcase() {
   // CHECK#1
if (typeof(undefined) !== "undefined") {
	$ERROR('#1: typeof(undefined) === "undefined". Actual: ' + (typeof(undefined))); 
}

// CHECK#2
if (undefined !== void 0) {
	$ERROR('#2: undefined === void 0. Actual: ' + (undefined)); 
}

// CHECK#3
if (undefined !== eval("var x")) {
	$ERROR('#3: undefined === eval("var x"). Actual: ' + (undefined)); 
}

 }
});

