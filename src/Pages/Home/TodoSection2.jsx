import React, { useState, useEffect } from "react";
import { IoTrashSharp } from "react-icons/io5";
import styled from "styled-components";
import axios from 'axios';

const TodoSection2Wrap = styled.div`
  width: 40vw;
  margin-left: 35vw;
  margin-top: 5vh;
  height: auto;

  @media all and (min-width: 300px) and (max-width: 1023px) {
    width: 83vw;
    margin-left: 8.5vw;
  }
`;

const TodoAddRoutineBtn = styled.button`
  width: 30vw;
  color: #BFBABA;
  border-radius: 20px;
  background-color: inherit;
  border: 0.5px solid #BFBABA;
  height: 7vh;
  font-size: 20px;
  margin-top: 2vw;

  @media all and (min-width: 300px) and (max-width: 1023px) {
    width: 330px;
    height: 70px;
    margin-top: 20px;
  }
`;

const CheckboxContainer = styled.div`
  width: 30vw;
  display: flex;
  margin-top: 4vh;
  border: 0.5px solid #BFBABA;
  border-radius: 20px;

  @media all and (min-width: 300px) and (max-width: 1023px) {
    width: 83vw;
    margin-top: 20px;
  }
`;

const TodoSection2Routine = styled.input`
  background-color: inherit;
  border: none;
  height: 7vh;
  font-size: 20px;
  text-align: center;
  width: 75%;
  padding-top: 2px;
  font-weight: 100;
  outline:none;
  text-decoration: ${({ completed }) => completed ? "line-through" : "none"};
  text-decoration-thickness: ${({ completed }) => completed ? "1px" : "initial"};
  ::placeholder {
    color: #BFBABA;
  }

  @media all and (min-width: 300px) and (max-width: 1023px) {
    height: 70px;
  }
`;

const TodoDelete = styled.button`
  color: #ED8C37;
  background-color: white;
  border: none;
  height: 7vh;
  width: 15%;
  padding-top: 8px;
  border-radius: 20px;

  @media all and (min-width: 300px) and (max-width: 1023px) {
    padding-top: 15px;
  }
`;

const Check1 = styled.div`
  width: 10%;
  padding-top: 12.5px;
  padding-left: 10px;

  @media all and (min-width: 300px) and (max-width: 1023px) {
    padding-top: 16.5px;
  }
`;

const Checkbox = styled.input`
  display: none;
`;

const CheckboxLabel = styled.label`
  margin-top: 5px;
  margin-left: 5px;
  display: inline-block;
  width: 25px;
  height: 25px;
  border: 1px solid #ED8C37;
  border-radius: 50%;
  position: relative;
  background-color:inherit;

  ${Checkbox}:checked + &::after {
    content: '✔';
    font-size: 23px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #ED8C37;
    color: white;
  }
`;

const TodoSection2 = ({ selectedTrackId }) => {
  const [routineList, setRoutineList] = useState([]);
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (e, routineId) => {
    const { value } = e.target;
    setInputValues({
      ...inputValues,
      [routineId]: value,
    });

    // 입력 값이 변경될 때마다 로컬 스토리지에 저장
    localStorage.setItem(`inputValue_${routineId}`, value);
  };

  const updateRoutine = async (routineId, content) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.patch(
        `https://dofarming.duckdns.org/api/v1/routine/${routineId}`,
        { content },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        console.log('Routine successfully updated');
        // 서버의 응답이 성공적이면 로컬의 상태를 변경
        setRoutineList(prevRoutineList => {
          const updatedList = [...prevRoutineList];
          const index = updatedList.findIndex(routine => routine.routineId === routineId);
          if (index !== -1) {
            updatedList[index].content = content;
          }
          return updatedList;
        });
      } else {
        console.error('Failed to update routine:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating routine:', error);
    }
  };

  const deleteRoutine = async (routineId) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.delete(
        `https://dofarming.duckdns.org/api/v1/routine/${routineId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      if (response.status === 204) {
        console.log('Routine successfully deleted');
        setRoutineList(prevRoutineList => prevRoutineList.filter(routine => routine.routineId !== routineId));
      } else {
        console.error('Failed to delete routine:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting routine:', error);
    }
  };

  const toggleComplete = async (index) => {
    const token = localStorage.getItem('authToken');
    const routineId = routineList[index].routineId;
    const newStatus = routineList[index].completed ? "INCOMPLETE" : "COMPLETE"; // 새로운 상태
    
    try {
      const response = await axios.patch(
        `https://dofarming.duckdns.org/api/v1/routine/${routineId}`,
        { routineStatus: newStatus }, // 서버에서 요구하는 변경된 상태만 전송
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        const newList = [...routineList];
        newList[index] = { ...newList[index], completed: !newList[index].completed };
        setRoutineList(newList);
      } else {
        console.error('Failed to update routine status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating routine status:', error);
    }
  };
  

  const addRoutine = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.post(
        `https://dofarming.duckdns.org/api/v1/routine/${selectedTrackId}`,
        {
          content: inputValues[selectedTrackId] || '', // 사용자가 입력한 내용을 보냄
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        const newRoutine = response.data;
        setRoutineList(prevRoutineList => [...prevRoutineList, newRoutine]);
        setInputValues(prevInputValues => ({
          ...prevInputValues,
          [newRoutine.routineId]: '', // 입력 값 초기화
        }));
      } else {
        console.error('Failed to add routine:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding routine:', error);
    }
  };


  useEffect(() => {
    const fetchRoutines = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get(
          `https://dofarming.duckdns.org/api/v1/routine/${selectedTrackId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            } 
          }
        );

        if (response.status === 200) {
          setRoutineList(response.data);
          const initialValues = {};
          response.data.forEach(routine => {
            initialValues[routine.routineId] = routine.content;
          });
          setInputValues(initialValues);
        } else {
          console.error('Failed to fetch routines:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching routines:', error);
      }
    };

    if (selectedTrackId) {
      fetchRoutines();
    }
  }, [selectedTrackId]);

  return (
    <TodoSection2Wrap>
      {routineList.map((routine, index) => (
        <CheckboxContainer key={index}>
          <Check1>
            {/* 체크박스의 상태가 true 또는 false일 때 */}
            <Checkbox type="checkbox" onChange={() => { toggleComplete(index); }} checked={routine.completed} />
            <CheckboxLabel />
          </Check1>
          <TodoSection2Routine 
            value={inputValues[routine.routineId] || ''} 
            onChange={(e) => handleInputChange(e, routine.routineId)}
            onBlur={() => updateRoutine(routine.routineId, inputValues[routine.routineId])} // 수정이 완료될 때 서버로 전송
            checked={routine.completed} 
            style={routine.completed ? { textDecoration: 'line-through' } : null} // 체크된 경우에는 텍스트에 선을 그음
          />
          <TodoDelete>
            <IoTrashSharp onClick={() => deleteRoutine(routine.routineId)} />
          </TodoDelete>
        </CheckboxContainer>
      ))}
      <TodoAddRoutineBtn onClick={addRoutine}> + Add routine </TodoAddRoutineBtn>
    </TodoSection2Wrap>
  );
};

export default TodoSection2;
