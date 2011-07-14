// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
* @name: S15.10.6.2_A3_T7;
* @section: 15.10.6.2, 13.2;
* @assertion: RegExp.prototype.exec behavior depends on global property. 
* If global is true and lastIndex not changed manually, 
* next exec calling start to match from position where current match finished;
* @description: RegExp is /\d+/ and tested string is "123 456 789";
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S15.10.6.2_A3_T7",

path: "TestCases/15_Native/15.10_RegExp_Objects/15.10.6_Properties_of_the_RegExp_Prototype_Object/15.10.6.2_RegExp.prototype.exec/S15.10.6.2_A3_T7.js",

assertion: "RegExp.prototype.exec behavior depends on global property.",

description: "RegExp is /\\d+/ and tested string is \"123 456 789\"",

test: function testcase() {
   __re = /\d+/;

__matched = [];

__expected = ["123","123","123","123","123","123","123","123","123","123"];

do{
    __executed = __re.exec("123 456 789");
    if (__executed !== null) {
    	__matched.push(__executed[0]);
    } else {
    	break;
    }
}while(__matched.length<10);

//CHECK#1
if (__expected.length !== __matched.length) {
  $ERROR('#1: __executed = /\\d+/.exec("123 456 789"); __matched.length === ' + (__expected.length) + '.Actual: ' + (__matched.length));
}

//CHECK#2
for(var index=0; index<__expected.length; index++) {
  if (__expected[index] !== __matched[index]) {
    $ERROR('#2: __executed = /\\d+/.exec("123 456 789"); __matched[' + index + '] === ' + __expected[index] + '. Actual: ' + __matched[index]);
  }
}


 }
});

