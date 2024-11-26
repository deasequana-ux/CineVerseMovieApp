import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./views/MovieList/index";
import MovieDetail from "./views/MovieList/detail";
import "./assets/styles.css";

const App: React.FC = () => {
  return (
    <Router>
      {/* Dalgalı Arka Plan */}
      <div className="wavy-background"></div>

      {/* Ana İçerik */}
      <div className="App">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
