import React, { useState, useEffect } from "react";
import { Layout, message, Spin } from "antd";
import "antd/dist/antd.css";
import { StatisticCard } from "../components/StatisticCard";
import { TaskList } from "../components/TaskList";
import { getNotionQueryData } from "../lib/query";
import Head from "next/head";

import {
  CheckCircleOutlined,
  LoadingOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

export async function getServerSideProps(context) {
  return {
    props: {
      notionQueryData: await getNotionQueryData(),
    },
  };
}

export default function Home({ notionQueryData }) {
  let [taskData, setTaskData] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [processingTaskData, setProcessingTaskData] = useState([]);
  let [finishedTaskData, setFinishedTaskData] = useState([]);

  useEffect(() => {
    try {
      setIsLoading(true);
      const _taskData = notionQueryData;
      setTaskData(_taskData);
      // 筛选数据
      let _processingTaskData = [];
      let _finishedTaskData = [];
      _taskData.forEach((task) => {
        if (task["properties"]["任务状态"]["select"]["name"] === "已完成") {
          _finishedTaskData.push(task);
        } else {
          _processingTaskData.push(task);
        }
      });
      setProcessingTaskData(_processingTaskData);
      setFinishedTaskData(_finishedTaskData);

      setIsLoading(false);
    } catch (err) {
      message.error("发生错误");
      console.log(err);
    }
  }, []);

  return (
    <>
      <Head>
        <title>PMR字幕组工作看板</title>
      </Head>
      <Spin
        tip="加载中...请稍候"
        spinning={isLoading}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
      >
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
      </Spin>
    </>
  );
}
