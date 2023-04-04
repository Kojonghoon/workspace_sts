package com.example.demo.dao;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepleBoardDao {
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate = null;
	Logger logger = LogManager.getLogger(RepleBoardDao.class);

	public int fileInsert(Map<String, Object> pMap) {
		logger.info("fileInsert 호출");
		int result = 0;	// 입력이 성공했는지 유무를 담는 변수선언
		result = sqlSessionTemplate.update("fileInsert", pMap);
		return result;
	}

	public void  fileUpdate(List<Map<String, Object>> pList) {
		logger.info("fileUpdate 호출 성공");
		logger.info(pList);
		int result = 0;
		result = sqlSessionTemplate.update("fileUpdate", pList);
		logger.info(result);
	}

	public List<Map<String, Object>> qnaList(Map<String, Object> pMap) {
		logger.info("qnaList 호출");
		List<Map<String, Object>> bList = null;
		bList = sqlSessionTemplate.selectList("qnaList", pMap);
		return bList;
	}

	public int qnaInsert(Map<String, Object> pMap) {
		logger.info("qnaInsert 호출");
		int result = 0; // 입력시 성공했는지 유무를 담는 변수선언
		int qna_bno = 0;// insert시에 시퀀스로 채번된 속성을 담을 변수 - 여기서는 시퀀스로 채번되는 qna_bno임
		result = sqlSessionTemplate.update("qnaInsert", pMap);
		if (result == 1) {
			if (pMap.get("qna_bno") != null) {
				qna_bno = Integer.parseInt(pMap.get("qna_bno").toString());
			}
		}
		logger.info("result 가져오기 : " + result);
		logger.info("useGeneratedKeys 프로퍼티 속성값 가져오기 : " + qna_bno);
		return qna_bno;
	}

	public int qnaUpdate(Map<String, Object> pMap) {
		logger.info("boardUpdate 호출 성공");
		int result = 0;
		result = sqlSessionTemplate.update("qnaUpdate", pMap);
		return result;
	}

	public int qnaDelete(Map<String, Object> pMap) {
		logger.info("boardDelete 호출 성공");
		int result = 0;
		result = sqlSessionTemplate.delete("qnaDelete", pMap);
		return result;
	}

	public List<Map<String, Object>> boardList(Map<String, Object> pMap) {
		logger.info("boardDao 호출 성공");
		List<Map<String, Object>> bList = null;
		bList = sqlSessionTemplate.selectList("boardList", pMap);
		return bList;
	}

	public int boardInsert(Map<String, Object> pMap) {
		logger.info("boardInsert 호출 성공");
		int result = 0;
		result = sqlSessionTemplate.update("boardList", pMap);
		return result;
	}

	public int boardDelete(Map<String, Object> pMap) {
		logger.info("boardDelete 호출 성공");
		int result = 0;
		result = sqlSessionTemplate.delete("boardDelete", pMap);
		return result;
	}

	public int boardUpdate(Map<String, Object> pMap) {
		logger.info("boardUpdate 호출 성공");
		int result = 0;
		result = sqlSessionTemplate.update("boardUpdate", pMap);
		return result;
	}

}
