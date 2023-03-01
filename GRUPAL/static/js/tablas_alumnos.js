// A PARTIR DE AQUÍ CONTROLAMOS TABLA Y FORMULARIO
// Creamos una instancia de XMLHttpRequest
const xhr = new XMLHttpRequest();

// Abrimos una conexión con el archivo alumnos.json
xhr.open('GET', 'https://raw.githubusercontent.com/davCesur/proyectoInterfacesGrupal/main/alumnos.json', true);

// Configuramos la función que se ejecutará cuando se complete la solicitud
xhr.onload = function() {
    // Comprobamos si el código de estado HTTP es 200 (OK)
    if (this.status === 200) {
        // Analizamos la respuesta como JSON
        const alumnos = JSON.parse(this.responseText);

        // Creamos una cadena de texto para los datos de la tabla
        let tablaHtml = '';
        alumnos.forEach(function(alumno) {
            tablaHtml += `<tr>
                            <td>${alumno.nombre}</td>
                            <td style="border-left: 1px solid black;">${alumno.apellido}</td>
                            <td style="border-left: 1px solid black;">${alumno.dni}</td>
                            <td style="border-left: 1px solid black;">${alumno.empresa}</td>
                            <td style="border-left: 1px solid black;">${alumno.correo}</td>
                            <td style="border-left: 1px solid black;"><a href="tareas_alumnos.html?nombre=${alumno.nombre}&apellido=${alumno.apellido}">
                            <button type="button" class="ver btn btn-info">Ficha</button></a><button type="button" class="borrar btn btn-danger" style="margin-left: 9%;">Borrar</button></td>
                            </tr>`;
        });

        // Insertamos la cadena de texto en el elemento tbody de la tabla
        const tbody = document.querySelector('#tabla_alumnos tbody');
        tbody.innerHTML = tablaHtml;

        // Añadimos bordes negros a la tabla y sus celdas
        const tabla = document.querySelector('#tabla_alumnos');
        tabla.style.border = "1px solid black";

        // Agregamos un evento de doble clic para cada celda editable
        const celdas = document.querySelectorAll('.editable');
        celdas.forEach(function(celda) {
            celda.addEventListener('dblclick', function() {
                // Creamos un input para editar el valor de la celda
                const input = document.createElement('input');
                input.value = celda.innerHTML;

                // Reemplazamos la celda con el input
                celda.innerHTML = '';
                celda.appendChild(input);

                // Agregamos un evento de cambio para el input
                input.addEventListener('change', function() {
                    // Actualizamos el valor de la celda con el valor del input
                    celda.innerHTML = input.value;
                });
            });
        });
    }
  
    const botonesBorrar = document.querySelectorAll('.borrar');
    const tbody = document.querySelector('tbody');
    botonesBorrar.forEach(function(boton) {
      boton.addEventListener('click', function() {
        // Obtenemos el elemento padre del botón (el tr correspondiente) y lo eliminamos
        const tr = boton.parentNode.parentNode;
        tr.remove();
  
        // Obtener el índice del elemento a borrar
        const index = [...tbody.children].indexOf(tr);
  
        // Obtener los datos de las empresas existentes del localStorage si existen
        let alumnos = [];
        const storedAlumnos = localStorage.getItem('alumnos');
        if (storedAlumnos) {
          alumnos = JSON.parse(storedAlumnos);
        }
  
        // Remover el elemento correspondiente del arreglo y actualizar el localStorage
        alumnos.splice(index, 1);
        localStorage.setItem('alumnos', JSON.stringify(alumnos));
      });
    });

};

// Enviamos la solicitud
xhr.send();

