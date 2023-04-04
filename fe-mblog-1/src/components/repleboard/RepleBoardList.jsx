import React, { useEffect, useState } from 'react'
import { qnaListDB } from '../../service/dbLogic'
//고려사항 - 상위 컴포넌트에서 하위 컴포넌트로 만  props 전달이 가능한 점
//일반적으로는 가급적 상위 컴포넌트에 두는 것을 추천함
//중급 - 하위 컴포넌트에서 일어난 상태 변화를 상위 컴포넌트에 반영할 수 있는 사람
//리렌더링 - 1),2),3) - 미묘한 문제 - useEffect, useMemo(값), useCallback(함수), - 의존성배열을 갖는다
//[]-맨처음 딱 한번
//의존성 배열이 없으면 코딩할 때마다 호출
//의존성배열에 입력한 변수가 바뀔때 마다 호출 -다중처리 - 주의 : 의존성 배열에는 전변만 가능, 지변 X
const RepleBoardList = () => {
  
  const [board,setBoard] = useState({
    cb_gubun : 'qna_title',
    keyword:'PT10회권양도합니다.'
  })

  const [boards,setBoards] = useState([{}])

  useEffect(()=>{
    const qnaList = async() =>{//비동기처리로 요청
      const res = await qnaListDB(board)//async가 있을때 await사용가능함
      console.log(res.data)
      setBoards(res.data)
    }
    qnaList()//호출
  },[board])

  return (
    <>
    {
      boards.map((item,index)=>(
        <tr key ={index}>
          <td>{item.QNA_BNO}</td>
          <td>{item.QNA_TITLE}</td>
          <td>{item.MEM_NAME}</td>
          <td>{item.QNA_DATE}</td>
          <td>{item.QNA_HIT}</td>
        </tr>
      ))
    }
    </>
  )
}

export default RepleBoardList