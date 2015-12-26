var path    = require("path");
var Sassaby = require("sassaby");

describe("BEM mixins", function() {

  var sassaby, blockMixin;
  beforeEach(function() {
    sassaby = new Sassaby(
      path.resolve("lib/mixins", "_bem.scss"),
      {
        dependencies: [
          path.resolve("lib/functions", "_str.scss"),
          path.resolve("lib/functions", "_bem.scss")
        ]
      }
    );
    blockMixin   = sassaby.standaloneMixin("BLOCK"); 
  }); 

  it("creates block level selector", function() {
    blockMixin.calledWithBlockAndArgs(
      "color: red;", 
      "block-name"
    ).createsSelector(".b-block-name");

    blockMixin.calledWithBlockAndArgs(
      "color: red;", 
      "another-block-name"
    ).createsSelector(".b-another-block-name");
  }); 


  it("creates element level selector", function() {
    blockMixin.calledWithBlockAndArgs(
      "@include ELEM(elem) { color: red; }", 
      "block-name"
    ).createsSelector(".b-block-name__elem");
  }); 

}); 
