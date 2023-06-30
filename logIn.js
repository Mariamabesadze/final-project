const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault(); 

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "mariabesadze" && password === "1234") {
    alert("Login successful!");
  } else {
    alert("Invalid username or password. Please try again.");
  }

  loginForm.reset();
});