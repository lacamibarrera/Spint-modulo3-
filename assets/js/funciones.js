/*
a) Recibe datos: 
    NOMBRE - APELLIDO - EDAD 
    TRABAJADOR ACTIVO (SI/NO) 
    SUELDO ACTUAL - SUELDO ANTERIOR 
    CARGAS FAMILIARES (SI/NO) 
    CANT. CARGAS FAMILIARES 
    MONTO x CARGA 
    SUELDO FINAL
b) Calcula su permanencia en la organización en días, meses, años y cuánto falta para cumplir 1 año.
c) Sueldo, carga familiar y sueldo final.
*/

// RECIBE NOMBRE APELLIDO SUELDOS CARGAS FAMILIARES

const formulario = document.getElementById("formulario");
const tieneCargasFamiliaresCheckbox = document.getElementById('tieneCargasFamiliares'); // Casilla de cargas familiares
const cantidadCargasFamiliaresInput = document.getElementById('cantidadCargasFamiliares'); // Cantidad de cargas 
tieneCargasFamiliaresCheckbox.addEventListener('change', toggleCantidadCargasFamiliares);

// Revisa la casilla del formulario "Tiene cargas familiares" y le agrega-quita la etiqueta Disabled
function toggleCantidadCargasFamiliares() {
      if (tieneCargasFamiliaresCheckbox.checked) {
      cantidadCargasFamiliaresInput.removeAttribute('disabled'); // Si la casilla está seleccionada, permite escribir la cantidad de cargas
    } else {
      cantidadCargasFamiliaresInput.setAttribute('disabled', 'disabled'); // Si la casilla NO está seleccionada, no se puede escribir en este input
    }
  }

// Calcula el monto de la carga familiar según el sueldo del trabajador
function obtenerMontoCargaFamiliar(sueldo, tramo) {
    let monto = 0;
    switch (tramo) {
      case "A":
        if (sueldo <= 429899) {
          monto = 16828;
        }
        break;
      case "B":
        if (sueldo > 429899 && sueldo <= 627913) {
          monto = 10327;
        }
        break;
      case "C":
        if (sueldo > 627913 && sueldo <= 979330) {
          monto = 3264;
        }
        break;
      case "D":
        if (sueldo > 979330) {
          monto = sueldo - 979330;
        }
        break;
      default:
        monto = 0;
    }
    return monto;
  }
  
// Calcula sueldo final segun bono a recibir
function calcularSueldo(nombre, apellidos, sueldoActual, sueldoSemestreAnterior, tieneCargasFamiliares, cantidadCargasFamiliares) {
    const sueldoPromedio = (sueldoActual + sueldoSemestreAnterior) / 2;
  
    let tramo = "";
    if (sueldoPromedio <= 429899) {
      tramo = "A";
    } else if (sueldoPromedio <= 627913) {
      tramo = "B";
    } else if (sueldoPromedio <= 979330) {
      tramo = "C";
    } else {
      tramo = "D";
    }
  
    const montoTramo = obtenerMontoCargaFamiliar(sueldoPromedio, tramo);
  
    const sueldoFinal = sueldoPromedio + montoTramo;
    let montoCargaFamiliar = 0;
  
    if (tieneCargasFamiliares) {
      montoCargaFamiliar = obtenerMontoCargaFamiliar(sueldoFinal, tramo) * cantidadCargasFamiliares;
    }
  
    const sueldoFinalConCarga = sueldoFinal + montoCargaFamiliar;
  
    return {
      nombre,
      apellidos,
      sueldoActual,
      sueldoSemestreAnterior,
      tieneCargasFamiliares,
      cantidadCargasFamiliares,
      sueldoFinal: sueldoFinalConCarga,
      tramo,
      montoTramo,
      montoCargaFamiliar
    };
  }

  formulario.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario
  
    // Obtener los valores ingresados por el usuario
    const nombre = formulario.nombre.value;
    const apellidos = formulario.apellidos.value;
    const sueldoActual = Number(formulario.sueldoActual.value);
    const sueldoSemestreAnterior = Number(formulario.sueldoSemestreAnterior.value);
    const tieneCargasFamiliares = formulario.tieneCargasFamiliares.checked;
    const cantidadCargasFamiliares = Number(formulario.cantidadCargasFamiliares.value);
  
    // Valida si los datos ingresados son números
    if (isNaN(sueldoActual) || isNaN(sueldoSemestreAnterior) || isNaN(cantidadCargasFamiliares)) {
      alert("Los campos de sueldo actual, sueldo semestre anterior y cantidad de cargas familiares deben ser números.");
      return;
    }

  // Calcular el sueldo final
  const resultado = calcularSueldo(nombre, apellidos, sueldoActual, sueldoSemestreAnterior, tieneCargasFamiliares, cantidadCargasFamiliares);
  // Obtener el elemento donde se mostrará el resultado
  const resultadoElemento = document.getElementById("resultado");

  // Mostrar el resultado
