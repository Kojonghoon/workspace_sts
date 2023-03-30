  // Flux Architecture = OneWay binding
  //콜백함수
  //document.querySelector("#root").addEventListener('click',function(){})
  //함수 선언 - 일급객체시민 - 함수를 파라미터로 넘김, return을 넘김 , 할당가능
  //함수는 어디든 갈 수 있는 권리가 있다
const createStore = () => {
  console.log(worker)
    // 외부 함수에서 선언한 변수를 내부 함수에서 사용 가능
  let state; // state.js ; 상태 관리가 필요한 변수 꾸러미
  //구독신청한 이벤트 들의 꾸러미 담기
  let handlers=[]
  const subscribe=(handler)=>{  //자바스크립트 문법 코드 분석 가치
    handlers.push(handler)
  }
    //외부에서 구독신청을 한 회원들에게 알림처리 - 구독발행 모델 패턴 적용한다.
    // 위에서 선언된 상태 점보를 담은 변수를 새로운 상태 정보로 치환 (기존 참조를 끊음)
  const send = (action) => {
    // worker 함수의 파라미터로 state를 두는 것은 기존에 상태 정보에 추가된 상태 정보 변경사항을 담기 위함
    // 5열에서 선언된 변수에 새로운 상태 정보가 추가된 상태 정보를 갖는 주소 번지 치환
    state = worker(state, action);
    handlers.forEach(handler=>handler())
  };
    // 내부 함수(클로저)
  const getState = () => {
    // react -> redux 사용
    return state; // 관리하고 있는 상태값 모두 ; {} 객체 리터럴
  };
    // 구독 발행 모델
    
    // return 타입에 함수 이름을 반환하는 것은 외부에서 호출하기 위함 -> API
  return {
    // 객체리터럴을 사용하면 여러 개의 함수를 외부에서 사용 가능
    getState,
    send,
    subscribe,
  };
}; //end of createStore
// 여기까지가 함수(일급 객체 시민 ; 함수를 파라미터로 넘김, return으로 넘김, 할당 가능) 선언



  // 함수는 어디서든 사용 가능
const worker = (state = { count: 0 }, action) => {
  // state가 undefined 가 되면 안 되니까 객체 리터럴로 대입
  // 여기서 상태 변경 시 createStore에 있는 state 참조 무결성 조건이 깨지게 됨
  // redux에서는 상태를 변경하는 함수를 새로운 상태를 반환하라는 규칙 생성 -> 깊은 복사 사용
  switch(action.type){
    case'increase':
      return{...state, count:state.count+1};//원복을 유지
    default:
      return {...state}
  }//end of switch
};//end of worker

  // store 함수 호출
  // const store = lagacy_creatStore(reducer) -> reducer.js
  // 상태는 createStore 안에 있음
  // 누가 이 상태를 변경하고 읽어 ??
  // worker 함수의 switch 문에서 action.type에 따라서 상태를 변경하거나 읽어냄
  // 변경되고 읽어낸 정보는 return으로 처리
  // store를 모아 상태의 묶음을 넘김 -> createStore
const store = createStore(worker);
store.subscribe(()=>{
  console.log(store.getState())
})
  // 아래와 같이 store에 내부 함수를 외부에서 호출하려면 반드시 return에 등록
  // action의 내용을 만드는 역할은 send를 하는 쪽에서 만들어줌
store.send({type:'increase'});
store.send({type:'increase'});
store.send({type:'increase'});

  //아래 코드로는 새로운 상태값을 확인 불가함
  // console.log(store.state)
  // console.log(store.getState());
  // store.send();
  // console.log(store.getState());

  /* UI한테 직접적인 상태 주지 않음
    그래서 여기서 return 하는 것에는 state 주지 않음 (리덕스 컨벤션)
    state를 그냥 주는 것은 자바스크립트 콘셉트

    문제제기
    느닷없이 맥락없이 1을 증가하는 컨셉
  */
