import { createServer, Model, Response } from "miragejs";

export function makeServer() {
  const server = createServer({
    models: {
      task: Model,
    },

    routes() {
      this.namespace = "api";

      this.post("/execute", (schema, request) => {
        const { language, code } = JSON.parse(request.requestBody);

        const trimmedCode = code.trim().replace(/\s+/g, "");

        const task = schema.tasks.findBy({ language });
        const storedCode = task.code.trim().replace(/\s+/g, "");

        if (trimmedCode !== storedCode) {
          return new Response(
            400,
            {},
            {
              status: "error",
              error:
                "Code does not match the expected code for factorial function",
            }
          );
        }

        return {
          status: "success",
          output: `Factorial of 20 is 2432902008176640000`,
        };
      });
    },

    seeds(server) {
      server.create("task", {
        language: "javascript",
        code: `function factorial(n) { 
          if (n === 0) return 1; 
          else return n * factorial(n - 1); 
        } console.log(factorial(20));`,
      });

      server.create("task", {
        language: "python",
        code: `def factorial(n): 
          if n == 0: 
            return 1 
          else: 
            return n * factorial(n - 1) 
        print(factorial(20))`,
      });
    },
  });

  return server;
}
