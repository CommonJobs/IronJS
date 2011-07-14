// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @name: S15.8.2.6_A7;
 * @section: 15.8.2.6;
 * @assertion: The value of Math.ceil(x) is the same as the value of -Math.floor(-x);
 * @description: Checking if Math.ceil(x) equals to -Math.floor(-x) on 2000 floating point argument values;
 */
 

// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S15.8.2.6_A7",

path: "TestCases/15_Native/15.8_The_Math_Object/15.8.2_Function_Properties_of_the_Math_Object/15.8.2.6_ceil/S15.8.2.6_A7.js",

assertion: "The value of Math.ceil(x) is the same as the value of -Math.floor(-x)",

description: "Checking if Math.ceil(x) equals to -Math.floor(-x) on 2000 floating point argument values",

test: function testcase() {
   // CHECK#1
for (i=-1000; i<1000; i++)
{
	x = i/10.0;
	if (Math.ceil(x) !== -Math.floor(-x))
	{
		$ERROR("#1: 'x = " + x + "; Math.ceil(x) !== -Math.floor(-x)'");
	}
}

 }
});

