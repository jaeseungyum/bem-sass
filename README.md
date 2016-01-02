# BEM-scss [![Bower version](https://badge.fury.io/bo/BEM-scss.svg)](https://badge.fury.io/bo/BEM-scss)
SCSS 사용 시, BEM 컨벤션을 좀 더 편리하게 적용하기 위해 만들었다. 프로젝트에 부작용 없이 BEM 선언용 mixin들을 추가할 수 있도록 하고, Ruby Sass(>=3.4), LibSass(>=3.3)에서 모두 문제 없이 컴파일링 되도록 하는 것을 목적으로 했다.

## Install

```sh
bower install --save-dev BEM-scss
```
## Configurations
```scss
@include config-BEM-options ((
  default-prefix: null,
  block-types: null,
  element-sep: "__",
  modifier-sep: "_"
));
```
## Basic Usages
기본적으로 정의된 mixin들(block, element, modifier)을 활용해 아래와 같은 SCSS code를 작성할 수 있다. 
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
BEM은 CSS의 명시도(Specificity) 전쟁을 피하기 위해 고안되었지만, 제한적으로 CSS 본연의 cascading을 활용하는 경우가 있다. 예를 들어 block의 modifier(theme, state, ...)에 따라 변경되는 element를 표현할 때 cascading이 사용되는데, 이것은 아래와 방식으로 선언할 수 있다.
```scss
// @see https://en.bem.info/method/solved-problems/#using-cascades-in-bem

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
