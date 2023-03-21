// 상태는 createStore() 안에 있음
const createStore = () => {
  let state; // 상태를 담아두는 저장소
  let handlers = []; // 함수를 담아두는 배열 선언
  // 상태를 바꾸는 일을 send 함수가 실행
  const send = (action) => {
    console.log("send 호출");
    // 새로운 객체가 만들어짐
    state = worker(state, action);
    handlers.forEach((handler) => handler());
  };

  const subscribe = (handler) => {
    handlers.push(handler);
    console.log(store.getState());
  };

  const getState = () => {
    return state;
  };

  // 함수 안에서 함수를 리턴하도록 처리해야 바깥에서 해당 함수를 요청할 수 있음
  return {
    // 리턴 안에 값들은 다 함수(=객체)
    send, // 파라미터로 들어온 상태를 받아 가공해서 새로운 객체로 내보냄
    getState, // 상태 정보를 담은 state 반환
    subscribe,
  };
};

//react-redux에서는 worker가 Dispacher가 됨
const worker = (state = { count: 0 }, action) => {
  // state가 undefined 되는 것을 방지하기 위해 객체 선언
  // 무엇을 해야 해 ???
  // 상태를 바꾸면 createStroe 안에 state의 참조 무결성이 깨짐
  // 리덕스에서는 사태를 바꾸는 함수는 반드시 새로운 상태를 반환
  // 새로운 상태라는 입력(Action)으로 상태 객체를 줄테니 이 객체를 깊은 복사하여
  // 기존의 참조 끊음 - 그래야 side effect방지 가능
  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + 1 };
    case "decrease":
      return { ...state, count: state.count - 1 };
    default:
      return { ...state };
  }
  return { ...state, count: state.count + 1 }; // 깊은 복사
};

// 자바 스크립트에서는 함수도 파라미터로 넘기기 가능
const store = createStore(worker);  //index.js에서 생성할 것임 props대신 중앙ㅅ에서 즉시 한번에 가져다 사용

//subscript함수 호출시 파라미터로 넘길 수 있다.
store.subscribe(function () {
  console.log(store.getState());
});

store.send({ type: "increase" });   //시그널 주기 - action
store.send({ type: "increase" });   
store.send({ type: "decrease" });
//store.send({type : default});
//store.send()
// console.log(store.getState())








/*
  자바 스크립트에서 함수는 객체
  소문자로 선언 시 함수, 대문자로 선언 시 화면을 랜더링하는 컴포넌트
  return에서는 상태값을 직접 넘겨주지 않음
  상태는 createStore 함수에 있지만 변경, 읽기 코드는 UI의 컴포넌트들이 함
  컴포넌트들은 createStore 함수의 바깥에 위치
  1 UI에는 직접적인 상태를 주지 않음 (createStore가 직접 전달하지는 않음)
  
  문제 제기
  컴포넌트(HomePage.jsx, LoginPage.jsx)가 여러 개 있는 상황에서 어떤 컴포넌트가
  데이터 변경되었는지 어떻게 알고 getState 함수 호출 ??
  ; 구독 발행 모델(사용자가 어떠한 함수를 주면 데이터 변경 시 그 함수를 호출(이벤트 처리)) - Pub and Subscribe
  */
