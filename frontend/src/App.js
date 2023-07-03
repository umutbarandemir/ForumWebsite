import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Replies from "./components/Replies";
import Nav from "./components/Nav";
import Threads from "./components/Threads";
import Search from "./utils/Search";
import Card from "./utils/Card";
import Filter from "./utils/Filter";
import About from "./components/About";
//import { Refine } from "@refinedev/core"
//import routerProvider from "@refinedev/react-router-v6"
//import dataProvider from "@refinedev/simple-rest"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/:id/replies" element={<Replies />} />
            <Route path="/threads" element={<Threads />} />
            <Route path="/search" element={<Search />} />
            <Route path="/card" element={<Card />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
