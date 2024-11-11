document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting normally

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Get data from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Check if login credentials match
    if (username === storedUsername && password === storedPassword) {
        alert('Login successful!');
        window.location.href = 'index.html';  // Redirect to home or dashboard page
    } else {
        alert('Invalid username or password');
    }
});
