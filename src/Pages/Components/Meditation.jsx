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
    margin-left: -1vw;
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

export const Meditation = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState('');

  const handleAddClick = (routine) => {
    setSelectedRoutine(routine);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRoutine(''); // Reset selectedRoutine when closing modal
  };

  return (
    <MainBox>
      <MTxt1>명상과 기록</MTxt1>
      <MTxt2>
      잠들기 전 오늘 있었던 일을 되돌아보면서 자신에게<br />
      진정한 휴식을 선물해보는건 어때요?
      </MTxt2>
      <Selectbox>
        <Txtbox>편한 옷으로 갈아입기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('편한 옷으로 갈아입기')}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>캔들 켜기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('캔들 켜기')}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>가습기 켜기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('가습기 켜기')}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>감사일기 쓰기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('감사일기 쓰기')}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>명상하기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('명상하기')}>추가</SelectboxBtn>
      </Selectbox>
      {showModal && <Modal selectedRoutine={selectedRoutine} onClose={handleCloseModal} />}
    </MainBox>
  );
};

export default Meditation;