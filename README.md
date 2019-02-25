# bem-sass 
![Bower version](https://img.shields.io/bower/v/bem-sass.svg) 
[![npm version](https://img.shields.io/npm/v/bem-sass.svg)](https://www.npmjs.com/package/bem-sass) 
![Build Status](https://img.shields.io/circleci/project/jsng/bem-sass.svg)


BemSass is a Sass library that helps you organize your CSS codes. This library allows you to take advantage of BEM architecture, as you write your own CSS code without any compatibility issues with both RubySass(>= 3.4) and LibSass(>=3.3).

`bem-sass` is heavily inspired by [Immutable CSS](http://csswizardry.com/2015/03/immutable-css/) and [ITCSS](http://itcss.io/) as well as the original BEM methodology. It is a pure Sass implementation of these concepts.

## Quick Start
+ Install with [Bower](http://bower.io): ```bower install bem-sass --save-dev```
+ Install with [npm](https://www.npmjs.com): ```npm install bem-sass --save-dev```

## Basic Usage
Once you import BemSass to your project, you can simply write your own CSS code like below:

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

When you compile the code above, the output will be like below.
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


## Configurations
You can modify the default settings with `configure-bem-sass` mixin.  This mixin is optional to use. If there is no custom configuration, the default settings will be exactly the same as below:
```scss
@include configure-bem-sass ((
  default-prefix: "",
  block-levels: (),
  element-sep: "__",
  modifier-sep: "_"
));
```

#### Default Prefix
You can set your own prefix for block definition by putting a string into the `default-prefix` key.

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

The compiled output will be like below:
```css
/* Menu block */
.b-menu {
  /*...styles here...*/
}

.b-menu__item {
  /*...styles here...*/
}
```

#### The Block Levels
Using a methodology such as [ITCSS](https://speakerdeck.com/dafed/managing-css-projects-with-itcss) calls for the capability to define several block types to organize the different block levels. You can define your own block level by adding a valid key-value to the “block-levels” option in configurations.

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

The compiled output will be like below:
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


#### Modifying Seperators
You can modify the symbol for the element and the modifier separator respectively by modifying `element-sep`` and `modifier-sep`

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

When compiled, the output will be:
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

## Extended Details
### Boolean Modifier & Key-Value Modifier
BemSass supports key-value modifiers. When using a modifier, you can pass a single argument to generate a boolean modifier, whereas passing 2 arguments generates a key-value modifier.

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
You can also modify elements by their own modifiers.

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
Let’s say that you want to add a top line to each of your list items except to the very first item. It won’t work with `&` provided by the original Sass. In that situation, you can use `adjacent-siblings` mixin to get around.

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
When compiled, the output will be like below: 
```css
.nav_secondary > .nav__item + .nav__item {
  border-top: 1px solid rgb(0, 0, 0);
}
```

### Shared CSS Rules Between Elements
Let’s say that two elements have common CSS rules to share. The only way to avoid an unnecessary code duplication seems to be to use the Sass placeholder and @extend in that BemSass enforces immutability on every BEM entity.

```scss
@include block(nav) { 

  %shared-rules { // <--- BAD: A placeholder inside block produces undesirable nested selectors
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

But when you compile it, It won’t work as you expected it to be.
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
Note that `def-shared-rules` and `shared-rules` should be inside a block.



## Caveats

### Element and Modifier Cannot be used Stand-Alone
An element (or a modifier) is a part of a block. Outside its block scope, it has no valid meaning.
```scss
// @see https://en.bem.info/method/key-concepts/#element
@include element(item) { // <-- BAD: element without it's block
  /*...CSS declarations here...*/
}

// @see https://en.bem.info/faq/#how-do-i-make-global-modifiers-for-blocks
@include modifier(theme, islands) { // <- BAD: modifier without it's block
  /*...CSS declarations here...*/
}
```

When compiled, the output will be like below:
```
Error: element should be inside of a block
Error: modifier should be inside of a block
```

### Avoid Elements Within Elements
The existence of elements within elements is an anti-pattern because it hinders the ability to change the internal structure of the block. BemSass keeps you from creating these kinds of invalid elements.

```scss
// @see https://en.bem.info/faq/#why-does-bem-not-recommend-using-elements-within-elements-block__elem1__elem2
@include block(nav) {
  @include element(item) {
    @include element(link) { // <--- BAD: Attempt to make an element within another element
    }
  }
}
```
```
Error: element should not be within another element
```

### Keep BEM Entities Immutable
BemSass ensures that every BEM entity you create is immutable. It keeps you from redeclaring CSS classes which in turn causes potential side effects.

```scss
// Nav block
@include block(nav) {
  /*...CSS declarations here...*/ 

  @include element(item) {
    /*...CSS declarations here...*/ 
  }

  @include element(item) { //   <--- BAD: Attempt to reassign the nav item styles
    /*...CSS declarations here...*/ 
  }
}

@include block(nav) { // <--- BAD: Attempt to reassign the nav block styles
  /*...CSS declarations here...*/ 
}
```
```
Error: in `element': Attempt to reassign `.nav__item` 
Error: in `block': Attempt to reassign `.nav`
```

### The Order of Block Levels Matters
Note that the order of your block levels is important. For example, the following will cause an error:

```scss
/* Menu component */  
@include block(menu, "component") { //  <--- BAD: `component` is ahead of `object`
  /*...styles are here...*/
}

/* Media object */
@include block(media, "object") {
  /*...styles are here...*/
}
```
```
Error: the `object` level block `media` should not be behind of any `components` level blocks. Your block levels are: object, component
```



## See Also
+ https://en.bem.info/
+ https://css-tricks.com/snippets/sass/bem-mixins/
+ http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
+ https://speakerdeck.com/dafed/managing-css-projects-with-itcss
