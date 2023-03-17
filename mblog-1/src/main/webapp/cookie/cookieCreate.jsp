<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>쿠키 생성하기</title>
</head>
<body>
	<%
	//아래코드는 서버가 바라보는 물리적인 위치에 들어있음	
	//서버측에서 실행됨 -> html -> 다운로드(Server Side Rendering=SSR)->동적처리(실시간)
	Cookie c1 = new Cookie( "notebook", "삼성갤럭시북" );
	c1.setMaxAge( 60*5 );
	c1.setPath("/");
	Cookie c2 = new Cookie( "hp", "아이폰14" );
	c2.setMaxAge( 60 * 5 );
	c2.setPath("/");
	//아래를 생략하면 현재 페이지가 바라보는 물리적인 위치를 갖는다
	//여기서는 /cookie임
	//c1.setPath( "/" );
	Cookie c3 = new Cookie( "coffee", "아메리카노" );
	c3.setMaxAge( 60 * 5 );
	c3.setPath("/");
	response.addCookie( c1 );
	response.addCookie( c2 );
	response.addCookie( c3 );
	%>
</body>
</html>