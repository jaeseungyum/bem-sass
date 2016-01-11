var path    = require("path");
var Sassaby = require("sassaby");

describe("src/_bundle.scss", function() {
  var sassaby;
  beforeEach(function() {
    sassaby = new Sassaby(
      path.resolve("src/_bundle.scss")
    );
  }); 

  it("imports dependencies", function() {
    sassaby.imports("./functions/utils");
    sassaby.imports("./functions/bem-sass");
    sassaby.imports("./functions/bem-config");
    sassaby.imports("./functions/bem-constructor");
    sassaby.imports("./mixins/bem");
  }); 
});

