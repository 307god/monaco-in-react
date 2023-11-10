import { FC, useRef, useState, useEffect, Fragment } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { css } from "@emotion/css";
import { Button } from "antd";
import { createRoot, Root } from "react-dom/client";
import Variable from "./variable";
import { addStyle } from "../../../util/style";

// 获取随机长度数据
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Array(num).fill("1").join("");
}

// 假定的数据类型
type Data = {
  lineNumber: number;
  variables: { name: string; value: string; id: string }[];
}[];
// 管理 变量渲染的react-root节点 类型
type RootItem = { id: string; root: Root };

// 根据数据刷新变量节点
function reRenderData(
  rootItems: RootItem[],
  data: Data,
  options?: {
    fontSize?: number;
    multiplier?: number;
  },
) {
  rootItems.forEach((o) => {
    const dataItem = data
      .map((o) => o.variables)
      .flat()
      .find((dataItem) => dataItem.id === o.id);
    if (dataItem) {
      o.root.render(
        <Variable
          name={dataItem.name}
          value={dataItem.value}
          fontSize={options?.fontSize}
          multiplier={options?.multiplier}
        ></Variable>,
      );
    }
  });
}

export default function App() {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef<HTMLDivElement>(null);

  const [monitored, setMonitored] = useState(false);

  useEffect(() => {
    // 监控开始
    if (monitored) {
      // 初始数据
      const data: Data = [
        {
          lineNumber: 1,
          variables: [
            {
              id: "1",
              name: "变量1",
              value: ``,
            },
            {
              id: "3",
              name: "变量3",
              value: ``,
            },
          ],
        },
        {
          lineNumber: 4,
          variables: [
            {
              id: "2",
              name: "变量2",
              value: ``,
            },
          ],
        },
      ];
      // 生成的zone的id集合
      let zoneIds: string[] = [];
      // 用来生成zone的option集合
      const zoneOptions: monaco.editor.IViewZone[] = [];
      // 变量渲染的react-root节点结合
      const rootItems: RootItem[] = [];

      const refreshData = (data: Data) => {
        reRenderData(rootItems, data, {
          fontSize: editor?.getOption(monaco.editor.EditorOption.fontSize),
          multiplier: 1 + monaco.editor.EditorZoom.getZoomLevel() * 0.1,
        });
      };

      // 构建数据
      data.forEach((dataItem) => {
        const div = (() => {
          const div = document.createElement("div");
          dataItem.variables.forEach((variable) => {
            const varDiv = document.createElement("div");
            addStyle(varDiv, { display: "flex", float: "left" });
            div.appendChild(varDiv);
            const root = createRoot(varDiv);
            rootItems.push({
              id: variable.id,
              root,
            });
          });
          return div;
        })();

        zoneOptions.push({
          afterLineNumber: dataItem.lineNumber,
          heightInLines: 1,
          domNode: div,
        });
      });

      // 刷新数据
      refreshData(data);

      // addZone
      editor?.changeViewZones((changeAccessor) => {
        zoneIds = zoneOptions.map((zoneOption) => {
          return changeAccessor.addZone(zoneOption);
        });
      });

      // editor zoom 修改监听
      const editorDidContentSizeChange = editor?.onDidContentSizeChange((e) => {
        editor?.changeViewZones((changeAccessor) => {
          zoneIds.forEach((zoneId) => changeAccessor.layoutZone(zoneId));
        });
        refreshData(data);
      });

      const timer = setInterval(() => {
        // 刷新值
        const data = [
          {
            lineNumber: 1,
            variables: [
              {
                id: "1",
                name: "变量1",
                value: `${getRandomInt(1, 10)}`,
              },
              {
                id: "3",
                name: "变量3",
                value: `${getRandomInt(1, 10)}`,
              },
            ],
          },
          {
            lineNumber: 4,
            variables: [
              {
                id: "2",
                name: "变量2",
                value: `${getRandomInt(1, 10)}`,
              },
            ],
          },
        ];

        refreshData(data);
      }, 500);
      return () => {
        clearInterval(timer);
        editorDidContentSizeChange?.dispose();
        editor?.changeViewZones((changeAccessor) => {
          zoneIds.forEach((zoneId) => changeAccessor.removeZone(zoneId));
        });
      };
    }
  }, [monitored]);

  const removeZone = () => {
    setMonitored(false);
  };

  const addZone = () => {
    setMonitored(true);
  };

  const buildEditor = () => {
    setEditor((editor) => {
      if (editor) return editor;

      const myEditor = monaco.editor.create(monacoEl.current!, {
        value: [
          "function x() {",
          '\tconsole.log("Hello world!");',
          "}",
          "1",
          "1",
          "1",
          "1",
          "1",
          "1",
          "1",
          "1",
          "1",
          "1",
          "1",
          "1",
          "1",
          "1",
          "1",
        ].join("\n"),
        language: "javascript",
        automaticLayout: true,
        inlineSuggest: {
          enabled: true,
        },
        mouseWheelZoom: true,
      });

      return myEditor;
    });
  };

  useEffect(() => {
    if (monacoEl) {
      buildEditor();
    }

    return () => {
      editor?.dispose();
    };
  }, [monacoEl.current]);

  return (
    <Fragment>
      <div
        className={css({
          width: "100%",
          height: "100%",
        })}
        ref={monacoEl}
      ></div>
      <Button
        className={css({
          position: "fixed",
          right: "0",
          top: "0",
        })}
        onClick={() => {
          addZone();
        }}
      >
        addZone
      </Button>
      <Button
        className={css({
          position: "fixed",
          right: "100px",
          top: "0",
        })}
        onClick={() => {
          removeZone();
        }}
      >
        removeZone
      </Button>
    </Fragment>
  );
}
