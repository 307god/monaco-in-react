import { ReactNode, Fragment, useState } from "react";
import { Button, Select } from "antd";
import { css } from "@emotion/css";
import MonacoBase from "./components/monaco-editor/base";
import MonacoZone from "./components/monaco-editor/zone";

const demoList: {
  key: string;
  group: string;
  description: string;
  reactNode: ReactNode;
}[] = [
  {
    key: "base",
    group: "monaco",
    description: "基础",
    reactNode: <MonacoBase key="base"></MonacoBase>,
  },
  {
    key: "zone",
    group: "monaco",
    description: "部分行上方渲染自定义dom",
    reactNode: <MonacoZone key="zone"></MonacoZone>,
  },
];

export function App() {
  const [value, setValue] = useState(demoList[0].key);

  const [num, setNum] = useState(0);
  const refresh = () => {
    setNum(num + 1);
  };

  return (
    <div
      className={css({
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Select
        value={value}
        style={{ width: 400 }}
        onChange={setValue}
        options={demoList.map((demo) => ({
          value: demo.key,
          label: `${demo.group}-${demo.description}`,
        }))}
      />
      <Button onClick={refresh}>refresh</Button>
      <div
        className={css({
          flex: "1",
        })}
        key={num}
      >
        {demoList.find((demo) => demo.key === value)?.reactNode}
      </div>
    </div>
  );
}
