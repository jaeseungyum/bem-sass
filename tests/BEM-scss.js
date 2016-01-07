var path    = require("path");
var Sassaby = require("sassaby");

describe("dist/_bem.scss", function() {
  var sassaby;
  beforeEach(function() {
    sassaby = new Sassaby(
      path.resolve("dist/_bem.scss")
    );
  }); 

  it("imports str functions", function() {
    sassaby.imports("./../src/functions/str");
  }); 

  it("imports bem functions", function() {
    sassaby.imports("./../src/functions/bem");
  }); 

  it("imports bem mixins", function() {
    sassaby.imports("./../src/mixins/bem");
  });
});
