import { createServer, Response } from "miragejs";
import tasksJSON from "./tasks.json";

export function makeServer() {
  const server = createServer({
    routes() {
      this.namespace = "api";

      // GET запрос для получения задачи по ID
      this.get("/tasks/:id", (schema, request) => {
        const id = parseInt(request.params.id, 10);
        const tasks = tasksJSON;

        const task = tasks.find((task) => task.id === id);

        if (!task) {
          return new Response(
            404,
            {},
            { status: "error", error: "Task not found" }
          );
        }

        return task;
      });

      // POST запрос для выполнения кода
      this.post("/execute", (schema, request) => {
        const { id, language, code } = JSON.parse(request.requestBody);

        const tasks = tasksJSON;
        const task = tasks.find((task) => task.id === id);

        if (!task) {
          return new Response(
            404,
            {},
            { status: "error", error: "Task not found" }
          );
        }

        const storedCode = task[language];
        const trimmedCode = code.trim().replace(/\s+/g, "");
        const storedTrimmedCode = storedCode.trim().replace(/\s+/g, "");

        if (trimmedCode !== storedTrimmedCode) {
          return new Response(
            400,
            {},
            {
              status: "error",
              error: "SyntaxError: Invalid syntax",
            }
          );
        }

        return {
          status: "success",
          output: task.result,
        };
      });
    },
  });

  return server;
}
