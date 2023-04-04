package com.example.demo.logic;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.demo.dao.RepleBoardDao;

@Service
public class RepleBoardLogic {
	Logger logger = LogManager.getLogger(RepleBoardLogic.class);

	@Autowired
	private RepleBoardDao repleBoardDao = null;

	public int qnaInsert(Map<String, Object> pMap) {
		logger.info("qnaInsert 호출");
		// 여기서 result는 insert 성공 유무를 나타내는 숫자(성공:1, 실패: 0)가 아니라
		// 글 등록 시 채번된 시퀀스를 돌려 받는 값
		// qna_bno 값 받아와야함
		int result = 0;
		result = repleBoardDao.qnaInsert(pMap);
		// 위에서 돌려받은 시퀀스값(qna_bno)를 pMap에 담음
		// 키값이 소문자이면 #{qna_bno}, 대문자이면 #{QNA_BNO}
		// 사용자가 입력한 값의 키값은 모두 소문자로 사용
		pMap.put("qna_bno", result);
		// 선택한 이미지 존재 ??
		if (pMap.get("fileNames") != null) {
			// 작성자가 선택하는 이미지 갯수 다름
			// 3개이면 3개 담아야함 - 3개에 대한 update 3번 일어나야함
			List<Map<String, Object>> fList = fileNames(pMap);
			logger.info(fList);
			repleBoardDao.fileUpdate(fileNames(pMap));
		}
		return result;
	}

	private List<Map<String, Object>> fileNames(Map<String, Object> pMap) {
		logger.info("fileNames");
		logger.info(pMap.get("fileNames"));
		List<Map<String, Object>> pList = new ArrayList<>();
		// pMap.get("fileNames") =>
		HashMap<String, Object> fMap = null;
		String[] fileNames = pMap.get("fileNames").toString()
				.substring(1, pMap.get("fileNames").toString().length() - 1).split(",");
		for (int i = 0; i < fileNames.length; i++) {
			fMap = new HashMap<String, Object>();
			fMap.put("file_name", fileNames[i]);
			fMap.put("qna_bno", pMap.get("qna_bno"));
			pList.add(fMap);
		}
		return pList;
	}

	public String imageUpload(MultipartFile image) {
		logger.info("imageUpload 호출 성공");
		// 이미지 업로드가 된 파일에 대한 file_name, file_size, file_path등을 결정해줌 - 서비스 계층이다 - 과장, 차장,
		// 부장
		Map<String, Object> pMap = new HashMap<>();
		// 사용자가 선택한 파일 이름 담기
		String filename = null;
		String fullPath = null;
		double d_size = 0.0;
		if (!image.isEmpty()) {
			// filename = image.getOriginalFilename();
			// 같은 파일명으로 업로드 되는 경우 덮어쓰기 되는 것을 방지 하고자 오리지널 파일명 앞에 날짜와 시간정보를 활용하여
			// 절대 같은 이름이 발생하지 않도록 처리해 본다
			// 이미지에 대한 업로드이므로 첨부파일 크기 계산은 하지 않음
			// 스프링 프ㄹ로ㅓ젝트ㅇ가 바라보는 물리적인 위치
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			Calendar time = Calendar.getInstance();
			filename = sdf.format(time.getTime()) + "-" + image.getOriginalFilename().replaceAll(" ", "-");
			String saveFolder = "D:\\koko\\workspace_sts\\mblog-1\\src\\main\\webapp\\pds";
			fullPath = saveFolder + "\\" + filename;
			try {
				// file객체는 파일명을 개체화 해주는 클래스임 - 생성되었다고 해서 실제 파일까지 생성되는 것이 아님
				File file = new File(fullPath);
				byte[] bytes = image.getBytes();
				// outstream을 반드시 생성해서 파일정보를 읽어서 쓰기를 처리해줌
				// BufferedOutputStream은 필터 클래스이지 실제 파일 쓸수 없는 객체
				// 실제 파일 쓰기가 가능한 FileOutputStream클래스
				BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(file));
				bos.write(bytes);
				// 파일쓰기와 관련 위변조 방지 위해 사용후 반드시 닫을 것
				bos.close();
				// 여기 까지는 임시 파일쓰기 처리였고 이 다음에는 mblog_file테이블에 insert될 정보를 초기화 해줌
				d_size = Math.floor(file.length() / (1024.0) * 10) / 10;
				logger.info(d_size);
				logger.info(filename);
				logger.info(fullPath);
				pMap.put("file_name", filename);
				pMap.put("file_size", d_size);
				pMap.put("file_path", fullPath);
				int result = repleBoardDao.fileInsert(pMap);
				logger.info(result);
			} catch (Exception e) {
				e.printStackTrace();
				logger.info(e.toString());
			}
		}
		// 리턴 값으로 선택한 이미지 파일명을 넘겨서 사용자 화면에 처부된 파일명을 열거해 주는데 사용할 것임
		String temp = filename;
		return temp;
	}

	public List<Map<String, Object>> qnaList(Map<String, Object> pMap) {
		logger.info("qnaList 호출");
		List<Map<String, Object>> bList = null;
		bList = repleBoardDao.qnaList(pMap);
		return bList;
	}

	public int qnaUpdate(Map<String, Object> pMap) {
		logger.info("qnaUpdate 호출 성공");
		int result = 0;
		result = repleBoardDao.qnaUpdate(pMap);
		return result;
	}

	public int qnaDelete(Map<String, Object> pMap) {
		logger.info("qnaDelete 호출 성공");
		int result = 0;
		result = repleBoardDao.qnaDelete(pMap);
		return result;
	}

	public int boardInsert(Map<String, Object> pMap) {
		logger.info("boardInsert 호출 성공");
		int result = 0;
		result = repleBoardDao.boardInsert(pMap);
		return result;
	}

	public int boardDelete(Map<String, Object> pMap) {
		logger.info("boardInsert 호출 성공");
		int result = 0;
		result = repleBoardDao.boardDelete(pMap);
		return result;
	}

	public int boardUpdate(Map<String, Object> pMap) {
		logger.info("boardInsert 호출 성공");
		int result = 0;
		result = repleBoardDao.boardUpdate(pMap);
		return result;
	}

}
