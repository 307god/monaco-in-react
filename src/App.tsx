import { VFC, useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import styles from "./Editor.module.css";

export function App() {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;

        return monaco.editor.create(monacoEl.current!, {
          value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
            "\n"
          ),
          dropIntoEditor: {
            enabled: true,
            showDropSelector: "afterDrop",
          },
          language: "typescript",
        });
      });
    }

    editor?.onMouseUp((e) => {
      console.log(e);
    });
    editor?.on

    return () => editor?.dispose();
  }, [monacoEl.current]);


  return <div className={styles.Editor} ref={monacoEl}></div>;
}
