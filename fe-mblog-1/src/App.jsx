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
import RepleBoardPage from "./components/page/RepleBoardPage";
import KhMyFilter from "./components/repleboard/KhMyFilter";
import KhMyPagination from "./components/repleboard/KhMyPagination";
import KhQnADetailPage from "./components/repleboard/KhQnADetailPage ";
import KhQnAListPage from "./components/repleboard/KhQnAListPage";
import KhQnAUpdatePage from "./components/repleboard/KhQnAUpdatePage";
import KhQnAWriteForm from "./components/repleboard/KhQnAWriteForm.jsx";
import KhSearchBar from "./components/repleboard/KhSearchBar";
import RepleBoardDetail from "./components/repleboard/RepleBoardDetail";
import RepleBoardWriteForm from "./components/repleboard/RepleBoardWriteForm";
import Toast from "./components/Toast";
import KakaoRedirectHandler from "./kakao/KakaoRedirectHandler";
import Profile from "./kakao/Profile";
import { onAuthChange } from "./service/authLogic";
import { memberListDB } from "./service/dbLogic";

function App({ authLogic, imageUploader }) {
  console.log('App')
  //화면을 전환 시킬 떄 -window.location.href 차이점 - 새로고침 요청발생 - 가상돔 사용하지 않음
  const navigate = useNavigate(); //가상돔 사용됨
  const dispatch = useDispatch(); //허브 - action.type(switch-선택), action.payload(내용)
  const ssg = sessionStorage;
  const toastStatus = useSelector((state) => state.toastStatus);  //store에 값을 접근 할 떄
  useEffect(() => {//의존성 배열 - 의존성 배열에 있는 변수가 함수가 훅이 변할 때 다시 호출 가능함
    console.log('effect')
    const asyncDB = async () => {//함수선언 - merberListDB호출
      console.log('asyncDB')
      const auth = authLogic.getUserAuth();
      //현재 인증된 사용자 정보를 가져온다
      const user = await onAuthChange(auth);
      //사용자가 있으면 - userId가 있다.
      //구글 로그인으로 사용자 정보를 가지고 있을 때
      //user정보가 있으면 sessionStorage에 담는다 - email
      if (user) {
        console.log("user정보가 있을때");
        //세션스토리지에 이메일 주소가 등록됨 - 단 구글 로그인이 되어있는 상태 일때만
        ssg.setItem("email", user.email);
        const res = await memberListDB({ mem_uid: user.uid, type: "auth" });
        console.log(res.data);
        //오라클 서버의 회원집합에 uid가 존재하면 - 세션스토리지에 값을 담자
        if (res.data !== 0) {
          //스프링부트 - RestMemberController - memberList - 1)0, 2){mem_uid:asdasd}
          const temp = JSON.stringify(res.data);
          const jsonDoc = JSON.parse(temp);
          ssg.setItem("name", jsonDoc[0].MEM_NAME);
          ssg.setItem("nickname", jsonDoc[0].MEM_NICKNAME);
          ssg.setItem("status", jsonDoc[0].MEM_STATUS);
          ssg.setItem("auth", jsonDoc[0].MEM_AUTH);
          ssg.setItem("no", jsonDoc[0].MEM_NO);
          // navigate("/");
          return; //렌더링이 종료됨
        }

        //구글계정이 아닌 다른 계정으로 로그인을 시도 했을 땐 user.emailVerified가 없다 - 그렇다면 undefined이겠지
        if (!user.emailVerified) {
          navigate("/auth/emailVerified");
        }
        //오라클 서버의 회원집합에 uid가 존재하지 않으면
        else {
          console.log(
            "해당 구글 계정은 회원가입 대상입니다. 회원가입 부탁드립니다."
          );
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
    };
    asyncDB();  //함수호출하기
    //  dispatch(setToastMsg("회원가입 하세요"));
  }, [dispatch]);

  return (
    <>
      <div style={{ height: "100vh" }}>
        {toastStatus.status && <Toast />}
        <Routes>
          {/* 컴포넌트 함수를 호출하는 것이다.(렌더링발생) - 마운트 - return이 호출되었다 */}
          <Route  path="/deptdetail/:deptno" exact={true} element={<DeptDetail imageUploader={imageUploader} />} />

          <Route path="/qna/list" exact={true}element={<KhQnAListPage/>} />
          <Route path="/qna/detail/*" element={<KhQnADetailPage />} />
          <Route path="/qna/write/*" element={<KhQnAWriteForm authLogic={authLogic}/>} />
          <Route path="/qna/update/:bno" exact={true}element={<KhQnAUpdatePage />} />

          <Route path="/qna/searchbar" exact={true}element={<KhSearchBar />} />
          <Route path="/qna/mypagination" exact={true}element={<KhMyPagination />} />
          <Route path="/qna/myfilter" exact={true}element={<KhMyFilter />} />

          <Route path="/reple/board" exact={true}element={<RepleBoardPage />} />
          <Route path="/reple/boarddetail/*" element={<RepleBoardDetail />} />
          <Route path="/reple/boardwrite"   exact={true} element={<RepleBoardWriteForm />}          />

          <Route path="/auth/signup" exact={true}element={<SignupPage authLogic={authLogic} />}     />
          <Route path="/auth/emailVerified"   exact={true} element={<EmailVerifiedPage authLogic={authLogic} />}          />
          <Route path="/auth/findEmail"    exact={true} element={<FindEmailPage />} />
          <Route path="/auth/resetPwd"      exact={true}   element={<ResetPwdPage authLogic={authLogic} />}       />
          <Route path="/login"  exact={true}   element={<LoginPage authLogic={authLogic} />}     />

          <Route path="/" exact={true} element={<HomePage />} />
          <Route path="/profile" exact={true} element={<Profile />} />
          <Route path="/auth/kakao/callback"  exact={true}  element={<KakaoRedirectHandler />}  />
          <Route path="/member"   exact={true}  element={<MemberPage imageUploader={imageUploader} />}   />
          <Route path="/dept/:gubun"   element={<DeptPage imageUploader={imageUploader} />}    />
        </Routes>
      </div>
    </>
  );
}

export default App;
