const submitResetPassword = async (e) => {
  e.preventDefault();

  const passwordField = document.getElementById('password');
  const confirmPasswordField = document.getElementById('confirmPassword');

  if(!validatePassword(passwordField.value, confirmPasswordField.value)) {
    alert('Las contraseñas no coinciden');
    return;
  }

  const path = window.location.pathname.split('/');
  const token = path[path.length - 1];

  const data = {
    password: passwordField.value
  };

  try {
    const response = await fetch(`/api/auth/reset-password/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Contraseña reestablecida con éxito');

    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const validatePassword = (password, confirmPassword) => {
  return password === confirmPassword;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('resetPasswordForm');
  form.addEventListener('submit', submitResetPassword);
})