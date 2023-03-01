function lockedProfile() {
  
(async () => {
    let profileRequest = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    let profiles = await profileRequest.json();
console.log(profiles);
let templeateFile = document.querySelector('.profile');
templeateFile.remove()
let mainSection = document.getElementById('main')
Object.keys(profiles).forEach((key,i) => {
    let profile = profiles[key];
    let htmlProfile = createHtmlProfile(i +1, profile.username, profile.email, profile.age);

mainSection.appendChild(htmlProfile)
})
})();
   
}

function createHtmlProfile(userIndex, username, email, age){
let profileDiv = document.createElement('div');
profileDiv.classList.add('profile');

let profileImage = document.createElement('img');
profileImage.src = './iconProfile2.png';
profileImage.classList.add('userIcon');

let lockRadioLabel = document.createElement('label');
lockRadioLabel.textContent = 'Lock';

let lockRadio = document.createElement('input');
lockRadio.type = 'radio';
lockRadio.name = `user${userIndex}Locked`;
lockRadio.value = 'lock';
lockRadio.checked = true;

let unlockRadioLabel = document.createElement('label');
unlockRadioLabel.textContent = 'Unlock';

let unlockRadio = document.createElement('input');
unlockRadio.type = 'radio';
unlockRadio.name = `user${userIndex}Locked`;
unlockRadio.value = 'unlock';

let br = document.createElement('br');
let hr = document.createElement('hr');

let usernameLabel = document.createElement('label');
usernameLabel.textContent = 'username';

let usernameInput = document.createElement('input');
usernameInput.name = `user${userIndex}Username`
usernameInput.value = username;
usernameInput.readOnly = true;
usernameInput.disabled = true;

let hiddenFieldDiv = document.createElement('div');
hiddenFieldDiv.id = `user${userIndex}HiddenFielsd`

let hiddenFieldHr = document.createElement('hr');

let emailLabel = document.createElement('label');
emailLabel.textContent = 'Email:'

let emailInput = document.createElement('input');
emailInput.type = 'email';
emailInput.name = `user${userIndex}Email`
emailInput.value = email;
emailInput.readOnly = true;
emailInput.disabled = true;

let ageLabel = document.createElement('label');
ageLabel.textContent = 'Email:'

let ageInput = document.createElement('input');
ageInput.type = 'email';
ageInput.name = `user${userIndex}Age`;
ageInput.value = age;
ageInput.readOnly = true;
ageInput.disabled = true;

hiddenFieldDiv.appendChild(hiddenFieldHr);
hiddenFieldDiv.appendChild(emailLabel);
hiddenFieldDiv.appendChild(emailInput);
hiddenFieldDiv.appendChild(ageLabel);
hiddenFieldDiv.appendChild(ageInput);

let showMoreButton = document.createElement('button')
showMoreButton.textContent = 'Show More';
showMoreButton.addEventListener('click', showHiddenInfo)


profileDiv.appendChild(profileImage)
profileDiv.appendChild(lockRadio)
profileDiv.appendChild(lockRadioLabel)
profileDiv.appendChild(unlockRadio)
profileDiv.appendChild(unlockRadioLabel)
profileDiv.appendChild(br)
profileDiv.appendChild(hr)
profileDiv.appendChild(usernameInput)
profileDiv.appendChild(usernameLabel);
profileDiv.appendChild(hiddenFieldDiv)
profileDiv.appendChild(showMoreButton)
return profileDiv;

}
function showHiddenInfo(e){
let profile = e.target.parentElement;
let showMoreBtn = e.target
let hiddenFieldDiv = e.target.previousElementSibling;
let radioButton = profile.querySelector('input[type="radio"]:checked')

if(radioButton.value !== 'unlock'){
    return;
}
showMoreBtn.textContent = showMoreBtn.textContent === 'Show More'? 'Hide it': 'Show More';
hiddenFieldDiv.style.display = hiddenFieldDiv.style.display === 'block'? 'none' : 'block'

}
