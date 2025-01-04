export const showSuccess = (message) => {
  Swal.fire({
    icon: 'success',
    title: '¡Éxito!',
    text: message,
    confirmButtonColor: '#116688'
  });
};

export const showError = (message) => {
  Swal.fire({
    icon: 'error',
    title: '¡Error!',
    text: message,
    confirmButtonColor: '#116688'
  });
};