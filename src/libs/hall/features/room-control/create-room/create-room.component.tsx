import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createRoom } from '../../../services/room.service';
import { CreateRoomPayload } from '../../../services/room.model';
import { useNavigate } from 'react-router-dom';

export default function CreateRoomComponent() {
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      name: data.get('name'),
    };
    if (!payload.name) {
      return;
    }
    try {
      const result = await createRoom(
        payload.name as unknown as CreateRoomPayload
      );
      result && navigate(`/draw-board/${result.id}/${payload.name}`);
    } catch (_) {
      console.error(_);
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Create Room
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1, width: '100%' }}
        onSubmit={handleSubmit}
      >
        <TextField
          autoFocus
          fullWidth
          required
          margin="normal"
          id="name"
          label="Name"
          name="name"
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create
        </Button>
      </Box>
    </>
  );
}
