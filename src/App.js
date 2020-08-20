import React, { Fragment, useEffect, useContext } from "react";
import "antd/dist/antd.css";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Home from "./components/pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";

import EmployeeState from "./context/employee/employeeState";
import AdminState from "./context/admin/adminState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import UserState from "./context/user/userState";
import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom";
import PersonnelLogin from "./components/auth/PersonnelLogin";

const App = () => {


  return (
    <AuthState>
      <UserState>
        <AlertState>
          <EmployeeState>
            <AdminState>
              <Router>
                <Switch>
                  <Fragment>
                    <div>
                      {/* <NavBar /> */}
                      {/* <div className="offset-1 mt-3 shadow bg-white rounded border d-flex justify-content-center align-items-center" style={{ width: 65 + '%' }}> */}
                      <Alerts />
                      <PrivateRoute exact path="/" component={Home} />
                      {/* <PrivateRoute path='/register' component={Register} /> */}
                      {/* <Route exact path="/" component={Home} /> */}
                      <Route exact path="/login" component={Login} />
                      {/*</div> */}
                      <Route
                        exact
                        path="/personnel/login"
                        component={PersonnelLogin}
                      />
                    </div>
                  </Fragment>
                </Switch>
              </Router>
            </AdminState>
          </EmployeeState>
        </AlertState>
      </UserState>
    </AuthState>
  );
};

export default App;
