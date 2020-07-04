import React, { useEffect, useContext, useState } from "react";
import NavBar from "../layout/NavBar";
import UserContext from "../../context/user/userContext";
import AlertContext from "../../context/alert/alertContext";
import { message, Alert } from "antd";
import AuthContext from "../../context/auth/authContext";
import NavBarAdmin from "../layout/NavBarAdmin";
import AdminContext from "../../context/admin/adminContext";

const Home = () => {
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);
  const adminContext = useContext(AdminContext);
  const { logout, user, loadPersonnel } = useContext(AuthContext);

  const [userState, setUser] = useState(user);
  const { setAlert, alerts } = alertContext;
  const { getBeneficiries, getAccounts, error, success } = userContext;
  const errorAdmin = adminContext.error;
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

  const switchNavBar = () => {
    console.log("user", user);
    if (user) {
      switch (user.admin) {
        case 1:
          return <NavBarAdmin />;
        case 0:
          return "NAV BAR EMPLOYEE";
      }
    }
    return <NavBar />;
  };

  const alert = () => {
    if (errorAdmin) {
      message.error(alerts.msg);
    }
  };

  console.log(error);
  return (
    <div>
      {error && message.error(error.msg ? error.msg : error.data.msg)}
      {success && message.success(success.msg)}
      {switchNavBar()}
    </div>
  );
};

export default Home;
