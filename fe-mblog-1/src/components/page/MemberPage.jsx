import React, { useEffect, useState } from 'react'
import { memberListDB } from '../../service/dbLogic'

const MemberPage = ({imageUploader}) => {
    const [member, setMember] = useState({})
    useEffect(()=>{
        const memberList =async()=>{
            const res =await memberListDB(member)
            console.log(res.data)
        }
        memberList()
    },[])
    //async는 비동기 처리시 사용함
    const imgChange = async(event)=>{
      console.log(event.target.files[0])
      //async가 붙은 함수안에서만 await를 사용할 수있음 - 파일이 업로드 될 때 까지 기다림
      const uploaded = await imageUploader.upload(event.target.files[0])
      //public_id 선택하면 이미지의 실제 아이디가 아닌 cloudnary에서 부여하는 아이디 값
      //이 값으로 실제 이미미지 링크 정보가 생성됨
      //format은 선택한 파일의 확장자임
      //url 링크 이미지 URL정보
      console.log(`${uploaded.public_id}${uploaded.format}${uploaded.url}`)
    }
  return (
    <div>
      <h3>회원관리 페이지 입니다.</h3>
      <input type="file" name='mimg' id='mimg' onChange={imgChange}/>
    </div>
  )
}

export default MemberPage
