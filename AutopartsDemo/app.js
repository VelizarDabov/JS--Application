start()
function start(){
    document.getElementById('create-btn').addEventListener('click', postData);
     document.getElementById('save-btn').addEventListener('click', savePart);
    document.getElementById('load-btn').addEventListener('click', loadData);
    document.getElementById('table_body').addEventListener('click', tableAction);
    document.getElementById('cancel-btn').addEventListener('click',toggleEditors)
}
//Load and display
async function loadData(){
    const url = 'http://localhost:3030/jsonstore/autoparts'
    const response = await fetch(url);
    const data = await response.json();
 
   const rows = Object.values(data).map(createRow)
document.getElementById('table_body').replaceChildren(...rows)
    
}
function createRow(record){
    const element = document.createElement('tr');
    element.innerHTML = `
                <td>${record._id}</td>
                <td>${record.label}</td>
                <td> $${record.price}</td>
                <td>${record.qty}</td>
                <td> 
                <button data-id=${record._id}  class="delete-btn">Delete</button>
                <button data-id=${record._id}  class="edit-btn">Edit</button>
                </td>
    
    `
    return element
    }
    // post data
async function postData(){
const label = document.getElementById('part_label').value;

const price = Number(document.getElementById('part_price').value)
const qty = Number(document.getElementById('part_qty').value)

const partData = {
    label, 
    price,
    qty,
}
const url = 'http://localhost:3030/jsonstore/autoparts';
const options = {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(partData)
};
const response = await fetch(url, options);
const result = await response.json();
loadData()
}
// event delegation
function tableAction(e){
const target = e.target;
if(target.tagName == 'BUTTON'){
    if(target.classList.contains('delete-btn')){
deleteRecor(target.dataset.id)
    }else if(target.classList.contains('edit-btn')){
loadForEditing(target.dataset.id)
    }
}
}
// delete data
async function deleteRecor(recordId){
    const choice = confirm('Are you sure?')
    if(choice == false){
        return
    }
const url = 'http://localhost:3030/jsonstore/autoparts/' + recordId;

const options = {
    method: 'delete'
};
const response = await fetch(url, options);
loadData()
}

// edit Part 
async function loadForEditing(recordId){
    const url = 'http://localhost:3030/jsonstore/autoparts/' + recordId;
    const response = await fetch(url);
    const data = await response.json()
document.getElementById('editor_create').style.display = 'none';
document.getElementById('editor_edit').style.display = 'block';

document.getElementById('edit_part_id').value = data._id;
document.getElementById('edit_part_label').value = data.label;
document.getElementById('edit_part_price').value = data.price;
document.getElementById('edit_part_qty').value = data.qty;
}

async function savePart(){
    const record = {};
   record._id =  document.getElementById('edit_part_id').value;
    record.label = document.getElementById('edit_part_label').value;
   record.price = document.getElementById('edit_part_price').value;
    record.qty = document.getElementById('edit_part_qty').value;

    const url = 'http://localhost:3030/jsonstore/autoparts/' + record._id;
    const options = {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(record)
    }
    const response = await fetch(url, options);
    const result = await response.json();

    toggleEditors();
    loadData(); 
}
function toggleEditors(){
document.getElementById('editor_create').style.display = 'block';
document.getElementById('editor_edit').style.display = 'none';
    
}