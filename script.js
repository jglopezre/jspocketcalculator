/***********************************************************************************
 *Author: Javier Lopez
 *Date: 10-ago-2021
 *Version: 0.01
 *Description: This program simulate a basic pocket calulator:
 *             Only have a buffer register that holds last number introduced
 *             When press a key, it concatenates its value to last value introduced
 *             Show result at press an operation key and finish process when equal
 *             key is pressed. Holding last value.
 *             One time press C key erases display value, a second time pressing 
 *             C key will erase buffer data too.
 *             Thank!
 ***********************************************************************************/

const MAX_DISPLAY_VALUE = 99999999;
const MIN_DISPLAY_VALUE = 0.000001;
let display = document.querySelector(".display");
let button = document.querySelectorAll(".button");
let result = 0;
let mainBuffer = {
    data: "",
    memory: "",
    buffer: 0,
    operation: "",
    lastOperation: "",
    operating: false,
    equal: false,
    allClear: false
};


//If display excced 8 characters, this converts buffer.data in a exponent result.
function exponentialization(bufferObj) {
    if (bufferObj.buffer > MAX_DISPLAY_VALUE){
	bufferObj.data = bufferObj.buffer.toExponential(4);
	bufferObj.equal = false;
    }else{
	bufferObj.data = bufferObj.buffer.toString();
	bufferObj.equal = true;
    }
    return bufferObj
}
/***********************************************************************/
function clearData(bufferObj) {

    if (!bufferObj.allClear) {
	console.log("aqui");
	bufferObj.data = "";
	bufferObj.allClear = true;
    }else{
	bufferObj.buffer = 0;
	bufferObj.data = "";
	bufferObj.operating = false;
	bufferObj.lastOperation = "";
	bufferObj.operation = "";
	bufferObj.allClear = false;
    }
    return bufferObj;
}
/************************************************************************/
function operation(bufferObj) {

    if(bufferObj.operating) {
	switch(bufferObj.lastOperation) {
	case "add":
	    bufferObj.buffer = bufferObj.buffer + Number(bufferObj.data);
	    break;

	case "sub":
	    bufferObj.buffer = bufferObj.buffer - Number(bufferObj.data);
	    break;
	    
	case "mul":
	    bufferObj.buffer = bufferObj.buffer * Number(bufferObj.data);
	    break;

	case "div":
	    bufferObj.buffer = bufferObj.buffer / Number(bufferObj.data);
	    break;

	case "":
	    break;
	    
	default:
	    console.error("INVALID OPERATION")
	}
    }else{
	bufferObj.buffer = Number(bufferObj.data);
	bufferObj.operating = true;
    }

    //Comprueba si se presiono = pra borrar el buffer y prevenir otro calculo
    if (bufferObj.equal) {
	bufferObj.lastOperation = "";
	
    }
    
    bufferObj.lastOperation = bufferObj.operation;
    bufferObj.operation = "";

    bufferObj = exponentialization(bufferObj);
    
    if (bufferObj.operating && bufferObj.lastOperation == "div" && bufferObj.buffer == 0) {
	clearData(bufferObj);
	bufferObj.data = "ERROR";
	
    }
    
    return bufferObj;
}

/************************************************************************/
function keyFunction(keyValue, bufferObj) {
    let bufferA = "";

    if (bufferObj.equal) {
	bufferObj.data = "";
	bufferObj.equal = false;
    }
    
    switch (keyValue) {
    case 1:
	bufferObj.allClear = false;
	bufferA = "7";
	break;
    
    case 2:
	bufferObj.allClear = false;
	bufferA = "8";
	break;

    case 3:
	bufferObj.allClear = false;
	bufferA = "9";
	break;

    case 4:
	//Suma
	bufferObj.allClear = false;
	bufferObj.operation = "add";
	operation(bufferObj);
	break;

    case 5:
	bufferObj.allClear = false;
	bufferA = "4";
	break;

    case 6:
	bufferObj.allClear = false;
	bufferA = "5";
	break;

    case 7:
	bufferObj.allClear = false;
	bufferA = "6";
	break;

    case 8:
	//Resta
	bufferObj.allClear = false;
	bufferObj.operation = "sub";
	operation(bufferObj);
	break;

    case 9:
	bufferObj.allClear = false;
	bufferA = "1";
	break;

    case 10:
	bufferObj.allClear = false;
	bufferA = "2";
	break;

    case 11:
	bufferObj.allClear = false;
	bufferA = "3";
	break;

    case 12:
	//Multiplica
	bufferObj.allClear = false;
	bufferObj.operation = "mul";
	operation(bufferObj);
	break;

    case 13:
	bufferObj.allClear = false;
	bufferA = "0";
	break;

    case 14:
	//punto
	bufferObj.allClear = false;
	bufferA = ".";
	break;

    case 15:
	//igual
	bufferObj.allClear = true;
	bufferObj.equal = true;
	operation(bufferObj);
	break;

    case 16:
	//Division
	bufferObj.allClear = false;
	bufferObj.operation = "div";
	operation(bufferObj);
	break;

    case 17:
	//Memoriza
	bufferObj.allClear = false;
	bufferObj.memory = bufferObj.data;
	break;

    case 18:
	//Muestra Memoria en Display
	bufferObj.allClear = false;
	bufferObj.data = bufferObj.memory;
	break;

    case 19:
	//Limpia Memoria
	bufferObj.allClear = false;
	bufferObj.memory = "";
	break;

    case 20:
	//Limpia Display
	clearData(bufferObj);
	break;

    default:
	console.error("Valor Fuera de Rango");
    }
    
    if (bufferObj.data.length <= 7) {
      bufferObj.data = bufferObj.data + bufferA;
    }

    display.innerText = bufferObj.data;

    console.log(bufferObj);

    return bufferObj;
}

for (let i = button.length; i > 0; i-- ) {
    button[i - 1].addEventListener('click', () => {
	mainBuffer = keyFunction(i, mainBuffer);
    });
};
