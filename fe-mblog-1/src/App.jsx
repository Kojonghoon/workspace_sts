import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import DeptDetail from "./components/dept/DeptDetail";
import DeptPage from "./components/page/DeptPage";
import HomePage from "./components/page/HomePage";
import MemberPage from "./components/page/MemberPage";
import KakaoRedirectHandler from "./kakao/KakaoRedirectHandler";
import Profile from "./kakao/Profile";
import RepleBoardPage from "./repleboard/RepleBoardPage";

function App({imageUploader}) {
  return (
    <>
      <Routes>
        {/* 컴포넌트 함수를 호출하는 것이다.(렌더링발생) - 마운트 - return이 호출되었다 */}
        <Route path='/deptdetail/:deptno' element={<DeptDetail imageUploader={imageUploader}/> } />

        <Route path='/repleboard' element={<RepleBoardPage/> } />
        <Route path='/dept/:gubun' element={<DeptPage imageUploader={imageUploader}/> } />
        <Route path='/home' exact={true} element={<HomePage/> } />
        <Route path='/profile' exact={true} element={<Profile/> } />
        <Route path='/' exact={true} element={<LoginPage/> } />
        <Route path='/auth/kakao/callback' exact={true} element={<KakaoRedirectHandler/> } />
        <Route path='/member' exact={true} element={<MemberPage imageUploader ={imageUploader}/>}/>
      </Routes>
    </>
  );
}

export default App;
