var path    = require("path");
var Sassaby = require("sassaby");

describe("BEM mixins", function() {

  var sassaby, mixin;
  beforeEach(function() {
    sassaby = new Sassaby(
      path.resolve("src/mixins", "_bem.scss"),
      {
        dependencies: [
          path.resolve("src/functions", "_str.scss"),
          path.resolve("src/functions", "_bem.scss")
        ],
        variables: {
          "__BEM-entities__": ["component", "component__el"],
          "__BEM-default-prefix__": "",
          "__BEM-element-sep__": "__",
          "__BEM-modifier-sep__": "_"
        }
      }
    );
    mixin = sassaby.standaloneMixin("block");
  }); 


  describe("block", function() {

    var calledWithPrefix;
    beforeEach(function() {
      calledWithPrefix = function(name) {
        return(
          mixin.calledWithBlockAndArgs("content: 'whatever';", name)
        );
      };
    });

    it("makes BEM block with given block prefix", function() {
      calledWithPrefix("block-name").createsSelector(".block-name");
    });
  }); 


  describe("element", function() {

    describe("inside BEM block", function() {
      it("makes BEM element", function() {
        mixin.calledWithBlockAndArgs(
          "@include element(elem) { content: 'whatever'; }", 
          "block-name"
        ).createsSelector(".block-name__elem");
      });
    }); 

    describe("inside BEM modifier which is inside BEM block", function() {
      it("makes BEM element in the given modifier context", function() { 
        mixin.calledWithBlockAndArgs(
          "@include modifier(mod) { @include element(elem) { content: 'whatever'; } }", 
          "block-name"
        ).createsSelector(".block-name_mod .block-name__elem");
      });
    }); 
  });


  describe("modifier", function() {

    describe("inside BEM block", function() {
      it("makes BEM modifier", function() {
        mixin.calledWithBlockAndArgs(
          "@include modifier(mod) { content: 'whatever'; }", 
          "block-name"
        ).createsSelector(".block-name_mod");
      });
    });

    describe("inside BEM element which is inside BEM block", function() {
      it("makes BEM modifier of the given element", function() { 
        mixin.calledWithBlockAndArgs(
          "@include element(elem) { @include modifier(mod) { content: 'whatever'; } }", 
          "block-name"
        ).createsSelector(".block-name__elem_mod");
      });
    });

    describe("with a single argument", function() {
      it("makes a boolean modifier", function() {
        mixin.calledWithBlockAndArgs(
          "@include modifier(mod) { content: 'whatever'; }",
          "block-name"
        ).createsSelector(".block-name_mod");
      });
    });

    describe("with 2 arguments", function() {
      it("makes a key-value type modifier", function() {
        mixin.calledWithBlockAndArgs(
          "@include modifier(mod, value) { content: 'whatever'; }",
          "block-name"
        ).createsSelector(".block-name_mod_value");
      });
    });
  }); 
}); 
