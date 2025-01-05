import { showError, showSuccess } from "./alerts.js";
const submitResetPassword = async (e) => {
  e.preventDefault();

  const passwordField = document.getElementById('password');
  const confirmPasswordField = document.getElementById('confirmPassword');
  const formContainer = document.querySelector('.card-body');

  if(!validatePassword(passwordField.value, confirmPasswordField.value)) {
    showError('Las contraseñas deben de ser iguales');
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
      showSuccess('Contraseña reestablecida con éxito');
      formContainer.innerHTML = `
        <h1 class="text-center" style="color: #116688">Contraseña reestablecida correctamente</h1>
        <p class="text-muted text-center mt-3">Ahora puedes iniciar sesión en Hydrasense y seguir monitoreando tu salud!</p>
        `
    }

    else {
      const data = await response.json();
      showError(data.error);
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
  const submitBtn = form.querySelector('button[type="submit"]');
  const passwordField = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');

  const toggleButtonState = () => {
    if(passwordField.value.trim() && confirmPassword.value.trim()) {
      submitBtn.disabled = false;
    }

    else {
      submitBtn.disabled = true;
    }
  };

  passwordField.addEventListener('input', toggleButtonState);
  confirmPassword.addEventListener('input', toggleButtonState);
  form.addEventListener('submit', submitResetPassword);
})