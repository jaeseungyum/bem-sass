var path    = require("path");
var Sassaby = require("sassaby");

describe("BEM functions", function() {

  var sassaby;
  var sassabyWithVariables;
  beforeEach(function() {
    sassabyWithVariables = function(variables) {
      return new Sassaby(
        path.resolve("lib/functions", "_bem.scss"),
        {
          dependencies: [
            path.resolve("lib/functions", "_str.scss")
          ],
          variables: variables
        }
      );
    };

    sassaby = sassabyWithVariables({});

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


  describe("is-BEM-mod", function() {

    var func;
    beforeEach(function() {
      func = sassaby.func("is-BEM-mod");
    });

    it("tests whether a given selector is a BEM modifier or not", function() {

      func.calledWithArgs(
        "unquote('.' + b-block)"
      ).isFalse();

      func.calledWithArgs(
        "unquote('.' + b-block_mod)"
      ).isTrue();
    });

  });


  describe("is-BEM-elem", function() {

    var func;
    beforeEach(function() {
      func = sassaby.func("is-BEM-elem");
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
