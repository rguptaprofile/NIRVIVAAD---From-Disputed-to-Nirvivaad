const API_BASE_URL = "http://localhost:8000/api/v1";
const statusElement = document.querySelector("#api-status");

document.querySelector("#api-check").addEventListener("click", async () => {
  statusElement.textContent = "Checking API...";
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    statusElement.textContent = data.message || "API is online.";
  } catch {
    statusElement.textContent = "API is unavailable. Start the backend and try again.";
  }
});
