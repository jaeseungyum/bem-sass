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
    blockMixin.calledWithBlockAndArgs(
      "@include MOD(mod) { @include ELEM(elem) { color: red; } }", 
      "block-name"
    ).createsSelector(".b-block-name_mod .b-block-name__elem");
  });

  it("creates modifier of element", function() { 
    blockMixin.calledWithBlockAndArgs(
      "@include ELEM(elem) { @include MOD(mod) { color: red; } }", 
      "block-name"
    ).createsSelector(".b-block-name__elem_mod");
  });

  it("creates boolean modifier", function() {
    blockMixin.calledWithBlockAndArgs(
      "@include MOD(mod) { color: red; }",
      "block-name"
    ).createsSelector(".b-block-name_mod");
  });

  it("creates key-value modifier", function() {
    blockMixin.calledWithBlockAndArgs(
      "@include MOD(mod, value) { color: red; }",
      "block-name"
    ).createsSelector(".b-block-name_mod_value");
  });

}); 
