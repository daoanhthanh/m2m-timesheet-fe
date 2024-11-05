import { useState } from "react";
import { Button, Col, Row } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import EmployeeSelection from "../../employee/employee-selection";
import { useGetIdentity } from "@refinedev/core";
import User from "@/domains/user/user";
const TimeAndEmployeeSelector = () => {
  const currentYear = new Date().getFullYear();

  const { data } = useGetIdentity<User>();

  const [year, setYear] = useState(currentYear);

  const decreaseYear = () => setYear(year - 1);
  const increaseYear = () => setYear(year + 1);

  return (
    <Row className={styles.header} align="middle" justify="space-between">
      <Col>
        <Button
          type="primary"
          shape="circle"
          icon={<LeftOutlined />}
          onClick={decreaseYear}
        />
        <span style={{ margin: "0 10px" }}>{year}</span>
        <Button
          type="primary"
          shape="circle"
          icon={<RightOutlined />}
          onClick={increaseYear}
          disabled={year >= currentYear}
        />
        <EmployeeSelection
          currentUserId={data!.id}
          currentUserName={data!.userFullName}
        />
      </Col>
      <Col>
        <Button type="primary">Tạo đơn nghỉ</Button>
      </Col>
    </Row>
  );
};

export default TimeAndEmployeeSelector;
