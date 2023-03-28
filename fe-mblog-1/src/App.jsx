import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import DeptDetail from "./components/dept/DeptDetail";
import Signup from "./components/member/Signup";
import DeptPage from "./components/page/DeptPage";
import HomePage from "./components/page/HomePage";
import MemberPage from "./components/page/MemberPage";
import Toast from "./components/Toast";
import KakaoRedirectHandler from "./kakao/KakaoRedirectHandler";
import Profile from "./kakao/Profile";
import { setToastMsg } from "./redux/toastStatus/action";
import RepleBoardPage from "./repleboard/RepleBoardPage";

function App({imageUploader}) {
  const dispatch = useDispatch()
  const toastStatus = useSelector(state=>state.toastStatus)
  useEffect(()=>{
    dispatch(setToastMsg('회원가입 하세요'))
  },[])

  return (
    <>
    <div style={{height:'100vh'}}>
      {toastStatus.status&&<Toast/>}
      <Routes>
        {/* 컴포넌트 함수를 호출하는 것이다.(렌더링발생) - 마운트 - return이 호출되었다 */}
        <Route path='/deptdetail/:deptno' element={<DeptDetail imageUploader={imageUploader}/> } />

        <Route path='/repleboard' element={<RepleBoardPage/> } />
        <Route path='/dept/:gubun' element={<DeptPage imageUploader={imageUploader}/> } />
        <Route path='/member/signup' exact={true} element={<Signup/> } />
        <Route path='/' exact={true} element={<HomePage/> } />
        <Route path='/profile' exact={true} element={<Profile/> } />
        <Route path='/login' exact={true} element={<LoginPage/> } />
        <Route path='/auth/kakao/callback' exact={true} element={<KakaoRedirectHandler/> } />
        <Route path='/member' exact={true} element={<MemberPage imageUploader ={imageUploader}/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
