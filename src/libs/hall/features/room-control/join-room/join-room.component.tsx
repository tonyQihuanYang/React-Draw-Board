import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { joinRoom } from '../../../services/room.service';
import { JoinRoomPayload } from '../../../services/room.model';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';

export default function JoinRoomComponent() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      roomId: data.get('roomId'),
      name: data.get('name'),
    };
    if (!payload.roomId || !payload.name) {
      return;
    }
    try {
      const result = await joinRoom(payload as unknown as JoinRoomPayload);
      result && navigate(`/draw-board/${result.id}/${payload.name}`);
    } catch (_) {
      setOpen(true);
      console.error(_);
    }
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error">Error Joining Room</Alert>
      </Snackbar>

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
