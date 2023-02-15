import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { joinRoom } from '../../../services/room.service';
import { JoinRoomPayload } from '../../../services/room.model';

export default function JoinRoomComponent() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      roomId: data.get('roomId'),
      name: data.get('name'),
    };
    if (!payload.roomId || !payload.name) {
      return;
    }
    joinRoom(payload as unknown as JoinRoomPayload);
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Join Room
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="roomId"
          label="Room Id"
          id="roomId"
          autoComplete="current-password"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Join
        </Button>
      </Box>
    </>
  );
}
