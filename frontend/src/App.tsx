import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import './styles.scss';
import PageMain from './pages/PageMain';
import PageLogin from './pages/PageLogin';
import PageProfile from './pages/PageProfile';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<PageLogin />} />
      <Route path="/profile" element={<PageProfile />} />
      <Route index path="/" element={<PageMain />} />
    </Routes>
  </BrowserRouter>
);

export default App;
