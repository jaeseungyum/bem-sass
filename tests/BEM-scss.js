var path    = require("path");
var Sassaby = require("sassaby");

describe("dist/_BEM-scss.scss", function() {
  var sassaby;
  beforeEach(function() {
    sassaby = new Sassaby(
      path.resolve("dist/_BEM-scss.scss")
    );
  }); 

  it("imports str functions", function() {
    sassaby.imports("src/functions/str");
  }); 

  it("imports bem functions", function() {
    sassaby.imports("src/functions/bem");
  }); 

  it("imports bem mixins", function() {
    sassaby.imports("src/mixins/bem");
  });
});
