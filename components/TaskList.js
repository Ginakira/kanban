import { Col, Divider, Empty, Row, Typography } from "antd";
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
      <Row gutter={16} justify="center">
        {props.taskData.length === 0 ? (
          <Col>
            <Empty
              description="空无一物"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </Col>
        ) : (
          props.taskData.map((task) => {
            return (
              <Col xl={12} md={24} key={task["id"]}>
                <TaskCard taskData={task} />
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};
