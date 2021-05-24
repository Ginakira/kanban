import React from "react";
import "antd/dist/antd.css";
import { getNotionQueryData } from "../lib/query";
import App from "../components/App";

export async function getServerSideProps(context) {
  return {
    props: {
      notionQueryData: await getNotionQueryData(),
    },
  };
}

export default function Home({ notionQueryData }) {
  return <App notionQueryData={notionQueryData} />;
}
