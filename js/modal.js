/**
 * Initializes the modal behavior:
 * - Sets up close button
 * - Allows closing with Escape key
 * - Allows clicking outside the modal content to close it
 */
export function initModal() {
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("closeModal");

  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.classList.remove("show");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("show");
  });
}

/**
 * Displays the modal and loads posts for the given user ID.
 * - Shows a loading message while fetching
 * - Displays the titles of the user's posts
 * - Handles errors gracefully
 *
 * @param {number} userId - ID of the user whose posts will be shown
 */
export async function showModal(userId) {
  const modal = document.getElementById("modal");
  const modalList = document.getElementById("modalList");

  modal.classList.add("show");
  modalList.innerHTML = "Loading...";

  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    if (!res.ok) throw new Error("Failed to fetch posts");
    const posts = await res.json();

    modalList.innerHTML = posts.length
      ? posts.map((post) => `<p>• ${post.title}</p>`).join("")
      : "<p>No posts available.</p>";
  } catch (err) {
    modalList.innerHTML = `<p class="error">${err.message}</p>`;
  }
}
