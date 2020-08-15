import React, { useEffect, useContext, useState } from "react";
import NavBar from "../layout/NavBar";
import UserContext from "../../context/user/userContext";
import { message } from "antd";
import AuthContext from "../../context/auth/authContext";
import AdminContext from "../../context/admin/adminContext";
import AlertContext from "../../context/alert/alertContext";
import NavBarAdmin from "../layout/NavBarAdmin";
import NavBarEmploy from "../layout/NavBarEmploy";
import Header from "../layout/Header";
import Spinner from "../layout/Spinner";
// import socket from "socket.io-client/lib/socket";

import io from 'socket.io-client'

const { proxy } = require('../../../package.json');
let socket

const Home = () => {
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const adminContext = useContext(AdminContext);

  const { user, loadPersonnel } = authContext;
  const { getBeneficiries, getAccounts, error, success, loading, getCustomerInfo } = userContext;
  const { setAlert, alerts } = alertContext;
  const errorAdmin = adminContext.error;

  const [username, setusername] = useState(null);

  (async () => { const res = await getCustomerInfo(); const { username } = res[0]; setusername(username) })();

  useEffect(() => {
    loadPersonnel();
    getAccounts();
    getBeneficiries();
  }, []);
  useEffect(() => {
    if (errorAdmin) {
      console.log("errorAdmin", errorAdmin);
      setAlert(errorAdmin.data, "error");
    }
  }, [errorAdmin]);

  useEffect(() => {
    if (username) {
      console.log('username', username)
      socket = io(proxy)
    }
  }, [username])


  const switchNavBar = () => {
    console.log("user", user);
    if (user) {
      switch (user.admin) {
        case 1:
          return <NavBarAdmin />;
        case 0:
          return <NavBarEmploy />;
      }
    }
    return <NavBar socket={socket} username={username} />;
  };

  return (
    <div>
      {/* {error && message.error(error.msg ? error.msg : error.data.msg)}*/}
      {/* {success && message.success(success)}  */}

      <Header socket={socket} />
      {/* { loading && <Spinner />} */}
      {switchNavBar()}
    </div>
  );
};

export default Home;
