import React from 'react';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import HealthCheckStatusComponent from '../../shared/health-check/features/health-check-status.component';
import RoomControlComponent from './room-control/room-control.component';
const HallPageComponent = () => {
  return (
    <Container>
      <HealthCheckStatusComponent />
      <RoomControlComponent />
    </Container>
  );
};

export default HallPageComponent;
