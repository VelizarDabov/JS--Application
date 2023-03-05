document.getElementById('submit').addEventListener('click', addStudent);
const url = 'http://localhost:3030/jsonstore/collections/students';
let table = document.querySelector('#results tbody');
let form = document.querySelector('form');
let inputFields = document.querySelector('#inputs text')
window.addEventListener('load', loadStudents);

async function loadStudents(){
try{
    let response = await fetch (url);

    if(response.status != 200 ){
        throw new Error('Error');
    }
    let data = await response.json();
    Object.values(data).forEach(r=>{
let student = createElement('tr',
createElement('td', r.firstName),
createElement('td', r.lastName),
createElement('td', r.facultyNumber),
createElement('td', r.grade),
)
if(r.firstName == '' || r.lastName == '' || r.facultyNumber == '' || r.gradeNumber == '' ){
    return;
}


table.appendChild(student)
window.addEventListener('load', loadStudents);
    })
}catch(error){
alert(error.message)
}
}
async function addStudent(e){
    e.preventDefault();
   
    let dataForm = new FormData(form);
    let infoArr = [...dataForm.values()];
    
    let gradeNumber =Number(infoArr[3].trim());

table.replaceChildren();
  try {
    let response = await fetch(url, {
        method:'POST',
        headers: {
            'Content-type': 'application/json'
        },
            body: JSON.stringify({
                firstName:infoArr[0],
                lastName: infoArr[1],
                facultyNumber: infoArr[2],
                grade: gradeNumber

            })
         
    })
  
    loadStudents()
   inputFields.innerHTML = '';
    if(response.ok == false){
        throw new Error('Cant create new record')
    }

  } catch (error) {
    alert(error.message)
  }
  infoArr =[]
}

function createElement(type, ...content){
let element = document.createElement(type);

content.forEach(c=> {
    if(typeof c == 'number' || typeof c == 'string'){
        c = document.createTextNode(c);
    }
    element.appendChild(c)
});
return element
}
