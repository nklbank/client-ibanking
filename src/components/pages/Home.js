import React, { useEffect, useContext, useState } from "react";
import NavBar from "../layout/NavBar";
import UserContext from "../../context/user/userContext";
import { message } from "antd";
import AuthContext from "../../context/auth/authContext";
import NavBarAdmin from "../layout/NavBarAdmin";
import NavBarEmploy from "../layout/NavBarEmploy"
import Header from '../layout/Header'
import Spinner from '../layout/Spinner';

const Home = () => {
  const userContext = useContext(UserContext);

  const authContext = useContext(AuthContext);

  const { user, loadPersonnel } = authContext;
  const { getBeneficiries, getAccounts, error, success, loading } = userContext;
  useEffect(() => {
    loadPersonnel();
    getAccounts();
    getBeneficiries();
  }, []);

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
    return <NavBar />;
  };

  return (
    <div>
      {/* {error && message.error(error.msg ? error.msg : error.data.msg)}*/}
      {/* {success && message.success(success)}  */}

      <Header />
      {/* { loading && <Spinner />} */}
      {switchNavBar()}
    </div>
  );
};

export default Home;
