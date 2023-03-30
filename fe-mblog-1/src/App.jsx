import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import EmailVerifiedPage from "./components/auth/EmailVerifiedPage";
import FindEmailPage from "./components/auth/FindEmailPage";
import LoginPage from "./components/auth/LoginPage";
import ResetPwdPage from "./components/auth/ResetPwdPage";
import SignupPage from "./components/auth/SignupPage";
import DeptDetail from "./components/dept/DeptDetail";
import DeptPage from "./components/page/DeptPage";
import HomePage from "./components/page/HomePage";
import MemberPage from "./components/page/MemberPage";
import Toast from "./components/Toast";
import KakaoRedirectHandler from "./kakao/KakaoRedirectHandler";
import Profile from "./kakao/Profile";
import { setToastMsg } from "./redux/toastStatus/action";
import RepleBoardPage from "./components/page/RepleBoardPage";
import { onAuthChange } from "./service/authLogic";
import { memberListDB } from "./service/dbLogic";
import RepleBoardDetail from "./repleboard/RepleBoardDetail";
import RepleBoardWriteForm from "./repleboard/RepleBoardWriteForm";

function App({ authLogic, imageUploader }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ssg = sessionStorage;
  const toastStatus = useSelector((state) => state.toastStatus);
  useEffect(() => {
    const asyncDB = async () => {
      const auth = authLogic.getUserAuth();
      //현재 인증된 사용자 정보를 가져온다
      const user = await onAuthChange(auth);
      //사용자가 있으면 - userId가 있다.
      //구글 로그인으로 사용자 정보를 가지고 있을 때
      //user정보가 있으면 sessionStorage에 담는다 - email
      if (user) {
        console.log("user정보가 있을때");
        ssg.setItem("email", user.email);
        const res = await memberListDB({ mem_uid: user.uid, type: "auth" });
        console.log(res.data)
        //오라클 서버의 회원집합에 uid가 존재하면 - 세션스토리지에 값을 담자
        if (res.data!==0) { //스프링부트 - RestMemberController - memberList - 1)0, 2){mem_uid:asdasd}
          const temp = JSON.stringify(res.data);
          const jsonDoc = JSON.parse(temp);
          ssg.setItem("nickname", jsonDoc[0].MEM_NICKNAME);
          ssg.setItem("status", jsonDoc[0].MEM_STATUS);
          ssg.setItem("auth", jsonDoc[0].MEM_AUTH);
          ssg.setItem("no", jsonDoc[0].MEM_NO);
          // navigate("/");
          return; //렌더링이 종료됨
        }

        //구글계정이 아닌 다른 계정으로 로그인을 시도 했을 땐 user.emailVerified가 없다 - 그렇다면 undefined이겠지
        if(!user.emailVerified){
          navigate("/auth/emailVerified")

        }
        //오라클 서버의 회원집합에 uid가 존재하지 않으면
        else {
          console.log("해당 구글 계정은 회원가입 대상입니다. 회원가입 부탁드립니다.")
          // navigate("/auth/signup")
        }
      }
      //사용자 정보가 없을때
      else {
        console.log("user정보가 없을때");
        if (sessionStorage.getItem("email")) {
          //sessionStorage에 있는 값 모두 삭제하기
          sessionStorage.clear();
          window.location.reload();
        }
      } //end of else
    }
    asyncDB();
  //  dispatch(setToastMsg("회원가입 하세요"));
  }, [dispatch]);

  return (
    <>
       <div style={{ height: "100vh" }}>
        {toastStatus.status && <Toast />}
        <Routes>
          {/* 컴포넌트 함수를 호출하는 것이다.(렌더링발생) - 마운트 - return이 호출되었다 */}
          <Route path="/deptdetail/:deptno" exact={true} element={<DeptDetail imageUploader={imageUploader} />}/>

          <Route path="/reple/board" exact={true} element={<RepleBoardPage />} />
          <Route path="/reple/boarddetail/*" element={<RepleBoardDetail />} />
          <Route path="/reple/boardwrite" exact={true} element={<RepleBoardWriteForm />} />

          <Route path="/auth/signup" exact={true} element={<SignupPage authLogic={authLogic} />}          />
          <Route path="/auth/emailVerified" exact={true} element={<EmailVerifiedPage authLogic={authLogic} />} />
          <Route path="/auth/findEmail" exact={true} element={<FindEmailPage />} />
          <Route path="/auth/resetPwd" exact={true} element={<ResetPwdPage authLogic={authLogic}/>} />
          <Route path="/login" exact={true} element={<LoginPage authLogic={authLogic} />}         />

          <Route path="/" exact={true} element={<HomePage />} />
          <Route path="/profile" exact={true} element={<Profile />} />
          <Route path="/auth/kakao/callback" exact={true} element={<KakaoRedirectHandler />}          />
          <Route path="/member" exact={true} element={<MemberPage imageUploader={imageUploader} />}    />
          <Route path="/dept/:gubun" element={<DeptPage imageUploader={imageUploader} />} />
        </Routes>
       </div>
    </>
  );
}

export default App;
