# 선거 시스템

### 1주차 과제

1. 회원가입/로그인/로그아웃
2. 회원가입 시 지역 설정
   -> 지역 별로 후보 다르게 뜨게 하기
3. 자기가 가입한 지역에서 후보 등록(신청) 가능
   -> 허가 받을 필요 X(추후 과제로 나갈 예정)
   -> 즉 후보 등록 신청을 하기만 하면 다 후보에 오를 수 있음
4. 투표 작동 (투표 표수 반영X 결과 표기될 필요X)
   -> 예를 들어, 체크 표시 칸 안에 클릭만 되게 하기 등

##### 기본 세팅

###### 필요한 패키지 설치

npm init -y //

npm install express mysql2 bcryptjs jsonwebtoken body-parser

###### 데이터베이스 생성

회원가입을 하는 users 테이블

후보에 등록하면 저장되는 candidates 테이블

##### 메인화면

###### 모듈 기본 설정

const express = require("express"); // 웹을 쉽게 구축

const session = require("express-session"); //사용자의 상태정보를 서버에 저장

const bodyParser = require("body-parser"); //클라이언트가 보내는 요청의 본문을 쉽게 파싱

const FileStore = require("session-file-store")(session); // 세션데이터를 파일 시스템에 저장할 수 있게 해줌

그 외 라우터들 설정

##### 회원가입

화면 레이아웃의 경우 아래 링크의 템플릿을 참고함

https://sirius7.tistory.com/59

// 회원가입 화면

router.get("/register", function (request, response) {

var title = "회원가입";

var html = template.HTML(

    title,

    "내용"

);

response.send(html);

});

/register 경로에 get 요청이 들어오면 함수 실행 → 회원 가입 페이지 실행됨

##### 로그인

/login_process 경로에 post 요청이 들어오면 함수 실행 → 입력한 아이디와 비밀번호가 db에 있는지 확인

##### 로그아웃

/logout 경로에 get 요청이 들어오면 로그아웃 실행

→ 로그아웃 시 get 함수가 사용됨을 알게되었다

##### 후보등록

- 개선할 점

후보 등록 시 후보를 등록하려는 사람의 로그인 정보와 동일한 지역의 후보로만 출마할 수 있도록 설정하고 싶었는데 로그인 정보를 연결하는데 실패

→ 로그인한 회원의 지역 정보를 어떻게 불러오는지 모르겠음

##### 투표

- 지역 선택

db에 존재하는 후보들의 지역 이름이 테이블의 형태로 제시되도록 함

후보가 없는 지역은 제시되지 않음

지역을 선택하면 해당 지역에 있는 후보를 투표할 수 있는 페이지로 넘어감

- 후보 선택 후 투표

해당 지역에 출마한 후보들이 나오고 체크박스 선택 후 투표 버튼 누르면 투표 완료

##### 1주차 정리

- 회원가입과 로그인 페이지는 누군가 작성한 템플릿을 인용하여 예쁜데, 나머지 부분은 기본이라 예쁘지 않음…. 예쁘게 꾸미는 방법은 추후에 보강 예정

- 후보 등록시 로그인 정보 연결하는 방법 찾아보기

- node.js 실행은 $node main.js 이고 localhost3000 페이지 들어가기

- readme는 어떻게 꾸미는 거죠.....?

- git 연결 방법

`git init`

`git remote origin add (레포주소)`

`git checkout -b 브랜치이름`

`git add .`

`git commit -m “ ”`

`git push`

까먹지 좀 말자……
