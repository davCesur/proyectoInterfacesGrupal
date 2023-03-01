const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const nombreAlumno = urlParams.get('nombre');
const apellidoAlumno = urlParams.get('apellido');

var url = "";

// A PARTIR DE AQUÍ CONTROLAMOS TABLA Y FORMULARIO
// Creamos una instancia de XMLHttpRequest

switch (nombreAlumno) {
    case 'Lucía':
      url = "https://raw.githubusercontent.com/davCesur/proyectoInterfacesGrupal/main/Lucia.json";
      urlDatos = "https://raw.githubusercontent.com/davCesur/proyectoInterfacesGrupal/main/datosLucia.json";
      break;
    case 'Amancio':
        url = "https://raw.githubusercontent.com/davCesur/proyectoInterfacesGrupal/main/Amancio.json";
        urlDatos = "https://raw.githubusercontent.com/davCesur/proyectoInterfacesGrupal/main/datosAmancio.json";
      break;
    case 'Pepe':
        url = "https://raw.githubusercontent.com/davCesur/proyectoInterfacesGrupal/main/Pepe.json";
        urlDatos = "https://raw.githubusercontent.com/davCesur/proyectoInterfacesGrupal/main/datosPepe.json";
        break;
    default:
        break;
  }


// Se cargan los datos del JSON dependiendo del alumno.

const xhr = new XMLHttpRequest();

// Abrimos una conexión con el archivo alumnos.json
xhr.open('GET', url, true);

// Configuramos la función que se ejecutará cuando se complete la solicitud
xhr.onload = function() {
    // Comprobamos si el código de estado HTTP es 200 (OK)
    if (this.status === 200) {
        // Analizamos la respuesta como JSON
        const tareas = JSON.parse(this.responseText);

        //Creamos una cadena de texto para el nombre del alumno
        const nombre = nombreAlumno+' '+apellidoAlumno;
        const titulo = document.querySelector('.tituloAlumno');
        titulo.innerHTML = nombre;

        // Creamos una cadena de texto para los datos de la tabla
        let tablaHtml = '';
        tareas.forEach(function(tarea) {
            
            tablaHtml += `<tr>
                            <td>${tarea.fecha}</td>
                            <td>${tarea.tipo}</td>
                            <td>${tarea.horas}</td>
                            <td>${tarea.actividad}</td>
                            <td>${tarea.observaciones}</td>
                          </tr>`;
        });

        // Insertamos la cadena de texto en el elemento tbody de la tabla
        const tbody = document.querySelector('#tabla_tareas tbody');
        tbody.innerHTML = tablaHtml;
        
    }
};

// Enviamos la solicitud
xhr.send();



// Se cargan los datos acerca de las horas.

const consultaDatos = new XMLHttpRequest();

// Abrimos una conexión con el archivo alumnos.json
consultaDatos.open('GET', urlDatos, true);

// Configuramos la función que se ejecutará cuando se complete la solicitud
consultaDatos.onload = function() {
    // Comprobamos si el código de estado HTTP es 200 (OK)
    if (this.status === 200) {
        // Analizamos la respuesta como JSON
        const datos = JSON.parse(this.responseText);

        // Creamos una cadena de texto para los datos de la tabla
        let tablaDatos = '';
        datos.forEach(function(dato) {
            
            tablaDatos += `<tr>
                            <td>${dato.profesor}</td>
                            <td>${dato.empresa}</td>
                            <td>${dato.realizadasDual}</td>
                            <td>${dato.pendientesDual}</td>
                            <td>${dato.realizadasFCT}</td>
                            <td>${dato.pendientesFCT}</td>
                          </tr>`;
        });

        // Insertamos la cadena de texto en el elemento tbody de la tabla
        const tablaDatosInsert = document.querySelector('#tabla_datos tbody');
        tablaDatosInsert.innerHTML = tablaDatos;
    }
};

// Enviamos la solicitud
consultaDatos.send();
