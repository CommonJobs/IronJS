// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @name: S15.1.1.3_A3.2;
 * @section: 15.1.1.3, 12.6.4;
 * @assertion: The undefined is DontEnum;
 * @description: Use for-in statement;
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S15.1.1.3_A3.2",

path: "TestCases/15_Native/15.1_The_Global_Object/15.1.1_Value_Properties_of_the_Global_Object/15.1.1.3_undefined/S15.1.1.3_A3.2.js",

assertion: "The undefined is DontEnum",

description: "Use for-in statement",

test: function testcase() {
   // CHECK#1
for (prop in this) {
  if (prop === "undefined") {
	$ERROR('#1: The undefined is DontEnum');
  }	 	
}

 }
});

