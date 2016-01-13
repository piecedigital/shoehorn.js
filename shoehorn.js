var shType = function(variableName, lineNumber) {
  if(typeof variableName === "number") {
    lineNumber = variableName;
    variableName = undefined;
  } else
  if(typeof variableName !== "string") {
    variableName = undefined;
  };
  if(typeof lineNumber === "number") {
    lineNumber = parseInt(lineNumber);
  } else {
    lineNumber = undefined;
  };

  Array.isArray = Array.isArray || function(value) {
    if(typeof value === "object") {
      return (value.toString() === "[object Object]") ? false : true;
    }
  }

  return {
    help: function() {
      console.log("Thanks for using Shoehorn! For more information please visit the documentation at http://github.com/piecedigital/shoehorn.js. \r\n\r\nGetting started TL;DR:\r\n\r\n shType([variableName, lineNumber])[Object|Array|String|Bool|Func|Int|Float](value[, fixedValue])\r\n'fixedValye' in only applicable to datatype Float.\r\n\r\nHave fun! :)")
    },
    trueType: function(value) {
      // this function will return the true type of values and return a string with the first letter uppercased
      // e.g., an object will return "Object", and an array will return "Array"
      if(typeof value === "object") {
        return (Array.isArray(value)) ? "Array" : "Object"
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
      lineNumber = (lineNumber || typeof lineNumber === "number") ? lineNumber : (new Error("um")).stack.split("\n")[3].match(/\d*[:]\d*$/).shift();

      // create message variable. This will be the error message
      var message = "";
      // append starting message if variableName and lineNumber exist
      message += (variableName || lineNumber || typeof lineNumber === "number") ? "Check assignment" : "Unknown variable or line";
      // appends message for variableName
      message += (variableName) ? " for '" + variableName + "'" : "";
      // appends message for lineNumber
      message += (lineNumber || typeof lineNumber === "number") ? " at line " + lineNumber : "";

      // this message is for if value is "Undefined"
      var undefinedMsg = (value === "Undefined") ? "Please check that you are actually assigning a value or the expected value exists" : "";

      console.error("Invalid datatype. Expected type '" + wantedType + "'; instead got '" + value + "'." + ((message) ? " " + message + "." : "" ) + ((undefinedMsg) ? " " + undefinedMsg + "." : "" ));
    },
    Object: function(value) {
      if(typeof value === "object" && !Array.isArray(value)) {
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

if(typeof module === "object" && module.exports) {
 module.exports = shType;
};
if(typeof window !== "undefined") {
 window.shoehorn = shType;
 window.shType = shType;
};