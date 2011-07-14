// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @name: S15.9.4.3_A2_T1;
 * @section: 15.9.4.3;
 * @assertion: The "length" property of the "UTC" is 7;
 * @description: The "length" property of the "UTC" is 7;
 */


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S15.9.4.3_A2_T1",

path: "TestCases/15_Native/15.9_Date_Objects/15.9.4_Properties_of_the_Date_Constructor/15.9.4.3_Date.UTC/S15.9.4.3_A2_T1.js",

assertion: "The \"length\" property of the \"UTC\" is 7",

description: "The \"length\" property of the \"UTC\" is 7",

test: function testcase() {
   if(Date.UTC.hasOwnProperty("length") !== true){
  $ERROR('#1: The UTC has a "length" property');
}

if(Date.UTC.length !== 7){
  $ERROR('#2: The "length" property of the UTC is 7');
}


 }
});

