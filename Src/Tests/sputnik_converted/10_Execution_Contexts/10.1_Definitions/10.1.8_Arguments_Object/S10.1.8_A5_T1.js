// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @name: S10.1.8_A5_T1;
 * @section: 10.1.8;
 * @assertion: A property is created with name length with property 
 * attributes { DontEnum } and no others;
 * @description: Checking existence of arguments.length property; 
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S10.1.8_A5_T1",

path: "TestCases/10_Execution_Contexts/10.1_Definitions/10.1.8_Arguments_Object/S10.1.8_A5_T1.js",

assertion: "A property is created with name length with property",

description: "Checking existence of arguments.length property",

test: function testcase() {
   //CHECK#1
function f1(){
  return arguments.hasOwnProperty("length");
}
try{
  if(f1() !== true){
    $ERROR("#1: arguments object doesn't contains property 'length'");
  }
}
catch(e){
  $ERROR("#1: arguments object doesn't exists");
}

//CHECK#2
var f2 = function(){return arguments.hasOwnProperty("length");};
try{
  if(f2() !== true){
    $ERROR("#2: arguments object doesn't contains property 'length'");
  }
}
catch(e){
  $ERROR("#2: arguments object doesn't exists");
}

 }
});

