import { decrease, increase, setToatstFalse, setToatstMsg } from "./action.js";
import { reducer } from "./reducer.js";
import { createStore } from "./redux.js";

//사용 - 함수 호출 - store생성하기 - index.js - 리액트 - 왜? index.js인가?
//app.js에 있는 코드가 리액트 컴포넌트에 써야하는 코드임
//문제제기 - app.js 하나에 모두 있을 때는 파라미터에 reducer(구:worker)
//자바스크립트에서는 함수도 파라미터 넘길 수 있다
const store = createStore(reducer);//index.js에서 생성할 것임 - props 대신 중앙에서 즉시 한번에 가져다 사용
//subscribe함수 호출시 파라미터로 콜백함수를 넘김
store.subscribe(function(){ //구독발행 모델 - 함수 호출
  //getState리액트에서 useSelector(stat=>state.userAuth) 상태값을 store에서 읽어들일 때 사용함
  console.log(store.getState())  //변경된 상태값 찍기 - 리액트 컴포넌트가 마운트 될 때 찍기
  const state = store.getState()
  document.querySelector('#count').append(state.count)
  document.querySelector('#msg').append(state.msg)
})

//해당 컴포넌트에서 state값을 가져오기 - useSelector훅
store.dispatch(increase()); //시그널 주기 - action - 리액트 const dispatch = useDispatch ->dipatch(type, payload)
store.dispatch(increase()); //시그널 주기 - action
store.dispatch(decrease()); //시그널 주기 - action
//insert here
store.dispatch(setToatstMsg('관리자에게 문의하세요'));
store.dispatch(setToatstFalse());