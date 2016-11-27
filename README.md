# ShoehornJS
***
ShoehornJS is a simple and small JavaScript tool for creating type safety. It insures that your variables are being assigned the corrent datatypes and provides a way of improving your error handling for these datatypes.

ShoehornJS can be required for use with [NodeJS](https://nodejs.org/).

***

## Getting Started

### The Initial Call

In the browser Shoehorn is available globally as either `shoehorn` or `shType` (in NodeJS it's available as whatever you require it as). `shoehorn` is a function that accepts an object as its only argument.

``` js
var myObject = {
  variableName: String,
  lineNumber: Int,
  fileName: String
};

shoehorn(myObject);
```
##### variableName: String
This argument should be a string and will be used in the error message as the name of the variable that you are assigning a value to.

##### lineNumber: Int
This argument should be a number and will be included in the error message as the line where the error occurs.

##### fileName: String
This argument should be a String and will be included in the error message as the file where the error occurs.

**Note: A normal error stack will still be logged. These options give you the opportunity to make the error log a bit more robust and understandable.**

### Assigning a Value
`shoehorn()` returns an object with other functions to be called.

``` js
{
  help: function()
  trueType: function(value)
  compareType: function(type1, type2)
  typeError: function(wantedType, value)
  Object: function(value)
  Array: function(value)
  String: function(value)
  Bool: function(value)
  Func: function(value)
  Int: function (value)
  Float: function (value, fixedValue)
}
```
##### help: function
This will log to the console a short thank you message and a "TL;DR" of how to use ShoehornJS

##### trueType: function(value)
This will return a string of the true datatype of a given `value`, with the first letter of that datatype being capitalized. Normally in JS datatypes returned from `typeof` would be all lowercased, but... I just liked it this way so that's why I made the first letter uppercase.

This eliminates the need to do extra checking for integers, arrays and objects. E.g., instead of both array and object datatypes returning "object", `trueType` will return "Array" or "Object";

##### compareType: function(type1, type2)
This will return a boolean value from the comparison of 2 values.

If `type2` (the second argument) is "undefined" it will instead return an object with one property, which is a function. This function is named `equalsTypeOf`. It accepts one argument, which it assumes is `type2`. Calling this will compare `type1` of the outer function to `type2`. This is more about semantics here.

##### typeError: function(wantedType, value)
This is meant more for internal use for the error handling, but if you feel so inclined to use it... it's there!
It simply prints a message stating that `wantedType` (a string) was expected, but instead received value (the actual value, not datatype) of a type.

##### Object: function(value)
Returns `value` if it is an object. If it's not an object (as determined by `trueType`) it will log an error and return an empty object.

##### Array: function(value)
Returns `value` if it is an array. If it's not an array (as determined by `trueType`) it will log an error and return an empty array.

##### String: function(value)
Returns `value` if it is a string. If it's not an string (as determined by `trueType`) it will log an error and return an empty string.

##### Bool: function(value)
Returns `value` if it is an boolean. If it's not an boolean (as determined by `trueType`) it will log an error and return an empty boolean.

##### Func: function(value)
Returns `value` if it is a function. If it's not an function (as determined by `trueType`) it will log an error and return an empty function.

##### Int: function(value)
Returns `value` if it is a number. Float values are automatically rounded to the nearest whole number

##### Float: function(value[, fixedValue])
Returns `value` if it is a number. Although, due to the values you may provide, it may instead turn out to be an integir, the main purpose of `Float` is to put no limit on the number values that you provide, unlike `Int`.

`fixedValue` will return a number value rounded to the n'th place (n, of course, being `fixedValue`).

**Note: Neither `Int` or `Float` will throw an error for a number not being an integer of float. This lack of specificity is a limit of the JavaScript language. If you would like to check for these specific differences for numbers you may use the `trueType` function.**

***

Example usage:

``` js
var foo = shType({
  variableName: "foo"
}).String("bar")
console.log(foo); // bar
shType({
  variableName: "foo"
}).trueType(foo); // "String";
```
``` js
var foo = shType({
  variableName: "foo"
}, 0).String(false);// Error!
console.log(foo); // (empty string)
shType({
  variableName: "foo"
}).trueType(foo); "String";
```

***

#  Thanks for viewing! :)
##  Star this repo if you liked it
###  Checkout my links below

[Website](http://piecedigital.github.io/) | [Twitter](http://twitter.com/PieceDigital) | [Github](piecedigital.github.io) | [LinkedIn](linkedin.com/in/pdstudios)
