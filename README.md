# scss-BEM-helpers
BEM helpers for scss projects

## Objectives
- scss에 BEM(Block-Element-Modifier)을 적용할 때, 가독성이 좋은 코드를 만들기 위함
- 프로젝트의 요구사항에 따라 BEM 스타일의 convention을 추가/변경/삭제 가능
- libsass, rubysass 모두 호환 

## Installation

```sh
bower install scss-BEM-helpers
```

## Usage
BEM 선언에 사용할 사용자 mixin을 아래와 같이 정의한다.
```scss
// 'block'을 BEM block 선언에 사용할 mixin으로 하고, 
// 컴파일될 접두사를 'b-'로 정한다.
@mixin block($name) {
  @include make-BEM-block($name, $prefix: "b-");
} 

// 'elem'을 BEM element 선언에 사용할 mixin으로 하고, 
// 구분자를 '__'로 정한다.
@mixin elem($name) {
  @include make-BEM-element($name, $sep: "__");
}

// 'mod'를 BEM modifier 선언에 사용할 mixin으로 하고, 
// 구분자를 '_'로 정한다.
@mixin mod($name) {
  @include make-BEM-element($name, $sep: "_");
}
```
정의한 mixin은 scss에서 아래와 같이 활용할 수 있다
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
이것은 아래와 같이 css로 컴파일된다
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
