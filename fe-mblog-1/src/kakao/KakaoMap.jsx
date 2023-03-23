/* global kakao*/
import React, { useEffect, useRef, useState } from 'react'
import { BButton } from '../components/styles/FormStyle'

const KakaoMap = () => {
  const kakaomap = useRef()
  const [map, setMap] = useState()
  const [positions, setPositions] = useState([
    {
      content: '<div>터짐블로그<br/><a href="https://www.iei.or.kr">웹사이트</a></div>',
      latlng: new kakao.maps.LatLng(37.4984971, 127.032603),
    }
  ])
  useEffect (() => {
    const container = document.getElementById("map")
    const options = {
      center: positions[0].latlng,
      level: 4
    }
    if(!map){
      setMap(new kakao.maps.Map(container, options))
    } else {
      if(positions[1]) { // 자바 스크립트에서는 0이 아닌 것은 모두 true
        map.setCenter(positions[1].latlng)
      }
    }
    // 마커 표시
    for (let i = 0; i<positions.length; i++) {
      // 마커 생성
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng // 마커 위치
      })
      // 마커에 표시할 인포 윈도우 생성
      const infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content
      });
      // 마커에 이벤트 등록 함수 생성 후 즉시 호출되도록 클로저 생성
      // 클로저를 추가하지 않으면 마커가 여러 개 있을 때 마지막만 실행
      (function(marker, infowindow) {
        // 마커에 mouseover 이벤트 등록 후 마우스 오버 시 인포 윈도우 표시 처리
        kakao.maps.event.addListener(marker, 'mouseover', function() {
          infowindow.open(map, marker)
        });
        // 마커에 mouseout 이벤트 등록 후 마우스 아웃 시 인포 윈도우 닫기 처리
        kakao.maps.event.addListener(marker, 'mouseout', function() {
          infowindow.close()
        });
      })(marker, infowindow)
    }
  }, [positions, map])
  return (
    <>
      <div> 카카오맵존 </div>
    <div style={{display:"flex", alignItems:"center", justifyContent:"space-around"}}>
      <div id="map" ref={kakaomap} style={{width:"600px", height:"400px", marginBottom:"20px", border:"2px solid lightgrey", borderRadius:"20px"}}></div>
    </div>
      <BButton type ='button'text>현재위치</BButton>
    </>
  )
}

export default KakaoMap