import {
  AuditOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  FileOutlined,
  LinkOutlined,
  SolutionOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { Row, Card, Col, Divider, Steps, Typography, Tag } from "antd";

const { Title, Text, Link } = Typography;

const { Step } = Steps;

const textToStatus = {
  待分配: "wait",
  进行中: "process",
  已完成: "finish",
};

const textToColor = {
  待分配: "",
  进行中: "#1890ff",
  已完成: "#52c41a",
};

export const TaskCard = (props) => {
  const properties = props.taskData.properties;

  function getVideoUrl(property) {
    if (property["rich_text"].length !== 0) {
      let bv_number = property["rich_text"][0]["plain_text"];
      return (
        <Link
          href={`https://www.bilibili.com/video/${bv_number}/`}
          target="_blank"
        >
          {bv_number}
        </Link>
      );
    } else {
      return <Text type="secondary">暂未投稿</Text>;
    }
  }

  function getExeutorName(stepName) {
    try {
      if (properties[stepName]["rich_text"].length !== 0) {
        return properties[stepName]["rich_text"][0]["plain_text"];
      } else {
        return "等待分配";
      }
    } catch (err) {
      console.log(properties[stepName]);
    }
  }

  function getStepStatus(stepName) {
    const statusKey = stepName + "状态";
    if (!properties.hasOwnProperty(statusKey)) {
      return "wait";
    }

    return textToStatus[properties[statusKey]["select"]["name"]];
  }

  function getStepColor(stepName) {
    const statusKey = stepName + "状态";
    if (!properties.hasOwnProperty(statusKey)) {
      return "";
    }

    return textToColor[properties[statusKey]["select"]["name"]];
  }

  function getFinalStatus() {
    function getStatusText(statusKey) {
      if (!properties.hasOwnProperty(statusKey)) {
        return "";
      } else {
        return properties[statusKey]["select"]["name"];
      }
    }
    const translateStatusKey = "翻译状态";
    const timelineStatusKey = "时轴状态";
    const proofreadStatusKey = "校对状态";
    const taskStatusKey = "任务状态";
    if (getStatusText(taskStatusKey) === "已完成") {
      return "已完成";
    } else if (
      getStatusText(translateStatusKey) === "已完成" &&
      getStatusText(timelineStatusKey) === "已完成" &&
      getStatusText(proofreadStatusKey) === "已完成"
    ) {
      return "进行中";
    } else {
      return "待分配";
    }
  }

  return (
    <Card hoverable>
      <Title level={4}>
        {properties["文件名"]["title"][0]["plain_text"]}
        &nbsp;&nbsp;
        <Tag color={properties["系列名"]["select"]["color"]}>
          {properties["系列名"]["select"]["name"]}
        </Tag>
      </Title>
      <Steps>
        <Step
          status={getStepStatus("翻译")}
          title="翻译"
          icon={<TranslationOutlined style={{ color: getStepColor("翻译") }} />}
          description={getExeutorName("翻译")}
        />
        <Step
          status={getStepStatus("时轴")}
          title="时轴"
          icon={<FieldTimeOutlined style={{ color: getStepColor("时轴") }} />}
          description={getExeutorName("时轴")}
        />
        <Step
          status={getStepStatus("校对")}
          title="校对"
          icon={<SolutionOutlined style={{ color: getStepColor("校对") }} />}
          description={getExeutorName("校对")}
        />
        <Step
          status={textToStatus[getFinalStatus()]}
          title="终审"
          description="坂田银串"
          icon={
            <AuditOutlined style={{ color: textToColor[getFinalStatus()] }} />
          }
        />
      </Steps>
      <Divider />
      <Row>
        <Col span={12}>
          <Text>
            <FileOutlined />
            文件名：{properties["文件名"]["title"][0]["plain_text"]}.mp4
          </Text>
        </Col>
        <Col span={12}>
          <Text>
            <CalendarOutlined />
            发布日期：{properties["发布日期"]["date"]["start"]}
          </Text>
        </Col>
        <Col span={12}>
          <Text>
            <FieldTimeOutlined />
            时长：{properties["时长"]["rich_text"][0]["plain_text"]}
          </Text>
        </Col>
        <Col span={12}>
          <Text>
            <LinkOutlined />
            视频链接：{getVideoUrl(properties["BV号"])}
          </Text>
        </Col>
      </Row>
    </Card>
  );
};
