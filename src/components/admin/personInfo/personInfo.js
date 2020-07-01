import React from "react";
import Form from "antd/lib/form/Form";

const layout = {
  labelCol: {
    span: 8,
  },
  wrappercol: {
    span: 16,
  },
};
const tailLayout = {
  wrappercol: {
    offset: 8,
    span: 16,
  },
};

const personInfo = (props) => {
  return (
    <div>
      <Form {...layout}></Form>
    </div>
  );
};

export default personInfo;