resultadoElemento.innerHTML = "Nombre completo: " + resultado.nombre + " " + resultado.apellidos + "<br>Sueldo actual: $" + resultado.sueldoActual + "<br>Monto de carga familiar: $" + (tieneCargasFamiliares ? obtenerMontoCargaFamiliar(resultado.sueldoFinalConCarga > resultado.sueldoSemestreAnterior ? resultado.sueldoFinalConCarga : resultado.sueldoSemestreAnterior) : 0) + "<br>Sueldo final: $" + resultado.sueldoFinalConCarga;

  const tramo = resultado.tramo;
  const montoTramo = resultado.montoTramo;
  resultadoElemento.innerHTML += "<br>Tramo: " + tramo + "<br>Monto de tramo: $" + montoTramo;
});



// CALCULA TIEMPO EN DIAS-MESES-AÑOS
function calcularEdad(fecha) {
    // Crear un objeto Date a partir del valor de la fecha
    const fechaNacimiento = new Date(fecha + "T00:00:00Z"); // agregar 'T00:00:00Z' y usar UTC

    const hoy = new Date();

    let edad = hoy.getUTCFullYear() - fechaNacimiento.getUTCFullYear(); // usar getUTCFullYear()
    let mes = hoy.getUTCMonth() - fechaNacimiento.getUTCMonth(); // usar getUTCMonth()
    let dia = hoy.getUTCDate() - fechaNacimiento.getUTCDate(); // usar getUTCDate()

    if (mes < 0 || (mes === 0 && dia < 0)) {
        edad--;
    }

    if (mes < 0) {
        mes += 12;
    }
 
    if (dia < 0) {
        let ultimoDiaMesAnterior = new Date(hoy.getUTCFullYear(), hoy.getUTCMonth(), 0).getUTCDate(); // usar UTC
        dia = ultimoDiaMesAnterior - fechaNacimiento.getUTCDate() + hoy.getUTCDate();

        if (mes === 0) {
            mes = 11;
            edad--;
        } else {
            mes--;
        }
    }

    //Crea un objeto con los datos obtenidos (Dia/Mes/Año)
    return { años: edad, meses: mes, dias: dia };
}

//Calcula cuantos dias faltan para siguiente cumpleaños
function esCumpleaños(fecha) {
    let cumpleanos = new Date(fecha);
    let hoy = new Date();

    if (cumpleanos.getDate() === hoy.getDate() && cumpleanos.getMonth() === hoy.getMonth()) {
        return true;
    } else {
        // Compara la fecha de cumpleaños sin tener en cuenta el año
        let fechaSinAnioCumple = new Date(0, cumpleanos.getMonth(), cumpleanos.getDate());
        let fechaSinAnioHoy = new Date(0, hoy.getMonth(), hoy.getDate());
        return fechaSinAnioCumple.getTime() === fechaSinAnioHoy.getTime();
    }
}

