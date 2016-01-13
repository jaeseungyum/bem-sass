var path    = require("path");
var Sassaby = require("sassaby");

describe("Custom utils functions", function() {

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
      "elementSep": null,
      "modifierSep": null
    }); 
  }); 

  describe("str-match", function() {
    it("returns matched string if there is a matched string", function() {
      sassaby.func("str-match").calledWithArgs(
        "block__element",
        "__"
      ).equals("__"); 

      sassaby.func("str-match").calledWithArgs(
        "block__element_modifier",
        "_"
      ).equals("_"); 
    });

    it("returns null if there is no matched string", function() {

      sassaby.func("str-match").calledWithArgs(
        "block__element",
        "_"
      ).isFalsy();

      sassaby.func("str-match").calledWithArgs(
        "block-element",
        "__"
      ).isFalsy();
    });
  });
});

