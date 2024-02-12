import "../../Style/Login/Login2.css";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GoogleAuthProvider, signInWithPopup, getIdToken } from "firebase/auth";
import { auth } from "../../Firebase/firebase-config";
import { instance } from "../../libs/api";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import React, { useState, useEffect } from "react";

// Login2 컴포넌트 정의
const Login2 = () => {
  // useNavigate 훅을 사용하여 라우터 제어
  const navigate = useNavigate(); 
  
  // 사용자 데이터를 저장할 상태
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // 로그인 상태 확인 함수
    const checkLoginStatus = async () => {
      // 로그인 토큰 가져오기
      const token = localStorage.getItem('authToken');
      if (token) {
        // 서버에 토큰을 전달하여 사용자 인증 및 관련 정보 요청
        try {
          const response = await instance.get("/", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          // 사용자가 이미 회원가입되어 있는 경우 메인 페이지로 이동
          if (response.data.isRegistered) {
            navigate('/home'); // 메인 페이지로 이동
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
  
    checkLoginStatus(); // 로그인 상태 확인 함수 호출
  }, [navigate]);
  
  // 구글 로그인 버튼 클릭 시 실행되는 함수
  async function handleGoogleLogin() {
    // GoogleAuthProvider를 사용하여 구글 로그인 팝업 실행
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      
      // 로그인 결과에서 사용자 정보 추출
      const user = result.user;
      setUserData(user);

      // 사용자의 ID 토큰을 가져와서 localStorage에 저장
      const token = await getIdToken(auth.currentUser);
      localStorage.setItem('authToken', token);

      // 서버에 토큰을 전달하여 사용자 인증 및 관련 정보 요청
      const apiUrl = instance.defaults.baseURL + "/api/v1/user";  
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // 사용자가 이미 회원가입되어 있는 경우 메인 페이지로 이동
      if (response.data.isRegistered) {
        navigate('/home'); // 메인 페이지로 이동
      } else {
        navigate('/Login3'); // 로그인 페이지로 이동
      }
    } catch (error) {
      // 에러 처리
      console.error(error);
    }
  }

  // JSX로 화면 구성
  return (
    <div>
      <div className="login2_wrap">
        <div className="login2_textbox">
          <p>
            <strong>몸</strong>과 <strong>마음</strong><br />
            건강하게 챙기는 첫 단계!
          </p>
          
        </div>
        <div className="Gloginbox">
          <GoogleLoginButton
          style={{
            backgroundColor: "white", // 배경색 변경
            color: "black", // 글자색 변경
            fontSize: "1rem", // 글자 크기 변경
            borderRadius: "5px", // 테두리 둥글게
            textAlign: "center",
            width: "300px",
          }}
          onClick={handleGoogleLogin}/>
        </div>
      </div>
    </div>
  );
};

// 컴포넌트 내보내기
export default Login2;