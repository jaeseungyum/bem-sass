var path    = require("path");
var Sassaby = require("sassaby");

describe("scss-BEM-helpers", function() {
  var sassaby;
  beforeEach(function() {
    sassaby = new Sassaby(
      path.resolve("scss-BEM-helpers.scss")
    );
  }); 

  it("imports str functions", function() {
    sassaby.imports("lib/functions/str");
  });

  it("imports bem functions", function() {
    sassaby.imports("lib/functions/bem");
  }); 

  it("imports bem mixins", function() {
    sassaby.imports("lib/mixins/bem");
  });
});