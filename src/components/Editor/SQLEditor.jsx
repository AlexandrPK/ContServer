import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/snippets/mysql";
import "ace-builds/src-min-noconflict/ext-language_tools";

const SQLEditor = (props) => {
  return (
    <AceEditor
      placeholder="Your SQL code"
      mode="mysql"
      theme="tomorrow"
      name="editor_sql"
      fontSize={14}
      color={'red'}
      width={'100%'}
      height={250}
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

export default SQLEditor;
