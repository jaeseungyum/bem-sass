var path    = require("path");
var Sassaby = require("sassaby");

describe("BEM functions", function() {

  var sassaby;
  var sassabyWithVariables;
  beforeEach(function() {
    sassabyWithVariables = function(variables) {
      return new Sassaby(
        path.resolve("src/functions", "_bem-constructor.scss"),
        {
          dependencies: [
            path.resolve("src/_bundle.scss"),
            path.resolve("tests/fixtures/default.scss")
          ],
          variables: variables
        }
      );
    }; 

    sassaby = sassabyWithVariables({
      "defaultPrefix": null, 
      "blockTypes": null,
      "elementSep": "__",
      "modifierSep": "_"
    }); 
  }); 

  describe("get-BEM-element-sep", function() {

    it("returns BEM element separator from settings", function() { 
      sassaby.func("get-BEM-element-sep").calledWithArgs(null).equals("__"); 
    });

    describe("with element separator ___", function() {
      beforeEach(function() {
        sassaby = sassabyWithVariables({
          "defaultPrefix": null, 
          "blockTypes": null,
          "elementSep": "___",
          "modifierSep": "_"
        });
      });

      it("returns BEM element separator from settings", function() { 
        sassaby.func("get-BEM-element-sep").calledWithArgs(null).equals("___");
      }); 
    });
  });

  describe("get-BEM-modifier-sep", function() {
    it("returns BEM modifier separator from settings", function() { 
      sassaby.func("get-BEM-modifier-sep").calledWithArgs(null).equals("_");
    }); 

    describe("with modifier separator __", function() {
      beforeEach(function() {
        sassaby = sassabyWithVariables({
          "defaultPrefix": null, 
          "blockTypes": null,
          "elementSep": "_",
          "modifierSep": "__"
        });
      });
      it("returns BEM modifier separator from settings", function() { 
        sassaby.func("get-BEM-modifier-sep").calledWithArgs(null).equals("__");
      }); 
    });

  });


  describe("get-BEM-block", function() {

    var func;
    beforeEach(function() {
      func = sassaby.func("get-BEM-block");
    });

    it("extracts BEM block selector from given selector string", function() {

      func.calledWithArgs(
        "unquote('.' + b-block_mod)" // given .b-block_mod
      ).equals(".b-block");

      func.calledWithArgs(
        "unquote('.' + b-block)" // given .b-block
      ).equals(".b-block");
    }); 
  }); 


  describe("#is-a-modifier", function() {

    var func;
    beforeEach(function() {
      func = sassaby.func("is-a-modifier");
    });

    it("tests whether a given selector is a BEM modifier or not", function() {

      func.calledWithArgs(
        "unquote('.' + b-block)"
      ).isFalse();

      func.calledWithArgs(
        "unquote('.' + b-block_mod)"
      ).isTrue();

      func.calledWithArgs(
        "unquote('.' + b-block__elem)"
      ).isFalse();
    });

  });


  describe("is-an-element", function() {

    var func;
    beforeEach(function() {
      func = sassaby.func("is-an-element");
    });

    it("tests whether a given selector is a BEM element or not", function() {

      func.calledWithArgs(
        "unquote('.' + b-block)"
      ).isFalse();

      func.calledWithArgs(
        "unquote('.' + b-block__elem)"
      ).isTrue();
    });
  }); 

  describe("BEM-entity-exists", function() {

    var func;
    beforeEach(function() {
      func = sassaby.func("bem-sass-exists");
    });

    it("tests whether a given BEM entity is already declared or not", function() { 
      func.calledWithArgs("entities", "block").isTrue(); 
      func.calledWithArgs("entities", "block__elem").isTrue(); 
      func.calledWithArgs("entities", "block_mod").isFalse(); 
    });
  }); 
}); 
