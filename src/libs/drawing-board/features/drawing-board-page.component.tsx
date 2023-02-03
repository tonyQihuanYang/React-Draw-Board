import { over, Client, Message } from 'stompjs';
import SockJS from 'sockjs-client';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import DrawBoardComponent from './draw-board/draw-board.component';
import SyncBoardComponent from './sync-board/sync-board.component';

const WS_URL = `${process.env.REACT_APP_API_URL}/ws`;
const DrawingBoardPageComponent = () => {
  console.log('DrawingBoardPageComponent');
  const { roomId, userName } = useParams<{
    roomId: string;
    userName: string;
  }>();

  const stompClientRef = useRef<Client | null>(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (stompClientRef.current) {
      return;
    }
    const connect = () => {
      const Sock = new SockJS(WS_URL);
      const stompClient = over(Sock);
      stompClient.connect({}, () => onConnected(stompClient), onError);
    };

    const onError = (err: any) => {
      console.error(err);
    };

    const onConnected = (clientConnected: Client) => {
      stompClientRef.current = clientConnected;
      setIsReady(true);
    };
    connect();
  }, []);

  return (
    <div style={{ display: 'block', overflow: 'hidden' }}>
      {isReady && stompClientRef.current && roomId && userName ? (
        <>
          <DrawBoardComponent
            stompClient={stompClientRef.current}
            roomId={roomId}
            userName={userName}
          ></DrawBoardComponent>
          <SyncBoardComponent
            stompClient={stompClientRef.current}
            roomId={roomId}
          ></SyncBoardComponent>
        </>
      ) : (
        <> Waiting on connection </>
      )}
    </div>
  );
};

export default DrawingBoardPageComponent;
