// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @name: S15.8.2.5_A4;
 * @section: 15.8.2.5;
 * @assertion: If y is +0 and x>0, Math.atan2(y,x) is +0;
 * @description: Checking if Math.atan2(y,x) equals to +0, where y is +0 and x>0;
 */
 

// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S15.8.2.5_A4",

path: "TestCases/15_Native/15.8_The_Math_Object/15.8.2_Function_Properties_of_the_Math_Object/15.8.2.5_atan2/S15.8.2.5_A4.js",

assertion: "If y is +0 and x>0, Math.atan2(y,x) is +0",

description: "Checking if Math.atan2(y,x) equals to +0, where y is +0 and x>0",

test: function testcase() {
   // CHECK#1
y = +0;
x = new Array();
x[0] = 0.000000000000001;
x[2] = +Infinity;
x[1] = 1; 
xnum = 3;

for (i = 0; i < xnum; i++)
{
	if (Math.atan2(y,x[i]) !== +0)
		$FAIL("#1: Math.atan2(" + y + ", " + x[i] + ") !== +0");
}

 }
});

