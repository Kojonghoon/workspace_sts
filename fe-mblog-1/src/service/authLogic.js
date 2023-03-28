import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
class AuthLogic {
  constructor() {
    this.auth = getAuth();
    this.googleProvider = new GoogleAuthProvider();
  }
  getUserAuth = () => {
    return this.auth;
  };
  getGoogleAuthProvider = () => {
    return this.googleProvider;
  };
}

export default AuthLogic;

//사용자ㅓ가 변경되는지 지속적으로 체크하여 변경될 떄 마다 호출됨
export const onAuthChange = (auth) => {
  return new Promise((resolve) => {
    //사용자가 바뀌었을 때 콜뱀함수를 받아서
    auth.onAuthStateChanged((user) => {
        resolve(user)
      //사용자가 바뀔때 마다
    });
  }); //end of promise
}; //end of onAuthChange

//로그아웃 버튼 클릭시 호출하기
export const logout = (auth) => {
  return new Promise((resolve, reject) => {
    auth.signOut().catch((e) => reject(e + "로그아웃 오류입니다."));
    //로그인 성공 시  세션 스토리지에 담아둔 정보를 모두 지운다
    sessionStorage.clear();
    //서비스를 더 이상 사용하지 않는 경우이므로 돌려줄 값은 없다
    resolve(); //그래서 파라미터는 비웠다
  });
}; //end if logout

//로그인 시도시 구글인증 인지, 아니면 깃허브 인증인지 문자열로 넘겨받음
//구글인증인 경우 - Google
//깃 허브 인증인 경우 - Github
export const loginGoogle = (auth, googleProvider) => {
  return new Promise((resolve, reject) => {
    //제공자의 정보이면 팝업을 띄워서 로그인을 진행하도록 유도함
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user; //구글에 등록되어 있는 profile 정보가 담겨있음
        console.log(user);
        resolve(user);
      })
      .catch((e) => reject(e));
  });
};