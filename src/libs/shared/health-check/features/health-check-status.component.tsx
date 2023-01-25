import React from 'react';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { useState, useEffect } from 'react';
import { healthCheck } from '../service/health-check.service';
const HealthCheckStatusComponent = () => {
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    async function requestHealthCheck() {
      try {
        await healthCheck();
        setIsOnline(true);
      } catch (err) {
        setIsOnline(false);
        console.error(err);
      }
    }
    requestHealthCheck();
  });
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isOnline ? (
        <>
          <CloudDoneIcon></CloudDoneIcon>
          <span>Serivce avaiable</span>
        </>
      ) : (
        <>
          <CloudOffIcon></CloudOffIcon>
          <span>Serivce currently not avaiable</span>
        </>
      )}
    </div>
  );
};

export default HealthCheckStatusComponent;
