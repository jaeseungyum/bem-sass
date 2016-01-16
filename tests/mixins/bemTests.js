var path    = require("path");
var SassabyVarz = require(path.resolve("tests/helpers/", "sassabyWithVarz"));

describe("BEM mixins", function() {

  var sassaby;
  var blockMixin;

  describe("default style separators: __, _", function() {
    beforeEach(function() {
      sassaby = SassabyVarz(); 
      blockMixin = sassaby.standaloneMixin("block");
    }); 


    describe("block", function() {

      var calledWithPrefix;
      beforeEach(function() {
        calledWithPrefix = function(name) {
          return(
            blockMixin.calledWithBlockAndArgs("content: 'whatever';", name)
          );
        };
      });

      it("makes BEM block with given block prefix", function() {
        calledWithPrefix("block-name").createsSelector(".block-name");
      });
    }); 


    describe("element", function() {

      describe("inside BEM block", function() {
        it("makes BEM element", function() {
          blockMixin.calledWithBlockAndArgs(
            "@include element(elem) { content: 'whatever'; }", 
            "block-name"
          ).createsSelector(".block-name__elem");
        });
      }); 

      describe("inside BEM modifier which is inside BEM block", function() {
        it("makes BEM element in the given modifier context", function() { 
          blockMixin.calledWithBlockAndArgs(
            "@include modifier(mod) { @include element(elem) { content: 'whatever'; } }", 
            "block-name"
          ).createsSelector(".block-name_mod>.block-name__elem");
        });

        it("makes adjacent sibling BEM elements in the given modifier context", function() {
          blockMixin.calledWithBlockAndArgs(
            "@include modifier(mod) { @include element(elem) { @include adjacent-siblings { content: 'whatever';} } }", 
            "block-name"
          ).createsSelector(".block-name_mod>.block-name__elem+.block-name__elem"); 
        });
      }); 
    });


    describe("modifier", function() {

      describe("inside BEM block", function() {
        it("makes BEM modifier", function() {
          blockMixin.calledWithBlockAndArgs(
            "@include modifier(mod) { content: 'whatever'; }", 
            "block-name"
          ).createsSelector(".block-name_mod");
        });
      }); 

      describe("inside BEM element which is inside BEM block", function() {
        it("makes BEM modifier of the given element", function() { 
          blockMixin.calledWithBlockAndArgs(
            "@include element(elem) { @include modifier(mod) { content: 'whatever'; } }", 
            "block-name"
          ).createsSelector(".block-name__elem_mod");
        });
      });

      describe("with a single argument", function() {
        it("makes a boolean modifier", function() {
          blockMixin.calledWithBlockAndArgs(
            "@include modifier(mod) { content: 'whatever'; }",
            "block-name"
          ).createsSelector(".block-name_mod");
        });
      });

      describe("with 2 arguments", function() {
        it("makes a key-value type modifier", function() {
          blockMixin.calledWithBlockAndArgs(
            "@include modifier(mod, value) { content: 'whatever'; }",
            "block-name"
          ).createsSelector(".block-name_mod_value");
        });
      });
    }); 

    describe("with block prefix: *-", function() {
      beforeEach(function() {
        sassaby = SassabyVarz({
          "defaultPrefix": "o-", 
        }); 
        blockMixin = sassaby.standaloneMixin("block");
      });

      it("makes a block", function() {
        blockMixin.calledWithBlockAndArgs(
          "content: 'whatever';",
          "media"
        ).createsSelector(".o-media");
      });

      it("makes an element", function() { 
        blockMixin.calledWithBlockAndArgs(
          "@include element(item) { content: 'whatever';}",
          "media"
        ).createsSelector(".o-media__item");
      });

      it("makes a modifier", function() { 
        blockMixin.calledWithBlockAndArgs(
          "@include modifier(sub) { content: 'whatever';}",
          "media"
        ).createsSelector(".o-media_sub");

        blockMixin.calledWithBlockAndArgs(
          "@include modifier(type, article) { content: 'whatever';}",
          "media"
        ).createsSelector(".o-media_type_article");
      });

      it("makes a modifies element", function() { 
        blockMixin.calledWithBlockAndArgs(
          "@include modifier(sub) { @include element(item) { content: 'whatever'; }}",
          "media"
        ).createsSelector(".o-media_sub>.o-media__item");
      });
    });

    describe("with block prefix: *_", function() {
      beforeEach(function() {
        sassaby = SassabyVarz({
          "defaultPrefix": "b_", 
        }); 
        blockMixin = sassaby.standaloneMixin("block");
      }); 

      it("makes a block", function() {
        blockMixin.calledWithBlockAndArgs(
          "content: 'whatever';",
          "post"
        ).createsSelector(".b_post");
      });

      it("makes an element", function() { 
        blockMixin.calledWithBlockAndArgs(
          "@include element(item) { content: 'whatever';}",
          "post"
        ).createsSelector(".b_post__item");
      });
    });
  });

  describe("medium style separators: -,--", function() {
    beforeEach(function() {
      sassaby = SassabyVarz({
        "elementSep": "'-'",
        "modifierSep": "'--'"
      });
      blockMixin = sassaby.standaloneMixin("block");
    });

    it("makes a block", function() {
      blockMixin.calledWithBlockAndArgs(
        "content: 'whatever';",
        "post"
      ).createsSelector(".post");
    });

    it("makes an element", function() { 
      blockMixin.calledWithBlockAndArgs(
        "@include element(item) { content: 'whatever';}",
        "post"
      ).createsSelector(".post-item");
    });

    it("makes a modifier", function() { 
      blockMixin.calledWithBlockAndArgs(
        "@include modifier(sub) { content: 'whatever';}",
        "post"
      ).createsSelector(".post--sub");

      blockMixin.calledWithBlockAndArgs(
        "@include modifier(type, article) { content: 'whatever';}",
        "post"
      ).createsSelector(".post--type--article");
    });

    it("makes a modifies element", function() { 
      blockMixin.calledWithBlockAndArgs(
        "@include modifier(sub) { @include element(item) { content: 'whatever'; }}",
        "post"
      ).createsSelector(".post--sub>.post-item");
    });

    describe("with block prefix: *-", function() {
      beforeEach(function() {
        sassaby = SassabyVarz({
          "defaultPrefix": "b-", 
          "elementSep": "'-'",
          "modifierSep": "'--'"
        });
        blockMixin = sassaby.standaloneMixin("block");
      });

      it("makes a block", function() {
        blockMixin.calledWithBlockAndArgs(
          "content: 'whatever';",
          "post"
        ).createsSelector(".b-post");
      });

      it("makes an element", function() { 
        blockMixin.calledWithBlockAndArgs(
          "@include element(item) { content: 'whatever';}",
          "post"
        ).createsSelector(".b-post-item");
      });
    });

  });
}); 
