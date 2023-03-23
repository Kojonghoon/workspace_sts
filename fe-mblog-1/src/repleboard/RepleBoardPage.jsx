import React from 'react'
import { Button, Table } from 'react-bootstrap'
import BlogFooter from '../components/include/BlogFooter'
import BlogHeader from '../components/include/BlogHeader'

const RepleBoardPage = () => {
  const boardSearch=()=>{
    
  }
  return (
    <>
      <BlogHeader/>
         <div className='container'>
         <div className="page-header">
         <h2>댓글형 게시판&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;<small>게시글목록</small></h2>
            <hr />
            </div>
         <div className="row">
            <div className="col-3">
            <select id="gubun" className="form-select" aria-label="분류선택">
                  <option defaultValue>분류선택</option>
                  <option value="b_no">글번호</option>
                  <option value="b_title">글제목</option>
                  <option value="b_content">내용</option>
            </select>
            </div>
                  <div className="col-6">
                     <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요"
                     aria-label="검색어를 입력하세요" aria-describedby="btn_search" />
                  </div>
                  <div className="col-3">
                     <Button variant='danger' id="btn_search" onClick={boardSearch}>검색</Button>
                  </div>
            </div>
         <div className='book-list'>
            <Table striped bordered hover>
            <thead>
                  <tr>
                  <th>글번호</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  <th>조회수</th>
                  </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>댓글형 게시판 구현</td>
                <td>관리자</td>
                <td>2023-03-23</td>
                <td>17</td>
              </tr>
            </tbody>
            </Table>
            <hr />
            <div className='booklist-footer'>
            <Button variant="warning" >
                  전체조회
            </Button>&nbsp;
            <Button variant="success" >
                  부서등록
            </Button>
            </div>
         </div>
         </div>
         {/* ========================== [[ 도서등록 Modal ]] ========================== */}

         {/* ========================== [[ 부서등록 Modal ]] ========================== */}
         <BlogFooter/>
    </>
  )
}

export default RepleBoardPage