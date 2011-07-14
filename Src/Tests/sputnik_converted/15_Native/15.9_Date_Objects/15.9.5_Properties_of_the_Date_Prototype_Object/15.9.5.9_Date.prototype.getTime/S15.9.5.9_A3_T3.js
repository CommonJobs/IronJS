// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @name: S15.9.5.9_A3_T3;
 * @section: 15.9.5.9;
 * @assertion: The Date.prototype.getTime property "length" has { ReadOnly, DontDelete, DontEnum } attributes;
 * @description: Checking DontEnum attribute;
 */


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S15.9.5.9_A3_T3",

path: "TestCases/15_Native/15.9_Date_Objects/15.9.5_Properties_of_the_Date_Prototype_Object/15.9.5.9_Date.prototype.getTime/S15.9.5.9_A3_T3.js",

assertion: "The Date.prototype.getTime property \"length\" has { ReadOnly, DontDelete, DontEnum } attributes",

description: "Checking DontEnum attribute",

test: function testcase() {
   if (Date.prototype.getTime.propertyIsEnumerable('length')) {
  $ERROR('#1: The Date.prototype.getTime.length property has the attribute DontEnum');
}

for(x in Date.prototype.getTime) {
  if(x === "length") {
    $ERROR('#2: The Date.prototype.getTime.length has the attribute DontEnum');
  }
}


 }
});

