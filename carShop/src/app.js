import{ showHome, } from'./home.js';
import { showLogin } from './login.js';
import { showCatalog } from './catalog.js';


document.getElementById('views').remove()
//start app
showLogin()

document.getElementById('home-link').addEventListener('click', () =>{
showHome()
})
document.getElementById('catalog-link').addEventListener('click', () =>{
showCatalog()
 })
document.getElementById('login-link').addEventListener('click', () =>{
showLogin()
})