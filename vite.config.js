import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const page = (name) => fileURLToPath(new URL(`./${name}`, import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: page("index.html"),
        lampi: page("lampi-din-lemn.html"),
        mese: page("mese-de-cafea.html"),
        comenzi: page("comenzi-personalizate.html"),
        despre: page("despre.html"),
        contact: page("contact.html"),
      },
    },
  },
});