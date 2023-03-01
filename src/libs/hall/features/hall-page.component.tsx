import React from 'react';
import { Box } from '@mui/material';
import HealthCheckStatusComponent from '../../shared/health-check/features/health-check-status.component';
import RoomControlComponent from './room-control/room-control.component';
const HallPageComponent = () => {
  return (
    <Box sx={{ m: 4 }}>
      <HealthCheckStatusComponent />
      <RoomControlComponent />
    </Box>
  );
};

export default HallPageComponent;
