import PropTypes from "prop-types";

const TaskResult = ({ result }) => {
  return (
    <div className="code-editor__result">
      <h2>Result</h2>
      {result.status === "success" ? (
        <p className="code-editor__result__output">{result.output}</p>
      ) : (
        <p className="code-editor__result__error">{result.error}</p>
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
