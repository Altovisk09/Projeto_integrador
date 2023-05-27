window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        const authtermosCheckbox = document.querySelector('#authtermos');
        if (!authtermosCheckbox.checked) {
            event.preventDefault();
            alert('Por favor, concorde com os termos de uso e as políticas de privacidade.');
        }
    });
});

