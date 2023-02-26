import React from 'react';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import HealthCheckStatusComponent from '../../shared/health-check/features/health-check-status.component';
import RoomControlComponent from './room-control/room-control.component';
import { Box } from '@mui/material';
const HallPageComponent = () => {
  return (
    <Box sx={{ m: 4 }}>
      <HealthCheckStatusComponent />
      <RoomControlComponent />
    </Box>
  );
};

export default HallPageComponent;
