import React, { useState, useRef } from "react";
import "../../Styles/Mypage/Profile.css";
import NavBar from "../Nav/Nav.jsx";
import myimg from "./기본이미지.png";

const Profile = () => {
  // 상태 관리
  const [nickname, setNickname] = useState("닉네임"); // 서버에서 사용자 닉네임 가져오기
  const [gender, setGender] = useState("Male"); //서버에서 사용자 성별 가져오기
  const [age, setAge] = useState(25); //서버에서 사용자 나이 가져오기
  const [image, setImage] = useState(null);
  const [editingNickname, setEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  // input 요소에 대한 참조
  const fileInputRef = useRef(null);


  // 파일 입력 변경 핸들러
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
  };

  // 커스텀 버튼 클릭 핸들러
  const handleCustomButtonClick = () => {
    fileInputRef.current.click();
  };

  // 닉네임 수정 버튼 클릭 핸들러
  const handleEditNickname = () => {
    setEditingNickname(true);
    setNewNickname(nickname);
  };

  // 닉네임 변경 핸들러
  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  // 닉네임 저장 핸들러
  const handleSaveNickname = () => {
    setNickname(newNickname);
    setEditingNickname(false);
  };

  // 성별 변경 핸들러
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // 나이 변경 핸들러
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  return (
    <div className="ProfileWrap">
      <NavBar />

      <div className="ProfileContainer">

        <div className="ProfileTxt">Profile</div>
        <div className="ProfileContent">
        {/* 이미지, 닉네임 수정 */}
        <div className="imgnic">
          <div className="ProfileimgWrap">
              {/* 이미지를 표시할 곳 */}
              {image ? (
                <img onClick={handleCustomButtonClick} src={image} alt="Uploaded" className="Profileimg" />
              ) : (
                <img onClick={handleCustomButtonClick} src={myimg} alt="Default" className="Profileimg" />
              )}
              <div>
                {/* 숨겨진 파일 입력 */}
                <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: "none" }}/>
              </div>
            </div>
          </div>

        <div className="Profileinputnic">
          {editingNickname ? (
            <div className="dis">
              <input type="text" value={newNickname} onChange={handleNicknameChange} className="inputnicChange1"/>
              <button onClick={handleSaveNickname} className="Profilebtn1">확인</button>
            </div>
          ) : (
            <div className="border2">
              <div className="border1">
              <span className="inputnicChange1">{nickname}</span>
              </div>
              <button onClick={handleEditNickname} className="Profilebtn1">수정</button>
            </div>
          )}
        </div>

        <div className="Profileinput">
          <label>성별</label>
          <select value={gender} onChange={handleGenderChange} className="Profilegender">
            <option value="Male">값호출</option>
            <option value="Female">값호출</option>
          </select>
        </div>

        <div className="Profileinput">
          <label>나이</label>
          <input type="number" value={age}값호출 onChange={handleAgeChange} className="Profileage"/>
        </div>
        <button className="Profilesubmit">저장</button>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
