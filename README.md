# bem-sass 
![Bower version](https://img.shields.io/bower/v/bem-sass.svg) 
[![npm version](https://img.shields.io/npm/v/bem-sass.svg)](https://www.npmjs.com/package/bem-sass) 
![Build Status](https://img.shields.io/circleci/project/jsng/bem-sass.svg)


`bem-sass` is a Sass library for organizing css objects. It helps you apply BEM methodology to write your own CSS with no compatibility issues with both RubySass(>= 3.4) and LibSass(>=3.3), and provides more flexible namespacing configurations.

`bem-sass` is heavily inspired by [Immutable CSS](http://csswizardry.com/2015/03/immutable-css/), and [ITCSS](http://itcss.io/) as well as the original BEM concept. Immutable CSS describes that CSS objects you created should never be reassigned throughout your project.
ITCSS provides a good approach to manage CSS specificity issues that can happen even if you take advantages of BEM. These concepts will help you build more robust, secure css codebase at scale.

## Quick Start
+ Install with [Bower](http://bower.io): ```bower install --save-dev bem-sass```
+ Install with [npm](https://www.npmjs.com): ```npm install -save-dev bem-sass```

## Basic Usages
Once you import bem-sass to your project, you can simply build your own css object like below:

```scss

// Menu block

@include block(menu) {
  /*...the menu block styles are here...*/

  @include element(item) {
    /*...the menu item styles are here...*/
  }
  
  @include modifier(horizontal) {
    /*...the horizontal menu styles are here...*/
  }
}
```

When compiled:
```css
.menu {
  /*...the menu block styles are here...*/
}

.menu__item {
  /*...the menu item styles are here...*/
}

.menu_horizontal {
  /*...the horizontal menu styles are here...*/
}
```

## Extended Details
### Boolean Modifier & Key-Value Modifier
bem-sass supports key-value modifiers. When using `modifier`, passing a single argument generates a boolean modifier, whereas passing 2 arguments generates a key-value modifier.
```scss
// @see https://en.bem.info/method/naming-convention/#block-modifier

@include block(menu) {
  
  /* Boolean modifier */
  @include modifier(hidden) {
    /*...the hidden menu styles are here...*/
  }
  
  /* key-value modifiers */
  @include modifier(theme, morning-forest) {
    /*...the morning-forest themed menu styles are here...*/
  }
  
  @include modifier(theme, stormy-sky) {
    /*...the stormy-sky themed menu styles are here...*/
  }
}
```
```css
/* Boolean modifier */
.menu_hidden {
  /*...the hidden menu styles are here...*/
}

/* key-value modifiers */
.menu_theme_morning-forest {
  /*...the morning-forest themed menu styles are here...*/
}

.menu_theme_stormy-sky {
  /*...the stormy-sky themed menu styles are here...*/
}
```

### Element Modifier

Elements could also get modified by their own modifiers.
```scss
// @see https://en.bem.info/method/naming-convention/#element-modifier

@include block(menu) {
  @include element(item) {
    /* Boolean modifier */
    @include modifier(visible) {
      /*...the visible menu item styles are here...*/
    }
    
    /* key-value modifier */
    @include modifier(type, radio) {
      /*...the radio type menu item styles are here...*/
    }
  }
}
```
```css
/* Boolean modifier */
.menu__item_visible {
  /*...the visible menu item styles are here...*/
}

/* key-value modifier */
.menu__item_type_radio {
  /*...the radio type menu item styles are here...*/
}
```
### Using Cascades in BEM
```scss
// @see https://en.bem.info/method/solved-problems/#using-cascades-in-bem

/* Nav block */
@include block(nav) {
  /*...the default nav styles are here...*/
  
  @include element(item) {
    /*...the default nav item styles are here...*/
  }
  
  @include modifier(theme, islands) {
    /*...the islands themed nav styles are here...*/
   
    @include element(item) {
      /*...the islands themed nav item styles are here...*/
    }
  }
}
```

When compiled:
```css
/* Nav block */
.nav {
  /*...the default nav styles are here...*/
}

.nav__item {
  /*...the default nav item styles are here...*/
}

.nav_theme_islands {
  /*...the islands themed nav styles are here...*/
}

.nav_theme_islands > .b-nav__item {
  /*...the islands themed nav item styles are here...*/
}
```

### Adjacent Sibling Elements in a Modifier
Given that you want to add a top line to each item of a modified nav block except the first item. With `&` provided by the original Sass, you cannot achieve this requirement. In that kind of circumstance, you can use `adjacent-siblings` mixin.

```scss
@include block(nav) {

  @include modifier(secondary) {

    @include element(item) {

      // Using & + & produces `.nav_secondary .nav__item + .nav_secondary .nav__item` which we do not expect.
      // Use `adjacent-siblings` here.

      @include adjacent-siblings {
        border-top: 1px solid rgb(0, 0, 0);
      }
    }
  }
}
```
When compiled: 
```css
.nav_secondary > .nav__item + .nav__item {
  border-top: 1px solid rgb(0, 0, 0);
}
```

### Shared CSS Rules Between Elements
Given that `nav__item` and `nav__link` have common css rules. Since bem-sass enforces immutability on every BEM entity, it seems that the only way to avoid an inevitable code duplication is using Sass placeholder and `@extend`.

```scss
@include block(nav) { 

  %shared-rules {
    display: inline-block;
    height: 100%;
  }

  @include element(item) {
    @extend %shared-rules;
  }

  @include element(link) {
    @extend %shared-rules;
  }
}
```

But when compiled, this produces unexpected nested selectors like below:
```css
.nav .nav__item,
.nav .nav__link {
  display: inline-block;
  height: 100%;
}
```

To avoid this, bem-sass provides `def-shared-rules` and `shared-rules`.
```scss
@include block(nav) {

  @include def-shared-rules("items") {
    display: inline-block;
    height: 100%;
  }

  @include element(item) {
    @include shared-rules("items");
  }

  @include element(link) {
    @include shared-rules("items");
  }
}
```
```css
.nav__item,
.nav__link {
  display: inline-block;
  height: 100%;
}
```
Note that `def-shared-rules` and `shared-rules` should be inside of a block.


## Custom Configurations
You can configure bem-sass options by `configure-bem-sass` mixin. Using this mixin is optional. If there have been no custom configurations, the default options are exactly the same as below:
```scss
@include configure-bem-sass ((
  default-prefix: "",
  block-levels: (),
  element-sep: "__",
  modifier-sep: "_"
));
```

#### ```default-prefix```
Set the default prefix for `block` mixin.
```scss
@include configure-bem-sass((
  default-prefix: "b-" // Set default block prefix to "b-"
));

/* Menu block */
@include block(menu) {
  /*...styles are here...*/
  
  @include element(item) {
    /*...styles are here...*/
  }
}
```

When compiled:
```css
/* Menu block */
.b-menu {
  /*...styles here...*/
}

.b-menu__item {
  /*...styles here...*/
}
```

#### ```block-levels```
Sometimes you may need to define several block types to organize your css object structure especially when you are considering a methodology like [ITCSS](https://speakerdeck.com/dafed/managing-css-projects-with-itcss). You can define your own several block levels by adding `block type: prefix` pair to `block-levels` map.

```scss
@include configure-bem-sass((
  block-levels: (
    object:    "o-",  
    component: "c-"
  )
));

/* Media object */
@include block(media, "object") {
  /*...styles are here...*/
}

/* Menu component */
@include block(menu, "component") {
  /*...styles are here...*/
}
```

When compiled:
```css
/* Media object */
.o-media {
  /*...styles are here...*/
}

/* Menu component */
.c-menu {
  /*...styles are here...*/
}
```

Note that the order of the block level is important. For example, the following will cause an error:

```scss
/* Menu component */  
@include block(menu, "component") { //  <--- BAD: Component is head of Object
  /*...styles are here...*/
}

/* Media object */
@include block(media, "object") {
  /*...styles are here...*/
}
```
```
Error: the `object` media should not be behind of of any `components`s. Your block levels are: object, component
```

#### ```element-sep```, ```modifier-sep```
You can set your own BEM element/modifier separators.

```scss
@include configure-bem-sass((
  // Set separators like Medium.com
  element-sep: "-",
  modifier-sep: "--"
));

/* Promo block */
@include block(promo) {
  /*...styles are here...*/
  
  @include element(title) {
    /*...styles are here...*/
  }
  
  @include modifier(hero) {
    /*...styles are here...*/
  }
}
```

When compiled:
```css
/* Promo block */
.promo {
  /*...styles are here...*/
}
.promo-title {
  /*...styles are here...*/
}
.promo--hero {
  /*...styles are here...*/
}
```

## Caveats

### Element and Modifier Cannot Be Used Stand-Alone
An element(or a modifier) is a part of a block. It has no standalone meaning without it's parent block.
```scss
// @see https://en.bem.info/method/key-concepts/#element
@include element(item) {
  /*...CSS declarations here...*/
}

// @see https://en.bem.info/faq/#how-do-i-make-global-modifiers-for-blocks
@include modifier(theme, islands) {
  /*...CSS declarations here...*/
}
```

When compiled:
```
Error: element should be inside of a block
Error: modifier should be inside of a block
```

### Avoid Elements Within Elements
The existence of elements of elements is an antipattern because it hinders the ability to change the internal structure of the block. bem-sass prevents you from creating those kind of invalid elements.

```scss
// @see https://en.bem.info/faq/#why-does-bem-not-recommend-using-elements-within-elements-block__elem1__elem2
@include block(nav) {
  @include element(item) {
    // Attempt to make elements of elements: BAD
    @include element(link) {
    }
  }
}
```
```
Error: element should not be within another element
```

### Keep BEM Entities Immutable
bem-sass ensures that every BEM entity you create is immutable. It prevents you from reassigning css classes which in turn produces side effects.

```scss
// Nav block
@include block(nav) {
  /*...CSS declarations here...*/ 

  @include element(item) {
    /*...CSS declarations here...*/ 
  }

  // Attempt to reassign the nav item styles: BAD
  @include element(item) {
    /*...CSS declarations here...*/ 
  }
}

// Attempt to reassign the nav block styles: BAD
@include block(nav) {
  /*...CSS declarations here...*/ 
}
```
```
Error: in `element': Attempt to reassign `.nav__item` 
Error: in `block': Attempt to reassign `.nav`
```


## See Also
+ https://en.bem.info/
+ https://css-tricks.com/snippets/sass/bem-mixins/
+ http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
+ https://speakerdeck.com/dafed/managing-css-projects-with-itcss
