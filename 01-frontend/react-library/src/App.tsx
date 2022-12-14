import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { BookCheckOutPage } from "./Layouts/BookCheckOutPage/BookCheckOutPage";
import { HomePage } from "./Layouts/HomePage/HomePage";
import { Footer } from "./Layouts/NavbarAndFooter/Footer";
import { Navbar } from "./Layouts/NavbarAndFooter/Navbar";
import { SearchBookPage } from "./Layouts/searchBookPage/SearchBookPage";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 ">
      <Navbar />
      <div className="flex-grow-1">
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact>
            <HomePage />
          </Route>
          <Route path="/search">
            <SearchBookPage />
          </Route>
          <Route path="/checkout/:bookId">
            <BookCheckOutPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
