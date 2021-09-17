import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import "./code-editor.css";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const EditorRef = useRef<any>();
  const onEditorMount: EditorDidMount = (getValue, monacoEditor) => {
    EditorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
  };

  const onFormatClick = () => {
    //get the current values
    const unformatted = EditorRef.current.getModel().getValue();
    //format the value
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    //set the formatted value back into the editor
    EditorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorMount}
        options={{
          wordWrap: "on",
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        value={initialValue}
        theme="dark"
        language="javascript"
        height="100%"
      />
    </div>
  );
};

export default CodeEditor;
