<br />
<br />

<div align="center">
   <img width="340px" alt="logo" src="https://user-images.githubusercontent.com/94007890/233002328-6ee3d1ec-2a12-4021-bb07-b21205f56f91.png" />
   <h3> 영화를 사랑하는 사람을 위한 영화 평점 웹 사이트 mov'in</h3>
   <hr />

   <div align="right">
   <b><a href="http://codestates.s3-website.ap-northeast-2.amazonaws.com/">🌐 사이트 바로가기</a></b>
   <b><a href="https://github.com/337yj/mov-in/wiki">🌐 위키 바로가기</a></b>  &nbsp; &nbsp; 
  </div>
<br />
</div>

<br />
<br />

<h1>MAIN FEATURES</h1>

- 영화 목록을 **조회** 하고 **검색** 할 수 있습니다.

- **영화 리뷰**를 남길 수 있으며 나만의 **감상 포인트** 와 **긴장감 지수** 까지 기록할 수 있습니다.

- 마음에 드는 영화가 있다면 **좋아요** 로 관심을 표하고, **북마크**로 영화를 담을 수 있습니다.

- 다른 유저의 프로필을 조회하여 **소개글**과 유저가 남긴 **리뷰**를 확인할 수 있습니다.

- 나의 프로필을 노출하기 싫다면 **공개** 혹은 **비공개** 처리를 할 수 있습니다.

- 관리자 페이지가 따로 있어 **영화 목록 관리** 와 **회원 및 댓글 관리**가 가능 합니다.

<br />

<h2>Docs</h2>
<!-- <img width="300" alt="requirements specification" src="https://user-images.githubusercontent.com/94007890/234971096-cb958fb7-0d37-4c71-b237-b7c148e85673.png" /> -->

- <b><a href="https://docs.google.com/spreadsheets/d/1RU99jICOMEqOjAc1fA44g-OIEeaNWWQm4ANsKxSb60I/edit#gid=0">요구사항 정의서</a></b>
- <b><a href="https://www.figma.com/file/XJlRiBZTbNPZTXk5UHgBJQ/%ED%99%94%EB%A9%B4%EC%A0%95%EC%9D%98%EC%84%9C?node-id=1-2&t=u6xbdaA6wzIaII2l-0">화면 정의서</a></b> 
- <b><a href="https://docs.google.com/spreadsheets/d/1MAfHNsnEU1CKfobsL5Q6yEWPE95n3BAizMnxNqKVP58/edit#gid=292342727">테스트 문서</a></b> 
- <b><a href="https://docs.google.com/presentation/d/1JnfadJwwP_MBCHgDvdtqDPLkYxug3QtKDdRvb9JJ53I/edit#slide=id.g23ade089e59_0_5">서비스 매뉴얼</a></b> 

<br />

<h1>STACK</h1>
<img width="500" alt="stack" src="https://user-images.githubusercontent.com/94007890/234970490-5b6b81ba-7702-4578-8f8a-8782fa6de363.png" />

### **Front-end**

`React` `JavaScript` `react-router-dom` `Recoil`
`Sass` `axios` `day.js`

### Back-end

`Next.js` `mySql` `TypeScript` `Swagger` `JWT`

### Deploy

`S3`  `Github Action`

### Common ㅣ Dev Tools

`git` `GitHub` `Figma` `Notion` ㅣ `ESLint` `Prettier`

<br />
<br />

<h2>시연</h2>
<table>
  <tr>
    <th>
      회원가입 | 로그인
    </th>
    <th>
      메인 페이지
    </th>
    <th>
      검색 페이지
    </th>
  </tr>
  <tr>
    <td>
    <img width="100%" src="https://user-images.githubusercontent.com/94007890/234981408-5004d4bd-04d3-4730-ab86-c4d525b15d39.gif" />
    </td>
    <td>
     <img width="100%" src="https://user-images.githubusercontent.com/94007890/234982932-d8931e24-aeda-4465-a93b-6967a10458e4.gif" />
    </td>
    <td>
     <img width="100%" src="https://user-images.githubusercontent.com/94007890/234983504-569f6204-bdb1-4f90-97f3-6532016e9eb1.gif" />
    </td>
   </tr> 
  <tr>
    <th>
      상세 페이지 (북마크, 좋아요, 코멘트)
    </th>
    <th>
      코멘트 페이지 (좋아요, 댓글)
    </th>
    <th>
      코멘트 페이지 (신고)
    </th>
  </tr>
  <tr>
    <td>
      <img width="100%" src="https://user-images.githubusercontent.com/94007890/234964771-0c39b606-1073-40f5-9c37-35101a458bfb.gif" />
    </td>
    <td>
      <img width="100%" src="https://user-images.githubusercontent.com/94007890/234965233-9b3ff860-5a5b-4fec-a47b-949afa767424.gif" />
    </td>
    <td>
      <img width="100%" src="https://user-images.githubusercontent.com/94007890/234965664-c9f5ea45-70e9-49d0-a90d-d4e370835d24.gif" />
    </td>
   </tr> 
  <tr>
    <th>
      마이페이지 (프로필)
    </th>
    <th>
      마이페이지 (회원정보)
    </th>
    <th>
      마이페이지 (코멘트, 좋아요, 북마크)
    </th>
  </tr>
  <tr>
    <td>
      <img width="100%" src="https://user-images.githubusercontent.com/94007890/234968719-1442f9f5-3a15-4b2f-a008-5700dc4198ef.gif" />
    </td>
    <td>
      <img width="100%" src="https://user-images.githubusercontent.com/94007890/234969106-d02a571f-ed6a-48c3-9ed5-509cad645b99.gif" />
    </td>
    <td>
      <img width="100%" src="https://user-images.githubusercontent.com/94007890/234969364-58b591cf-1f39-452a-a81c-6267aea3ffc3.gif" />
    </td>
   </tr>
  <tr>
    <th>
      관리자페이지 (영화)
    </th>
    <th>
      관리자페이지 (회원)
    </th>
    <th>
      관리자페이지 (코멘트)
    </th>
  </tr>
  <tr>
    <td>
      <img width="100%" src="https://user-images.githubusercontent.com/94007890/234963744-b0015ecc-1784-4918-b0e3-b5ba70aa19c5.gif" />
    </td>
    <td>
      <img width="100%" src="https://user-images.githubusercontent.com/94007890/234963988-d5ddf6d3-d974-4004-b703-6455b4579fbd.gif" /> <br />
    </td>
    <td>
       <img width="100%" src="https://user-images.githubusercontent.com/94007890/234964203-21fea58a-de88-4953-96d7-e322fd2ffe02.gif" />
    </td>
   </tr>
   
   <tr>
   <th>관리자페이지 (신고) </th>
   <th>유저페이지 (공개) </th>
   <th>유저페이지 (비공개) </th>
   </tr>
   <tr>
    <td>
      <img width="100%" src="https://user-images.githubusercontent.com/94007890/234962754-daa14cad-1330-4633-8a18-0657885da4f4.gif" />    
    </td>
    <td align="center">
      <img width="100%" src="https://user-images.githubusercontent.com/94007890/235257074-b559a2dd-1e59-4412-99a8-aff9fee12b59.png" />
    </td>
    <td align="center">
      <img width="100%" src="https://user-images.githubusercontent.com/94007890/235257327-f45bc6c5-dc03-4685-9699-ef9ef2ec9c4d.png" />    
    </td>
   </tr>
</table>

<br />

<h1>MEMBER</h1>

|<a href="https://github.com/337yj">이윤정</a>|<a href="https://github.com/miyyaa24">김나임</a>|
|------|----|
|leader|member|
|Front|Front|

<br />
