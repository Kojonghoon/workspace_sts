function first(param){
    console.log(param)  //[function 이름이없는]
    param()
}

function second(){
    console.log(2)
}

first(second)
//https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures - 클로저
//순서대로 처리가 되어야 할때
function func1(){   //outter함수 - 클로저
    let num = 0 //선언된 변수
    // return ()=>{
    return function func2(){ //반환형이 함수인 경우임
        return ++num    //여기서 사용 가능함
    }
}

let account = func1()
console.log(account)  //괄호가 없으면 [Function]
console.log(account())


function one(){
    console.log(1)
}
function two(){
    console.log(2)
}

one()
two()