function diasParaCumpleaños(fecha) {
    let cumpleanos = new Date(fecha + "T00:00:00Z"); // agregar 'T00:00:00Z' y usar UTC
    let hoy = new Date();
    let proximoCumple = new Date(hoy.getUTCFullYear(), cumpleanos.getUTCMonth(), cumpleanos.getUTCDate()); // usar UTC

    if (proximoCumple < hoy) {
        proximoCumple.setUTCFullYear(proximoCumple.getUTCFullYear() + 1); // usar UTC
    }

    const unDia = 1000 * 60 * 60 * 24;
    const diasFaltantes = Math.floor((proximoCumple - hoy) / unDia);
    return diasFaltantes;
}

function mostrarEdad() {
    const fechaCalendario = document.getElementById("fecha-nacimiento").value;

    // Calcular la edad a partir de la fecha seleccionada
    const edad = calcularEdad(fechaCalendario); //Aqui utiliza el objeto con los datos creados en calcularEdad()

    // Obtener el nombre del día de la semana de la fecha seleccionada
    let nombreDiaNacimiento = [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
    ][(new Date(fechaCalendario).getDay() +1) % 7];

    // Actualizar el contenido del elemento HTML con el resultado
    let resultado = document.getElementById('resultado')
    resultado.innerHTML = "Tienes " + edad.años + " años, " + edad.meses + " meses y " + edad.dias + " días y naciste un " + nombreDiaNacimiento;

    // Verifica si es el cumpleaños con la funcion esCumpleaños()
    if (esCumpleaños(fechaCalendario) === true) {
        resultado.innerHTML += " ¡Feliz cumpleaños!";
    } else {
        // Calcula los días que faltan para el próximo cumpleaños
        const diasParaCumple = diasParaCumpleaños(fechaCalendario);
        resultado.innerHTML += ". Tu próximo cumpleaños es en " + diasParaCumple + " días.";
    }
}


// TIEMPO DENTRO DE LA ORGANIZACIÓN

function obtenerFechas() {
    // Obtiene la fecha de ingreso ingresada por el usuario
    let fechaIngreso = document.getElementById("fechaIngreso").value;
    // Muestra el tiempo transcurrido desde la fecha de ingreso hasta la fecha actual en años, meses y días
    mostrarTiempoEnOrganizacion(fechaIngreso);
  }
   
function calcularTiempo(fechaInicial, fechaFinal) {
    // Obtiene la diferencia en milisegundos entre las fechas
    let diferencia = new Date(fechaFinal) - new Date(fechaInicial);
    // Calcula los años utilizando la cantidad de milisegundos por año
    let anios = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365));
    // Resta los años para calcular los meses
    diferencia -= anios * (1000 * 60 * 60 * 24 * 365);
    // Calcula los meses utilizando la cantidad de milisegundos por mes (en promedio)
    let meses = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 30.44));
    // Resta los meses para calcular los días
    diferencia -= meses * (1000 * 60 * 60 * 24 * 30.44);
    // Calcula los días utilizando la cantidad de milisegundos por día
    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  
    // Devuelve un objeto con los años, meses y días calculados
    return {anios, meses, dias};
  }
  
  function mostrarTiempoEnOrganizacion(fechaIngreso) {
    // Obtiene la fecha actual
    let fechaActual = new Date();
    // Calcula el tiempo transcurrido desde la fecha de ingreso hasta la fecha actual
    let tiempo = calcularTiempo(fechaIngreso, fechaActual);
    // Crea un mensaje con el tiempo transcurrido en años, meses y días
    let mensaje = "Lleva " + tiempo.anios + " años, " + tiempo.meses + " meses y " + tiempo.dias + " días en nuestra organización.";
    // Muestra el mensaje en HTML 
    document.getElementById("tiempoOrganizacion").innerHTML = mensaje;
  }
