import { Layout } from "antd";
const { Header } = Layout;

export const KanbanHeader = () => {
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo">PMR字幕组工作看板</div>
    </Header>
  );
};
