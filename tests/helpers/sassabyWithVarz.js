var path    = require("path");
var Sassaby = require("sassaby");
var Object.assign = require("object-assign");

module.exports = function(varz) {

  var varMap = {
    "defaultPrefix": null, 
    "blockLevels": null,
    "elementSep": null,
    "modifierSep": null,
    "entitiesLog": null
  };

  return new Sassaby(
    path.resolve("src/mixins", "_bem.scss"),
    {
      dependencies: [
        path.resolve("src/_bundle.scss"),
        path.resolve("tests/fixtures/default.scss")
      ],
      variables: Object.assign(varMap, varz) 
    }
  );
};
