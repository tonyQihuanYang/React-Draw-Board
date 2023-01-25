import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import DrawingBoardPageComponent from './libs/drawing-board/features/drawing-board-page.component';
import SignInPageComponent from './libs/shared/authentication/sign-in-page.component';
import SignUpPageComponent from './libs/shared/authentication/sign-up-page.component';
import HallPageComponent from './libs/hall/features/hall-page.component';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HallPageComponent />,
  },
  {
    path: '/draw-board',
    element: <DrawingBoardPageComponent />,
  },
  {
    path: '/auth',
    children: [
      {
        path: 'sign-in',
        element: <SignInPageComponent />,
      },
      {
        path: 'sign-up',
        element: <SignUpPageComponent />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
