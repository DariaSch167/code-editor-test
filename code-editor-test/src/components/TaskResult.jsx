import PropTypes from "prop-types";

const TaskResult = ({ result }) => {
  return (
    <div>
      <h2>Result:</h2>
      {result.status === "success" ? (
        <pre className="code-editor__result__output">{result.output}</pre>
      ) : (
        <pre className="code-editor__result__error">{result.error}</pre>
      )}
    </div>
  );
};

TaskResult.propTypes = {
  result: PropTypes.shape({
    status: PropTypes.string.isRequired,
    output: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
};

export default TaskResult;
