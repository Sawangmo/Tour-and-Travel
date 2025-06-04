document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.auth-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const isAdmin = e.submitter.classList.contains('btn-secondary');

        try {
            const response = await fetch(`/auth/${isAdmin ? 'admin-login' : 'login'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = isAdmin ? '/admin/dashboard' : '/dashboard';
            } else {
                showError(data.message);
            }
        } catch (error) {
            showError('An error occurred. Please try again.');
        }
    });

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        loginForm.insertBefore(errorDiv, loginForm.firstChild);

        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
});