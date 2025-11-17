document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch("http://localhost:5096/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const data = await response.json();
    alert("Login successful!");

    // Redirect based on role
    if (data.role === "Patient") {
      window.location.href = "/patient-dashboard.html";
    } else if (data.role === "Doctor") {
      window.location.href = "/doctor-dashboard.html";
    } else if (data.role === "Admin") {
      window.location.href = "/admin-dashboard.html";
    } else {
      window.location.href = "/staff-dashboard.html";
    }
  } else {
    alert("Invalid credentials");
  }
});

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // 🔎 Validate email with POST
  const checkResponse = await fetch("http://localhost:5096/api/patient/check-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  const checkData = await checkResponse.json();

  if (checkData.exists) {
    alert("This email is already registered. Please log in instead.");
    return; // stop signup
  }

  // ✅ If email is free, store in session and redirect
  sessionStorage.setItem("signupEmail", email);
  sessionStorage.setItem("signupPassword", password);

  window.location.href = "/PatientProfile.html";
});

