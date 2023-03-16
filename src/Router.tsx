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
  return (<main className="flex flex-row p-4">
    <div className="self-start grow">
      <UserDashboard />
    </div>
    <div className="self-end shrink">
      <UserForm />
    </div>
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
