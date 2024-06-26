import React, { useState } from "react";
import Modal from "./Modal";
import styled from "styled-components";

const MainBox = styled.div`
  border: 0.2px solid rgb(131, 131, 131);
  border-radius: 20px;
  height: auto;
  text-align: left;
  margin-bottom: 3vh;
  padding-top: 3.5vh;
  display: inline-block;
  width: 48vw;
  padding-left: 2vw;
  margin-left: 25vw;

  @media all and (max-width: 1023px) {
    width: 85vw;
    align-items: center;
    padding-left: 5vw;
    margin-bottom: 4vh;
    padding-top: 3vh;
    margin-left:-1vw;
  }
`;

const MTxt1 = styled.div`
  font-size: 1.5rem;
`;

const MTxt2 = styled.div`
  font-size: 0.8rem;
  color: #5b5b5b;
  padding-bottom: 4vh;
  padding-top: 2px;
  @media all and (min-width: 1024px) {
    padding-top: 3px;
  }
`;

const Selectbox = styled.div`
  border-radius: 13px;
  background-color: #f7f7f7;
  height: 7vh;
  margin-bottom: 2vh;
  width: 80vw;
  display: flex;
  @media all and (min-width: 1024px) {
    width: 45vw;
  }
`;

const Txtbox = styled.div`
  font-size: 20px;
  width: 90%;
  height: 3.8vh;
  margin-left: 20px;
  margin-top: 2.2vh;
  @media all and (min-width: 1024px) {
    margin-top: 2vh;
    width: 38vw;
  }
`;

const SelectboxBtn = styled.button`
  color: #595656;
  background-color: #d9d9d9;
  border: none;
  height: 3.8vh;
  border-radius: 20px;
  margin-top: 1.6vh;
  width: 50px;
  cursor: pointer;
  @media all and (max-width: 1023px) {
    margin-right: 2vw;
  }
`;

export const Pms = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState('');

  const handleAddClick = (routine) => {
    setSelectedRoutine(routine);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRoutine('');
    setShowModal(false);
  };

  return (
    <MainBox>
      <MTxt1>자기관리 (PMS)</MTxt1>
      <MTxt2>소파에 누워 편안한 시간을 보내는 것도 좋아요.</MTxt2>
      <Selectbox>
        <Txtbox>물 한 잔 마시기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('물 한 잔 마시기')}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>진통제 먹기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('진통제 먹기')}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>전화 알림 끄기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('전화 알림 끄기')}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>핫초코 마시기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('핫초코 마시기')}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>낮잠 자기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('낮잠 자기')}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>간식 준비</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('간식 준비')}>준비</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>영화 보기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('영화 보기')}>추가</SelectboxBtn>
      </Selectbox>
      {showModal && <Modal selectedRoutine={selectedRoutine} onClose={handleCloseModal} />}
    </MainBox>
  );
};

export default Pms;