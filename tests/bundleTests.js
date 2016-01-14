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
    sassaby.imports("./functions/selector-to-string");
    sassaby.imports("./functions/bem-sass");
    sassaby.imports("./functions/is-a-bem");
    sassaby.imports("./functions/get-block");
    sassaby.imports("./functions/create-selector");
    sassaby.imports("./mixins/bem");
  }); 
});

