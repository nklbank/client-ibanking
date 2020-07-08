import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import { Alert, message } from "antd";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => {
      // <div key={alert.id} className={`alert alert-${alert.type}`}>
      //   <i className='fas fa-info-circle' /> {alert.msg}
      // </div>
      switch (alert.type) {
        case "error":
          message.error(alert.msg);
          break;
        case "success":
          message.success(alert.msg);
      }
    })
  );
};

export default Alerts;
