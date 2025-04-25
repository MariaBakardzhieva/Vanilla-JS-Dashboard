import { showModal } from "./modal.js";

let users = [];

/**
 * Initializes the user list functionality:
 * - Fetches users
 * - Displays them
 * - Adds live filtering
 */
export async function initUsers() {
  const userList = document.getElementById("userList");
  const searchInput = document.getElementById("searchInput");

  /**
   * Fetches user data from API and stores it in the users array.
   * On success: calls displayUsers to show them.
   * On error: displays an error message in the UI.
   */
  async function fetchUsers() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      users = await res.json();
      displayUsers(users);
    } catch (err) {
      userList.innerHTML = `<p class="error">${err.message}</p>`;
    }
  }

  function displayUsers(filtered) {
    userList.innerHTML = "";
    if (filtered.length === 0) {
      userList.innerHTML = "<p>No users found.</p>";
      return;
    }

    filtered.forEach((user) => {
      const div = document.createElement("div");
      div.className = "user-item";
      div.innerHTML = `<strong>${user.name}</strong><br>${user.email}`;
      div.addEventListener("click", () => showModal(user.id));
      userList.appendChild(div);
    });
  }

  /**
   * Listens for input in the search field.
   * - Filters users based on their name
   * - Displays the filtered list
   */
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query)
    );
    displayUsers(filtered);
  });

  await fetchUsers();
}
