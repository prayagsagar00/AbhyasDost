document.addEventListener('DOMContentLoaded', (event) => {
    const dateElement = document.getElementById('date');
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString();
});