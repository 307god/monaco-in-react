import { VFC, useRef, useState, useEffect, Fragment } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { css } from "@emotion/css";
import { Button } from "antd";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Array(num).fill("1").join("");
}

export default function App() {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef<HTMLDivElement>(null);

  let disposables: (() => void)[] = [];

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
        language: "typescript",
        automaticLayout: true,
        inlineSuggest: {
          enabled: true,
        },
      });

      return myEditor;
    });
  };

  const addZone = () => {
    const zoneOptions: monaco.editor.IViewZone = {
      afterLineNumber: 5,
      heightInLines: 1,
      domNode: (() => {
        const domNode = document.createElement("div");
        domNode.textContent = `变量1:${getRandomInt(
          1,
          10,
        )}, 变量2:${getRandomInt(1, 10)}`;
        domNode.style.color = "red";
        domNode.style.border = "1px solid yellow";
        domNode.style.fontSize = "12px";
        return domNode;
      })(),
    };

    let zoneId: string;
    if (editor) {
      editor.changeViewZones((changeAccessor) => {
        console.log("addZone");
        zoneId = changeAccessor.addZone(zoneOptions);
      });

      const a = setInterval(() => {
        zoneOptions.heightInLines = 1;
        zoneOptions.domNode.textContent = `变量1:${getRandomInt(
          1,
          10,
        )}, 变量2:${getRandomInt(1, 10)}`;
        editor.changeViewZones((changeAccessor) => {
          console.log("layoutZone");
          changeAccessor.layoutZone(zoneId);
        });
      }, 500);

      disposables.push(() => clearInterval(a));

      // setTimeout(() => {
      //   editor.changeViewZones((changeAccessor) => {
      //     console.log("removeZone");
      //     changeAccessor.removeZone(zoneId);
      //   });
      // }, 4000);
    }
  };

  useEffect(() => {
    if (monacoEl) {
      buildEditor();
    }

    return () => {
      disposables.forEach((o) => o());
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
    </Fragment>
  );
}
