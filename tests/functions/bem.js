var path    = require("path");
var Sassaby = require("sassaby");

describe("BEM functions", function() {

  var sassaby;
  var sassabyWithVariables;
  beforeEach(function() {
    sassabyWithVariables = function(variables) {
      return new Sassaby(
        path.resolve("src/functions", "_bem.scss"),
        {
          dependencies: [
            path.resolve("src/functions", "_str.scss")
          ],
          variables: variables
        }
      );
    };

    sassaby = sassabyWithVariables({
      "__BEM-element-sep__": "__",
      "__BEM-modifier-sep__": "_"
    });

  }); 

  describe("get-BEM-element-sep", function() {
    it("returns BEM element separator from settings", function() { 
      sassaby = sassabyWithVariables({
        "__BEM-element-sep__": "__"
      });
      sassaby.func("get-BEM-element-sep").calledWithArgs(null).equals("__");

      sassaby = sassabyWithVariables({
        "__BEM-element-sep__": "___"
      });
      sassaby.func("get-BEM-element-sep").calledWithArgs(null).equals("___");
    }); 
  });

  describe("get-BEM-modifier-sep", function() {
    it("returns BEM modifier separator from settings", function() { 
      sassaby = sassabyWithVariables({
        "__BEM-modifier-sep__": "_"
      });
      sassaby.func("get-BEM-modifier-sep").calledWithArgs(null).equals("_");

      sassaby = sassabyWithVariables({
        "__BEM-modifier-sep__": "__"
      });

      sassaby.func("get-BEM-modifier-sep").calledWithArgs(null).equals("__");
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


  describe("is-BEM-modifier", function() {

    var func;
    beforeEach(function() {
      func = sassaby.func("is-BEM-modifier");
    });

    it("tests whether a given selector is a BEM modifier or not", function() {

      func.calledWithArgs(
        "unquote('.' + b-block)"
      ).isFalse();

      func.calledWithArgs(
        "unquote('.' + b-block_mod)"
      ).isTrue();

      /*func.calledWithArgs(*/
      /*"unquote('.' + b-block__elem)"*/
      /*).isFalse();*/
    });

  });


  describe("is-BEM-element", function() {

    var func;
    beforeEach(function() {
      func = sassaby.func("is-BEM-element");
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
}); 