function agregarFila() {
  // Obtener los valores de los campos del modal
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const dni = document.getElementById('dni').value;
  const empresa = document.getElementById('empresa').value;
  const correo = document.getElementById('correo').value;
  const modal = document.getElementById('modalAgregarAlumno');

  // Crear un objeto con los valores de los campos
  const alumno = {
    nombre,
    apellido,
    dni,
    empresa,
    correo
  };

  // Obtener los datos de los alumnos existentes del localStorage si existen
  let alumnos = [];
  const storedAlumnos = localStorage.getItem('alumnos');
  if (storedAlumnos) {
    alumnos = JSON.parse(storedAlumnos);
  }

  // Agregar el nuevo alumno al arreglo
  alumnos.push(alumno);

  // Guardar el arreglo de alumnos en el localStorage
  localStorage.setItem('alumnos', JSON.stringify(alumnos));

  // Crear un nuevo elemento tr y agregarlo al final del tbody
  const tbody = document.querySelector('#tabla_alumnos tbody');
  const nuevaFila = document.createElement('tr');
  nuevaFila.innerHTML = `<td>${alumno.nombre}</td>
                        <td style="border-left: 1px solid black;">${alumno.apellido}</td>
                        <td style="border-left: 1px solid black;">${alumno.dni}</td>
                        <td style="border-left: 1px solid black;">${alumno.empresa}</td>
                        <td style="border-left: 1px solid black;">${alumno.correo}</td>
                        <td style="border-left: 1px solid black;"><button type="button" class="ver btn btn-info">Ficha</button><button type="button" class="borrar btn btn-danger" style="margin-left: 9%;">Borrar</button></td>`;
  tbody.appendChild(nuevaFila);

  const botonesBorrar = document.querySelectorAll('.borrar');
botonesBorrar.forEach(function (boton) {
  boton.addEventListener('click', function () {
    // Obtenemos el elemento padre del botón (el tr correspondiente) y lo eliminamos
    const tr = boton.parentNode.parentNode;
    tr.remove();

    // Obtener el índice del elemento a borrar
    const index = [...tbody.children].indexOf(tr);

    // Obtener los datos de los alumnos existentes del localStorage si existen
    let alumnos = [];
    const storedAlumnos = localStorage.getItem('alumnos');
    if (storedAlumnos) {  
      alumnos = JSON.parse(storedAlumnos);
    }

    // Remover el elemento correspondiente del arreglo y actualizar el localStorage
    alumnos.splice(index, 1);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
  });
});

  modal.style.display = 'none';
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
}
// Recuperar los datos del localStorage al cargar la página
window.addEventListener('load', function() {
  const storedAlumnos = localStorage.getItem('alumnos');
  if (storedAlumnos) {
    const alumnos = JSON.parse(storedAlumnos);
    const tbody = document.querySelector('#tabla_alumnos tbody');
    alumnos.forEach(function(alumno) {
      const nuevaFila = document.createElement('tr');
      nuevaFila.innerHTML = `<td>${alumno.nombre}</td>
                              <td style="border-left: 1px solid black;">${alumno.apellido}</td>
                              <td style="border-left: 1px solid black;">${alumno.dni}</td>
                              <td style="border-left: 1px solid black;">${alumno.empresa}</td>
                              <td style="border-left: 1px solid black;">${alumno.correo}</td>
                              <td style="border-left: 1px solid black;"><button type="button" class="ver btn btn-info">Ficha</button><button type="button" class="borrar btn btn-danger" style="margin-left: 9%;">Borrar</button></td>`;
      tbody.appendChild(nuevaFila);
    });
  }
  
  const botonesBorrar = document.querySelectorAll('.borrar');
  const tbody = document.querySelector('tbody');
  botonesBorrar.forEach(function(boton) {
    boton.addEventListener('click', function() {
      // Obtenemos el elemento padre del botón (el tr correspondiente) y lo eliminamos
      const tr = boton.parentNode.parentNode;
      tr.remove();

      // Obtener el índice del elemento a borrar
      const index = [...tbody.children].indexOf(tr);

      // Obtener los datos de las empresas existentes del localStorage si existen
      let alumnos = [];
      const storedAlumnos = localStorage.getItem('alumnos');
      if (storedAlumnos) {
        alumnos = JSON.parse(storedAlumnos);
      }

      // Remover el elemento correspondiente del arreglo y actualizar el localStorage
      alumnos.splice(index, 1);
      localStorage.setItem('alumnos', JSON.stringify(alumnos));
    });
  });
}); 


  function agregarFilaAlumno() {
    // Obtener los valores de los campos del formulario
    let fecha = document.getElementById("fecha").value;
    let tipo = document.getElementById("tipo").value;
    let horas = document.getElementById("horas").value;
    let actividad = document.getElementById("actividad").value;
    let observaciones = document.getElementById("observaciones").value;
  
    // Crear una nueva fila en la tabla y añadir los valores recogidos
    let tabla = document.getElementById("tabla_alumno");
    let nuevaFila = tabla.insertRow(-1);
    let celdaFecha = nuevaFila.insertCell(0);
    let celdaTipo = nuevaFila.insertCell(1);
    let celdaHoras = nuevaFila.insertCell(2);
    let celdaActividad = nuevaFila.insertCell(3);
    let celdaObservaciones = nuevaFila.insertCell(4);
    celdaFecha.innerHTML = fecha;
    celdaTipo.innerHTML = tipo;
    celdaHoras.innerHTML = horas;
    celdaActividad.innerHTML = actividad;
    celdaObservaciones.innerHTML = observaciones;
  }








  ///////////////////////// EMPRESAS /////////////////////////


