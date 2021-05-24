import { Col, Divider, Row, Typography } from "antd";
import { TaskCard } from "./TaskCard";

const { Title } = Typography;

export const TaskList = (props) => {
  return (
    <>
      <Row justify="center">
        <Col span={24}>
          <Divider orientation="right">
            <Title level={4} style={{ color: "grey" }}>
              {props.icon}
              {props.title}
            </Title>
          </Divider>
        </Col>
      </Row>
      <Row gutter={16}>
        {props.taskData.map((task) => {
          return (
            <Col xl={12} md={24} key={task["id"]}>
              <TaskCard taskData={task} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};
