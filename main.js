const preguntasProfesores = [
    'Tiene excesiva inquietud motora.',
    'Tiene explosiones impredecibles de mal genio.',
    'Se distrae facilmente, tiene escasa atencion.',
    'Molesta frecuentemente a otros ninos.',
    'Tiene aspecto enfadado, hurano.',
    'Cambia bruscamente sus estados de animo.',
    'Intranquilo, siempre en movimiento.',
    'Es impulsivo e irritable.',
    'No termina las tareas que empieza.',
    'Sus esfuerzos se frustran facilmente.'
];

const preguntasPadres = [
    'Es impulsivo, irritable.',
    'Es llor\u00f3n/a.',
    'Es m\u00e1s movido de lo normal.',
    'No puede estarse quieto/a.',
    'Es destructor (ropas, juguetes, otros objetos).',
    'No acaba las cosas que empieza',
    'Se distrae f\u00e1cilmente, tiene escasa atenci\u00f3n.',
    'Cambia bruscamente sus estados de \u00e1nimo.',
    'Sus esfuerzos se frustran f\u00e1cilmente.',
    'Suele molestar frecuentemente a otros ni\u00f1os.'
];

let preguntas = preguntasProfesores;

function crearCuestionario() {
    const contenedor = document.getElementById('cuestionario');
    contenedor.innerHTML = '';
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Pregunta</th><th>Nada</th><th>Poco</th><th>Bastante</th><th>Mucho</th></tr>';
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    preguntas.forEach((texto, i) => {
        const tr = document.createElement('tr');
        const tdPregunta = document.createElement('td');
        tdPregunta.textContent = (i + 1) + '. ' + texto;
        tr.appendChild(tdPregunta);
        for (let val = 0; val <= 3; val++) {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'p' + (i + 1);
            input.value = val;
            if (val === 0) input.required = true;
            td.appendChild(input);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    contenedor.appendChild(table);
}

function calcularResultado() {
    let total = 0;
    for (let i = 1; i <= preguntas.length; i++) {
        const seleccionado = document.querySelector('input[name="p' + i + '"]:checked');
        if (seleccionado) total += parseInt(seleccionado.value, 10);
    }
    const resultado = document.getElementById('resultado');
    const mensajeNiños = 'Para los niños entre 6 y 11 años: una puntuación >16 es sospecha de déficit de atención con hiperactividad.';
    const mensajeNiñas = 'Para las niñas entre 6 y 11 años: una puntuación >12 es sospecha de déficit de atención con hiperactividad.';
    resultado.innerHTML = 'Total: ' + total + '<br>' + mensajeNiños + '<br>' + mensajeNiñas;
}


function seleccionarTipo(tipo) {
    const tabProfesores = document.getElementById('tab-profesores');
    const tabPadres = document.getElementById('tab-padres');

    if (tipo === 'padres') {
        preguntas = preguntasPadres;
        tabProfesores.classList.remove('active');
        tabPadres.classList.add('active');
        document.getElementById('titulo').textContent = 'Cuestionario de Conducta de CONNERS para PADRES';
        document.getElementById('instrucciones').textContent = 'Asigne puntos a cada respuesta: Nada = 0, Poco = 1, Bastante = 2, Mucho = 3';
    } else {
        preguntas = preguntasProfesores;
        tabPadres.classList.remove('active');
        tabProfesores.classList.add('active');
        document.getElementById('titulo').textContent = 'Cuestionario de Conducta de CONNERS para PROFESORES';
        document.getElementById('instrucciones').textContent = '';
    }

    crearCuestionario();
}

document.getElementById('tab-profesores').addEventListener('click', () => seleccionarTipo('profesores'));
document.getElementById('tab-padres').addEventListener('click', () => seleccionarTipo('padres'));

// Inicializa con la pestaña de profesores
seleccionarTipo('profesores');

document.getElementById('calcular').addEventListener('click', calcularResultado);
