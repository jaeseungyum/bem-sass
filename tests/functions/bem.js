var path    = require("path");
var Sassaby = require("sassaby");

describe("BEM functions", function() {

  var sassaby;
  beforeEach(function() {
    sassaby = new Sassaby(
      path.resolve("lib/functions", "_bem.scss")
    );
  }); 

  describe("find-root-block", function() {

    var func;
    beforeEach(function() {
      func = sassaby.func("find-root-block");
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


  describe("is-modifier", function() {

    var func;
    beforeEach(function() {
      func = sassaby.func("is-modifier");
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


  describe("is-element", function() {

    var func;
    beforeEach(function() {
      func = sassaby.func("is-element");
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
