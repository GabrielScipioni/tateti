const x="✘";
const O="◯";
let estadojuego="P1";
const modal =document.querySelector("dialog");
const textomodal= modal.querySelector("h2");
const cuadrados = Array.from (document.querySelectorAll(".cuadrado"));

cuadrados.forEach((cuadrado, i) =>{
    cuadrado.addEventListener("click",()=>{
        if  (estadojuego==="pausa"){return;}
        if (cuadrado.textContent !== "") {return;}
        cuadrado.innerText= estadojuego ==="P1" ? x : O;
        
        const posicionGanadora = revisarganador();
        if(typeof posicionGanadora === "object"){
            Ganar(posicionGanadora);
            return
        }
        if (posicionGanadora=== "empate") {
            mostrarmodal("Hubo un.....empate?")
        }
        estadojuego=estadojuego ==="P1" ? "P2" : "P1"
    })
})

function revisarganador() {
    const tablero = cuadrados.map(cuadrado => cuadrado.innerText);

    //primero revisar horizontal
    for (let i = 0; i <= 9; i+=3) {
        if (tablero[i] &&
            tablero[i]===tablero[i+1] &&
            tablero[i]===tablero[i+2]) {
                return [i,i+1,i+2];
        }
    }

    //luego verticales 
    for (let i = 0; i <= 3; i++) {
        if (tablero[i] &&
            tablero[i]===tablero[i+3] &&
            tablero[i]===tablero[i+6]) {
                return [i,i+3,i+6];
        }
    }

    //luego oblicuas
        if (tablero[0] &&
            tablero[0]===tablero[4] &&
            tablero[0]===tablero[8]) {
                return [0,4,8];
        }
        if (tablero[2] &&
            tablero[2]===tablero[4] &&
            tablero[2]===tablero[6]) {
            return [2,4,6];
        }
        
        if(tablero.includes("")) return false;
        return "empate";
}
function Ganar(posicionGanadora){
    
    posicionGanadora.forEach(posicion =>{
        cuadrados[posicion].classList.toggle("ganador",true);
    })
    mostrarmodal("Gano: "+estadojuego);
    estadojuego = "pausa";
}
function mostrarmodal(texto){
    textomodal.innerText =texto;
}
modal.querySelector("button").addEventListener("click",()=>{
    cuadrados.forEach(cuadrado=> {
        cuadrado.textContent="";
        cuadrado.classList.toggle("ganador",false);
        modal.close();
        estadojuego="P1"
    })
})

