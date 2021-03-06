import { Statistic, Row, Col } from "antd";
import {
  CalendarFilled,
  CheckCircleFilled,
  ThunderboltFilled,
} from "@ant-design/icons";

export const StatisticCard = (props) => {
  let processingNumber = 0;
  let videoNumber = 0;
  let sinceLastUpdateDays = 0;

  const data = props.taskData;
  if (data.length === 0) return;
  let count = 0;
  data.forEach((task) => {
    if (task["properties"]["任务状态"]["select"]["name"] !== "已完成") {
      ++count;
    }
  });
  processingNumber = count;
  videoNumber = data.length - processingNumber;
  let lastUpdateDay = data[0]["properties"]["发布日期"]["date"]["start"];
  sinceLastUpdateDays = Math.floor(
    (+new Date() - Date.parse(lastUpdateDay)) / (24 * 3600 * 1000)
  );

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic
            title="制作中的视频"
            value={processingNumber}
            suffix="个"
            prefix={<ThunderboltFilled style={{ color: "#ffa940" }} />}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="今年已投稿的视频"
            value={videoNumber}
            suffix="个"
            prefix={<CheckCircleFilled style={{ color: "#73d13d" }} />}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="距离Youtube频道上次更新已过去"
            value={sinceLastUpdateDays}
            suffix="天"
            prefix={<CalendarFilled style={{ color: "#40a9ff" }} />}
          />
        </Col>
      </Row>
    </>
  );
};
