var path    = require("path");
var Sassaby = require("sassaby");

describe("dist/_bem-sass.scss", function() {
  var sassaby;
  beforeEach(function() {
    sassaby = new Sassaby(
      path.resolve("dist/_bem-sass.scss")
    );
  }); 

  it("imports bundle", function() {
    sassaby.imports("./../src/bundle");
  }); 
});
