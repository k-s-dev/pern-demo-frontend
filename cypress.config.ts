import { defineConfig } from "cypress";
import { routes } from "./src/lib/routes";

const baseUrl = "http://localhost:3000";

export default defineConfig({
  e2e: {
    baseUrl,
    setupNodeEvents(on) {
      on("task", {
        "db:reset": async () => await fetch(baseUrl + routes.test.db.reset),
        "db:seed": async () => await fetch(baseUrl + routes.test.db.seed),
      });
    },
  },
});
