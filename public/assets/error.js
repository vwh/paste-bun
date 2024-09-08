document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("check-form");
  const contentInput = document.getElementById("content");

  form.addEventListener("submit", (event) => {
    let hasErrors = false;

    document.querySelectorAll(".error-message").forEach((msg) => msg.remove());

    // Content validation
    const content = contentInput.value.trim();
    if (content.length < 1) {
      showError(contentInput, "Content is required.");
      hasErrors = true;
    } else if (content.length > 5000) {
      showError(contentInput, "Content must not exceed 5,000 characters.");
      hasErrors = true;
    }

    if (hasErrors) {
      event.preventDefault();
    }
  });

  function showError(inputElement, message) {
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.textContent = message;
    inputElement.parentNode.insertBefore(
      errorMessage,
      inputElement.nextSibling
    );
  }
});
