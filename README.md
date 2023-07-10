# game_info

## 7월 4일 개발 진행상황

1. 메인페이지의 영상재생 항목을 제외한 나머지 전체적인 디자인 완성(데이터는 연결을 아직 하지 않아 임시 데이터를 넣어둠)
2. 슬라이드 메뉴 개발( emotion을 이용한 toggle 기능을 구현 하는데 너무 많은 시간을 사용함 )

- 개발을 하다 느낀점
  - emotion을 직접 개인 프로젝트를 진행하면서 사용해보니 한 페이지에 css 파일을 따로 만들지 않고 관리 할 수 있는 것이 굉장히
    편리하다고 느낌
  - emotion을 이용하여 props로 동적인 css추가 방법을 알게됨 ( 이 부분은 정확히는 styled에 props를 준게 아닌 className에서
    클래스를 동적으로 추가하여 해결함 )

## 7월 5일 개발 진행상황

1. 슬라이더의 버그 픽스(처음 홈으로 active가 안되어 있는 버그 , 마우스로 눌렀는데 active가 작동을 안하는버그)
2. 메인페이지 비디오 등록 구조 제작
3. 헤더의 프로필 이미지 , 닉네임이 너무 길시 생략부호 처리
4. 기존 사용하기로한 RAWG -> IGDB로 API 교체
5. IGDB로 교체하면서 유튜브 API를 사용하여 동영상을 받아야 함으로 유튜브 API도 사용하기로함

- 개발을 하다 느낀점
  - fetch와 axios가 데이터를 전송할때 서로 다른식으로 전송하는걸 알게됨
    ( IGDB로 요청을 보낼때 payload가 전달되는 방식이 달라 axios의 data로는 접근이 불가능했음 )

## 7월 6일 개발 진행상황

오늘은 특별히 레이아웃, 기능 개발이아닌 기존 API 변경으로 인해 다시 API DOC을 보면서
사용방법을 익혀야 해서 사용방법과 사용할 api를 준비함

- 개발을 하다 느낀점 -어제 분명 payload가 다르게 갔는데 오늘 다시 해보니 정상 작동하여 axios 와 fetch가 다른 방식이 아닌 내가 이상한걸 알았음

## 7월 10일 개발 진행상황

1. 커스텀훅을 이용하여 원하는 데이터만을 return하는 로직 완성
2. png파일을 사용하여 영상을 제공하지 않는 게임에 대한 처리
3. 헤더와 aside position: sticky를 사용하여 고정
4. Redux를 이용하여 데이터 캐싱, page와 limit를 전역 상태로 관리
5. react-youtube 라이브러리를 이용하여 영상을 가져옴
6. react-intersection-observe를 사용하여 무한 스크롤 구현(진행중)

- 개발을 하다 느낀점
  - 무한 스크롤을 사용하고자 할때는 커스텀 훅을 사용하지 않는 것이 편한 것 같음( 최상위 레벨에서만 사용이 가능하여 사용하기가 힘듬 )