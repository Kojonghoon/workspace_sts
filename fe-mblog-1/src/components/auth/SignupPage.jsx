import React from 'react';
import KhSignup from './KhSignup';
import Signuptype from './Signuptype';

const SignupPage = ({authLogic}) => {
    //window.location.search 쿼리스트링 가져오기
  const type = window.location.search.split('=')[1]
  console.log(type);
  const signupage = () => {
    if(type){
      return <KhSignup authLogic={authLogic} />
    } else {
      return <Signuptype/>
    }
  } 

  return (
    signupage()
  );
};

export default SignupPage