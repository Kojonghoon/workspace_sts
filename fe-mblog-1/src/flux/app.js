//flux architecture - one way binding
//함수 선언 - 일급객체시민 - 함수를 파라미터로 넘김, return을 넘김 , 할당가능

const { legacy_createStore } = require("redux");

//함수는 어디든 갈 수 있는 권리가 있다
const createStore = () => {
  //외부함수에서 선언한 변수를 내부함수에서 사용 가능
  let state;//state.js - 상태 관리가 피룡한 변수 꾸러미 (묶음)
  //내부함수 - 클로저 검색
  //https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures
  const getState=()=>{//react-redux제공
    return state  //네가 관리하는 상태값 모두 말함 - {} 객체 리터럴
  }
  //리턴타입에 함수이름을 반환하는건 외부에서 호출하기 위해서이다 -API
  return{ //객체리터럴을 사용하면 여러개의 함수를 외부에서 사용가능함
    getState
  }
};

const worker = ()=>{
  
}
//스토어 함수 호출하기
//const store = legecy_createStore(reducer) // reducer.js
const store = legacy_createStore();



/* 
  UI한테는 직접적인 상태를 주지 않을 거야
*/