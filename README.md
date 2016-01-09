# bem-sass 
![Bower version](https://img.shields.io/bower/v/bem-sass.svg) 
[![npm version](https://img.shields.io/npm/v/bem-sass.svg)](https://www.npmjs.com/package/bem-sass) 
![Build Status](https://img.shields.io/circleci/project/jsng/bem-sass.svg)


`bem-sass` is a Sass library for BEM-style naming convention. It helps you adopt BEM methodology with no compatibility issues with both RubySass(>= 3.4) and LibSass(>=3.3), with more flexible namespacing configurations.

`bem-sass` is also inspired by [Immutable CSS](http://csswizardry.com/2015/03/immutable-css/). Immutable CSS describes your specified css classes should never be overwritten. this helps you build more robust, cleaner css code base by preventing cross-referencing css classes.

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

.menu_horiz {
  /*...the horizontal menu styles are here...*/
}
```

## Configurations
You can configure debfault bem-sass settings by `configure-BEM` mixin
```scss
@include configure-BEM ((
  default-prefix: "",
  block-types: (),
  element-sep: "__",
  modifier-sep: "_"
));
```

#### ```default-prefix```
Set the default prefix for block mixin. the default value is "".
```scss
@include configure-BEM((
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

#### ```block-types```
Sometimes you may need to define several block types to manage your project (especially when you adopt methodology like ITCSS). You can define several block levels by adding 'block type name / prefix' pair. the default is an empty map.
```scss
@include configure-BEM((
  block-types: (
    object:    "o-",  
    component: "c-"
  )
));

/* Media object */
@include block(media, "object") {
  /*...styles are here...*/

  @include element(body) {
    /*...styles are here...*/
  }
}

/* Menu component */
@include block(menu, "component") {
  /*...styles are here...*/

  @include element(item) {
    /*...styles are here...*/
  }
}
```

When compiled:
```css
/* Media object */
.o-media {
  /*...styles are here...*/
}
.o-media__body {
  /*...styles are here...*/
}

/* Menu component */
.c-menu {
  /*...styles are here...*/
}
.c-menu__item {
  /*...styles are here...*/
}
```

#### ```element-sep```, ```modifier-sep```
Set BEM element and modifier separators. the defaults are "__", "_" respectively.

```scss
@include configure-BEM((
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
  /*...styles here...*/
}
.promo-title {
  /*...styles here...*/
}
.promo--hero {
  /*...styles here...*/
}
```

## Extended Details
### Boolean modifier & Key-value modifier
bem-sass supports key-value modifiers as well as boolean modifiers.
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

### Element modifier

Elements could also get modified by their own modifiers
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
### Using cascades in BEM
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

.nav_theme_islands .b-nav__item {
  /*...the islands themed nav item styles are here...*/
}
```

## Caveats

### Element and modifier cannot be used stand-alone
An element(or a modifier) is a part of a block. Both have no standalone meaning.
```scss
@include block(nav) {
  /*...CSS declarations here...*/
}

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
Error: element cannot be declared ouside of a block
Error: modifier cannot be declared ouside of a block
```

### Elements within elements are bad
The existence of elements of elements is an antipattern because it hinders the ability to change the internal structure of the block: elements cannot be swapped around, removed or added without modifying the existing code.
```scss
// @see https://en.bem.info/faq/#why-does-bem-not-recommend-using-elements-within-elements-block__elem1__elem2
@include block(nav) {
  @include element(item) {
    @include element(link) {
    }
  }
}
```
When compiled:
```
Error: element cannot be declared in another element
```

### Immutability
bem-sass is heavily inspired by Immutable CSS. It prevents you reassigning css classes which in turn produces side effects.
```scss
// Nav block
@include block(nav) {
  /*...CSS declarations here...*/ 

  @include element(item) {
    /*...CSS declarations here...*/ 
  }

  // Attempt to reassign the nav item styles
  @include element(item) {
    /*...CSS declarations here...*/ 
  }
}

// Attempt to reassign the nav block styles
@include block(nav) {
  /*...CSS declarations here...*/ 
}
```

When compiled:
```
Error: in `element': Attempt to reassign .nav__item 
Error: in `block': Attempt to reassign .nav
```

## See Also
+ https://en.bem.info/
+ https://css-tricks.com/snippets/sass/bem-mixins/
+ http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
+ https://speakerdeck.com/dafed/managing-css-projects-with-itcss