//LLAMADA JSON EMPRESAS

// Creamos una instancia de XMLHttpRequest
const empresallamada = new XMLHttpRequest();

// Abrimos una conexión con el archivo alumnos.json
empresallamada.open('GET', 'https://raw.githubusercontent.com/davCesur/proyectoInterfacesGrupal/main/listaEmpresas.json', true);

// Configuramos la función que se ejecutará cuando se complete la solicitud
empresallamada.onload = function() {
    // Comprobamos si el código de estado HTTP es 200 (OK)
    if (this.status === 200) {
        // Analizamos la respuesta como JSON
        const emparray = JSON.parse(this.responseText);

        // Creamos una cadena de texto para los datos de la tabla
        let tablaHtml = '';
        emparray.forEach(function(empresa) {
            tablaHtml += `<tr>
                            <td style="border-left: 1px solid black;">${empresa.nombreEmpresa}</td>
                            <td style="border-left: 1px solid black;">${empresa.telefonoEmpresa}</td>
                            <td style="border-left: 1px solid black;">${empresa.mailEmpresa}</td>
                            <td style="border-left: 1px solid black;">${empresa.responsableEmpresa}</td>
                            <td style="border: 1px solid black;"><button type="button" class="borrar btn btn-danger" style="margin-left: 9%;">Borrar</button></td>
                            </tr>`;
        });

        // Insertamos la cadena de texto en el elemento tbody de la tabla
        const tbody = document.querySelector('#tabla_empresas tbody');
        tbody.innerHTML = tablaHtml;

        // Añadimos bordes negros a la tabla y sus celdas
        const tabla = document.querySelector('#tabla_empresas');  
        tabla.style.border = "1px solid black";

        // Agregamos un evento de doble clic para cada celda editable
        const celdas = document.querySelectorAll('.editable');
        celdas.forEach(function(celda) {
            celda.addEventListener('dblclick', function() {
                // Creamos un input para editar el valor de la celda
                const input = document.createElement('input');
                input.value = celda.innerHTML;

                // Reemplazamos la celda con el input
                celda.innerHTML = '';
                celda.appendChild(input);

                // Agregamos un evento de cambio para el input
                input.addEventListener('change', function() {
                    // Actualizamos el valor de la celda con el valor del input
                    celda.innerHTML = input.value;
                });
            });
        });
     
    }

    const botonesBorrar = document.querySelectorAll('.borrar');
    const tbody = document.querySelector('tbody');
    botonesBorrar.forEach(function(boton) {
      boton.addEventListener('click', function() {
        // Obtenemos el elemento padre del botón (el tr correspondiente) y lo eliminamos
        const tr = boton.parentNode.parentNode;
        tr.remove();
  
        // Obtener el índice del elemento a borrar
        const index = [...tbody.children].indexOf(tr);
  
        // Obtener los datos de las empresas existentes del localStorage si existen
        let empresas = [];
        const storedEmpresas = localStorage.getItem('empresas');
        if (storedEmpresas) {
          empresas = JSON.parse(storedEmpresas);
        }
  
        // Remover el elemento correspondiente del arreglo y actualizar el localStorage
        empresas.splice(index, 1);
        localStorage.setItem('empresas', JSON.stringify(empresas));
      });
    });
};

// Enviamos la solicitud
empresallamada.send();




//AÑADIR EMPRESA

