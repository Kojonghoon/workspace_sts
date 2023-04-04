package com.example.demo.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.demo.logic.RepleBoardLogic;
import com.google.gson.Gson;

@RestController
@RequestMapping("/reple/*")
public class RepleBoardController {
	Logger logger = LogManager.getLogger(RepleBoardController.class);
	@Autowired
	private RepleBoardLogic repleBoardLogic = null;

	@GetMapping("qnaList")
	public String boardList(@RequestParam Map<String, Object> pMap) {
		logger.info("qnaList 호출");
		List<Map<String, Object>> bList = null;
		bList = repleBoardLogic.qnaList(pMap);
		Gson g = new Gson();
		String temp = g.toJson(bList);
		return temp;
	}

	//http://localhost:8000/reple/qnaList?content=제목
	//http://localhost:8000/reple/qnaList?content=제목&condition=내용
	@PostMapping("qnaInsert")
	public String qnaInsert(@RequestBody Map<String, Object> pMap) {//리액트에서 body
		logger.info("qnaInsert호출");	//해당 메소드 호출여부 찍어보기
		logger.info(pMap);//리액트 화면에서 넘어온 값 출력해보기
		//회원번호르르 int타입으로 변경하지 않으면 부적합한 열유형 111에러 메시지 - 다 이문제
		//Map, List : Object주의할것 - 부적합한 열유형 setNull(111)
		if(pMap.get("mem_no")!=null) {
			//NumberFormatException 원인이 됨
			int mem_no = Integer.parseInt(pMap.get("mem_no").toString());
			pMap.put("mem_no",mem_no);
		}
		logger.info(pMap.toString());
		int result = 0;
		result = repleBoardLogic.qnaInsert(pMap);
		return String.valueOf(result);
	}
	
	// 업데이트
		@PostMapping("qnaUpdate")
		public String qnaUpdate(@RequestBody Map<String, Object> pMap) {
			logger.info("qnaUpdate호출");
			int result = 0;
			result = repleBoardLogic.qnaUpdate(pMap);
			return String.valueOf(result);
		}
		
		// 딜리트
		@GetMapping("qnaDelete")
		public String qnaDelete(@RequestBody Map<String, Object> pMap) {
			logger.info("qnaDelete호출");
			int result = 0;
			result = repleBoardLogic.qnaDelete(pMap);
			return String.valueOf(result);
		}

	@GetMapping("imageGet")
	public Object imageGet(HttpServletRequest req, HttpServletResponse res) {
		// imagename 정보는 공통코드로 제공된 QuillEditor.jsx에서 파라미터로 넘어오는 값임
		// imageupload 메소드에서는 업로드된 파일정보(팜일명, 파일크기)가 리턴됨
		String b_file = req.getParameter("imageName");// get방식으로 넘어온
		logger.info("imageGet 호출 성공===>" + b_file);// XXX.png
		String filePath = "D:\\koko\\workspace_sts\\mblog-1\\src\\main\\webapp\\pds"; // 절대경로.
		String fname = b_file;
		logger.info("b_file: 8->euc" + b_file);
		// File은 내용까지 복제되는 것은 아니고 파일명만 객체화 해줌 클래스이다.
		File file = new File(filePath, b_file.trim());
		// 실제 업로드된 파일에 대한 마임타입을 출력해줌
		String mimeType = req.getServletContext().getMimeType(file.toString());
		logger.info(mimeType);// image, video, text

		if (mimeType == null) { // 마임타입이 null이면
			// 아래 속성값으로 마임타입을 설정해줌
			// 왜이렇게 하나요? 브라우저는 해석이 가능한 마임타입은 페이지 로딩 처리함
			// 강제로 다운로드 처리를 위한 속성값 변경
			// 브라우저에서 해석가능한 마임타입의 경우 화면에 그대로 출력이 되는 것을 방지하기 위해 주사굄
			res.setContentType("application/octet-stream");
		}
		// 다운로드 되는 파일 이름 담기
		String downName = null;
		// 위 File객체에서 생성된 객체에 내용을 읽기 위한 클래스 선언
		FileInputStream fis = null;
		// 응답으로 나갈 정보가 웹서비스에 처리되어야 하기에 사용한 객체
		ServletOutputStream sos = null;

		try {
			if (req.getHeader("user-agent").indexOf("MSIE") == -1) {
				downName = new String(b_file.getBytes("UTF-8"), "8859_1");
			} else {
				downName = new String(b_file.getBytes("EUC-KR"), "8859_1");
			}
			// 응답헤더에 다운로드 될 파일명을 매핑하기
			res.setHeader("Content-Disposition", "attachment;filename=" + downName);
			// 위에서 생성된 파일 문자열 객체를 가지고 파일 생성에 필요한 객체의 파라미터 넘김
			fis = new FileInputStream(file);
			sos = res.getOutputStream();
			// 파일 냉욜을 담을 byte배열을 생성
			byte b[] = new byte[1024 * 10];
			int data = 0;

			while ((data = (fis.read(b, 0, b.length))) != -1) {
				// 파일에서 읽은 내용을 가지고 실제 파일에 쓰기 처리함
				// 여기서 처리된 브라우저를 통해서 내보내진다.
				sos.write(b, 0, data);
			}
			// 처리한 내용이 버퍼에 있는데 이것을 모두 처리 요청을 하기
			// 내보내고 버퍼를 비운다 - 버퍼는 크기가 작음 - 휘발성
			sos.flush();
		} catch (Exception e) {
			logger.info(e.toString());
		} finally {
			try {
				if (sos != null)
					sos.close();
				if (fis != null)
					fis.close();
			} catch (Exception e2) {
				// TODO: handle exception
			}
		}
		// byte[] fileArray = boardLogic.imageDownload(imageName);
		// logger.info(fileArray.length);
		return null;
	}// end of imageGet
	
