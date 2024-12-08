async function handleLogin(event) {
    event.preventDefault(); // Evita el envío por defecto del formulario.
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginBox = document.getElementById('login-box');
    const errorMessage = document.getElementById('error-message'); // Mensaje de error

    try {
        const response = await fetch('auth/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud al servidor');
        }

        const data = await response.json();
        if (data.success) {
            // Redirige al dashboard si el login es exitoso.
            window.location.href = 'dashboard.html';
        } else {
            // Muestra el mensaje de error y aplica la vibración
            errorMessage.style.display = 'block'; // Muestra el mensaje
            loginBox.classList.add('shake'); // Aplica la animación de vibración
            setTimeout(() => {
                loginBox.classList.remove('shake'); // Quita la animación después de 0.5s
            }, 500);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al iniciar sesión');
    }
}