function agregarEmpresa() {
  // Obtener los valores de los campos del modal
  const nombre = document.getElementById('nombreEmpresa').value;
  const telefono = document.getElementById('telefono').value;
  const email = document.getElementById('email').value;
  const responsable = document.getElementById('responsable').value;
  const modalEmp = document.getElementById('modalAgregarEmpresa');


  // Crear un objeto con los valores de los campos
  const empresa = {
    nombre,
    telefono,
    email,
    responsable,
  };

  // Obtener los datos de los alumnos existentes del localStorage si existen
  let empresas = [];
  const storedEmpresas = localStorage.getItem('empresas');
  if (storedEmpresas) {
    empresas = JSON.parse(storedEmpresas);
  }

  // Agregar el nuevo alumno al arreglo
  empresas.push(empresa);

  // Guardar el arreglo de alumnos en el localStorage
  localStorage.setItem('empresas', JSON.stringify(empresas));

  // Crear un nuevo elemento tr y agregarlo al final del tbody
  const tbody = document.querySelector('#tabla_empresas tbody');
  const nuevaFila = document.createElement('tr');
  nuevaFila.innerHTML =  `<tr>
  <td style="border: 1px solid black;">${empresa.nombre}</td>
  <td style="border: 1px solid black;">${empresa.telefono}</td>
  <td style="border: 1px solid black;">${empresa.email}</td>
  <td style="border: 1px solid black;">${empresa.responsable}</td>
  <td style="border: 1px solid black;"><button type="button" class="borrar btn btn-danger" style="margin-left: 9%;">Borrar</button></td>
</tr>`;  tbody.appendChild(nuevaFila);

const botonesBorrar = document.querySelectorAll('.borrar');
botonesBorrar.forEach(function (boton) {
  boton.addEventListener('click', function () {
    // Obtenemos el elemento padre del botón (el tr correspondiente) y lo eliminamos
    const tr = boton.parentNode.parentNode;
    tr.remove();

    // Obtener el índice del elemento a borrar
    const index = [...tbody.children].indexOf(tr);

    // Obtener los datos de los alumnos existentes del localStorage si existen
    let empresas = [];
    const storedEmpresas = localStorage.getItem('empresas');
    if (storedEmpresas) {
      empresas = JSON.parse(storedEmpresas);
    }

    // Remover el elemento correspondiente del arreglo y actualizar el localStorage
    empresas.splice(index, 1);
    localStorage.setItem('empresas', JSON.stringify(empresas));
  });
});
modalEmp.style.display = 'none';
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
}

// Recuperar los datos del localStorage al cargar la página
window.addEventListener('load', function() {
  const storedEmpresas = localStorage.getItem('empresas');
  if (storedEmpresas) {
    const empresas = JSON.parse(storedEmpresas);
    const tbody = document.querySelector('#tabla_empresas tbody');
    empresas.forEach(function(empresa) {
      const nuevaFila = document.createElement('tr');
      nuevaFila.innerHTML = `<tr>
      <td style="border: 1px solid black;">${empresa.nombre}</td>
      <td style="border: 1px solid black;">${empresa.telefono}</td>
      <td style="border: 1px solid black;">${empresa.email}</td>
      <td style="border: 1px solid black;">${empresa.responsable}</td>
      <td style="border: 1px solid black;"><button type="button" class="borrar btn btn-danger" style="margin-left: 9%;">Borrar</button></td>
    </tr>`;
         tbody.appendChild(nuevaFila);
    });
  }  

  const botonesBorrar = document.querySelectorAll('.borrar');
  const tbody = document.querySelector('tbody');
  botonesBorrar.forEach(function(boton) {
    boton.addEventListener('click', function() {
      // Obtenemos el elemento padre del botón (el tr correspondiente) y lo eliminamos
      const tr = boton.parentNode.parentNode;
      tr.remove();

      // Obtener el índice del elemento a borrar
      const index = [...tbody.children].indexOf(tr);

      // Obtener los datos de las empresas existentes del localStorage si existen
      let empresas = [];
      const storedEmpresas = localStorage.getItem('empresas');
      if (storedEmpresas) {
        empresas = JSON.parse(storedEmpresas);
      }

      // Remover el elemento correspondiente del arreglo y actualizar el localStorage
      empresas.splice(index, 1);
      localStorage.setItem('empresas', JSON.stringify(empresas));
    });
  });
}); 



