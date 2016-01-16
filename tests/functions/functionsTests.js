var path        = require("path");
var SassabyVarz = require(path.resolve("tests/helpers/", "sassabyWithVarz"));

describe("BEM functions", function() {

  var sassaby;
  var sassabyWithVarz;
  beforeEach(function() { 
    sassaby = SassabyVarz({
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
      sassaby = SassabyVarz({
        entitiesLog: ["block", "block__elem"]
      });
      func = sassaby.func("bem-sass-exists");
    });

    it("tests whether a given BEM entity is already declared or not", function() { 
      func.calledWithArgs("entities-log", "block").isTrue(); 
      func.calledWithArgs("entities-log", "block__elem").isTrue(); 
      func.calledWithArgs("entities-log", "block_mod").isFalse(); 
    });
  }); 
}); 
