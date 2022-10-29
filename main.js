//inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = timer;
let tiempoRegresivoId = null;


//apuntando documento html
let mostrarMovimientos =document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante')

//generacion de numeros aleatorios
let number =[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
number = number.sort(()=>{return Math.random()-0.5});
console.log(number);

//funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} seg`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
    },1000);
    }

function bloquearTarjetas(){
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = number[i];
        tarjetaBloqueada.disabled = true;
    }
}



//funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador =true;
    }

    tarjetasDestapadas++;

    if(tarjetasDestapadas == 1){
        //mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado =number[id]
        tarjeta1.innerHTML =primerResultado;

        //deshabilitar primer boton
        tarjeta1.disabled = true;

    }else if(tarjetasDestapadas == 2){
        //MOstrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado =number[id]
        tarjeta2.innerHTML =segundoResultado;

        //deshabilitar segundo boton
        tarjeta2.disabled = true;

        //incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `movimiento: ${movimientos}`;

        if(primerResultado == segundoResultado){
            //encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;

            //Aumentar acierto
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😮`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 👏`
                mostrarTiempo.innerHTML = `felicidades tu tiempo fue de ${timerInicial - timer} segundos`
            }
        }else{
            //mostrar momentaneamente valores
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);
        }
    }
}