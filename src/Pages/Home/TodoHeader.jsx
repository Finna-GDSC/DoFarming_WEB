import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const TodoHeaderBlock = styled.div`
  margin-top: 4vh;
  margin-left: 6vw;
  font-size: 1.56rem;

  @media all and (min-width: 300px) and (max-width: 1023px) {
    margin-top: 4vh;
    margin-left: 6vw;
    font-size: 1.56rem;
  }
`;

const TodoHeader = ({ trackId }) => {
  const [trackName, setTrackName] = useState('');

  useEffect(() => {
    const getTrackName = async () => {
      if (!trackId) {
        console.error('Error: trackId is undefined.');
        return;
      }

      try {
        const response = await axios.get(`https://dofarming.duckdns.org/api/v1/track/${trackId}`);
        setTrackName(response.data.content);
      } catch (error) {
        console.error('Error fetching track name:', error);
      }
    };

    getTrackName();
  }, [trackId]);

  return (
    <TodoHeaderBlock>
      <div>
        {trackName || 'Track name not available'}
      </div>
    </TodoHeaderBlock>
  );
};

export default TodoHeader;
