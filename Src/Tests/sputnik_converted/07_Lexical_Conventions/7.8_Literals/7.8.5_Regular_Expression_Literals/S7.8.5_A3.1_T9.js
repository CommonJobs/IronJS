// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @name: S7.8.5_A3.1_T9;
 * @section: 7.8.5, 15.10.4.1;
 * @assertion: RegularExpressionFlags :: IdentifierPart;
 * @description: IdentifierPart :: \u006D (m);
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S7.8.5_A3.1_T9",

path: "TestCases/07_Lexical_Conventions/7.8_Literals/7.8.5_Regular_Expression_Literals/S7.8.5_A3.1_T9.js",

assertion: "RegularExpressionFlags :: IdentifierPart",

description: "IdentifierPart :: \\u006D (m)",

test: function testcase() {
   //CHECK#1
var regexp = /(?:)/\u006D; 
if (regexp.multiline !== true) {
  $ERROR('#1: var regexp = /(?:)/\\u006D; regexp.multiline === true. Actual: ' + (regexp.multiline));
}                             

 }
});

