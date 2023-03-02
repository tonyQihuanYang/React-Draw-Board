import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import DrawBoardComponent from './draw-board/draw-board.component';
import SyncBoardComponent from './sync-board/sync-board.component';
import './drawing-board-page.style.css';
import { RoomService } from '../services/room.service';

const DrawingBoardPageComponent = () => {
  const { roomId, userName } = useParams<{
    roomId: string;
    userName: string;
  }>();
  const roomServiceRef = useRef<RoomService | null>(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (!roomId || !userName) {
      return;
    }

    const initialize = async () => {
      try {
        const roomService = await new RoomService(
          roomId,
          userName
        ).connectToRoom();
        roomServiceRef.current = roomService;
        setIsReady(true);
      } catch (errInitializing) {
        console.error(errInitializing);
        //TODO: Handle error connecting to the room
      }
    };
    initialize();
  }, []);

  return (
    <div className="draw-board-page-wrapper">
      {isReady && roomServiceRef.current && roomId && userName ? (
        <>
          <DrawBoardComponent
            className="draw-board-wrapper"
            roomService={roomServiceRef.current}
          ></DrawBoardComponent>
          {/* <SyncBoardComponent */}
          {/*   className="sync-board-wrapper" */}
          {/*   roomService={roomServiceRef.current} */}
          {/* ></SyncBoardComponent> */}
        </>
      ) : (
        <> Waiting on connection </>
      )}
    </div>
  );
};

export default DrawingBoardPageComponent;
