import React from "react";
import { Row, Col } from "antd";
import RightContent from "./RightContent";

const HeaderComp: React.FC = () => {
  return (
    <Row justify='end' align="middle">
      <Col style={{ display: "flex" }}>
        <RightContent />
      </Col>
    </Row>
  );
};

export default HeaderComp;
