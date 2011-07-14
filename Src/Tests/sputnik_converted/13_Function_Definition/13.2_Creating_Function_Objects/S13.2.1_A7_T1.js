// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
* @name: S13.2.1_A7_T1;
* @section: 13.2.1;
* @assertion: When the [[Call]] property for a Function object F is called, the following steps are taken: 
* 2. Evaluate F's FunctionBody; 
* if Result.type is returned  then Result.value is returned too;
* @description: Returning null. Declaring a function with "function __func()";
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S13.2.1_A7_T1",

path: "TestCases/13_Function_Definition/13.2_Creating_Function_Objects/S13.2.1_A7_T1.js",

assertion: "When the [[Call]] property for a Function object F is called, the following steps are taken:",

description: "Returning null. Declaring a function with \"function __func()\"",

test: function testcase() {
   function __func(){
    var x = null;
    return x;
}

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try{
    var x=__func();
} catch(e){
    $ERROR('#1: var x=__func() does not lead to throwing exception. Actual: exception is '+e);
}
//
//////////////////////////////////////////////////////////////////////////////

 }
});

