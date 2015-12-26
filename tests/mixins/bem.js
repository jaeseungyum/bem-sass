var path = require("path");
var Sassaby = require("sassaby");

describe("BEM mixins", function() {

  var sassaby;
  beforeEach(function() {
    sassaby = new Sassaby(path.resolve("lib/mixins", "_bem.scss"));
  }); 

  it("creates block level selector", function() {
    var block = sassaby.standaloneMixin("BLOCK"); 
    block.calledWithBlockAndArgs("color: red;", "block1").createsSelector(".b-block1");
    block.calledWithBlockAndArgs("color: red;", "block2").createsSelector(".b-block2");
  }); 

}); 
