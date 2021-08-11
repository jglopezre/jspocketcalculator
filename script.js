let display = document.querySelector(".display");
let button = document.querySelectorAll(".button");
let result = 0;
let mainBuffer = "";
let keyValue = 0;


function printDisplay (number) {
    display.innerText = number.toString();
}

function keyFunction(value) {
    let bufferA = 0;
    
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
	break;

    default:
	console.error("Valor Fuera de Rango");
    }
    

    console.log(value);

    if (value.length <= 7) {
      value = value + bufferA;
    }
    
    printDisplay(Number(value));
    return value;
}

for (let i = button.length; i > 0; i-- ) {
    button[i - 1].addEventListener('click', () => {
	keyValue = i;
	mainBuffer = keyFunction(mainBuffer);
    });
};
