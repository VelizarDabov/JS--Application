
function solve() {
let nextId = 'depot';
let nameBusStation = '';
let btnDepart = document.getElementById('depart')
btnDepart.style.disabled = false
const btnArrive = document.getElementById('arrive')
const url = `http://localhost:3030/jsonstore/bus/schedule/${nextId}`

   async function depart() {
     const response = await fetch(url);
     const data = await response.json();
     btnDepart.disabled = true;
     btnArrive.disabled = false;
   nameBusStation = data.name;
   
        document.querySelector(".info").textContent = `Next stop ${nameBusStation}`;

    }

async  function arrive() {
     const response = await fetch(url);
    const data = await response.json();
    nameBusStation = data.name;
    btnDepart.disabled = false;
    btnArrive.disabled = true;
        document.querySelector(".info").textContent = `Arriving at ${nameBusStation}`;
     
    }

    return {
        depart,
        arrive
    };
}

let result = solve();

