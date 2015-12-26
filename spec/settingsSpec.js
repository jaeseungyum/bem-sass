var path = require("path");
var Sassaby = require("sassaby");

describe("_settings.scss", function() {
  "use strict"; 

  var sassaby;

  beforeEach(function() {
    sassaby = new Sassaby(path.resolve("lib", "_settings.scss")); 
  });

  xit("is true", function() {
    expect(sassaby.variables).toBe(null);
  });
});