	// 파일 업로드
	@PostMapping("fileUpload")
	public Object fileUpload(MultipartHttpServletRequest mRequest,
			@RequestParam(value = "file_name", required = false) MultipartFile file_name) {
		logger.info("fileUpload 호출 성공");
		// 사용자가 선택한 파일 이름 담기
		String filename = null;
		if (!file_name.isEmpty()) {
			filename = file_name.getOriginalFilename();
			String saveFolder = "D:\\koko\\workspace_sts\\mblog-1\\src\\main\\webapp\\pds";
			String fullPath = saveFolder + "\\" + filename;
			try {
				// File객체는 파일명을 객체화 해주는 클래스임 - 생성되었다고 해서 실제 파일까지 생성되는 것이 아님
				File file = new File(fullPath);
				byte[] bytes = file_name.getBytes();
				// outStream 반드시 생성해서 파일정보를 읽어서 쓰기를 처리해줌
				// BufferedOutputStream은 필터 클래스이지 실제 파일 쓸 수 없는 객체
				// 실제 파일 쓰기가 가능한 클래스가 FileOutputStream임 - 생성자 파라미터에 파일 정보 담기
				BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(file));
				bos.write(bytes);
				// 파일쓰기와 관련 위변조 방지 위해 사용후 반드시 닫을 것
				bos.close();
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
		// 리턴 값으로 선택한 이미지 파일명을 넘겨서 사용자 화면에 첨부된 파일명을 열거해 주는데 사용할 것임
		String temp = filename;
		return temp;
	}

	// QuillEditor에서 선택한 이미지를 mblog_file 테이블에 insert 해보자
		// 왜 이런 수업을 준비했나? - MyBatis에서 insert태그의 역할이 있다. - 채번한 숫자를 캐쉬에 담아준다 - 
		// 그런데 select가 아니라서 resultType사용할 수 없다. - 프로시저 사용 - 
		// resultType은 불가하니깐 있는 건 parameterType뿐이다 - 매개변수에 값을 담아준다.
		// TestParam.java -> HashMapBinder설계 파라미터의 값을 담아준다 -> 중급으로 가는 길이다. -> 
		
	// 이미지 업로드
	@PostMapping("imageUpload")
	public Object imageUpload(MultipartHttpServletRequest mRequest,
			@RequestParam(value = "image", required = false) MultipartFile image) {
		logger.info("imageUpload 호출 성공");
		String filename = repleBoardLogic.imageUpload(image);
		return filename;
	}

	// 인서트
	@PostMapping("boardInsert")
	public String boardInsert(@RequestBody Map<String, Object> pMap) {
		logger.info("boardInsert호출");
		logger.info(pMap);
		int result = 0;
		result = repleBoardLogic.boardInsert(pMap);
		return String.valueOf(result);
	}

	// 업데이트
	@PostMapping("boardUpdate")
	public String boardUpdate(@RequestBody Map<String, Object> pMap) {
		logger.info("boardUpdate호출");
		int result = 0;
		result = repleBoardLogic.boardUpdate(pMap);
		return String.valueOf(result);
	}

	// 딜리트
	@GetMapping("boardDelete")
	public String boardDelete(@RequestBody Map<String, Object> pMap) {
		logger.info("boardDelete호출");
		int result = 0;
		result = repleBoardLogic.boardDelete(pMap);
		return String.valueOf(result);
	}
	
	
}