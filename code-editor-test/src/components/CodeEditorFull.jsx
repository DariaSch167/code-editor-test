import { useState, useEffect } from "react";
import TaskDescription from "./TaskDescription";
import TaskResult from "./TaskResult";
import CodeEditor from "./CodeEditor";
import { loadTask, checkNextTask, runCode } from "../api/api";

const CodeEditorFull = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [taskId, setTaskId] = useState(1);
  const [taskDescription, setTaskDescription] = useState(null);
  const [hasNextTask, setHasNextTask] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      const { description, hasError } = await loadTask(taskId);
      if (!hasError) {
        setTaskDescription(description);
      } else {
        setTaskDescription("Error loading task.");
      }
    };

    const fetchNextTaskStatus = async () => {
      const hasNext = await checkNextTask(taskId + 1);
      setHasNextTask(hasNext);
    };

    fetchTask();
    fetchNextTaskStatus();
  }, [taskId]);

  const handleRun = async () => {
    const { result, hasError } = await runCode({
      id: taskId,
      language,
      code,
    });
    if (!hasError) {
      setResult(result);
    } else {
      setResult("Error executing code.");
    }
  };

  const handleNextTask = () => {
    setTaskId((prevId) => prevId + 1);
    setCode("");
    setResult("");
  };

  const handlePrevTask = () => {
    if (taskId > 1) {
      setTaskId((prevId) => prevId - 1);
    }
    setCode("");
    setResult("");
  };

  return (
    <>
      <div className="navigation-buttons">
        <button onClick={handlePrevTask} disabled={taskId === 1}>
          Previous Task
        </button>
        <button onClick={handleNextTask} disabled={!hasNextTask}>
          Next Task
        </button>
      </div>
      <TaskDescription task={taskDescription ? taskDescription : ""} />
      <CodeEditor
        language={language}
        setLanguage={setLanguage}
        code={code}
        setCode={setCode}
        handleRun={handleRun}
      />
      {result && <TaskResult result={result} />}
    </>
  );
};

export default CodeEditorFull;
