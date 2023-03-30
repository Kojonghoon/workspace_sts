/* global daum */
import React, { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { memberInsertDB } from "../../service/dbLogic";
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from "../styles/FormStyle";
//회원가입 페이지
const Signup = () => { // 컴포넌트 함수
    //useXXX 훅이라 함 = 16.8버전 - 그 전까지는 클래스(this이슈- 신입개발자) 지원되던 것을
    //함수형 프로그래밍에 대한 이점으로 훅을 지원하게 되었다.
    const navigate = useNavigate();
    const [mem_uid, setMemuid ] = useState('')
    const [mem_pw, setMempw ] = useState('')
    const [mem_name, setMemname ] = useState('')
    const [mem_nickname, setMemnickname ] = useState('')
    const [mem_email, setMememail ] = useState('')
    const [mem_tel, setMemtel ] = useState('')
    const [mem_gender, setMemgender ] = useState('')
    const [mem_birthday, setMembirthday ] = useState('')
    const [mem_zipcode, setMemZipcode ] = useState('')
    const [mem_addr, setMemAddr ] = useState('')
    const [mem_addrdtl, setMemAddrdtl ] = useState('')
    const [post, setPost ] = useState({
      zipcode:"",
      addr:"",
      addrdtl:"",
    })
    //Post, @RequestBody, {} -> Map or Vo -> 비동기처리 ->Promise(resolve, reject)
    //async - await
    const memberInsert =async()=>{
        const member={
            mem_uid:mem_uid,    // mem_uid 똑같음 왼쪽이 키값 오른쪽이 밸류 값
            mem_pw:mem_pw ,
            mem_name:mem_name,
            mem_nickname:mem_nickname,
            mem_email:mem_email,
            mem_gender:mem_gender,
            mem_birthday:mem_birthday,
            mem_tel:mem_tel,
            // mem_zipcode:mem_zipcode,
            // mem_addr:mem_addr,
            // mem_addr_dtl:mem_addr_dtl,
        }
        const res = await memberInsertDB(member)
        console.log(res+","+res.data)
        if(!res.data){
           console.log('회원 가입에 실패하였습니다.')
        }
        else{
            console.log('회원 가입 성공')
            //회원가입 성공시 로그인 화면으로 이동
            navigate("/login")
         }
      }  //end of deptInsert
    //사용자가 입력한 값을 useState에 초기화 하기

    const handleID = useCallback((e)=>{
        setMemuid(e)
    },[])
    const handlePW = useCallback((e)=>{
        setMempw(e)
    },[])
    const handleName = useCallback((e)=>{
        setMemname(e)
    },[])
    const handleNickname = useCallback((e)=>{
        setMemnickname(e)
    },[])
    const handleEmail = useCallback((e)=>{
        setMememail(e)
    },[])
    const handleTel = useCallback((e)=>{
        setMemtel(e)
    },[])
    const handleGender = useCallback((e)=>{
        setMemgender(e)
    },[])
    const handleBirthday = useCallback((e)=>{
        setMembirthday(e)
    },[])
    const handleZipcdoe = useCallback((e)=>{
        setMemZipcode(e)
    },[])
    const handleAddr = useCallback((e)=>{
        setMemAddr(e)
    },[])
    const handleAddrDtl = useCallback((e)=>{
        setMemAddrdtl(e)
    },[])

    const clickAddr =(event)=>{
      event.preventDefault()
      new daum.Postcode({
        oncomplete: function(data) {
          let addr=''
          if(data.userSelectedType==='R'){
            addr=data.roadAddress;  //도로명
          }
          else{
            addr=data.jibunAddress; //도로명
          }
          console.log(data) //전체 주소 정보 - 한글 + 영어
          console.log(addr) //주소정보만
          setPost({...post, zipcode:data.zonecode,addr:addr}) //깊은복사
          document.querySelector("#mem_zipcode").value=data.zonecode //화면에 자동으로 입력처리
          document.querySelector("#mem_addr").value=addr  //선택한 주소정보를 imput 컴포넌트에 자동입력 처리
          document.querySelector("#mem_addr_dtl").focus() // addr이 입력 되었을 떄 커서 자도 ㅇ이동처리
        }
    }).open();
    }

  return (
    <>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{ marginLeft: "10px" }}>회원가입</h3>
        </HeaderDiv>
        <FormDiv>
          <div style={{ width: "100%", maxWidth: "2000px" }}>

            <div style={{display: "flex",justifyContent: "space-between", marginBottom: "5px", }} >
              <h4>아이디</h4>
            </div>
            <input id="mem-uid" type="text" maxLength="50" placeholder="아이디를 입력하세요."
              style={{width: "200px",height: "40px",border: "1px solid lightGray", marginBottom: "5px", }} onChange={(e)=>{handleID(e.target.value)}}/>

            <div style={{display: "flex",justifyContent: "space-between", marginBottom: "5px", }} >
              <h4>비밀번호</h4>
            </div>
            <input id="mem_pw" type="text" maxLength="50" placeholder="PW를 입력하세요."
              style={{width: "200px",height: "40px",border: "1px solid lightGray", marginBottom: "5px",}} onChange={(e)=>{handlePW(e.target.value)}}/>
            
            <div style={{display: "flex",justifyContent: "space-between", marginBottom: "5px", }} >
              <h4>비밀번호 확인</h4>
            </div>
            <input id="mem_pw2" type="text" maxLength="50" placeholder="PW를 확인하세요."
              style={{width: "200px",height: "40px",border: "1px solid lightGray", marginBottom: "5px",}} />
            
            <div style={{display: "flex",justifyContent: "space-between", marginBottom: "5px", }} >
              <h4>이름</h4>
            </div>
            <input id="mem_name" type="text" maxLength="50" placeholder="이름를 입력하세요."
              style={{width: "200px",height: "40px",border: "1px solid lightGray", marginBottom: "5px",}} onChange={(e)=>{handleName(e.target.value)}}/>
            
            <div style={{display: "flex",justifyContent: "space-between", marginBottom: "5px", }} >
              <h4>닉네임</h4>
            </div>
            <input id="mem_nickname" type="text" maxLength="50" placeholder="닉네임을 입력하세요."
              style={{width: "200px",height: "40px",border: "1px solid lightGray", marginBottom: "5px",}} onChange={(e)=>{handleNickname(e.target.value)}}/>
            
            <div style={{display: "flex",justifyContent: "space-between", marginBottom: "5px", }} >
              <h4>이메일</h4>
            </div>
            <input id="mem_email" type="text" maxLength="50" placeholder="이메일을 입력하세요."
              style={{width: "200px",height: "40px",border: "1px solid lightGray", marginBottom: "5px",}} onChange={(e)=>{handleEmail(e.target.value)}}/>

            <div style={{display: "flex",justifyContent: "space-between", marginBottom: "5px", }} >
              <h4>전화번호</h4>
            </div>
            <input id="mem_tel" type="text" maxLength="50" placeholder="전화번호를 입력하세요."
              style={{width: "200px",height: "40px",border: "1px solid lightGray", marginBottom: "5px",}} onChange={(e)=>{handleTel(e.target.value)}}/>
            
            <div style={{display: "flex",justifyContent: "space-between", marginBottom: "5px", }} >
              <h4>성별</h4>
            </div>
            <input id="mem_gender" type="text" maxLength="50" placeholder="성별을 선택하세요."
              style={{width: "200px",height: "40px",border: "1px solid lightGray", marginBottom: "5px",}} onChange={(e)=>{handleGender(e.target.value)}}/>
            
            <div style={{display: "flex",justifyContent: "space-between", marginBottom: "5px", }} >
              <h4>생일</h4>
            </div>
            <input id="mem_birthday" type="text" maxLength="50" placeholder="생일을 입력하세요."
              style={{width: "200px",height: "40px",border: "1px solid lightGray", marginBottom: "5px",}} onChange={(e)=>{handleBirthday(e.target.value)}}/>
            
            <div style={{display: "flex",justifyContent: "space-between", marginBottom: "5px", }} >
              <h4>우편번호</h4>
            </div>
            <input id="mem_zipcode" type="text" maxLength="50" placeholder="우편번호 입력."
              style={{width: "200px",height: "40px",border: "1px solid lightGray", marginBottom: "5px",}} onChange={(e)=>{handleZipcdoe(e.target.value)}}/>
            
            <div style={{display: "flex",justifyContent: "space-between", marginBottom: "5px", }} >
              <h4>주소입력</h4>
            </div>
            <input id="mem_addr" type="text" maxLength="50" placeholder="우편번호 입력."
              style={{width: "200px",height: "40px",border: "1px solid lightGray", marginBottom: "5px",}} onChange={(e)=>{handleAddr(e.target.value)}}/>
            
            <div style={{display: "flex",justifyContent: "space-between", marginBottom: "5px", }} >
              <h4>상세주소</h4>
            </div>
            <input id="mem_addr_dtl" type="text" maxLength="50" placeholder="상세주소를 입력사에요." readOnly={post.addr?false:true}
              style={{width: "350px",height: "40px",border: "1px solid lightGray", marginBottom: "5px",}} onChange={(e)=>{handleAddrDtl(e.target.value)}}/>
              <Button onClick={clickAddr}>주소검색</Button>


            <div style={{ display: "flex", justifyContent: "space-between",  marginBottom: "5px", }} >
              <hr style={{ margin: "10px 0px 10px 0px" }} />
            </div>
                <BButton onClick={memberInsert}>가입</BButton>
          </div>
        </FormDiv>
      </ContainerDiv>
    </>
  );
};
export default Signup;
