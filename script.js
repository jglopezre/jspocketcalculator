let display = document.querySelector(".display");
let button = document.querySelectorAll(".button");
let result = 0;
let mainBuffer = {
    data: "0",
    buffer: 0,
    operation: "",
    lastOperation: "",
    operating: false,
    equal: false,
    allClear: false
};

function operation(bufferObj) {

    if(bufferObj.operating) {
	switch(bufferObj.lastOperation) {
	case "add":
	    bufferObj.buffer = bufferObj.buffer + Number(bufferObj.data);
	    break;

	case "sub":
	    if(!bufferObj.operating) {
		bufferObj.buffer = Number(bufferObj.data);
	    }else{
		bufferObj.buffer = bufferObj.buffer - Number(bufferObj.data);
	    }
	    break;
	    
	case "mul":
	    bufferObj.buffer = bufferObj.buffer * Number(bufferObj.data);
	    break;

	default:
	    console.error("INVALID OPERATION")
	}
    }else{
	bufferObj.buffer = Number(bufferObj.data);
//	bufferObj.operation = "";
	bufferObj.operating = true;
    }
    bufferObj.lastOperation = bufferObj.operation;
    bufferObj.operation = "";
    bufferObj.equal = true;
    bufferObj.data = bufferObj.buffer.toString();
    return bufferObj;
}


function printDisplay (number) {
    display.innerText = number.toString();
}

function keyFunction(keyValue, bufferObj) {
    let bufferA = "";

    if (bufferObj.equal) {
	bufferObj.data = "";
	bufferObj.equal = false;
    }
    
    switch (keyValue) {
    case 1:
	bufferA = "7";
	break;
    
    case 2:
	bufferA = "8";
	break;

    case 3:
	bufferA = "9";
	break;

    case 4:
	//Suma
	bufferObj.operation = "add";
	operation(bufferObj);
	break;

    case 5:
	bufferA = "4";
	break;

    case 6:
	bufferA = "5";
	break;

    case 7:
	bufferA = "6";
	break;

    case 8:
	//Resta
	bufferObj.operation = "sub";
	operation(bufferObj);
	break;

    case 9:
	bufferA = "1";
	break;

    case 10:
	bufferA = "2";
	break;

    case 11:
	bufferA = "3";
	break;

    case 12:
	//Multiplica
	bufferObj.operation = "mul";
	operation(bufferObj);
	break;

    case 13:
	bufferA = "0";
	break;

    case 14:
	//punto
	break;

    case 15:
	//igual
	break;

    case 16:
	//Division
//	bufferObj.operation = "div";
//	operation(bufferObj);
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
	    bufferObj.data = "0";
	    bufferObj.allClear = true;
	}else{
	    bufferObj.buffer = 0;
	    bufferObj.operating = false;
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

    console.log(bufferObj);
    
    printDisplay(Number(bufferObj.data));
    return bufferObj;
}

for (let i = button.length; i > 0; i-- ) {
    button[i - 1].addEventListener('click', () => {
	mainBuffer = keyFunction(i, mainBuffer);
    });
};
