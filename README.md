# BEM-scss [![Bower version](https://badge.fury.io/bo/BEM-scss.svg)](https://badge.fury.io/bo/BEM-scss)
SCSS에서 BEM 컨벤션을 좀 더 편리하게 적용하기 위해 만들었다. 프로젝트에 부작용 없이 BEM 선언용 mixin들을 추가할 수 있도록 하고, Ruby Sass(>=3.4), LibSass(>=3.3)에서 모두 문제 없이 컴파일링 되도록 하는 것을 목적으로 했다.

## Install

```sh
bower install BEM-scss
```

## Configurations
BEM 선언에 사용할 사용자 mixin들은 아래와 같이 정의한다.
```scss
// BEM element와 BEM modifier 각각의 기본 separator를 설정한다
@include config-BEM-seps {
  "element": "__",
  "modifier": "_"
}

// BEM block 정의에 사용할 mixin으로 'block'을 선언한다.
// 컴파일될 접두사를 'b-'로 정한다. (접두사는 옵션이다)
@mixin block($name) {
  @include make-BEM-block($name, $prefix: "b-") {
    @content;
  };
} 

// BEM element 정의에 사용할 mixin으로 'elem'을 선언한다.
@mixin elem($name) {
  @include make-BEM-element($name) {
    @content;
  };
}

// BEM modifier 정의에 사용할 mixin으로 'mod'를 선언한다.
@mixin mod($name) {
  @include make-BEM-element($name) {
    @content;
  };
}
```
## Basic Usages
아래와 같이 BEM 방식으로 작성된 CSS가 있다고 하자.
```css
.b-menu {
  /*...CSS declarations here...*/
}

.b-menu__item {
  /*...CSS declarations here...*/
}

.b-menu_horiz {
  /*...CSS declarations here...*/
}
```
위와 같이 컴파일된 CSS를 얻기 위해 정의한 mixin들을 활용하여 아래와 같은 SCSS를 작성할 수 있다. 
```scss
// Menu block
@include block(menu) {
  /*...CSS declarations here...*/

  @include elem(item) {
    /*...CSS declarations here...*/
  }
  
  @include mod(horiz) {
    /*...CSS declarations here...*/
  }
}
```
## Extended Details
### Boolean modifier & Key-value modifier
modifier를 선언하는 방식에 따라 boolean modifier와 key-value modifier를 모두 표현할 수 있다. 
```scss
// @see https://en.bem.info/method/naming-convention/#block-modifier

@include block(menu) {
  /* Boolean modifier */
  @include mod(hidden) {
    /*...CSS declarations here...*/
  }
  
  /* key-value modifiers */
  @include mod(theme, morning-forest) {
    /*...CSS declarations here...*/
  }
  
  @include mod(theme, stormy-sky) {
    /*...CSS declarations here...*/
  }
}
```
이것은 아래와 같이 컴파일된다.
```css
/* Boolean modifier */
.b-menu_hidden {
  /*...CSS declarations here...*/
}

/* key-value modifiers */
.b-menu_theme_morning-forest {
  /*...CSS declarations here...*/
}

.b-menu_theme_stormy-sky {
  /*...CSS declarations here...*/
}
```

### Element modifier
element 또한 block과 같은 방식으로 modifier를 가질 수 있다.
```scss
// @see https://en.bem.info/method/naming-convention/#element-modifier

@include block(menu) {
  @include elem(item) {
    /* Boolean modifier */
    @include mod(visible) {
      /*...CSS declarations here...*/
    }
    
    /* key-value modifier */
    @include mod(type, radio) {
      /*...CSS declarations here...*/
    }
  }
}
```
이것은 아래와 같이 컴파일 된다
```css
/* Boolean modifier */
.b-menu__item_visible {
  /*...CSS declarations here...*/
}

/* key-value modifier */
.b-menu__item_type_radio {
  /*...CSS declarations here...*/
}
```
### Using cascades in BEM
BEM은 CSS의 명시도(Specificity) 전쟁을 피하기 위해 고안되었지만, 제한적으로 CSS 본연의 cascading을 활용하는 경우가 있다. 예를 들어 block의 modifier(theme, state, ...)에 따라 변경되는 element를 표현할 때 cascading이 사용되는데, 이것은 아래와 방식으로 선언할 수 있다.
```scss
// @see https://en.bem.info/method/solved-problems/#using-cascades-in-bem

@include block(nav) {
  /*...default nav styles here...*/
  
  @include elem(item) {
    /*...default nav item styles here...*/
  }
  
  @include mod(theme, islands) {
    /*...nav theme islands styles here...*/
    @include elem(item) {
      /*...nav item in theme islands styles here...*/
    }
  }
}
```
이것은 아래와 같이 컴파일 된다
```css
.b-nav {
  /*...default nav styles here...*/
}

.b-nav__item {
  /*...default nav item styles here...*/
}

.b-nav_theme_islands {
  /*...nav theme islands styles here...*/
}

.b-nav_theme_islands .b-nav__item {
  /*...nav item in theme islands styles here...*/
}
```

### Element, Modifier의 독립적 선언 방지
element와 modifier는 독립적으로 선언될 수 없다. element는 block 안에 선언되어야 하며, modifier 또한 반드시 block 또는 유효한 element 안에 선언되어야한다.
```scss
@include block(nav) {
  /*...CSS declarations here...*/
}

// @see https://en.bem.info/method/key-concepts/#element
@include elem(item) {
  /*...CSS declarations here...*/
}

// @see https://en.bem.info/faq/#how-do-i-make-global-modifiers-for-blocks
@include mod(theme, islands) {
  /*...CSS declarations here...*/
}
```

BEM-scss는 block 바깥에서 element나 modifier를 선언할 경우 error를 발생시킨다.
```
Error: element cannot be declared ouside of a block
Error: modifier cannot be declared ouside of a block
```

### Elements of Elements 방지
BEM methodology에서는 block만이 중첩 구조를 허용하는 유일한 BEM entity다. 중첩 element(e.g `block__elem1__elem2`)는 block 구조 변경, 확장의 유연성을 저해하므로 금지된다.
```scss
```
BEM-scss는 중첩 element를 선언할 경우 error를 발생시킨다.
```
```
https://en.bem.info/faq/#why-does-bem-not-recommend-using-elements-within-elements-block__elem1__elem2

### ...TODO: cascading 시의 인접 형제 선택자의 활용

## Caveats
+ ...TODO: element, modifier는 block 없이 못쓴다

## See Also
+ https://en.bem.info/
+ https://css-tricks.com/snippets/sass/bem-mixins/
