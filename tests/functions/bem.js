var path    = require("path");
var Sassaby = require("sassaby");

describe("BEM functions", function() {

  var sassaby;
  beforeEach(function() {
    sassaby = new Sassaby(
      path.resolve("lib/functions", "_bem.scss"),
      {
        dependencies: [
          path.resolve("lib/functions", "_str.scss")
        ]
      }
    );
  }); 

  describe("#find-root-block", function() {

    var func;
    beforeEach(function() {
      func = sassaby.func("find-root-block");
    });

    it("returns block level selector from given selector string", function() {

      func.calledWithArgs(
        "unquote('.' + b-block_mod)"
      ).equals(".b-block");

      func.calledWithArgs(
        "unquote('.' + b-block)"
      ).equals(".b-block");
    }); 
  }); 
}); 

