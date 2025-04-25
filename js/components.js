/**
 * Fetches the content of an HTML component from a given path.
 * Used to dynamically load static HTML into the main app container.
 *
 * @param {string} path - The relative URL to the HTML file
 * @returns {Promise<string>} - The HTML content as text
 */
export async function loadComponent(path) {
  const response = await fetch(path);
  return await response.text();
}

export async function loadComponents() {
  const app = document.getElementById("app");

  const [sidebarHTML, mainHTML, modalHTML] = await Promise.all([
    loadComponent("components/sidebar.html"),
    loadComponent("components/main.html"),
    loadComponent("components/modal.html"),
  ]);

  app.innerHTML = sidebarHTML + mainHTML + modalHTML;
}
