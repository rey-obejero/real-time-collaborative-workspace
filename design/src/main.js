import Alpine from "alpinejs";
import { components } from "./components.js";

document.addEventListener("alpine:init", () => {
  for (const [name, factory] of Object.entries(components)) {
    Alpine.data(name, factory);
  }
});

window.Alpine = Alpine;
Alpine.start();
