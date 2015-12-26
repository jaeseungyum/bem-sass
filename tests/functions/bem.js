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
      func.calledWithArgs("b-block_elem").equals("b-block");
      func.calledWithArgs("b-block").equals("b-block");
    }); 
  }); 
}); 

