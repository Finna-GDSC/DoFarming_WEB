import React, { useState } from "react";
import styled from 'styled-components';
import NavBar from "../Nav/Nav.jsx";
import ResetModal from "./ResetModal";

const ResetWrap = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const Resetbtn = styled.button`
    color: #DC3412;
    background-color: rgb(245, 245, 245);
    padding: 15px;
    border: none;
    width: 70vw;
    border-radius: 10px;
    font: 1rem;
    margin: 50px;
    margin-bottom: 20px;
    margin-top: 30vh;
    font-size: large;
`;

const Resettxt = styled.div`
    text-align: center;
    font-size: 0.9rem;
`;

const Reset = () => {
    const [showModal, setShowModal] = useState(false);

    const handleResetClick = () => {
      setShowModal(true);
    }

    const handleModalClose = () => {
      setShowModal(false);
    }

    const handleResetConfirm = () => {
      console.log("Performs complete routine initialization..");
      setShowModal(false); 
    }

  return (
    <div>
      <NavBar />
      <ResetWrap>
        <Resetbtn onClick={handleResetClick}>모든 루틴 초기화</Resetbtn>
        <Resettxt>전체 루틴 및 내 리스트를 삭제합니다.<br/>루틴을 삭제하면 복구할 수 없어요.</Resettxt>
      </ResetWrap>
      {showModal && <ResetModal onClose={handleModalClose} onConfirm={handleResetConfirm} />}
    </div>
  );
};

export default Reset;
