import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import VideoList from './components/Video/VideosList';
import VideoForm from './components/Video/VideoForm';
import Navbar from './components/Navbar/Navbar';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import 'bootswatch/dist/pulse/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <Navbar />

      <div className="container p-4">
        <Routes>
          <Route path='/' element={<VideoList />} />
          <Route path='/new-video' element={<VideoForm />} />
          <Route path='/update/:id' element={<VideoForm />} />
        </Routes>
        <ToastContainer />
      </div>

    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
