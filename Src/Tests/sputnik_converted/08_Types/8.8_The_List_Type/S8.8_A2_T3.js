// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
* @name: S8.8_A2_T3;
* @section: 8.8;
* @assertion: Values of the List type are simply ordered sequences of values;
* @description: Call function, that concatenate all it`s arguments;
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S8.8_A2_T3",

path: "TestCases/08_Types/8.8_The_List_Type/S8.8_A2_T3.js",

assertion: "Values of the List type are simply ordered sequences of values",

description: "Call function, that concatenate all it`s arguments",

test: function testcase() {
   function __mFunc(){var __accum=""; for (var i = 0; i < arguments.length; ++i){__accum += arguments[i]};return __accum;};
//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__mFunc("A","B","C","D","E","F") !== "ABCDEF"){
  $ERROR('#1: function __mFunc(){var __accum=""; for (var i = 0; i < arguments.length; ++i){__accum += arguments[i]};return __accum;}; __mFunc("A","B","C","D","E","F") === "ABCDEF". Actual: ' + (__mFunc("A","B","C","D","E","F")));
}
//
//////////////////////////////////////////////////////////////////////////////

 }
});

