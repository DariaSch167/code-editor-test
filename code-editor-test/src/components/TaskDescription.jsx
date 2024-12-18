import PropTypes from "prop-types";

const TaskDescription = ({ task }) => {
  return (
    <div className="code-editor__task">
      <h2>Task:</h2>
      <p className="code-editor__description">{task}</p>
    </div>
  );
};

TaskDescription.propTypes = {
  task: PropTypes.string.isRequired,
};

export default TaskDescription;
