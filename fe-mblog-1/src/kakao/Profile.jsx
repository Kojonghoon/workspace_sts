import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  console.log("Profile");
  // 카카오 사용자 ID
  const [user_id, setUserID] = useState();
  // 카카오 사용자 닉네임
  const [nickName, setNickName] = useState();
  // 카카오 사용자 프로필 이미지
  const [profileImage, setProfileImage] = useState();
  const getProfile = async () => {
    try {
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      console.log(data.id);
      console.log(data.properties.nickname);
      console.log(data.properties.profile_image);
      // 사용자 정보 변수에 저장
      setUserID(data.id);
      window.localStorage.setItem("userId", user_id);
      setNickName(data.properties.nickname);
      window.localStorage.setItem("nickname", nickName);
      setProfileImage(data.properties.profile_image);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  });

  const kakaoLogout = async () => {
    // 로그아웃 처리
    await axios({
      method: "GET",
      url: `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&logout_redirect_uri=http://localhost:3000`,
    })
      .then((res) => {
        console.log(res);
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("nickname");
        navigate("/");
      })
      .catch((error) => {
        //콜백에서 에러발생시 실행
        console.log(error);
      });
  };
  return (
    <>
      <h3>{user_id}</h3>
      <h3>{nickName}</h3>
      <img src={profileImage} alt="프로필 이미지"></img>
      <br />
      <button onClick={kakaoLogout}>로그아웃</button>
    </>
  );
};

export default Profile;
