var path    = require("path");
var Sassaby = require("sassaby");

describe("BEM mixins", function() {

  var sassaby, blockMixin, elementMixin;
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
    elementMixin = sassaby.standaloneMixin("ELEM"); 
  }); 

  it("creates block", function() {
    blockMixin.calledWithBlockAndArgs(
      "color: red;", 
      "block-name"
    ).createsSelector(".b-block-name");

    blockMixin.calledWithBlockAndArgs(
      "color: red;", 
      "another-block-name"
    ).createsSelector(".b-another-block-name");
  }); 


  it("creates element", function() {
    blockMixin.calledWithBlockAndArgs(
      "@include ELEM(elem) { color: red; }", 
      "block-name"
    ).createsSelector(".b-block-name__elem");
  }); 

  it("creates element inside modifier", function() {
    console.log(
      blockMixin.calledWithBlockAndArgs(
        "@include ELEM(elem) { @include ELEM(elem2) { color: red; } }", 
        "block-name"
      ).ast.stylesheet.rules
    );

    blockMixin.calledWithBlockAndArgs(
      "@include MOD(elem) { @include ELEM(elem2) { color: red; } }", 
      "block-name"
    ).createsSelector(".b-block-name_mod .b-block-name__elem");
  });

  it("creates modifier", function() {
    blockMixin.calledWithBlockAndArgs(
      "@include MOD(mod) { color: red; }",
      "block-name"
    ).createsSelector(".b-block-name_mod");
  });

}); 
