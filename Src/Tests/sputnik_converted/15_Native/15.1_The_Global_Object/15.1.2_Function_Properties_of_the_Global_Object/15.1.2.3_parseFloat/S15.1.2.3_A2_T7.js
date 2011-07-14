// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @name: S15.1.2.3_A2_T7;
 * @section: 15.1.2.3;
 * @assertion: Operator remove leading StrWhiteSpaceChar;
 * @description: StrWhiteSpaceChar :: LF (U+000A);  
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S15.1.2.3_A2_T7",

path: "TestCases/15_Native/15.1_The_Global_Object/15.1.2_Function_Properties_of_the_Global_Object/15.1.2.3_parseFloat/S15.1.2.3_A2_T7.js",

assertion: "Operator remove leading StrWhiteSpaceChar",

description: "StrWhiteSpaceChar :: LF (U+000A)",

test: function testcase() {
   //CHECK#1
if (parseFloat("\u000A1.1") !== parseFloat("1.1")) {
  $ERROR('#1: parseFloat("\\u000A1.1") === parseFloat("1.1"). Actual: ' + (parseFloat("\u000A1.1")));
}

//CHECK#2
if (parseFloat("\u000A\u000A-1.1") !== parseFloat("-1.1")) {
  $ERROR('#2: parseFloat("\\u000A\\u000A-1.1") === parseFloat("-1.1"). Actual: ' + (parseFloat("\u000A\u000A-1.1")));
}

//CHECK#3
if (isNaN(parseFloat("\u000A")) !== true) {
  $ERROR('#3: parseFloat("\\u000A") === Not-a-Number. Actual: ' + (parseFloat("\u000A")));
}

 }
});

