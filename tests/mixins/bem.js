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
          "__BEM-element-sep__": "__",
          "__BEM-modifier-sep__": "_"
        }
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


  describe("make-BEM-element", function() {

    describe("inside BEM block", function() {
      it("makes BEM element", function() {
        mixin.calledWithBlockAndArgs(
          "@include make-BEM-element(elem) { content: 'whatever'; }", 
          "block-name"
        ).createsSelector(".b-block-name__elem");
      });
    });

    describe("inside BEM modifier which is inside BEM block", function() {
      it("makes BEM element in the given modifier context", function() { 
        mixin.calledWithBlockAndArgs(
          "@include make-BEM-modifier(mod) { @include make-BEM-element(elem) { content: 'whatever'; } }", 
          "block-name"
        ).createsSelector(".b-block-name_mod .b-block-name__elem");
      });
    });

    describe("ouside BEM block", function() {
      xit("throws an error", function() {
      });
    }); 

  });


  describe("make-BEM-modifier", function() {

    describe("inside BEM block", function() {
      it("makes BEM modifier", function() {
        mixin.calledWithBlockAndArgs(
          "@include make-BEM-modifier(mod) { content: 'whatever'; }", 
          "block-name"
        ).createsSelector(".b-block-name_mod");
      });
    });

    describe("inside BEM element which is inside BEM block", function() {
      it("makes BEM modifier of the given element", function() { 
        mixin.calledWithBlockAndArgs(
          "@include make-BEM-element(elem) { @include make-BEM-modifier(mod) { content: 'whatever'; } }", 
          "block-name"
        ).createsSelector(".b-block-name__elem_mod");
      });
    });

    describe("with a single argument", function() {
      it("makes a boolean modifier", function() {
        mixin.calledWithBlockAndArgs(
          "@include make-BEM-modifier(mod) { content: 'whatever'; }",
          "block-name"
        ).createsSelector(".b-block-name_mod");
      });
    });

    describe("with 2 arguments", function() {
      it("makes a key-value type modifier", function() {
        mixin.calledWithBlockAndArgs(
          "@include make-BEM-modifier(mod, value) { content: 'whatever'; }",
          "block-name"
        ).createsSelector(".b-block-name_mod_value");
      });
    });
  }); 
}); 
