import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  const handleRun = async () => {
    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language, code }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="code-editor__task">
        <h2>Task:</h2>
        <p className="code-editor__description">
          Write a function named <strong>factorial</strong> that calculates the
          factorial of a number. The function should print the result of{" "}
          <code>factorial(20)</code>.
        </p>
      </div>
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
      {result && (
        <div>
          <h2>Result:</h2>
          {result.status === "success" ? (
            <pre className="code-editor__result__output">{result.output}</pre>
          ) : (
            <pre
              style={{ color: "red" }}
              className="code-editor__result__error">
              {result.error}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
