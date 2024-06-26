import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`;

const Text = styled.div`
  text-align: center;
  font-size: 2.2rem;
  margin: 0 auto;
  padding-top: 10vh;
  width: 90vw;
  font-weight: 400;
  padding-bottom: 15vh;

  strong {
    font-weight: bolder;
  }
  @media screen and (min-width: 1280px) {
    padding-bottom: 20vh;
}
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
`;

const InputContainer1 = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;

const Input = styled.input`
  border: none;
  background-color: #F3F3F3;
  border-radius: 50px;
  width: 300px;
  padding-left: 20px;
  height: 7vh;
  margin: 1vh;

  &:focus {
    outline: none;
  }
`;

const Select = styled.select`
  border: none;
  background-color: #F3F3F3;
  border-radius: 50px;
  width: 320px;
  margin: 1vh;
  padding-left: 15px;
  height: 7vh;
  color: rgb(113, 113, 113);

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 2.3vh;
  font-size: 1.25rem;
  background-color: ${props => props.disabled ? 'grey' : '#ED8C37'};
  color: #ffffff;
  border: ${props => props.disabled ? 'grey' : '#ED8C37'};
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  border-radius: 50px;
  margin-top: 10vh;
  align-items: center;
  width: 230px;
`;

const Login4 = () => {
  const [Nickname, setNickname] = useState("");
  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("");
  const navigate = useNavigate();

  const btn_disabled = !Nickname || !Age || !Gender;

  const NicknameCheck = (e) => {
    const input = e.target.value;
    const valid = /^[A-Za-z1-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{0,12}$/.test(input); 
    
    if (valid) {
      setNickname(input);
    } else {
      alert("닉네임은 영문, 한글, 숫자를 포함하여 1~12자 이상이어야 하며, 특수기호를 포함할 수 없습니다.");
    }
  };

  const AgeCheck = (e) => {
    const input = e.target.value;
  
    if (isNaN(input)) {
      alert("숫자만 입력해주세요.");
      return;
    }
  
    const valid = /^[0-9]{0,3}$/.test(input);
  
    if (valid) {
      setAge(input);
    } else {
      alert("사용자 나이는 3자리 수 이상의 수를 가질 수 없습니다.");
    }

    if (input === "0") {
      alert("사용자 나이를 0으로 설정할 수 없습니다.");
      return;
    }
  };
  

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const Submit_to_Server = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error("인증 토큰이 없습니다.");
      }

      const data = {
        nickname: Nickname,
        gender: Gender,
        age: Age,
      };

      const apiUrl = "https://dofarming.duckdns.org/api/v1/user/info";

      const response = await axios.patch(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        console.log(response.data);
        navigate('/home');
      } else {
        console.error(`서버 응답 실패. 상태 코드: ${response.status}`);
      }
    } catch (error) {
      console.error("API 요청 중 에러 발생:", error);

      if (error.response) {
        console.error("서버 응답 실패. 상태 코드:", error.response.status);
        console.error("서버 응답 데이터:", error.response.data);
      } else {
        console.error("기타 에러:", error.message);
      }
    }
  };

  return (
    <Container>
      <Text>
        <div><strong>좋아요!</strong><br />이제 시작해볼까요?</div>
      </Text>
      <InputContainer>
      <InputContainer1>
        <form id="myInfo">
          <Input type="text" placeholder="닉네임" value={Nickname} onChange={NicknameCheck} onBlur={NicknameCheck} /><br />
          <Input type="text" placeholder="나이" value={Age} onChange={AgeCheck} onBlur={AgeCheck} />
        </form>
      </InputContainer1>

        <Select id="gender" value={Gender} onChange={handleGenderChange}>
          <option value="">성별</option>
          <option value="MALE">남자</option>
          <option value="FEMALE">여자</option>
        </Select>

        <Link to="/Home">
          <SubmitButton type="submit" disabled={btn_disabled} onClick={Submit_to_Server}>시작</SubmitButton>
        </Link>
      </InputContainer>
    </Container>
  );
};

export default Login4;
