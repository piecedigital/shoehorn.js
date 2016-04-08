var shType = function(optionsObject) {
  Array.isArray = Array.isArray || function(value) {
    if(typeof value === "object") {
      return (value.toString() === "[object Object]") ? false : true;
    }
  }

  // makes sure optionsObject is an object
  optionsObject = (typeof optionsObject === "object" && !Array.isArray(optionsObject)) ? optionsObject : {};

  // makes sure all of the variables in optionsObject are their correct datatypes
  optionsObject.variableName = optionsObject.variableName || undefined;
  if(typeof optionsObject.variableName !== "string") optionsObject.variableName = undefined;

  optionsObject.lineNumber = parseInt(optionsObject.lineNumber || undefined);
  if(typeof optionsObject.lineNumber !== "number" || isNaN(optionsObject.lineNumber)) optionsObject.lineNumber = undefined;

  optionsObject.fileName = optionsObject.fileName || undefined;
  if(typeof optionsObject.fileName !== "string") optionsObject.fileName = undefined;

  return {
    help: function() {
      console.log("Thanks for using Shoehorn! For more information please visit the documentation at http://github.com/piecedigital/shoehorn.js. \r\n\r\nGetting started TL;DR:\r\n\r\n shType({variableName: String, lineNumber: Int, fileName: String})[Object|Array|String|Bool|Func|Int|Float](value[, fixedValue])\r\n'fixedValye' in only applicable to datatype Float.\r\n\r\nHave fun! :)")
    },
    trueType: function(value) {
      // this function will return the true type of values and return a string with the first letter uppercased
      // e.g., an object will return "Object", and an array will return "Array"
      if(typeof value === "object") {
        return (Array.isArray(value)) ? "Array" : (value === null ? "Null" : "Object")
      } else
      if(typeof value === "number") {
        if(value.toString().match(/^\d{1,}\.\d{1,}$/)) {
          return "Float";
        }
        return "Int";
      } else {
        return (typeof value).replace(/^./, (typeof value)[0].toUpperCase());
      }
    },
    compareType: function(type1, type2) {
      var self = this;

      // if type2 exists
      if(typeof type2 !== "undefined")  {
        return (self.trueType(type1) === self.trueType(type2));
      } else {
        // if type2 doesn't exists, return this object
        // this object return is for semantic purposes
        return {
          equalsTypeOf: function(type2) {
            // when called this will return a boolean value of the comparison
            return (self.trueType(type1) === self.trueType(type2))
          }
        };
      }
    },
    typeError: function(wantedType, value) {
      value = this.trueType(value);

      // create message variable. This will be the error message
      var message = "";
      // append starting message if optionsObject.variableName and optionsObject.lineNumber exist
      message += (optionsObject.variableName || optionsObject.lineNumber || typeof optionsObject.lineNumber === "number") ? "Check assignment" : "Unknown variable";
      // appends message for optionsObject.variableName
      message += (optionsObject.variableName) ? " for '" + optionsObject.variableName + "'" : "";
      // appends message for optionsObject.lineNumber
      message += (optionsObject.lineNumber || typeof optionsObject.lineNumber === "number") ? " at line " + optionsObject.lineNumber : "";
      // appends message for optionsObject.fileName
      message += (optionsObject.fileName || typeof optionsObject.fileName === "number") ? " in file " + optionsObject.fileName : "";

      // this message is for if value is "Undefined"
      var undefinedMsg = (value === "Undefined") ? "Please check that you are actually assigning a value or the expected value exists" : "";

      var finalMsg = "Expected type '" + wantedType + "'; instead got '" + value + "'." + ((message) ? " " + message + "." : "" ) + ((undefinedMsg) ? " " + undefinedMsg + "." : "" );

      var error = (new TypeError(finalMsg)).stack;

      console.error(error);
    },
    Object: function(value) {
      if(typeof value === "object" && !Array.isArray(value) && value !== null) {
        return value;
      } else {
        this.typeError("Object", value);
        return {};
      }
    },
    Array: function(value) {
      if(typeof value === "object" && Array.isArray(value)) {
        return value;
      } else {
        this.typeError("Array", value);
        return [];
      }
    },
    String: function(value) {
      if(typeof value === "string") {
        return value;
      } else {
        this.typeError("String", value);
        return "";
      }
    },
    Bool: function(value) {
      if(typeof value === "boolean") {
        return value;
      } else {
        this.typeError("Boolean", value);
        return false;
      }
    },
    Func: function(value) {
      if(typeof value === "function") {
        return value;
      } else {
        this.typeError("Function", value);
        return new Function;
      }
    },
    Int: function (value) {
      if(typeof value === "number") {
        return Math.round(value);
      } else {
        this.typeError("Int", value);
        return 0;
      }
    },
    Float: function (value, fixedValue) {
      if(typeof value === "number") {
        return (fixedValue && typeof fixedValue === "number") ? parseFloat(value.toFixed(Math.round(fixedValue))) : value;
      } else {
        this.typeError("Float", value);
        return 0.00;
      }
    }
  }
};

if(typeof module !== "undefined" && typeof module === "object") {
 module.exports = shType;
};
if(typeof window !== "undefined" && typeof window === "object") {
 window.shoehorn = shType;
 window.shType = shType;
};
