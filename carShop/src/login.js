const loginSection = document.getElementById('login-form');
const loginForm = loginSection.querySelector('#login-form').addEventListener('submit', onLoading)
export function showLogin(){
    document.querySelector('main').replaceChildren(loginSection)
}
async function onLoading(e){
e.preventDefault();
const newFormData = new FormData(loginForm);
const { email, password} = Object.fromEntries(newFormData.entries());


}