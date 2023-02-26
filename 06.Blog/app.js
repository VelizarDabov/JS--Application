

function attachEvents() {
 document.getElementById('btnLoadPosts').addEventListener('click', getPosts)
 document.getElementById('btnViewPost').addEventListener('click', getComments)
}
async function getPosts(){
    const url = 'http://localhost:3030/jsonstore/blog/posts';
    const selectOp = document.getElementById('posts');
    selectOp.innerHTML = '';

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(post => {
const op = document.createElement('option');
op.value = post.id;
op.textContent = post.title
selectOp.appendChild(op)
});
}

async function getComments(){
    const urlComments = 'http://localhost:3030/jsonstore/blog/comments';
    const urlPosts = 'http://localhost:3030/jsonstore/blog/posts';


const title = document.getElementById('post-title')
    const selectedOp = document.getElementById('posts').selectedOptions[0].value;
    const postBody = document.getElementById('post-body');
    const postUElement = document.getElementById('post-comments');
 postUElement.innerHTML = ''
const postResponse = await fetch(urlPosts);
const postData = await postResponse.json();

const commentsResponse = await fetch(urlComments);
const commentsData = await commentsResponse.json();

    const selectedPost =Object.values(postData).find(post => post.id == selectedOp)
title.textContent= selectedPost.title;
postBody.textContent = selectedPost.body;


const comments = Object.values(commentsData).filter(c=> c.postId == selectedOp)
comments.forEach(c =>{
    const li = document.createElement('li');
    li.textContent = c.text;
postUElement.appendChild(li)
})
}
attachEvents();