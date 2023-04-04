import axios from "axios";

export const qnaListDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(board);
      //axios - 비동기 요청 처리 ajax - fetch(브라우저) - axios(NodeJS - oracle서버연동)
      const response = axios({
        //3000번 서버에서 8000서버로 요청을 함 - 네트워크(다른서버 - cors이슈)
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "reple/qnaList",
        params: board, //쿼리스트링은 header에 담김 - get방식 , // 스프링부트와 연동시 @RequestParams사용
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const qnaInsertDB = (board) => {
  console.log(board)  //fileNames={'man1.png', 'man2.png', 'man3.png'}
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "reple/qnaInsert",
        data: board, //post방식으로 전송시 반드시 data속성으로 ㅈ파라미터 줄것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const qnaUpdateDB = (board) => {
  //대소문자 구분 어떻게 할것인가
  //리턴 값을 대문자로
  //아니면 둘다 대문자로 할까?
  return new Promise((resolve, reject) => {
    try {
      console.log(board);
      //axios - 비동기 요청 처리 ajax - fetch(브라우저) - axios(NodeJS - oracle서버연동)
      const response = axios({
        //3000번 서버에서 8000서버로 요청을 함 - 네트워크(다른서버 - cors이슈)
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "reple/qnaUpdate",
        data: board, //쿼리스트링은 header에 담김 - get방식 , // 스프링부트와 연동시 @RequestParams사용
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const qnaDeleteDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(board);
      //axios - 비동기 요청 처리 ajax - fetch(브라우저) - axios(NodeJS - oracle서버연동)
      const response = axios({
        //3000번 서버에서 8000서버로 요청을 함 - 네트워크(다른서버 - cors이슈)
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "reple/qnaDelete",
        params: board, //쿼리스트링은 header에 담김 - get방식 , // 스프링부트와 연동시 @RequestParams사용
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* ==========image 업로드 시작============= */
export const uploadFileDB = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "reple/fileUpload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: file,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const uploadImageDB = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "reple/imageUpload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: file, // 스프링부트와 연동시 @RequestBody사용
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
/* ==========image 업로드 종료============= */

export const memberInsertDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("memberInsertDB" + member);
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "member/memberInsert",
        data: member, //post방식으로 전송시 반드시 data속성으로 ㅈ파라미터 줄것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberUpdateDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("memberUpdateDB" + member);
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "member/memberUpdate",
        data: member, //post방식으로 전송시 반드시 data속성으로 ㅈ파라미터 줄것
      });
      resolve(response); //요청 처리가 성공했을 때
    } catch (error) {
      reject(error); // 요청 처리 실패했을때
    }
  });
};

export const memberDeleteDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("memberDeleteDB" + member);
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/memberDelete",
        params: member, //쿼리스트링은 header에 담김 - get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberListDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("memberListDB" + member);
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/memberList",
        params: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* ================member종료================ */

/* ================dept 시작================= */
export const deptInsertDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "dept/deptInsert",
        data: dept, //post방식으로 전송시 반드시 data속성으로 ㅈ파라미터 줄것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const deptUpdateDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "dept/deptUpdate",
        data: dept, //post방식으로 전송시 반드시 data속성으로 ㅈ파라미터 줄것
      });
      resolve(response); //요청 처리가 성공했을 때
    } catch (error) {
      reject(error); // 요청 처리 실패했을때
    }
  });
};

export const deptListDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "dept/deptList",
        params: dept, //쿼리스트링은 header에 담김 - get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const deptDeleteDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "dept/deptDelete",
        params: dept, //쿼리스트링은 header에 담김 - get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
/* ================dept 종료================= */

export const jsonMemberListDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/jsonMemberList",
        params: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
