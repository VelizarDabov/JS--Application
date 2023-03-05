const url = 'http://localhost:3030/jsonstore/collections/books'
let loadBookBtn = document.querySelector('#loadBooks');

let tbodyElement = document.getElementsByTagName('tbody')[0];
let formElement = document.getElementsByTagName('form')[0];

loadBookBtn.addEventListener('click', loadBooks);

async function loadBooks(){
    try {
        let response = await fetch(url);
        if(response.status != 200){
            throw new Error('Problem!')
        }
        let data =await  response.json();

        let entries = Object.entries(data);
        tbodyElement.innerHTML = '';

        for (let [key, {author, title}] of entries) {
            let trElement = document.createElement('tr');
            let titleElement = document.createElement('td');
            titleElement.textContent = title;

            let authorElement = document.createElement('td');
         authorElement.textContent = author;

         trElement.appendChild(titleElement);
         trElement.appendChild(authorElement);

         let newElement = document.createElement('td');
         let editBtn = document.createElement('button');
         let deleteBtn = document.createElement('button');

         editBtn.textContent = 'Edit';
         editBtn.addEventListener('click', edit)
         deleteBtn.textContent = 'Delete';
deleteBtn.addEventListener('click', remove)
         newElement.appendChild(editBtn);
         newElement.appendChild(deleteBtn);
         trElement.appendChild(newElement);
         tbodyElement.appendChild(trElement);

         function edit(e){
            e.preventDefault();

         }

         function remove(e){
e.preventDefault();
fetch(`${url}/${key}`,{
    method: 'DELETE'
})

trElement.remove();
         }
        }
    } catch (error) {
        throw new Error('Problem')
    }
}