#개인 프로젝트명 - For Gamer

## 이 프로젝트를 하기로한 이유가 무엇인가요?
제로베이스에서 개인프로젝트를 기획할때 예전부터 있었으면 했던 모바일 환경에서도 게임에 대한 최신 정보를 알려주는 앱이 있었으면 좋겠다 생각하였습니다
( 모바일에 없는건 아니지만 모바일 앱에는 대부분 모바일 게임 출시, 사전등록과 같은 기능을 가진 앱 밖에 존재하지 않는다 )
그래서 이걸 제대로 기획해서 개인프로젝트로 하면 좋을 것 같다는 생각으로 시작하게 되었습니다.

## 이 프로젝트를 진행하면서 어떤 문제가 있었나요?
정말 많은 문제를 마주하였지만 몇 가지만 말해보자면 아래와 같습니다.

1. 메인 페이지에서 커버 이미지에 마우스를 hover 하였을때 비디오를 재생시키기
2. 새로 사용하기로한 api가 2주 가까이 사용을 해보려해도 무슨 오류 였는지 사용이 안 되서 1주 동안 제대로 개발을 시작도 못했던 점
3. 기획단계에서 기획했던 것 처럼 새로고침시에는 새로운 데이터가 업데이트 되어 있을 수 있어 새로운 데이터를 불러오고 디테일 , 로그인과 같은 화면을 이동하고 다시
메인 페이지로 이동하였을때는 기존의 불러온 데이터를 다시 보여주여 사용자 경험에 도움을 줄 수 있도록 하기


## 이 문제들을 어떤 방식으로 해결하였나요?
1. 우선 1번의 문제 같은 경우는 유튜브api를 사용하여 영상을 재생시키는데 원래는 한 div박스안에 커버이미지와 video태그를 같이 만들어 hover시에 영상의 src에 동적으로 데이터를
넣어 영상을 불러오고 video가 load가 되었다면 커버 이미지를 숨겨 비디오가 보이도록 작업하였습니다 하지만 이러한 방식을 사용하면 마우스가 해당 커버 이미지를 떠났을때 짧게 유튜브 영상에서
영상을 찾을 수 없다는 오류가 생기는게 보이게 됩니다. 그래서 차라리 마우스를 hover하면 그때 video 태그를 동적으로 만드는 방식으로 이를 해결했습니다.

2. 2번째 문제는 기존에는 RAWG라는 사이트에서 제공하는 게임 api를 사용할 예정이였습니다 하지만 데이터를 받아 살펴보니 생각보다 예전 게임의 데이터 + 출시 예정 게임데이터 없음으로 인해 API 교체라는 결정을 하게
되었습니다 그렇게 변경하게 된 API가 현제 사용중인 IGDB인데 여기에는 제가 원하는 데이터가 있었지만 기존 api에는 있었던 정보가 여기에는 없어서 디자인도 원래 생각했던 디자인에서 변경, 제거를 하여 지금의 디자인이
되었습니다.

3. 해당 문제는 어떻게 이를 구현할지 며칠 동안 고민했는데 제 실력으로는 이에대한 답을 도출하기가 어려웠습니다. 그래서 GPT에게 한번 물어보니 제가 개발을 하면서 사용 하였던 라이브러리인 Redux에 이를 저장하면 캐싱이 가능
하다는 답변이 돌아왔습니다. 그래서 이때 리덕스가 데이터를 메모리에 저장하여 캐싱이 가능하다는 사실을 알게되어 불러온 데이터를 리덕스에 보관하고 페이지를 이동하였다가 다시 돌아오면 리덕스에 저장한 데이터를 보여주는 방식으로 
이를 해결하였습니다.


## 이 프로젝트의 특징은 무엇입니까?
우선 이 프로젝트는 PWA로 제작하였다는 것이 가장 큰 특징이 될 것입니다 본래 생각하였던 모바일에서 게임을 볼 수 있으면 좋겠다는 제 생각은 웹 사이트를 모바일 사이즈에 맞게 media query로 조정한다는 것이 아닌
정말 모바일 앱을 실행하여 보는 것 같이 상단에 url링크도 보이지 않게 하는 것이였습니다. 그리고 취업을 준비하기 위한 개인프로젝트인 만큼 하나의 프레임워크를 선택해 작업하는 것이 좋을 것 같다는 생각을 하였습니다
그래서 저는 리엑트를 PWA로 만들어 작업하면 해당사항을 모두 총족 할 수 있는 프로젝트를 제작 할 수 있을 것 같다 생각하여 리엑트 + PWA를 선택하였습니다.

