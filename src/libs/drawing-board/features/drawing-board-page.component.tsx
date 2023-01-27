import { over, Client, Message } from 'stompjs';
import SockJS from 'sockjs-client';
import React, { useEffect, useRef, useState } from 'react';
import CanvasComponent from './canvas/canvas.component';
import ColorPickerComponent from './color-picker/color-picker.component';
import { DrawPoint, DrawPointMessage } from './models/DrawPoint.model';
import { useParams } from 'react-router-dom';

const WS_URL = `${process.env.REACT_APP_API_URL}/ws`;
const DrawingBoardPageComponent = () => {
  const { roomId, userName } = useParams<{
    roomId: string;
    userName: string;
  }>();

  const [penColor, setPenColor] = useState('#000000');
  const [drawPoint, setDrawPoint] = useState<DrawPoint | null>(null);
  const [syncDrawPoint, setSyncDrawPoint] = useState<DrawPoint | null>(null);

  const stompClientRef = useRef<Client | null>(null);
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
      clientConnected.subscribe(
        `/draw-room/${roomId}/update`,
        (msg: Message) => {
          const message: DrawPointMessage = JSON.parse(msg.body);
          const drawPointToSync: DrawPoint = message.message;
          if (message.sendBy !== userName) {
            setSyncDrawPoint(drawPointToSync);
          }
        }
      );
    };
    connect();
  });

  useEffect(() => {
    if (!stompClientRef.current) {
      return;
    }
    const stompClient = stompClientRef.current;
    const drawRoomMessage = {
      roomId,
      sendBy: userName,
      message: drawPoint,
    };

    stompClient.send('/app/draw-room', {}, JSON.stringify(drawRoomMessage));
  }, [drawPoint]);

  return (
    <div style={{ display: 'block', overflow: 'hidden' }}>
      <ColorPickerComponent
        color={penColor}
        setColor={setPenColor}
      ></ColorPickerComponent>
      <CanvasComponent
        syncDrawPoint={syncDrawPoint}
        setDrawPoint={setDrawPoint}
        penColor={penColor}
      ></CanvasComponent>
    </div>
  );
};

export default DrawingBoardPageComponent;
