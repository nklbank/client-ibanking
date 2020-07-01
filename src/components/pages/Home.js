import React, { useEffect, useContext, useState } from "react";
import NavBar from "../layout/NavBar";
import UserContext from "../../context/user/userContext";
import AlertContext from "../../context/alert/alertContext";
import { message } from "antd";
import AuthContext from "../../context/auth/authContext";
import NavBarAdmin from "../layout/NavBarAdmin";

const Home = () => {
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  const authContext = useContext(AuthContext);

  const { logout, user, loadPersonnel } = authContext;
  const [userState, setUser] = useState(user);
  const { setAlert, alerts } = alertContext;
  const { getBeneficiries, getAccounts, error, success } = userContext;
  useEffect(() => {
    (async () => {
      await loadPersonnel();
      await getAccounts();
      await getBeneficiries();
    })();
  }, [userState]);

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
