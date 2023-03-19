import React from "react";
import { UserDashboard } from "./containers";
import { UserForm } from "./containers/users";
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Layout from "./Layout";

const JoinedDashboard = () => {
  return (<main className="grid grid-cols-2 grid-rows-1 gap-x-4 p-8">
    <UserDashboard />
    <UserForm />
  </main>)
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Layout} path="/">
          <Route path="/" index Component={JoinedDashboard} />
          {/* <Route Component={UserDashboard} index path="/users" />
          <Route Component={UserForm} path="/users/add" /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
