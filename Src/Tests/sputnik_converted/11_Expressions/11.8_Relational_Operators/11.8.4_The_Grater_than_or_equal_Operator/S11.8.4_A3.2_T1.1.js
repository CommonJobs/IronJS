// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
  * @name: S11.8.4_A3.2_T1.1;
  * @section: 11.8.4;
  * @assertion: Operator x >= y returns ToString(x) >= ToString(y), if Type(Primitive(x)) is String and Type(Primitive(y)) is String; 
  * @description: Type(Primitive(x)) and Type(Primitive(y)) vary between primitive string and String object;
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S11.8.4_A3.2_T1.1",

path: "TestCases/11_Expressions/11.8_Relational_Operators/11.8.4_The_Grater_than_or_equal_Operator/S11.8.4_A3.2_T1.1.js",

assertion: "Operator x >= y returns ToString(x) >= ToString(y), if Type(Primitive(x)) is String and Type(Primitive(y)) is String",

description: "Type(Primitive(x)) and Type(Primitive(y)) vary between primitive string and String object",

test: function testcase() {
   //CHECK#1
if ("1" >= "1" !== true) {
  $ERROR('#1: "1" >= "1" === true');
}

//CHECK#2
if (new String("1") >= "1" !== true) {
  $ERROR('#2: new String("1") >= "1" === true');
}

//CHECK#3
if ("1" >= new String("1") !== true) {
  $ERROR('#3: "1" >= new String("1") === true');
}

//CHECK#4
if (new String("1") >= new String("1") !== true) {
  $ERROR('#4: new String("1") >= new String("1") === true');
}

//CHECK#5
if ("x" >= "1" !== true) {
  $ERROR('#5: "x" >= "1" === true');
}

//CHECK#6
if ("1" >= "x" !== false) {
  $ERROR('#6: "1" >= "x" === false');
}

 }
});

