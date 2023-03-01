import * as React from 'react';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import BrushIcon from '@mui/icons-material/Brush';
import Container from '@mui/material/Container';
import JoinRoomComponent from './join-room/join-room.component';
import CreateRoomComponent from './create-room/create-room.component';

enum RoomControlModes {
  Create,
  Join,
}

function RoomModeSwitchComponent(props: {
  onSwitch: () => void;
  placeHolder: string;
}) {
  return (
    <Grid container>
      <Grid item>
        <Link variant="body2" onClick={() => props.onSwitch()}>
          {props.placeHolder}
        </Link>
      </Grid>
    </Grid>
  );
}

export default function RoomControlComponent() {
  const [mode, setMode] = React.useState<RoomControlModes>(
    RoomControlModes.Create
  );
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'green' }}>
          <BrushIcon />
        </Avatar>
        {mode === RoomControlModes.Join ? (
          <>
            <JoinRoomComponent />
            <RoomModeSwitchComponent
              placeHolder="Create Room"
              onSwitch={() => setMode(RoomControlModes.Create)}
            ></RoomModeSwitchComponent>
          </>
        ) : (
          <>
            <CreateRoomComponent />
            <RoomModeSwitchComponent
              placeHolder="Join Room"
              onSwitch={() => setMode(RoomControlModes.Join)}
            ></RoomModeSwitchComponent>
          </>
        )}
      </Box>
    </Container>
  );
}
