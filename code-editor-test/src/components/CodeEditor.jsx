import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import PropTypes from "prop-types";

const CodeEditor = ({ language, setLanguage, code, setCode, handleRun }) => {
  return (
    <div className="code-editor">
      <div className="code-editor__language-btn">
        <label>
          <input
            type="radio"
            value="javascript"
            checked={language === "javascript"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          JavaScript
        </label>
        <label>
          <input
            type="radio"
            value="python"
            checked={language === "python"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          Python
        </label>
      </div>
      <CodeMirror
        value={code}
        height="200px"
        extensions={[language === "javascript" ? javascript() : python()]}
        onChange={(value) => setCode(value)}
      />
      <button className="code-editor__run-btn" onClick={handleRun}>
        Run
      </button>
    </div>
  );
};

CodeEditor.propTypes = {
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  handleRun: PropTypes.func.isRequired,
};

export default CodeEditor;
