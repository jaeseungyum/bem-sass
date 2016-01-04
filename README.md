# BEM-scss ![Bower version](https://img.shields.io/bower/v/BEM-scss.svg) [![npm version](https://img.shields.io/npm/v/bem-scss.svg)](https://www.npmjs.com/package/bem-scss) ![Build Status](https://img.shields.io/circleci/project/jsng/BEM-scss.svg)
SCSS 사용 시, BEM 컨벤션을 좀 더 편리하게 적용하기 위해 만들었다. 프로젝트에 부작용 없이 BEM block type을 추가할 수 있도록 하고, Ruby Sass(>=3.4), LibSass(>=3.3) 양측에서 모두 문제 없이 컴파일링 되도록 하는 것을 목적으로 했다.

## Quick Start
+ Install with [Bower](http://bower.io): ```bower install --save-dev BEM-scss```
+ Install with [npm](https://www.npmjs.com): ```npm install -save-dev bem-scss```

BEM-scss를 프로젝트 SCSS에 불러온 후, 최 상단에 configure-BEM을 설정한다.
```scss
@import "dist/BEM-scss";
@include configure-BEM;
```

## Basic Usages
BEM-scss가 지원하는 기본들을 활용해 아래와 같은 SCSS code를 작성할 수 있다. 
```scss
// Menu block
@include block(menu) {
  /*...the menu block styles are here...*/

  @include element(item) {
    /*...the menu block element 'item' styles are here...*/
  }
  
  @include modifier(horiz) {
    /*...the menu block modifier 'horiz' styles are here...*/
  }
}
```
이것은 아래와 같은 css로 컴파일 된다.
```css
.menu {
  /*...the 'menu' block styles here...*/
}

.menu__item {
  /*...the menu block element 'item' styles here...*/
}

.menu_horiz {
  /*...the menu block modifier 'horiz' styles here...*/
}
```

## Configurations
프로젝트에 원하는 방식으로 BEM setting을 변경할 수 있다. 이것은 선택적이며, 변경을 원할 경우 ```configure-BEM``` mixin을 통해 선언할 수 있다. 선언하지 않은 것은 결국 다음과 같은 셈이다.

```scss
@include configure-BEM ((
  block-prefix-default: "",
  block-types: (),
  element-sep: "__",
  modifier-sep: "_"
));
```

#### ```block-prefix-default```
block에 기본적으로 사용할 접두사를 설정한다. (e.g "b-", "c-", ...) 기본값은 ""이다.
```scss
@include configure-BEM((
  default-block-prefix: "b-" // block의 기본 접두사를 "b-"로 한다
));

/* Menu block */
@include block(menu) {
  /*...styles here...*/
  
  @include element(item) {
    /*...styles here...*/
  }
}
```
```css
/* compiled CSS */

/* Menu block */
.b-menu {
  /*...styles here...*/
}

.b-menu__item {
  /*...styles here...*/
}
```

#### ```block-types```
프로젝트에 사용할 block 타입들을 정의할 수 있다. 이것 여러 block type들과 그에 따른 접두사가 필요할 때, 예를 들어 [ITCSS](https://speakerdeck.com/dafed/managing-css-projects-with-itcss) 같은 방법론을 프로젝트에 적용할 때 유용하게 활용할 수 있다. 기본값은 빈 map이다.
```scss
@include configure-BEM((
  block-types: (
    object:    "o-",  // object block의 접두사로 o-를 사용한다
    component: "c-"   // component block의 접두사로 c-를 사용한다
    utility:   "u-"   // utility block의 접두사로 u-를 사용한다
  )
));

/* Media object */
@include block(media, "object") {
  /*...styles here...*/

  @include element(body) {
    /*...styles here...*/
  }
}

/* Menu component */
@include block(menu, "component") {
  /*...styles here...*/

  @include element(item) {
    /*...styles here...*/
  }
}

/* Clearfix utility */
@include block(clearfix, "utility") {
  /*...styles here...*/
}
```
```css
/* compiled CSS */

/* Media object */
.o-media {
  /*...styles here...*/
}
.o-media__body {
  /*...styles here...*/
}

/* Menu component */
.c-menu {
  /*...styles here...*/
}
.c-menu__item {
  /*...styles here...*/
}

/* Clearfix utility */
.u-clearfix {
  /*...styles here...*/
}
```

#### ```element-sep```, ```modifier-sep```
BEM element와 BEM modifier의 구분자를 설정한다. 기본값은 각각 "__"과 "_"이다.

```scss
@include configure-BEM((
  // separator를 medium.com 스타일로 설정한다
  element-sep: "-",
  modifier-sep: "--"
));

/* Promo block */
@include block(promo) {
  /*...styles here...*/
  
  @include element(title) {
    /*...styles here...*/
  }
  
  @include modifier(hero) {
    /*...styles here...*/
  }
}
```
```css
/* compiled CSS */

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
modifier를 선언하는 방식에 따라 boolean modifier와 key-value modifier를 모두 표현할 수 있다. 
```scss
// @see https://en.bem.info/method/naming-convention/#block-modifier

@include block(menu) {
  
  /* Boolean modifier */
  @include modifier(hidden) {
    /*...the menu block modifier 'hidden' styles are here...*/
  }
  
  /* key-value modifiers */
  @include modifier(theme, morning-forest) {
    /*...the menu block modifier 'theme: morning-forest' styles are here...*/
  }
  
  @include modifier(theme, stormy-sky) {
    /*...the menu block modifier 'theme: stormy-sky' styles are here...*/
  }
}
```
이것은 아래와 같이 컴파일된다.
```css
/* Boolean modifier */
.menu_hidden {
  /*...the menu block modifier 'hidden' styles are here...*/
}

/* key-value modifiers */
.menu_theme_morning-forest {
  /*...the menu block modifier 'theme: morning-forest' styles are here...*/
}

.menu_theme_stormy-sky {
  /*...the menu block modifier 'theme: stormy-sky' styles are here...*/
}
```

### Element modifier
element 또한 block과 같은 방식으로 modifier를 가질 수 있다.
```scss
// @see https://en.bem.info/method/naming-convention/#element-modifier

@include block(menu) {
  @include element(item) {
    /* Boolean modifier */
    @include modifier(visible) {
      /*...the element item modifier 'visible' styles are here...*/
    }
    
    /* key-value modifier */
    @include modifier(type, radio) {
      /*...the element item modifier 'type: radio' styles are here...*/
    }
  }
}
```
이것은 아래와 같이 컴파일 된다
```css
/* Boolean modifier */
.menu__item_visible {
  /*...the element item modifier 'visible' styles are here...*/
}

/* key-value modifier */
.menu__item_type_radio {
  /*...the element item modifier 'type: radio' styles are here...*/
}
```
### Using cascades in BEM
BEM은 CSS의 명시도(Specificity) 이슈를 피하기 위해 만들어졌지만, 제한적으로 CSS 본연의 cascading을 활용하는 경우가 있다. 예를 들어 block의 modifier(theme, state, ...)에 따라 변경되는 element를 표현할 때 cascading이 사용되는데, 이것은 아래와 방식으로 선언할 수 있다.

```scss
// @see https://en.bem.info/method/solved-problems/#using-cascades-in-bem

/* Nav block */
@include block(nav) {
  /*...default 'nav' block styles are here...*/
  
  @include element(item) {
    /*...default nav block element 'item' styles are here...*/
  }
  
  @include modifier(theme, islands) {
    /*...nav block modifier 'theme:islands' styles are here...*/
    @include element(item) {
      /*...nav block element 'item' in 'theme:islands' styles are here...*/
    }
  }
}
```
이것은 아래와 같이 컴파일 된다
```css
/* Nav block */
.nav {
  /*...default 'nav' block styles are here...*/
}

.nav__item {
  /*...default nav block element 'item' styles are here...*/
}

.nav_theme_islands {
  /*...nav block modifier 'theme:islands' styles are here...*/
}

.nav_theme_islands .b-nav__item {
  /*...nav block element 'item' in 'theme:islands' styles are here...*/
}
```

### ...TODO: cascading 시의 인접 형제 선택자의 활용

## Caveats

### Element, Modifier의 독립적 선언 방지
element와 modifier는 독립적으로 선언될 수 없다. element는 block 안에 선언되어야 하며, modifier 또한 반드시 block 또는 유효한 element 안에 선언되어야한다.
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

BEM-scss는 위와 같이 block 바깥에서 element나 modifier를 선언할 경우 error를 발생시킨다.
```
Error: element cannot be declared ouside of a block
Error: modifier cannot be declared ouside of a block
```

### 중첩 Element 방지
중첩 element(e.g `block__elem1__elem2`)는 block 구조 변경, 확장의 유연성을 저해하므로 금지된다.
```scss
// @see https://en.bem.info/faq/#why-does-bem-not-recommend-using-elements-within-elements-block__elem1__elem2
@include block(nav) {
  @include element(item) {
    @include element(link) {
    }
  }
}
```
BEM-scss는 위와 같이 중첩 element를 선언할 경우 error를 발생시킨다.
```
Error: element cannot be declared in another element
```

### 일괄 선언의 방지
초기 버전의 BEM-scss는 컴파일될 css와 비슷한 형태로 아래와 같이 일괄 선언을 할 수 있는 방식을 지원했었다.
```scss
// WARNING! 아래 방식은 더 이상 지원하지 않는다

@include block(nav) {
  @include all(element(item), element(divider)) {
    /*...CSS declarations here...*/
  }
}

// 또는

@include block(nav) {
  @include element(item, divider) {
    /*...CSS declarations here...*/
  }
}
```
```css
.b-nav__item, .b-nav__divider {
  /*...CSS declarations here...*/
}
```
그러나 이 방식은 코드 상에 해당 element나 modifier에 관한 선언들을 여러 곳에 분산시켜 관리 포인트를 늘리는 부작용이 있다. 해당 block, element, 또는 modifier에 관한 코드 블록은 코드 상에 한번인 것이 좋다는 판단에 더 이상 위와 같은 방식을 지원하지 않는다. 이는 SASS의 placeholder를 통해 아래와 같이 해소될 수 있다.
```scss
@include block(nav) {
  %common-styles {
    /*...CSS declarations here...*/
  }
  
  @include element(item) {
    @extend %common-styles;
  }
  
  @include element(link) {
    @extend %common-styles;
  }
}
```

## See Also
+ https://en.bem.info/
+ https://css-tricks.com/snippets/sass/bem-mixins/
+ http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
+ https://speakerdeck.com/dafed/managing-css-projects-with-itcss
