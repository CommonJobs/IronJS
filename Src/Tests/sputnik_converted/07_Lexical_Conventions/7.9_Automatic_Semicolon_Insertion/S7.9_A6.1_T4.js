// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @name: S7.9_A6.1_T4;
 * @section: 7.9, 12.6.3;
 * @assertion: Check For Statement for automatic semicolon insertion; 
 * @description: for( \n semicolon \n semicolon \n);
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S7.9_A6.1_T4",

path: "TestCases/07_Lexical_Conventions/7.9_Automatic_Semicolon_Insertion/S7.9_A6.1_T4.js",

assertion: "Check For Statement for automatic semicolon insertion",

description: "for( \\n semicolon \\n semicolon \\n)",

test: function testcase() {
   //CHECK#1
for(
    ;
    ;
) {
  break;
}

 }
});

