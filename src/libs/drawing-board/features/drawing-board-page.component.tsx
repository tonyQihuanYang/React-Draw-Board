import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { over, Client, Message } from 'stompjs';
import SockJS from 'sockjs-client';
import DrawBoardComponent from './draw-board/draw-board.component';
import SyncBoardComponent from './sync-board/sync-board.component';
import './drawing-board-page.style.css';

const WS_URL = `${process.env.REACT_APP_API_URL}/ws`;
const DrawingBoardPageComponent = () => {
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
      const sockjs = new SockJS(WS_URL);
      const stompClient = over(sockjs);
      stompClient.connect(
        {},
        () => onConnected(stompClient),
        (err: any) => {
          console.error('Error while connecting to stomp');
          console.error(err);
        }
      );
    };

    const onConnected = (clientConnected: Client) => {
      stompClientRef.current = clientConnected;
      setIsReady(true);
    };
    connect();
  }, []);

  return (
    <div className="draw-board-page-wrapper">
      {isReady && stompClientRef.current && roomId && userName ? (
        <>
          <DrawBoardComponent
            className="draw-board-wrapper"
            stompClient={stompClientRef.current}
            roomId={roomId}
            userName={userName}
          ></DrawBoardComponent>
          <SyncBoardComponent
            className="sync-board-wrapper"
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
