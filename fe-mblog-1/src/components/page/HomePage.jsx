import React from "react";
import KakaoMap from "../../kakao/KakaoMap";
import BlogHeader from "../include/BlogHeader";
import { ContainerDiv, FormDiv, HeaderDiv } from "../styles/FormStyle";

const HomePage = () => {
  return (
    <>
      <ContainerDiv>
        <BlogHeader />
        <HeaderDiv>
          <h1 style={{ marginLeft: "10px" }}>터짐블로그</h1>
        </HeaderDiv>
        <FormDiv style={{textAlign:'center'}}>
          <div>이벤트</div>
          <hr styled={{ height: "2px" }} />
          <div>추천 수업존</div>
          <hr styled={{ height: "2px" }} />
          <div> <KakaoMap /> </div>
          <hr styled={{ height: "2px" }} />
        </FormDiv>
      </ContainerDiv>
    </>
  );
};

export default HomePage;
