const form = document.getElementById('conners-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
});

const btnCalcular = document.getElementById('calcular');
const resultado = document.getElementById('resultado');

btnCalcular.addEventListener('click', function() {
    let total = 0;
    for (let i = 1; i <= 10; i++) {
        const seleccionado = form.querySelector(`input[name="q${i}"]:checked`);
        if (seleccionado) {
            total += parseInt(seleccionado.value, 10);
        }
    }
    resultado.textContent = `Total: ${total} puntos`;
});
