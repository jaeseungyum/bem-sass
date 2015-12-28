# scss-BEM-helpers
SCSS에서 BEM 컨벤션을 좀 더 편리하게 적용하기 위해 만들었다. 프로젝트에 부작용 없이 BEM 선언용 mixin들을 추가할 수 있도록 하고, Ruby Sass(>=3.4), LibSass(>=3.3)에서 모두 문제 없이 컴파일링 되도록 하는 것을 목적으로 했다.

## Install

```sh
bower install scss-BEM-helpers
```

## Basic Usage
BEM 선언에 사용할 사용자 mixin들을 아래와 같이 정의한다.
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
정의한 mixin들은 scss에서 아래와 같이 활용할 수 있다
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
이것은 아래와 같은 css rule들로 컴파일된다
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
## Extended Details
### Boolean modifier vs Key-value modifier
modifier를 선언하는 방식에 따라 boolean modifier와 key-value modifier를 모두 표현할 수 있다.
```scss
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
element 또한 block과 같은 방식으로 modifier를 가질 수 있다
```scss
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

+ ...TODO: 인접선택자

## Caveats
+ ...TODO: element, modifier는 block 없이 못쓴다

## See Also
+ https://en.bem.info/
+ https://css-tricks.com/snippets/sass/bem-mixins/
