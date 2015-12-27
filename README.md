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
BEM declaration에 사용할 mixin을 정의한다
```sh 
@mixin block($name) {
  @include make-BEM-block($name, $prefix: "b-");
} 

@mixin elem($name) {
  @include make-BEM-element($name, $sep: "__");
}

@mixin mod($name) {
  @include make-BEM-element($name, $sep: "_");
}
```

위에서 직접 정의한 BEM mixin을 사용한다
```sh 
# scss
@include block(menu) {
  //...declarations...

  @include elem(item) {
    //...declarations...
  }
  @include mod(horiz) {
    //...declarations...
  }
}

# css 
.b-menu {
}

.b-menu__item {
}

.b-menu_horiz {
}
```
