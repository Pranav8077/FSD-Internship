document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);
  $("year").textContent = new Date().getFullYear();
  const toast = new bootstrap.Toast($("appToast"), { delay: 3200 });
  function notify(message) {
    $("toastMessage").textContent = message;
    toast.show();
  }
  function showAlert(id, message, type = "danger") {
    const el = $(id);
    el.className = `alert alert-${type}`;
    el.textContent = message;
    el.classList.remove("d-none");
  }
  function clearAlert(id) { $(id).classList.add("d-none"); }
  function validEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()); }

  document.querySelectorAll(".password-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const field = $(button.dataset.target);
      const reveal = field.type === "password";
      field.type = reveal ? "text" : "password";
      button.innerHTML = `<i class="bi bi-eye${reveal ? '-slash' : ''}"></i>`;
      button.setAttribute("aria-label", reveal ? "Hide password" : "Show password");
    });
  });

  $("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    clearAlert("loginAlert");
    const email = $("loginEmail");
    const password = $("loginPassword");
    email.classList.toggle("is-invalid", !validEmail(email.value));
    password.classList.toggle("is-invalid", password.value.length < 8);
    if (!validEmail(email.value) || password.value.length < 8) {
      showAlert("loginAlert", "Please check your email and password, then try again.");
      return;
    }
    showAlert("loginAlert", "UI demo: your details passed validation. Connect a backend to authenticate users.", "success");
  });

  $("forgotLink").addEventListener("click", (event) => {
    event.preventDefault();
    notify("Password reset is a demo feature. Connect an email service to enable it.");
  });

  document.querySelectorAll("[data-provider]").forEach((button) => {
    button.addEventListener("click", () => notify(`${button.dataset.provider} sign-in is a demo. Configure OAuth to enable it.`));
  });

  const regPassword = $("registerPassword");
  const confirmPassword = $("confirmPassword");
  const strengthBar = $("strengthBar");
  const strengthText = $("strengthText");
  function updateStrength() {
    const value = regPassword.value;
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    const labels = ["Use 8+ characters with letters and numbers.", "Weak password", "Fair password", "Good password", "Strong password"];
    const colors = ["#d66e62", "#d66e62", "#e5a84b", "#6cae83", "#087f78"];
    strengthBar.style.width = `${score * 25}%`;
    strengthBar.style.background = colors[score];
    strengthText.textContent = labels[score];
    strengthText.style.color = colors[score];
  }
  regPassword.addEventListener("input", updateStrength);
  confirmPassword.addEventListener("input", () => {
    confirmPassword.setCustomValidity(confirmPassword.value === regPassword.value ? "" : "Passwords do not match");
  });
  regPassword.addEventListener("input", () => {
    confirmPassword.setCustomValidity(confirmPassword.value && confirmPassword.value !== regPassword.value ? "Passwords do not match" : "");
  });

  $("registerForm").addEventListener("submit", (event) => {
    event.preventDefault();
    clearAlert("registerAlert");
    const name = $("fullName");
    const email = $("registerEmail");
    const terms = $("acceptTerms");
    name.classList.toggle("is-invalid", name.value.trim().length < 2);
    email.classList.toggle("is-invalid", !validEmail(email.value));
    regPassword.classList.toggle("is-invalid", regPassword.value.length < 8);
    confirmPassword.setCustomValidity(confirmPassword.value === regPassword.value ? "" : "Passwords do not match");
    confirmPassword.classList.toggle("is-invalid", !confirmPassword.value || confirmPassword.value !== regPassword.value);
    terms.classList.toggle("is-invalid", !terms.checked);
    if (name.value.trim().length < 2 || !validEmail(email.value) || regPassword.value.length < 8 || confirmPassword.value !== regPassword.value || !terms.checked) {
      showAlert("registerAlert", "Please correct the highlighted fields before continuing.");
      return;
    }
    showAlert("registerAlert", "Registration UI validated successfully! This frontend demo does not create or store accounts.", "success");
    notify("Form validation successful.");
  });

  // Bootstrap client-side validation styling for the required checkbox.
  $("acceptTerms").addEventListener("change", () => $("acceptTerms").classList.toggle("is-invalid", !$("acceptTerms").checked));
  $("registerModal").addEventListener("hidden.bs.modal", () => {
    $("registerForm").reset();
    $("registerForm").querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
    confirmPassword.setCustomValidity("");
    clearAlert("registerAlert");
    updateStrength();
  });
});
