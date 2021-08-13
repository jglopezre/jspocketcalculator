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

let display = document.querySelector(".display");
let button = document.querySelectorAll(".button");
let result = 0;
let mainBuffer = {
    data: "",
    buffer: 0,
    operation: "",
    lastOperation: "",
    operating: false,
    equal: false,
    allClear: false
};

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
	bufferObj.operation = "";
	
    }
        
    bufferObj.lastOperation = bufferObj.operation;
    bufferObj.operation = "";
    bufferObj.equal = true;
    bufferObj.data = bufferObj.buffer.toString();

    if (bufferObj.operating && bufferObj.lastOperation == "div" && bufferObj.buffer == 0) {
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
	bufferObj.allClear = false;
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
	break;

    case 18:
	//Muestra Memoria en Display
	break;

    case 19:
	//Limpia Memoria
	break;

    case 20:
	//Limpia Display
	if (!bufferObj.allClear) {
	    bufferObj.data = "";
	    bufferObj.allClear = true;
	}else{
	    bufferObj.buffer = 0;
	    bufferObj.operating = false;
	    bufferObj.lastOperation = "";
	    bufferObj.operation = "";
	    bufferObj.allClear = false;
	}
	break;

    default:
	console.error("Valor Fuera de Rango");
    }
    

    if (bufferObj.data.length <= 7) {
      bufferObj.data = bufferObj.data + bufferA;
    }

    display.innerText = bufferObj.data;

    return bufferObj;
}

for (let i = button.length; i > 0; i-- ) {
    button[i - 1].addEventListener('click', () => {
	mainBuffer = keyFunction(i, mainBuffer);
    });
};
