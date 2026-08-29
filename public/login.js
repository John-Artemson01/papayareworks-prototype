// public/login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('login-error');

    // Clear any existing sessions when loading the login page
    sessionStorage.removeItem('papaya_auth_token');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page refresh

        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;

        // Hardcoded Prototype Authentication
        if (usernameInput === 'admin' && passwordInput === 'admin') {
            // Set session token
            sessionStorage.setItem('papaya_auth_token', 'true');
            // Redirect to admin dashboard
            window.location.href = 'admin.html';
        } else {
            // Show error message
            errorMessage.classList.remove('hidden');
            // Shake animation for visual feedback (optional but nice UI)
            loginForm.classList.add('animate-pulse');
            setTimeout(() => loginForm.classList.remove('animate-pulse'), 500);
        }
    });
});