document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('rol', data.rol);
      window.location.href = data.rol === 'admin' ? 'admin.html' : 'libros.html';
  } else {
      alert(data.mensaje);
  }
});
