import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import { StatisticCard } from "../components/StatisticCard";
import { TaskList } from "../components/TaskList";
import { getNotionQueryData } from "../lib/query";
import Head from "next/head";

import { CheckCircleOutlined, ThunderboltOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

export async function getServerSideProps(context) {
  return {
    props: {
      notionQueryData: await getNotionQueryData(),
    },
  };
}

export default function App({ notionQueryData }) {
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
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo">PMR字幕组工作看板</div>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
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
        </Content>
        <Footer style={{ textAlign: "center" }}>
          PMR Fansub &copy; 2021 Created by Ginakira
        </Footer>
      </Layout>
    </>
  );
}
