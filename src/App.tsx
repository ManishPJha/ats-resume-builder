import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Builder from './pages/Builder';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Templates from './pages/Templates';
import AtsTips from './pages/AtsTips';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/ats-tips" element={<AtsTips />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
