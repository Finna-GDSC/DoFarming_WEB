import React, { useState } from 'react';
import Modal from './Modal';
import styled from 'styled-components';

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

    @media all and (max-width:1023px) {
      width: 85vw;
      align-items: center;
      padding-left: 5vw;
      margin-bottom: 4vh;
      padding-top: 3vh;
      margin-left:0;
    }
`;

const MTxt1 = styled.div`
    font-size: 1.5rem;
`;

const MTxt2 = styled.div`
    font-size: 0.8rem;
    color: #5B5B5B;
    padding-bottom: 4vh;
    padding-top: 2px;
    @media all and (min-width:1024px) {
      padding-top: 3px;
    }
`;

const Selectbox = styled.div`
    border-radius: 13px;
    background-color: #F7F7F7;
    height: 7vh;
    margin-bottom: 2vh;
    width: 80vw;
    display: flex;
    @media all and (min-width:1024px) {
      width: 45vw;
    }
`;

const Txtbox = styled.div`
    font-size: 20px;
    width: 90%;
    height: 3.8vh;
    margin-left: 20px;
    margin-top: 2.2vh;
    @media all and (min-width:1024px) {
      margin-top: 2vh;
      width: 38vw;
    }
`;

const SelectboxBtn = styled.button`
    color: #595656;
    background-color: #D9D9D9;
    border: none;
    height: 3.8vh;
    border-radius: 20px;
    margin-top: 1.6vh;
    width: 50px;
    cursor: pointer;
    @media all and (max-width:1023px) {
      margin-right: 2vw;
    }
    
`;

export const Depression1 = () => {
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
      <MTxt1>우울증 완화</MTxt1>
      <MTxt2>
      어두운 밤에서 새벽을 지나 아침이라는 밝은 빛이  <br />
      당신을 맞이하고 있어요<br />
      당신이 무엇을 하든 일이 잘 되게 해줄거예요
      </MTxt2>
      <Selectbox>
        <Txtbox>침대 정리</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick("침대 정리")}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>커튼 열기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick("커튼 열기")}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>창문 열기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick("창문 열기")}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>물 마시기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick("물 마시기")}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>이 닦기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick("이 닦기")}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>감정 적기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick("감정 적기")}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>오늘의 작은 목표 적어보기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick("오늘의 작은 목표 적어보기")}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>호흡 운동하기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick("호흡 운동하기")}>추가</SelectboxBtn>
      </Selectbox>
      {showModal && <Modal selectedRoutine={selectedRoutine} onClose={handleCloseModal} />}
    </MainBox>
  );
};