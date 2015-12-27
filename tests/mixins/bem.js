var path    = require("path");
var Sassaby = require("sassaby");

describe("BEM mixins", function() {

  var sassaby, mixin;
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
    mixin = sassaby.standaloneMixin("make-BEM-block");
  }); 

  describe("make-BEM-block", function() {

    var calledWithPrefix;
    beforeEach(function() {
      calledWithPrefix = function(name, prefix) {
        return(
          mixin.calledWithBlockAndArgs("content: 'whatever';", name, prefix)
        );
      };
    });

    it("makes BEM block with given block prefix", function() {
      calledWithPrefix("block-name", "b-").createsSelector(".b-block-name");
      calledWithPrefix("component-name", "c-").createsSelector(".c-component-name"); 
    });
  }); 

  describe("ELEM mixin", function() {
    it("creates BEM element", function() {
      mixin.calledWithBlockAndArgs(
        "@include ELEM(elem) { content: 'whatever'; }", 
        "block-name"
      ).createsSelector(".b-block-name__elem");
    }); 
  }); 

  describe("MOD mixin", function() {
    it("creates BEM modifier(boolean) with single arg", function() {
      mixin.calledWithBlockAndArgs(
        "@include MOD(mod) { content: 'whatever'; }",
        "block-name"
      ).createsSelector(".b-block-name_mod");
    });

    it("creates BEM modifier(key-value) with 2 args", function() {
      mixin.calledWithBlockAndArgs(
        "@include MOD(mod, value) { content: 'whatever'; }",
        "block-name"
      ).createsSelector(".b-block-name_mod_value");
    });
  });

  describe("ELEM mixin in MOD mixin", function() {
    it("creates BEM element in the given MOD context", function() { 
      mixin.calledWithBlockAndArgs(
        "@include MOD(mod) { @include ELEM(elem) { content: 'whatever'; } }", 
        "block-name"
      ).createsSelector(".b-block-name_mod .b-block-name__elem");
    });
  });

  describe("MOD mixin in ELEM mixin", function() {
    it("creates BEM modifier of the given BEM element", function() { 
      mixin.calledWithBlockAndArgs(
        "@include ELEM(elem) { @include MOD(mod) { content: 'whatever'; } }", 
        "block-name"
      ).createsSelector(".b-block-name__elem_mod");
    }); 
  }); 
}); 
