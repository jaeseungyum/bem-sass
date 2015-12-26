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

  describe("#BLOCK", function() {
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
  });

  describe("#ELEM", function() {
    it("creates element level selector", function() {
      blockMixin.calledWithBlockAndArgs(
        "@include ELEM(elem) { color: red; }", 
        "block-name"
      ).createsSelector(".b-block-name__elem");
    }); 
  }); 

  describe("#MOD", function() {
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

  describe("#ELEM in #MOD", function() {
    it("creates element level selector inside modifier", function() { 
      blockMixin.calledWithBlockAndArgs(
        "@include MOD(mod) { @include ELEM(elem) { color: red; } }", 
        "block-name"
      ).createsSelector(".b-block-name_mod .b-block-name__elem");
    });
  });

  describe("#MOD in #ELEM", function() {
    it("creates modifier of element level selector", function() { 
      blockMixin.calledWithBlockAndArgs(
        "@include ELEM(elem) { @include MOD(mod) { color: red; } }", 
        "block-name"
      ).createsSelector(".b-block-name__elem_mod");
    }); 
  }); 
}); 
