import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import { StatisticCard } from "./StatisticCard";
import { TaskList } from "./TaskList";
import { getNotionQueryData } from "../lib/query";
import Head from "next/head";

import { CheckCircleOutlined, ThunderboltOutlined } from "@ant-design/icons";

export async function getServerSideProps(context) {
  return {
    props: {
      notionQueryData: await getNotionQueryData(),
    },
  };
}

export const KanbanBoard = ({ notionQueryData }) => {
  let taskData = [];
  taskData = notionQueryData;
  // 筛选数据
  let processingTaskData = [];
  let finishedTaskData = [];
  taskData.forEach((task) => {
    if (task["properties"]["任务状态"]["select"]["name"] === "已完成") {
      finishedTaskData.push(task);
    } else {
      processingTaskData.push(task);
    }
  });

  return (
    <>
      <Head>
        <title>PMR字幕组工作看板</title>
      </Head>

      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: "82vh", marginTop: 30 }}
      >
        <div style={{ marginBottom: "30px" }}>
          <StatisticCard taskData={taskData} />
        </div>
        <TaskList
          taskData={processingTaskData}
          title="制作中"
          icon={<ThunderboltOutlined />}
        />
        <TaskList
          taskData={finishedTaskData}
          title="已完成"
          icon={<CheckCircleOutlined />}
        />
      </div>
    </>
  );
};
