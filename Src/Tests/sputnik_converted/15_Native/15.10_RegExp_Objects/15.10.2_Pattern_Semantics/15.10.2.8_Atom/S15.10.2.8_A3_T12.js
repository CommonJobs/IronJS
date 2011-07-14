// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
* @name: S15.10.2.8_A3_T12;
* @section: 15.10.2.8;
* @assertion: Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match. 
* The result can be used either in a backreference (\ followed by a nonzero decimal number), 
* referenced in a replace string, 
* or returned as part of an array from the regular expression matching function;
* @description: Execute /(a(b(c)))(d(e(f)))/.exec("xabcdefg") and check results;
*/


// Converted for Test262 from original Sputnik source

ES5Harness.registerTest( {
id: "S15.10.2.8_A3_T12",

path: "TestCases/15_Native/15.10_RegExp_Objects/15.10.2_Pattern_Semantics/15.10.2.8_Atom/S15.10.2.8_A3_T12.js",

assertion: "Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.",

description: "Execute /(a(b(c)))(d(e(f)))/.exec(\"xabcdefg\") and check results",

test: function testcase() {
   __executed = /(a(b(c)))(d(e(f)))/.exec("xabcdefg");

__expected = ["abcdef","abc","bc","c","def","ef","f"];
__expected.index = 1;
__expected.input = "xabcdefg";

//CHECK#1
if (__executed.length !== __expected.length) {
	$ERROR('#1: __executed = /(a(b(c)))(d(e(f)))/.exec("xabcdefg"); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
	$ERROR('#2: __executed = /(a(b(c)))(d(e(f)))/.exec("xabcdefg"); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
	$ERROR('#3: __executed = /(a(b(c)))(d(e(f)))/.exec("xabcdefg"); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#4: __executed = /(a(b(c)))(d(e(f)))/.exec("xabcdefg"); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}


 }
});

