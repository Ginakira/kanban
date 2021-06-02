import React from "react";
import "antd/dist/antd.css";
import { getNotionQueryData } from "../lib/query";
import { ConfigProvider, Layout } from "antd";
import { KanbanBoard } from "../components/KanbanBoard";
import { KanbanHeader } from "../components/KanbanHeader";
import { KanbanFooter } from "../components/KanbanFooter";
import zhCN from "antd/lib/locale/zh_CN";
const { Content } = Layout;

export async function getServerSideProps(context) {
  return {
    props: {
      notionQueryData: await getNotionQueryData(),
    },
  };
}

export default function Index({ notionQueryData }) {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <KanbanHeader />
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <KanbanBoard notionQueryData={notionQueryData} />
        </Content>
        <KanbanFooter />
      </Layout>
    </ConfigProvider>
  );
}
