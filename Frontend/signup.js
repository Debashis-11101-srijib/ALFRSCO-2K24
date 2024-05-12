function validateForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if username and password are not empty
    if (username.trim() === '' || password.trim() === '') {
        showError("Please enter both username and password.");
        return false;
    }

  
    if (username !== "admin" || password !== "password") {
        showError("Invalid username or password.");
        return false;
    }

    // Clear error message
    showError("");
    alert("Login successful! Welcome, " + username + "!");

    return true;
}

function showError(message) {
    document.getElementById("errorText").textContent = message;
}
