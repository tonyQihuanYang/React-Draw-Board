import { Client, Message } from 'stompjs';
import React, { useEffect, useRef, useState } from 'react';
import CanvasViewComponent from '../../components/canvas-view/canvas-view.component';

const SyncBoardComponent = ({
  stompClient,
  roomId,
}: {
  stompClient: Client;
  roomId: string;
}) => {
  console.log('SyncBoardComponent');
  const imageData = useRef<ImageData>();

  useEffect(() => {
    stompClient.subscribe(`/draw-room/${roomId}/update`, (msg: Message) => {
      console.log('Received Update From Server');
      console.log(msg);
      // const message: DrawPointMessage = JSON.parse(msg.body);
      // const drawPointToSync: DrawPoint = message.message;
      // if (message.sendBy !== userName) {
      //   setSyncDrawPoint(drawPointToSync);
      // }
    });
  }, []);

  return (
    <div style={{ display: 'block', overflow: 'hidden' }}>
      {imageData.current ? (
        <CanvasViewComponent
          imageData={imageData.current}
        ></CanvasViewComponent>
      ) : null}
    </div>
  );
};

export default SyncBoardComponent;
