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
        const span = document.createElement('span');
        span.className = 'mensaje-error';
        span.textContent = 'Debe responder';
        span.style.display = 'none';
        tdPregunta.appendChild(document.createElement('br'));
        tdPregunta.appendChild(span);
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
    let completo = true;
    for (let i = 1; i <= preguntas.length; i++) {
        const seleccionado = document.querySelector('input[name="p' + i + '"]:checked');
        const mensaje = document.querySelector('#cuestionario tr:nth-child(' + i + ') .mensaje-error');
        if (!seleccionado) {
            completo = false;
            if (mensaje) mensaje.style.display = 'inline';
        } else {
            if (mensaje) mensaje.style.display = 'none';
            total += parseInt(seleccionado.value, 10);
        }
    }

    const resultado = document.getElementById('resultado');
    const informe = document.getElementById('informe');
    const botonDescargar = document.getElementById('descargar');

    if (!completo) {
        resultado.textContent = 'Responda todas las preguntas.';
        informe.innerHTML = '';
        botonDescargar.style.display = 'none';
        return;
    }

    resultado.textContent = 'Total: ' + total;

    const nombre = document.getElementById('nombre-nino').value;
    const edad = parseInt(document.getElementById('edad').value, 10);
    const sexoInput = document.querySelector('input[name="sexo"]:checked');
    const sexo = sexoInput ? sexoInput.value : '';
    const fecha = document.getElementById('fecha').value;
    const derivadoPor = document.getElementById('derivado-por').value;
    const evaluador = document.getElementById('evaluador').value;
    const derivadoA = document.getElementById('derivado-a').value;

    let sospecha = false;
    if (sexo === 'Masculino' && edad >= 6 && edad <= 11 && total > 17) {
        sospecha = true;
    }
    if (sexo === 'Femenino' && edad >= 6 && edad <= 11 && total > 12) {
        sospecha = true;
    }

    const diagnostico = sospecha ?
        'Sospecha de d\u00e9ficit de atenci\u00f3n con hiperactividad.' :
        'Sin sospecha de d\u00e9ficit de atenci\u00f3n con hiperactividad.';

    const recomendaciones = sospecha ? `
        <ul>
            <li>Iniciar terapia cognitivo-conductual para trabajar atenci\u00f3n e impulsividad.</li>
            <li>Coordinar adaptaciones pedag\u00f3gicas con los docentes.</li>
            <li>Brindar orientaci\u00f3n a padres sobre manejo conductual en casa.</li>
            <li>Derivar a evaluaci\u00f3n m\u00e9dica especializada (neurolog\u00eda o psiquiatr\u00eda infantil).</li>
            <li>Realizar seguimiento psicol\u00f3gico cada 3 a 6 meses.</li>
        </ul>` : `
        <ul>
            <li>Observar y registrar con regularidad los comportamientos relacionados a atenci\u00f3n e impulsividad.</li>
            <li>Promover rutinas estables y horarios organizados en casa y en la escuela.</li>
            <li>Fomentar actividades que requieran concentraci\u00f3n y autocontrol (como juegos de mesa, lectura guiada, arte).</li>
            <li>Aplicar estrategias de refuerzo positivo para conductas adecuadas.</li>
            <li>Realizar seguimiento psicol\u00f3gico preventivo si los s\u00edntomas persisten o aumentan.</li>
        </ul>`;

    informe.innerHTML = `
        <h2>INFORME</h2>
        <h3>DATOS DE FILIACI\u00d3N</h3>
        <p>Apellidos y nombres: ${nombre}</p>
        <p>Edad: ${edad}</p>
        <p>Fecha de Evaluaci\u00f3n: ${fecha}</p>
        <p>Derivado por: ${derivadoPor}</p>
        <p>Evaluado por: ${evaluador}</p>
        <p>Derivado a: ${derivadoA}</p>
        <h3>PROCEDIMIENTO</h3>
        <p>Aplicaci\u00f3n del Cuestionario de Conners Abreviado para padres/docentes.</p>
        <h3>ANTECEDENTES DEL PROBLEMA</h3>
        <p></p>
        <h3>AN\u00c1LISIS DE RESULTADO</h3>
        <p></p>
        <h3>DIAGN\u00d3STICO</h3>
        <p>${diagnostico}</p>
        <h3>RECOMENDACIONES</h3>
        ${recomendaciones}
    `;

    botonDescargar.style.display = 'block';
}

function descargarWord() {
    const contenido = document.getElementById('informe').innerHTML;
    const html = `<html><head><meta charset="utf-8"></head><body>${contenido}</body></html>`;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'informe.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}


function seleccionarTipo(tipo) {
    const tabProfesores = document.getElementById('tab-profesores');
    const tabPadres = document.getElementById('tab-padres');
    if (tipo === 'padres') {
        preguntas = preguntasPadres;
        tabProfesores.classList.remove('active');
        tabPadres.classList.add('active');
        document.getElementById('titulo').textContent = 'Cuestionario de Conducta de CONNERS para PADRES';
        document.getElementById('instrucciones').textContent = '';
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
document.getElementById('descargar').addEventListener('click', descargarWord);
