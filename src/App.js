import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Navbar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import "./App.css";

function App() {
  return (
    <body>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/notFound" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/notFound" />
        </Switch>
      </main>
    </body>
  );
}

export default App;
