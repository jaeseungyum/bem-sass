var path    = require("path");
var Sassaby = require("sassaby");

describe("in BEM mixins", function() {

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

  describe("BLOCK mixin", function() {
    it("creates BEM block", function() {
      blockMixin.calledWithBlockAndArgs(
        "content: 'whatever';", 
        "block-name"
      ).createsSelector(".b-block-name");

      blockMixin.calledWithBlockAndArgs(
        "content: 'whatever';", 
        "another-block-name"
      ).createsSelector(".b-another-block-name");
    }); 
  });

  describe("ELEM mixin", function() {
    it("creates BEM element", function() {
      blockMixin.calledWithBlockAndArgs(
        "@include ELEM(elem) { content: 'whatever'; }", 
        "block-name"
      ).createsSelector(".b-block-name__elem");
    }); 
  }); 

  describe("MOD mixin", function() {
    it("creates BEM modifier(boolean) with single arg", function() {
      blockMixin.calledWithBlockAndArgs(
        "@include MOD(mod) { content: 'whatever'; }",
        "block-name"
      ).createsSelector(".b-block-name_mod");
    });

    it("creates BEM modifier(key-value) with 2 args", function() {
      blockMixin.calledWithBlockAndArgs(
        "@include MOD(mod, value) { content: 'whatever'; }",
        "block-name"
      ).createsSelector(".b-block-name_mod_value");
    });
  });

  describe("ELEM mixin in MOD mixin", function() {
    it("creates BEM element in the given MOD context", function() { 
      blockMixin.calledWithBlockAndArgs(
        "@include MOD(mod) { @include ELEM(elem) { content: 'whatever'; } }", 
        "block-name"
      ).createsSelector(".b-block-name_mod .b-block-name__elem");
    });
  });

  describe("MOD mixin in ELEM mixin", function() {
    it("creates BEM modifier of the given BEM element", function() { 
      blockMixin.calledWithBlockAndArgs(
        "@include ELEM(elem) { @include MOD(mod) { content: 'whatever'; } }", 
        "block-name"
      ).createsSelector(".b-block-name__elem_mod");
    }); 
  }); 
}); 
