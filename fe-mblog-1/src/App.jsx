import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import DeptPage from "./components/page/DeptPage";
import HomePage from "./components/page/HomePage";
import MemberPage from "./components/page/MemberPage";
import KakaoRedirectHandler from "./kakao/KakaoRedirectHandler";
import Profile from "./kakao/Profile";

function App({imageUploader}) {
  return (
    <>
      <Routes>
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
