import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/snippets/markdown";
import "ace-builds/src-min-noconflict/ext-language_tools";

const MarkdownEditor = (props) => {
  return (
    <AceEditor

      placeholder="Your Markdown code"
      mode="markdown"
      theme="tomorrow"
      name="editor_markdown"
      fontSize={14}
      color={"red"}
      width={'100%'}
      height={200}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      value={props.value}
      onChange={props.onChange ? v => props.onChange(v) : undefined}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export default MarkdownEditor;
