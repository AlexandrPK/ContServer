import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/snippets/mysql";
import "ace-builds/src-min-noconflict/ext-language_tools";

const SQLEditor = () => {
  return (
    <AceEditor
      placeholder="Your SQL code"
      mode="mysql"
      theme="tomorrow"
      name="editor_sql"
      fontSize={14}
      color={'red'}
      height={'100%'}
      width={'100%'}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      value={``}
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
