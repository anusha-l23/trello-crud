import "../styles/App.css";
import React, { Component } from "react";
import Board from "./Board";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Header">React Trello App</div>
<BrowserRouter>
<Routes>
  <Route index path="/" element={<Board />} exact />
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
</BrowserRouter>
      </div>
    );
  }
}

export default App;
