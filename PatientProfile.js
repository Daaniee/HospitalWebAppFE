document.getElementById("patientForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const patient = {
    fullName: document.getElementById("fullName").value,
    age: parseInt(document.getElementById("age").value),
    address: document.getElementById("address").value,
    bloodType: document.getElementById("bloodType").value,
    phoneNumber: parseInt(document.getElementById("phoneNumber").value),
    gender: document.getElementById("gender").value,
    profileImageUrl: document.getElementById("profileImageUrl").value,
    emergencyContact: document.getElementById("emergencyContact").value,
    genotype: document.getElementById("genotype").value,
    email: document.getElementById("email").value,
    passwordHash: password
  };

  const response = await fetch("http://localhost:5096/api/patient/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient)
  });

  if (response.ok) {
    alert("Patient registered successfully!");
    window.location.href = "/patient-dashboard.html";
  } else {
    const error = await response.json();
    alert("Failed to register: " + (error.message || "Unknown error"));
  }
});