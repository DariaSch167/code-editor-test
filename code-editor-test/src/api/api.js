export const loadTask = async (id) => {
  try {
    const response = await fetch(`/api/tasks/${id}`);
    const taskData = await response.json();

    if (taskData && taskData.description) {
      return { description: taskData.description, hasError: false };
    } else {
      console.error("Invalid task data:", taskData);
      return { description: null, hasError: true };
    }
  } catch (error) {
    console.error("Error fetching task:", error);
    return { description: null, hasError: true };
  }
};

export const checkNextTask = async (id) => {
  try {
    const response = await fetch(`/api/tasks/${id}`);
    return response.ok;
  } catch (error) {
    console.error("Error checking next task:", error);
    return false;
  }
};

export const runCode = async ({ id, language, code }) => {
  try {
    const response = await fetch("/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, language, code }),
    });

    const data = await response.json();
    return { result: data, hasError: false };
  } catch (error) {
    console.error("Error:", error);
    return { result: null, hasError: true };
  }
};
