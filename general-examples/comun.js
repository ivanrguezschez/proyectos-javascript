// ****************************************************************************
// FUNCIONES COMUNES DE UTILIDAD JAVASCRIPT
// ****************************************************************************

// Separador de la parte entera y decimal de un numero real
var SEPARADOR_DECIMAL = ',';
// Separador de la fecha DD/MM/AAAA
var SEPARADOR_FECHA = '/';
// Separador de la hora HH:MM
var SEPARADOR_HORA = ':';
// Separador de la fecha  y hora DD/MM/AAAA HH:MM
var SEPARADOR_FECHA_HORA = ' ';

//*******************************************************************
// Funciones GENERALES de Validacion
//*******************************************************************
/*
  esTextoVacio    Valida si la entrada de un campo texto es cadena vacia ''.
  esComboVacio    Valida si no se ha seleccionado ningun elemento de un campo combo.  
  esListaVacio    Valida si no se ha seleccionado ningun elemento de un campo lista.  
  esOpcionVacio   Valida si no se ha seleccionado ninguna opcion de un campo checkbox o radiobutton.   
  esLongitud      Valida si la longitud de la entrada de un campo es menor o igual a una longitud pasada.    
  esMascara       Valida si la entrada de un campo cumple con un patron o mascara.    
*/

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado es cadena vacia, devolviendo true si esta vacio y false en caso contrario.
// Parametros:  
//  - valor: Valor a validar
////////////////////////////////////////////////////////////////////////////////
function esTextoVacio(valor) {
    return (valor == null || valor == '');
} 

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si se ha seleccionado algun valor en una combo, devolviendo true si no se ha seleccionado y false en caso contrario.
// Parametros:  
//  - valor: Campo combo a validar
////////////////////////////////////////////////////////////////////////////////
function esComboVacio(campo) {
    // El primer elemento suele ser '' o 'Seleccione...'
    return (campo.selectedIndex <= 0);
} 

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si se ha seleccionado algun valor en una lista, devolviendo true si no se ha seleccionado y false en caso contrario.
// Parametros:  
//  - valor: Campo lista a validar
////////////////////////////////////////////////////////////////////////////////
function esListaVacio(campo) {
    return (campo.selectedIndex < 0);
} 

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si se ha seleccionado algun valor en una lista de checkbox o radiobutton, devolviendo true si no se ha seleccionado nada y false en caso contrario.
// Parametros:  
//  - valor: Campo checkbox o radiobutton a validar
////////////////////////////////////////////////////////////////////////////////
function esOpcionVacio(campo) {
  var longitud = campo.length;
  // Si solo hay un elemento check box
  if (longitud == null && campo.checked) {return false;}
  for (i=0; i<longitud; i++) {
    if (campo[i].checked) {return false;}
  }
  return true;
} 

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si la longitud del valor pasado es menor o igual al maximo permitido, devolviendo true si es menor o igual y false en caso contrario.
// Parametros:  
//  - valor: Valor a validar
//  - lon: Lontigud maxima permitida
////////////////////////////////////////////////////////////////////////////////
function esLongitud(valor, lon) {
    return (valor.length <= lon);
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado cumple con la mascara pasada.
// Parametros:  
//  - valor: Valor a validar
//  - mask: Expresion regular que representa la mascara
////////////////////////////////////////////////////////////////////////////////
function esMascara(valor, mask) {
    return (mask.test(valor));
}


//*******************************************************************
// Funciones de Validacion
//*******************************************************************
/*
  esNif             Valida si la entrada es un nif correcto.
  esNie             Valida si la entrada es un nie correcto.
  esCif             Valida si la entrada es un cif correcto.    
  calcularLetraNif  Función auxiliar que se utiliza para calcular la letra del Nif, Nie (se puede usar en lugar del array de constantes LETRAS_NIF)
  esMail            Valida si la entrada es una direccion de mail correcta.   
  esDigito          Valida si la entrada es un numero.
  esLetra           Valida si la entrada es una letra.  
  esEntero          Valida si la entrada es un campo numerico entero.
  esEnteroExacto    Valida si la entrada es un campo numero entero de n digitos.
  esEnteroRango     Valida si la entrada es un campo numerico entre dos valores (Minimo y Maximo.    
  esReal            Valida si la entrada es un campo real con el separador decimal por defecto.    
  esRealExacto      Valida si la entrada es un campo real con el separador decimal por defecto y con n numeros en la parte entera y n numeros en la parte decimal.
  esRealRango       Valida si la entrada es un campo real con el separador decimal por defecto entre dos valores (Minimo y Maximo.
  esFecha           Valida si la entrada es un campo fecha (dd/mm/aaaa) con el separador de fecha por defecto.                    
  esHora            Valida si la entrada es un campo hora (hh:mm) con el separador de hora por defecto.                    
  esHoraLarga       Valida si la entrada es un campo hora (hh:mm:ss) con el separador de hora por defecto.                    
  esFechaHora       Valida si la entrada es un campo fecha y hora (DD/MM/AAAA hh:mm) con el separador de fecha y hora por defecto.                    
*/

var LETRAS_NIF = ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E'];
var NIF_LONGITUD_PATTERN = /^[A-Za-z0-9]{9}$/;

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado es un nif correcto.
// Parametros:  
//  - nif: Nif a validar
////////////////////////////////////////////////////////////////////////////////
function esNif(nif) {
  // Comprobacion de longitud de 9 digitos
  if (!NIF_LONGITUD_PATTERN.test(nif)) {
    return false;
  }
  nif = nif.toUpperCase();
  var dni = nif.substring(0, nif.length - 1);
  var letra = nif.charAt(nif.length - 1);
  // Comprobamos si la letra calculada es igual a la del nif (Equivale a dni-23*(dni/23))
  if (letra != LETRAS_NIF[parseInt(dni % 23)]) {
    return false;
  }
  return true;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado es un nie (Numero de Identificacion de Extranjero) correcto.
// Parametros:  
//  - nie: Nie a validar
////////////////////////////////////////////////////////////////////////////////
function esNie(nie) {
  // Comprobacion de longitud de 9 digitos
  if (!NIF_LONGITUD_PATTERN.test(nie)) {
    return false;
  }
  nie = nie.toUpperCase(); //LNNNNNNNL, L=Letra, N=Numero, Ejemplo: X0000980Z
	// Comprobamos que el primer digito no sea un numero y sea una letra de KLMX
	var primerDigito = nie.charAt(0);
  if (!/^[KLMX]/.test(primerDigito)) {
	  return false;
  } 
  // Elimino la primera letra y lo valido como un nif
  nie = nie.substring(1, nie.length); 
  var dni = nie.substring(0, nie.length - 1);
  var letra = nie.charAt(nie.length - 1);
  // Comprobamos si la letra calculada es igual a la del nie (Equivale a dni-23*(dni/23))
  if (letra != LETRAS_NIF[parseInt(dni % 23)]) {
	  return false;
  }
  	
  return true;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado es un cif (Control de Identificacion Fiscal) correcto.
// Parametros:  
//  - cif: Cif a validar (Ejemplos: B25398215 o B2539821E)
////////////////////////////////////////////////////////////////////////////////
function esCif(cif) {
  var CIF_VALORES = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
	var CIF_DIGITO_CONTROL = ['J','A','B','C','D','E','F','G','H','I'];
  // Comprobacion de longitud de 9 digitos
  if (!NIF_LONGITUD_PATTERN.test(cif)) {
    return false;
  }
  cif = cif.toUpperCase(); // CIF=B25398215 o B2539821E
	var dc = 0;
	var dcCif = cif.charAt(cif.length - 1);
     
	// Comprobamos la letra inicial que representa el Tipo de Organizacion
	if (!/^[ABCDEFGHKLMNPQS]/.test(cif)) {
		return false;
	}
	// Calculo el digito de control para su posterior comprobacion
	for (i = 2; i <= 6; i += 2) {
		dc += CIF_VALORES[parseInt(cif.substring(i - 1, i))]; // Digitos Impares
		dc += parseInt(cif.substring(i, i + 1)); // Digitos Pares
	}
	dc += CIF_VALORES[parseInt(cif.substring(7, 8))]; // Ultimo Digito Impar
	dc = (10 - (dc % 10)) == 10 ? 0 : (10 - (dc % 10));
 	// Si el digito de control del cif es una letra, transformo el digito de control calculado a letra
  if (!/^[0123456789]/.test(dcCif)) {
	  // El Cif acaba en letra
    if (CIF_DIGITO_CONTROL[dc] != dcCif) {
	    return false;
    }
  } else {
	  // El Cif acaba en numero
  	if (dc != dcCif) {
		  return false;
	  }
  }
  
  return true;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Función auxiliar que se utiliza para calcular la letra del Nif, Nie.
//              Se puede usar en lugar del array de constantes LETRAS_NIF
// Parametros:  
//  - dni: dni a utilizar
////////////////////////////////////////////////////////////////////////////////  
function calcularLetraNif(dni) {
  var letras = "TRWAGMYFPDXBNJZSQVHLCKET";
  // Equivale a dni-23*(dni/23)
  var baremo = dni % 23; 
  return letras.charAt(baremo);
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado es una direccion de mail correcta.
// Parametros:  
//  - mail: Mail a validar
////////////////////////////////////////////////////////////////////////////////  
function esMail(mail) {
  // Define la expresion regular para verificar si el email tiene el formato usuario@dominio
  var patMail = /^(.+)@(.+)$/;
  // Define la expresion regular para nombres de usuario validos
  var patUser = /^[a-zA-Z\d_-]+(\.[a-zA-Z\d_-]+)*$/;
  // Define la expresion regular para nombres de dominio validos
  var patDomain = /^[a-zA-Z\d_-]+(\.[a-zA-Z\d_-]+)+$/;

  // Verifica que el string que recibe la funcion sea del tipo string@string y separa los substring
  // correspondientes a usuario y dominio
  var matchArray = mail.match(patMail);
  if(matchArray == null) {return false;} // No es un Mail

  var user = new String(matchArray[1]);
  var domain = new String(matchArray[2]);
  // Si el nombre de usuario no es valido la funcion devuelve falso
  if(user.match(patUser) == null) {return false;} // Usuario Invalido

  // Verifica que el string de dominio sea valido.
  // Si es valido verifica que la ultima extension tenga 3 o 4 caracteres de longitud (2 o 3 caracteres mas el punto)
  var domainArray = domain.match(patDomain);
  if(domainArray == null) {return false;} // Dominio Invalido
  if(domainArray[domainArray.length - 1].length < 3 || domainArray[domainArray.length - 1].length > 4) { 
    return false; // Extension del Dominio Invalida
  }
  // Si la funcion no devolvio false entonces el parametro de entrada es una direccion de mail valida
  // Por lo tanto la funcion devuelve true
  return true;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el caracter pasado es un numero.
// Parametros:  
//  - caracter: Caracter a validar
////////////////////////////////////////////////////////////////////////////////  
function esDigito(caracter) {
  return /^[0-9]$/.test(caracter);
}
 
////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el caracter pasado es una letra.
// Parametros:  
//  - caracter: Caracter a validar
////////////////////////////////////////////////////////////////////////////////  
function esLetra(caracter) {
  return /^[A-Za-zñÑÁÉÍÓÚáéíóú]$/.test(caracter);
}
   
////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado es un numero entero.
// Parametros:  
//  - valor: Numero a validar
////////////////////////////////////////////////////////////////////////////////  
function esEntero(valor) {
  return /(^[0-9]+)$/.test(valor);
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado es un numero entero de n digitos.
// Parametros:  
//  - valor: Numero a validar
//  - nDigitos: Numero de digitos a introducir
//  - exacto: true obliga a introducir nDigitos, false permite introducir 1 a nDigitos
////////////////////////////////////////////////////////////////////////////////  
function esEnteroExacto(valor, nDigitos, exacto) {
  var patron = exacto ? eval('/(^[0-9]{'+nDigitos+'})$/') : eval('/(^[0-9]{1,'+nDigitos+'})$/');
  return patron.test(valor);
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado es un numero entero entre dos valores (Minimo y Maximo.
// Parametros:  
//  - valor: Numero a validar
//  - limiteMin: Numero Limite Minimo
//  - limiteMax: Numero Limite Maximo
////////////////////////////////////////////////////////////////////////////////  
function esEnteroRango(valor, limiteMin, limiteMax) {
  return (esEntero(valor)) && (valor >= limiteMin) && (valor <= limiteMax);
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado es un numero real con el separador decimal por defecto.
// Parametros:  
//  - valor: Numero a validar
////////////////////////////////////////////////////////////////////////////////
function esReal(valor) {
  var patron = eval('/(^([0-9]+)((\\' + SEPARADOR_DECIMAL + '{1})([0-9]+)){0,1})$/');    
  return patron.test(valor);
} 

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado es un numero real con el separador decimal por defecto
//              y con n numeros en la parte entera y n numeros en la parte decimal.
// Parametros:  
//  - valor: Numero a validar
//  - enteros: Numero de digitos a introducir en la parte entera
//  - decimales: Numero de digitos a introducir en la parte decimal
//  - exacto: true obliga a introducir n digitos en la parte entera y decimal, false permite introducir 1 a n digitos en ambas partes
////////////////////////////////////////////////////////////////////////////////
function esRealExacto(valor, enteros, decimales, exacto) {
  var patron = exacto ? eval('/(^([0-9]{'+enteros+'})((\\'+SEPARADOR_DECIMAL+'{1})([0-9]{'+decimales+'})){1})$/') 
                      : eval('/(^([0-9]{1,'+enteros+'})((\\'+SEPARADOR_DECIMAL+'{1})([0-9]{1,'+decimales+'})){1})$/');
  return patron.test(valor);
} 

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado es un numero real con el separador decimal por defecto entre dos valores (Minimo y Maximo.
// Parametros:  
//  - valor: Numero a validar
//  - limiteMin: Numero Limite Minimo
//  - limiteMax: Numero Limite Maximo
////////////////////////////////////////////////////////////////////////////////
function esRealRango(valor, limiteMin, limiteMax) {
  if (!esReal(valor)) return false;
  // Reemplazo mi separador decimal por el punto '.' (standard de los float en Javascript)
  valor = valor.replace(eval('/' + SEPARADOR_DECIMAL +'/'), '.');
  if (isNaN(valor)) {
    return false; // Si no es un numero
  } else {
    return ((valor >= limiteMin) && (valor <= limiteMax));
  }
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado es una fecha correcta (dd/mm/aaaa) con el separador de fecha por defecto.
// Parametros:  
//  - fecha: Fecha a validar
////////////////////////////////////////////////////////////////////////////////
function esFecha(fecha) {
  var dias_meses = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  var f = fecha.split(SEPARADOR_FECHA);
  if (f.length == 3) {
    dias_meses[1] = esBisiesto(f[2])? 29 : 28; // Mes de Febrero
    if ((f[2] < 1000 || f[2] > 9999) || (isNaN(f[2]) == true)) return false;
    if ((f[1] < 1 || f[1] > 12) || (isNaN(f[1]) == true)) return false;
    if ((f[0] < 1 || f[0] > dias_meses[parseInt(f[1]-1)])|| (isNaN(f[0])==true)) return false;
    return true;
  } 
  return false;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado es una hora correcta (hh:mm) con el separador de hora por defecto.
// Parametros:  
//  - hora: Hora a validar
////////////////////////////////////////////////////////////////////////////////
function esHora(hora) {
  var h = hora.split(SEPARADOR_HORA);
  if (h.length == 2) {
    if ((h[0] < 0 || h[0] > 23) || (isNaN(h[0]) == true)) return false;
    if ((h[1] < 0 || h[1] > 59) || (isNaN(h[1]) == true)) return false;
    return true;
  } 
  return false;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado es una hora correcta (hh:mm:ss) con el separador de hora por defecto.
// Parametros:  
//  - hora: Hora a validar
////////////////////////////////////////////////////////////////////////////////
function esHoraLarga(hora) {
  var h = hora.split(SEPARADOR_HORA);
  if (h.length == 3) {
    if ((h[0] < 0 || h[0] > 23) || (isNaN(h[0]) == true)) return false;
    if ((h[1] < 0 || h[1] > 59) || (isNaN(h[1]) == true)) return false;
    if ((h[2] < 0 || h[2] > 59) || (isNaN(h[2]) == true)) return false;          
    return true;
  } 
  return false;
}

///////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba si el valor pasado es una fecha y hora correcta (DD/MM/AAAA hh:mm) con el separador de fecha y hora por defecto.
// Parametros:  
//  - fecha: Fecha y hora a validar
////////////////////////////////////////////////////////////////////////////////
function esFechaHora(fecha) {
  var f = fecha.split(SEPARADOR_FECHA_HORA);
  return ((f.length == 2) ? (esFecha(f[0]) && esHora(f[1])) : false);
}
 


//*******************************************************************
// Funciones de FECHAS
//*******************************************************************
/*
  esBisiesto          Determina si un año (aaaa) es bisiesto o no
  comparaFechas       Comprueba dos fechas, devolviendo 0 si son iguales, -1 si f1<f2 y 1 si f1>f2, con el separador de fecha por defecto.  
  comparaHoras        Comprueba dos horas (hh:mm), devolviendo 0 si son iguales, -1 si h1<h2 y 1 si h1>h2, con el separador de hora por defecto.    
  comparaHorasLarga   Comprueba dos horas (hh:mm:ss), devolviendo 0 si son iguales, -1 si h1<h2 y 1 si h1>h2, con el separador de hora por defecto.        
  comparaFechasHoras  Comprueba dos fechas y horas, devolviendo 0 si son iguales, -1 si f1<f2 y 1 si f1>f2, con el separador de fecha y hora por defecto.    
  parseDate           Funcion que parse un string con formato dd/mm/yyyy un date.
  formatDate          Funcion que formate un date a un string con el formato dd/mm/yyyy.    
*/  

////////////////////////////////////////////////////////////////////////////////
// Descripción: Determina si un año (aaaa) es bisiesto o no.
// Parametros:  
//  - anio: Numero del año
////////////////////////////////////////////////////////////////////////////////
function esBisiesto(anio) {
  return ((anio % 4 == 0) && (anio % 100 != 0) || (anio % 400 == 0));
}

///////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba dos fechas, devolviendo 0 si son iguales, -1 si f1<f2 y 1 si f1>f2, con el separador de fecha por defecto.
// Parametros:  
//  - fecha1: Fecha a comparar
//  - fecha2: Fecha a comparar
////////////////////////////////////////////////////////////////////////////////
function comparaFechas(fecha1, fecha2) {
  if (!esFecha(fecha1)) return -1;
  if (!esFecha(fecha2)) return 1;
  var f1 = fecha1.split(SEPARADOR_FECHA);
  var f2 = fecha2.split(SEPARADOR_FECHA);
  if (f1.length != 3) return -1; // f1<f2
  if (f2.length != 3) return 1;  // f1>f2
  // Año
  if (f1[2] < f2[2]) return -1;
  if (f1[2] > f2[2]) return 1;
  // Mes
  if (f1[1] < f2[1]) return -1;
  if (f1[1] > f2[1]) return 1;
  // Dia
  if (f1[0] < f2[0]) return -1;
  if (f1[0] > f2[0]) return 1;
  return 0; // Iguales
}

///////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba dos horas (hh:mm), devolviendo 0 si son iguales, -1 si h1<h2 y 1 si h1>h2, con el separador de hora por defecto.
// Parametros:  
//  - hora1: Hora a comparar
//  - hora2: Hora a comparar
////////////////////////////////////////////////////////////////////////////////
function comparaHoras(hora1, hora2) {
  if (!esHora(hora1)) return -1;
  if (!esHora(hora2)) return 1;
  var h1 = hora1.split(SEPARADOR_HORA);
  var h2 = hora2.split(SEPARADOR_HORA);
  if (h1.length != 2) return -1; // h1<h2
  if (h2.length != 2) return 1;  // h1>h2
  // Hora
  if (h1[0] < h2[0]) return -1;
  if (h1[0] > h2[0]) return 1;
  // Minutos
  if (h1[1] < h2[1]) return -1;
  if (h1[1] > h2[1]) return 1;
  return 0; // Iguales
}

///////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba dos horas (hh:mm:ss), devolviendo 0 si son iguales, -1 si h1<h2 y 1 si h1>h2, con el separador de hora por defecto.
// Parametros:  
//  - hora1: Hora a comparar
//  - hora2: Hora a comparar
////////////////////////////////////////////////////////////////////////////////
function comparaHorasLarga(hora1, hora2) {
  if (!esHoraLarga(hora1)) return -1;
  if (!esHoraLarga(hora2)) return 1;
  var h1 = hora1.split(SEPARADOR_HORA);
  var h2 = hora2.split(SEPARADOR_HORA);
  if (h1.length != 3) return -1; // h1<h2
  if (h2.length != 3) return 1;  // h1>h2
  // Hora
  if (h1[0] < h2[0]) return -1;
  if (h1[0] > h2[0]) return 1;
  // Minutos
  if (h1[1] < h2[1]) return -1;
  if (h1[1] > h2[1]) return 1;
  // Segundos
  if (h1[2] < h2[2]) return -1;
  if (h1[2] > h2[2]) return 1;
  return 0; // Iguales
}

///////////////////////////////////////////////////////////////////////////////
// Descripción: Comprueba dos fechas y horas, devolviendo 0 si son iguales, -1 si f1<f2 y 1 si f1>f2, con el separador de fecha y hora por defecto.
// Parametros:  
//  - fecha1: Fecha a comparar
//  - fecha2: Fecha a comparar
////////////////////////////////////////////////////////////////////////////////
function comparaFechasHoras(fecha1, fecha2) {
  if (!esFechaHora(fecha1)) return -1;
  if (!esFechaHora(fecha2)) return 1;
  var f1 = fecha1.split(SEPARADOR_FECHA_HORA);
  var f2 = fecha2.split(SEPARADOR_FECHA_HORA);
    
  if (f1.length != 2) return -1; // f1<f2
  if (f2.length != 2) return 1;  // f1>f2
  var fechas = comparaFechas(f1[0], f2[0]);
  var horas = comparaHoras(f1[1], f2[1]);
  if (fechas == 0) return ((horas==0) ? 0 : horas);
  return fechas;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Funcion que parse un string con formato dd/mm/yyyy a un objeto Date, si
//              el string no es una fecha correcta devuelve la fecha de hoy.
// Parametros:  
//  - campo: String que representa una fecha
////////////////////////////////////////////////////////////////////////////////
function parseDate(fecha) {
  if (!esFecha(fecha)) return new Date();
  var f = fecha.split(SEPARADOR_FECHA);
  return new Date(f[2], f[1] - 1, f[0]);
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Funcion que parse un date a un string con formato dd/mm/yyyy.
// Parametros:  
//  - campo: Date que se formateara a un String
////////////////////////////////////////////////////////////////////////////////
function formatDate(fecha) {
  var dia = fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate();
  var mes = (fecha.getMonth()+1) < 10 ? '0' + (fecha.getMonth()+1) : fecha.getMonth()+1;
  var anio = fecha.getYear();
  return dia + SEPARADOR_FECHA + mes + SEPARADOR_FECHA + anio;
}


//*******************************************************************
// Funciones de proposito GENERAL
//*******************************************************************
/*
  alertFocus      Funcion que muestra un mensaje y situa el foco en un campo concreto.
  irA             Redirreciona al enlace indicado enviando el formulario
  irADestino      Redirecciona a destino indicado
  irADestinoMsg   Redirecciona a destino indicado
  irAPagina       Redirreciona al enlace indicado (pagina HTML) mostrando un alert
  irAPaginaMsg    Redirreciona al enlace indicado (pagina HTML) mostrando un alert en el FRAME actual
  irAHTML         Redirreciona al enlace indicado (pagina HTML)
*/  

////////////////////////////////////////////////////////////////////////////////
// Descripción: Funcion que muestra un mensaje y situa el foco en un campo concreto.
// Parametros:  
//  - mensaje: Mensaje a mostrar
//  - campo: Campo donde se situara el foco
////////////////////////////////////////////////////////////////////////////////
function alertFocus(mensaje, campo) {
  alert(mensaje);
  campo.focus();
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Redirreciona al enlace indicado enviando el formulario
// Parametros:  
//  - enlace: Destino al cual nos redireccionamos
////////////////////////////////////////////////////////////////////////////////
function irA(enlace) {
  document.forms[0].action = enlace;
  document.forms[0].submit();
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Redirecciona a destino indicado
// Parametros:  
//  - destino: Destino alcual se dirige
//  - tipo: Indica si me redirecciono a un servlet (enviando el formulario) 'true' o a una pagina HTML 'false'
//  - marco: Indica si al redirrecionar a un pagina HTML abro la pagina en el marco padre o en el marco actual
////////////////////////////////////////////////////////////////////////////////
function irADestino(destino, tipo, marco){
  if (tipo) {
    irA(destino);
  } else {
    if (marco)
      window.parent.document.location.href = destino;
    else
      document.location.href = destino;
  }
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Redirecciona a destino indicado
// Parametros:  
//  - msg: Mensaje a mostrar antes de redirrecionarme
//  - destino: Destino alcual se dirige
//  - tipo: Indica si me redirecciono a un servlet (enviando el formulario) 'true' o a una pagina HTML 'false'
//  - marco: Indica si al redirrecionar a un pagina HTML abro la pagina en el marco padre o en el marco actual
////////////////////////////////////////////////////////////////////////////////
function irADestinoMsg(msg, destino, tipo, marco){
  alert(msg);
  irADestino(destino, tipo, marco);
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Redirreciona al enlace indicado (pagina HTML) mostrando un alert
// Parametros:  
//  - msg: Mensaje a mostrar
//  - enlace: Destino al cual nos redireccionamos
////////////////////////////////////////////////////////////////////////////////
function irAPagina(msg,enlace) {
  alert(msg);
  window.parent.document.location.href = enlace;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Redirreciona al enlace indicado (pagina HTML) mostrando un alert en el FRAME actual
// Parametros:  
//  - msg: Mensaje a mostrar
//  - enlace: Destino al cual nos redireccionamos
////////////////////////////////////////////////////////////////////////////////
function irAPaginaMsg(msg,enlace) {
  alert(msg);
  document.location.href = enlace;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Redirreciona al enlace indicado (pagina HTML)
// Parametros:  
//  - enlace: Destino al cual nos redireccionamos
////////////////////////////////////////////////////////////////////////////////
function irAHTML(enlace) {
  document.location.href = enlace;
}


//*******************************************************************
// Funciones de CADENA
//*******************************************************************
/*
  trim            Elimina los espacios en blanco del principio y del final de un cadena.
  invertir        Invierte los caracteres de una cadena.
  contarChr       Devuelve el número de ocurrencias del caracter car en la cadena cad.  
  posicionesChr   Devuelve en un array las posiciones del caracter car en la cadena cad.
  LTrim           Devuelve n caracteres por la izquierda de una cadena.
  RTrim           Devuelve n caracteres por la derecha de una cadena.
  deleteAllChr    Elimina todas las ocurrecias de un caracter de una cadena.
  deleteStr       Elimina una cadena de otra cadena.
  deleteAllStr    Elimina todas las ocurrecias de una cadena de otra cadena.
  insertChr       Inserta un caracter en un cadena en un posicion determinada.
  insertStr       Inserta una cadena en otra en un posicion determinada.    
  insertLeftChr   Inserta por la izquierda en una cadena un caracter n veces.
  insertRightChr  Inserta por la derecha en una cadena un caracter n veces.
  repetirChr      Devuelve una cadena con un caracter repetido n veces.
*/  

////////////////////////////////////////////////////////////////////////////////
// Descripción: Elimina los espacios en blanco del principio y del final de un cadena.
// Parametros:  
//  - valor: Cadena de la cual se eliminaran los blancos iniciales y finales
////////////////////////////////////////////////////////////////////////////////
function trim(valor) {
  var i = 0;
  var j = valor.length - 1;
  while (valor.charAt(i) == ' ') i++;
  while (valor.charAt(j) == ' ') j--;
  return valor.substring(i,j+1);
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Invierte los caracteres de una cadena.
// Parametros:  
//  - valor: Cadena a invertir
////////////////////////////////////////////////////////////////////////////////
function invertir(valor) {
  var aux = "";
  for (var i=valor.length - 1; i>=0; i--) {
    aux += valor.charAt(i);
  }
  return aux;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Devuelve el número de ocurrencias del caracter car en la cadena cad.
// Parametros:  
//  - cad: Cadena en la se que se buscara el caracter
//  - car: Caracter a buscar
////////////////////////////////////////////////////////////////////////////////
function contarChr(cad, car) {
  var cont = 0;
  var pos_actual = 0;
  var pos_caracter = 0;
  while ((pos_caracter=cad.indexOf(car,pos_actual)) != -1) {
    pos_actual = pos_caracter + 1;
    cont++;
  } 
  return cont;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Devuelve en un array las posiciones del caracter car en la cadena cad.
// Parametros:  
//  - cad: Cadena en la se que se buscara el caracter
//  - car: Caracter a buscar
////////////////////////////////////////////////////////////////////////////////
function posicionesChr(cad, car) {
  var posiciones = new Array(contarChr(cad,car));
  var cont = 0;
  var pos_actual = 0;
  var pos_caracter = 0;
  while ((pos_caracter=cad.indexOf(car,pos_actual)) != -1) {
    posiciones[cont++] = pos_caracter;
    pos_actual = pos_caracter + 1;
  }
  return posiciones;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Devuelve n caracteres por la izquierda de la cadena cad
//              Si n es menor de 0 devuelve toda la cadena
//              Si n es mayor que la longitud de la cadena devuelve toda la cadena
// Parametros:  
//  - cad: Cadena de la que se extraeran n caracteres por la izquierda
//  - n: Numero de caracteres
////////////////////////////////////////////////////////////////////////////////
function LTrim(cad, n){ 
  var aux = "";
  if (n > 0 && n <= cad.length) {
    for (var i=0; i<n; i++) {
      aux += cad.charAt(i);
    }
  } else { //n es incorrecta devuelvo la misma cadena
    aux = cad;
  }
  return aux;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Devuelve n caracteres por la derecha de la cadena cad
//              Si n es menor de 0 devuelve toda la cadena
//              Si n es mayor que la longitud de la cadena devuelve toda la cadena
// Parametros:  
//  - cad: Cadena de la que se extraeran n caracteres por la derecha
//  - n: Numero de caracteres
////////////////////////////////////////////////////////////////////////////////
function RTrim(cad, n){ 
  var aux = "";
  if (n > 0 && n <= cad.length) {
    for (var i=0; i<n; i++) {
      aux = cad.charAt((cad.length-1) - i) + aux;
    }
  } else { //n es incorrecta devuelvo la misma cadena
    aux = cad;
  }
  return aux;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Elimina todas las ocurrecias del caracter car de la cadena cad.
// Parametros:  
//  - cad: Cadena de la que se eliminara el carecter
//  - car: Caracter a eliminar
////////////////////////////////////////////////////////////////////////////////
function deleteAllChr(cad, car) { 
  var pos_actual = 0;
  var pos_car = 0;
  while ((pos_car=cad.indexOf(car,pos_actual)) != -1) { 
    cad = cad.substring(0,pos_car) + cad.substring(pos_car+1,cad.length);
    pos_actual = pos_car;
  }
  return cad;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Elimina la cadena cad2 de la cadena cad1.
// Parametros:  
//  - cad1: Cadena de la que se eliminara la cadeba cad2
//  - cad2: Cadena a eliminar
////////////////////////////////////////////////////////////////////////////////
function deleteStr(cad1, cad2) {  
  var pos = cad1.search(cad2);
  if (pos != -1) {
    cad1 = cad1.substring(0,pos) + cad1.substring(pos+cad2.length, cad1.length);
  }
  return cad1;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Elimina todas las ocurrencias de la cadena cad2 de la cadena cad1.
// Parametros:  
//  - cad1: Cadena de la que se eliminara la cadeba cad2
//  - cad2: Cadena a eliminar
////////////////////////////////////////////////////////////////////////////////
function deleteAllStr(cad1, cad2) { 
  var pos_cad = 0;
  while ((pos_cad = cad1.search(cad2)) != -1) {
    cad1 = cad1.substring(0,pos_cad) + cad1.substring(pos_cad+cad2.length, cad1.length)
  }
  return cad1;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Inserta el caracter car en la cadena cad en la posicion pos.
// Parametros:  
//  - cad: Cadena en la que se insertara el caracter car
//  - car: Caracter a insertar
//  - pos: Posicion de insercion
////////////////////////////////////////////////////////////////////////////////
function insertChr(cad, car, pos) { 
  // La posicion tiene que estar entre 0 y la longitud de cad
  if (pos >= 0 && pos < cad.length) {
    cad = cad.substring(0,pos) + car + cad.substring(pos,cad.length);
  }
  return cad;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Inserta la cadena ca2 en la cadena cad1 en la posicion pos.
// Parametros:  
//  - cad1: Cadena en la que se insertara la cadena cad2
//  - cad2: Cadena a insertar
//  - pos: Posicion de insercion
////////////////////////////////////////////////////////////////////////////////
function insertStr(cad1, cad2, pos) { 
  // La posicion tiene que estar entre 0 y la longitud de cad1
  if (pos >= 0 && pos < cad1.length) {
    cad1 = cad1.substring(0,pos) + cad2 + cad1.substring(pos,cad1.length);
  }
  return cad1;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Inserta por la izquierda en la cadena ca el caracter car n veces.
// Parametros:  
//  - cad: Cadena en la que se insertara el caracter car n veces
//  - car: Caracter a insertar
//  - n: Numero de veces que se insertara el carectes
////////////////////////////////////////////////////////////////////////////////
function insertLeftChr(cad, car, n) { 
  if (n > 0) {
    for (var i=0; i<n; i++) {
      cad = car +cad;
    }
  }
  return cad;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Inserta por la derecha en la cadena ca el caracter car n veces.
// Parametros:  
//  - cad: Cadena en la que se insertara el caracter car n veces
//  - car: Caracter a insertar
//  - n: Numero de veces que se insertara el carectes
////////////////////////////////////////////////////////////////////////////////
function insertRightChr(cad, car, n) {  
  if (n > 0) {
    for (var i=0; i<n; i++) {
      cad = cad + car;
    }
  }
  return cad;
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Devuelve una cadena con el caracter car repetido n veces.
// Parametros:  
//  - car: Caracter a repetir
//  - n: Numero de veces que se repetira el carecter
////////////////////////////////////////////////////////////////////////////////
function repetirChr(car, n) { 
  var aux = "";
  if (n > 0) {
    for (var i=0; i<n; i++) {
      aux += car;
    }
  }
  return aux;
}


//*******************************************************************
// Funciones de LISTAS y COMBOS
//*******************************************************************
/*
  ordernarLista Ordena los elementos de una lista desplegable o una lista.
  addElemento   Añade los elementos seleccionados de una lista origen en otra destino.
*/  

////////////////////////////////////////////////////////////////////////////////
// Descripción: Funcion que ordena los elementos de una lista desplegable o una lista.
// Parametros:  
//  - lista: Lista a ordenar
////////////////////////////////////////////////////////////////////////////////
function ordenarLista(lista) {
  var auxiliar = null;
  for (var i=0; i<lista.length-1 ;i++) {
    for (var j=0; j<lista.length-1 ;j++) {
      if (lista.options[j].text > lista.options[j+1].text) {
        auxiliar = new Option(lista.options[j].text,lista.options[j].value);
        lista.options[j] = new Option(lista.options[j+1].text,lista.options[j+1].value);
        lista.options[j+1] = auxiliar;
      }
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Funcion que añade los elementos seleccionados de una lista origen en 
//              otra destino y los elimina de origen (Tanto en combos como listas)
// Parametros:  
//  - origen: Lista origen
//  - destino: Lista destino
////////////////////////////////////////////////////////////////////////////////
function addElemento(origen, destino) {
  var posicion = origen.selectedIndex;
  var num_elementos= 0;
  var existe = false;
  var elemento = null;
  // Si se ha seleccionado algun elemento
  if (posicion != -1) {
    elemento = origen.options[posicion];
    // Elimino el elemento seleccionado de la Lista 1
    origen.options[posicion] = null;
    num_elementos = destino.length;
    for (var i=0; i<num_elementos; i++) {
      if (destino.options[i].text == elemento.text) {
        existe = true;
        break;
      }
    }
    if (existe == false) {
      destino.options[num_elementos] = new Option(elemento.text,elemento.value,false,true);
    }
  }
}


//*******************************************************************
// Funciones de VENTANAS
//*******************************************************************
/*
  abreVentana Abre una nueva ventana y la centra en la pantalla
*/  

////////////////////////////////////////////////////////////////////////////////
// Descripción: Funcion que abre una nueva ventana y la centra en la pantalla.
// Parametros:  
//  - pagina: Pagina a mostrar
//  - nombre: Nombre de la ventana
//  - w: Ancho de la ventana
//  - h: Alto de la ventana
//  - scroll: Ventana con scroll o sin scroll
////////////////////////////////////////////////////////////////////////////////
function abrirVentana(pagina, nombre, w, h, scroll) {
  var posXven = (screen.width - w) / 2;  
  var posYven = (screen.height - h) / 2;
  propiedadesVen = 'height='+h+',width='+w+',top='+posYven+',left='+posXven+',scrollbars='+scroll+',resizable';
  win = window.open(pagina, nombre, propiedadesVen);
}


//*******************************************************************
// Funciones de MASCARAS
//*******************************************************************

/*
  mascaraLetras       Funcion que solo permite introducir letras en un campo.
  mascaraNumeros      Funcion que solo permite introducir letras en un campo.
  mascaraNumerosMsg   Funcion que solo permite introducir letras en un campo y muestra un mensaje en caso contrario.
  mascaraLongitud     Funcion que solo permite introducir n caracteres en un campo, mostrando un mensaje en caso contrario.
  mascaraFecha        Funcion que solo permite introducir una fecha.
*/  

////////////////////////////////////////////////////////////////////////////////
// Descripción: Funcion que solo permite introducir letras en un campo.
// Parametros:  
//  - campo: Campo sobre el que se aplicara la mascara
////////////////////////////////////////////////////////////////////////////////
function mascaraLetras(campo) {
  // Ejemplo <input name="letras" type="text" onKeyPress="mascaraLetras(this)">
  // A-Z: 65-90, a-z: 97-122
  // Á:193, É:201, Í:205, Ó:211, Ú:218, á:225, é:233, í:237, ó:243, ú:250, Ñ:209, ñ:241
  if (window.event.keyCode != 13) { // Distinto de INTRO
    window.event.returnValue = ((window.event.keyCode > 64 && window.event.keyCode < 91) ||
                                (window.event.keyCode > 96 && window.event.keyCode < 123) ||
                                (window.event.keyCode == 193 || window.event.keyCode == 201) ||
                                (window.event.keyCode == 205 || window.event.keyCode == 211) ||
                                (window.event.keyCode == 218 || window.event.keyCode == 225) ||
                                (window.event.keyCode == 233 || window.event.keyCode == 237) ||
                                (window.event.keyCode == 243 || window.event.keyCode == 250) ||
                                (window.event.keyCode == 209 || window.event.keyCode == 241)
    ? true : false); 
  }
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Funcion que solo permite introducir numeros en un campo.
// Parametros:  
//  - campo: Campo sobre el que se aplicara la mascara
////////////////////////////////////////////////////////////////////////////////
function mascaraNumeros(campo) {
  if (window.event.keyCode != 13) { // Distinto de INTRO
    window.event.returnValue = (window.event.keyCode > 47 && window.event.keyCode < 58 ? true : false);   
  }
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Funcion que solo permite introducir numeros en un campo, mostrando un mensaje en caso contrario.
// Parametros:  
//  - campo: Campo sobre el que se aplicara la mascara
//  - mensaje: Mensaje a mostrar
////////////////////////////////////////////////////////////////////////////////
function mascaraNumerosMsg(campo, mensaje) {
  if (window.event.keyCode != 13) { // Distinto de INTRO
    if (window.event.keyCode > 47 && window.event.keyCode < 58) {
      window.event.returnValue = true;
    } else {
      alert(mensaje);
      window.event.returnValue = false;
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Funcion que solo permite introducir n caracteres en un campo, mostrando un mensaje en caso contrario.
// Parametros:  
//  - campo: Campo sobre el que se aplicara la mascara
//  - longitud: Longitud maxima permitida
//  - mensaje: Mensaje a mostrar
////////////////////////////////////////////////////////////////////////////////
function mascaraLongitud(campo, longitud, mensaje) {
  if ((campo.value).length > longitud) {
    campo.value = (campo.value).substring(0, longitud);
    alert(mensaje);
    window.event.returnValue = false;
  }
}

////////////////////////////////////////////////////////////////////////////////
// Descripción: Funcion que solo permite introducir una fecha.
// Parametros:  
//  - campo: Campo sobre el que se aplicara la mascara
////////////////////////////////////////////////////////////////////////////////  
function mascaraFecha(campo) {
  if (window.event.keyCode != 13) {
    if (window.event.keyCode > 47 && window.event.keyCode < 58) { // Numeros
      if ((campo.value).length == 2 || (campo.value).length == 5) {
        campo.value = campo.value + SEPARADOR_FECHA
      }
    } else {
      if (window.event.keyCode == 47) { // /
        if ((campo.value).length != 2 && (campo.value).length != 5) {
          window.event.returnValue = false;
        }
      } else if (window.event.keyCode == 45) {  // -
        if ((campo.value).length == 2 || (campo.value).length == 5) {
          campo.value = campo.value + SEPARADOR_FECHA
        }
        window.event.returnValue = false;
      } else {  // Otros
        alert("Caracter no valido");
        window.event.returnValue = false; 
      }
    }
  }
}