import { loadComponents } from "./components.js";
import { initUsers } from "./users.js";
import { initModal } from "./modal.js";

async function initDashboard() {
  await loadComponents();
  initModal();
  initUsers();
}

initDashboard();
