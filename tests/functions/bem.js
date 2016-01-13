var path    = require("path");
var Sassaby = require("sassaby");

describe("BEM functions", function() {

  var sassaby;
  var sassabyWithVariables;
  beforeEach(function() {
    sassabyWithVariables = function(variables) {
      return new Sassaby(
        path.resolve("src/functions", "_is-a-bem.scss"),
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

  describe("#get-block", function() {

    var func;
    beforeEach(function() {
      func = sassaby.func("get-block");
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

  describe("#is-a-bem", function() {

    var func;
    beforeEach(function() {
      func = sassaby.func("is-a-bem");
    });

    it("tests whether a given selector is a BEM modifier or not", function() {

      func.calledWithArgs(
        "modifier",
        "unquote('.' + b-block)"
      ).isFalse();

      func.calledWithArgs(
        "modifier",
        "unquote('.' + b-block_mod)"
      ).isTrue();

      func.calledWithArgs(
        "modifier",
        "unquote('.' + b-block__elem)"
      ).isFalse();

      func.calledWithArgs(
        "element",
        "unquote('.' + b-block)"
      ).isFalse();

      func.calledWithArgs(
        "element",
        "unquote('.' + b-block__elem)"
      ).isTrue();
    });

  }); 

  describe("bem-sass-exists", function() {

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
