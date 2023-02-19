import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // all files in the project ending with .cy.ts will be included
    specPattern: "src/**/*.cy.ts",
    baseUrl: "http://localhost:5173"
  },
});
