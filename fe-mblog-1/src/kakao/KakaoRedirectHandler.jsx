import React, { useEffect } from "react";
import qs from "qs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KakaoRedirectHandler = () => {
  //카카오 객체를 global variable에 등록해주는 코드임
  //const { Kakao } = window;
  //location.hre나 sendRedirect대신에사용함
  const navigate = useNavigate();
  //카카오 서버에서 돌려주는 URL뒤에 쿼리스트링 가져오기
  //http://localhost:3000/auth/kakao/callback
  //?code=xIwcAzN4VP2eqqNnvjmY2c3ojjsWUuj0k4TvOBqpkUsqqf2O00iyck2OOgPzLT-ANA_W5gorDR8AAAGHAZ_uIQ
  let params = new URL(document.location).searchParams;
  let code = params.get("code"); //
  console.log(code);
  const grant_type = "authorization_code";
  const redirect_uri = "http://localhost:3000/auth/kakao/callback";

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: grant_type,
      client_id: process.env.REACT_APP_KAKAO_API_KEY,
      redirect_uri: redirect_uri,
      code: code,
    });
    try {
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );
      window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
      console.log(res.data.access_token);
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  });
  return (
    <div>
      {/* 아무런 의미없는 화면이다 - 거쳐서 다른 화면으로 이동하니까 - 루트 컨텍스트 - 인증이되면 /home으로 가자 */}
      {/* jQZULPNzM2_pw1Z5l0fnkZMC0t-f75yWrMXiUqjEkqKrJUwVwHbntSuZhYKjjKyFdQ-H3Ao9c04AAAGHAbsg_A */}
      {code}
    </div>
  );
};

export default KakaoRedirectHandler;
