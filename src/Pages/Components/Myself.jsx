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
      margin-left:-1vw;
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

const SelectAll = styled.button`
    border: none;
    background-color: white;
    color: rgb(167, 167, 167);
    margin-top: 8vh;
    margin-bottom: 2vh;
    height: 5vh;
    font-size: 1.2rem;
    text-align: center;
    @media all and (max-width:1023px) {
      width: 20vh;
      position: relative;
      left: 47%;
      transform: translateX(-50%);
    }
    @media all and (min-width:1024px) {
      width: 14vw;
      margin-left: 16vw;
    }
`;

export const Myself = () => {
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
      <MTxt1>나를 가꾸는 시간</MTxt1>
      <MTxt2>
      나를 돌보는 시간이 있나요? 다른 것이 아닌, 자신을 <br />
      중심으로 루틴을 만들어보는 건 어때요?
      </MTxt2>
      <Selectbox>
        <Txtbox>좋아하는 음악 듣기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick("좋아하는 음악 듣기")}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>샤워하기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick("샤워하기")}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>스킨케어하기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick("스킨케어하기")}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>림프관 마사지하기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick("림프관 마사지하기")}>추가</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>립밤 바르기</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick("립밤 바르기")}>추가</SelectboxBtn>
      </Selectbox>
      {showModal && <Modal selectedRoutine={selectedRoutine} onClose={handleCloseModal} />}
    </MainBox>
  );
};

export default Myself;