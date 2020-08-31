import React from "react";
import Home from "./Components/Home/Home";
import "./App.css";
import Header from "./Components/Header/Header";
import SearchPage from "./Components/SearchPage/SearchPage";
import Footer from "./Components/Home/Footer/Footer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Host from "./Components/Host/Host";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/host">
            <Host />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
