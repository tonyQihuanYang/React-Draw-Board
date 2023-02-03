import { Client, Message } from 'stompjs';
import React, { useEffect, useRef, useState } from 'react';
import CanvasViewComponent from '../../components/canvas-view/canvas-view.component';
import ImageViewComponent from '../../components/image-view/image-view.component';

const SyncBoardComponent = ({
  stompClient,
  roomId,
}: {
  stompClient: Client;
  roomId: string;
}) => {
  console.log('SyncBoardComponent');
  const [imageData, setImageData] = useState<string>();
  useEffect(() => {
    stompClient.subscribe(`/draw-room/${roomId}/update`, (msg: Message) => {
      console.log('Received Update From Server');
      const message = JSON.parse(msg.body);
      setImageData(message.message as unknown as string);
      console.log(message.message);
    });
  }, []);

  return (
    <div style={{ display: 'block', overflow: 'hidden' }}>
      <ImageViewComponent imageData={imageData}></ImageViewComponent>
    </div>
  );
};

export default SyncBoardComponent;
