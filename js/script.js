const localStorageLoginKey = 'loginAccess';
const loginValues = JSON.parse(localStorage.getItem(localStorageLoginKey) || "[]");
const form = document.querySelector("form");
const inputUser = document.getElementById('user');
const inputPass = document.getElementById('password');
const login = document.getElementById('login');
const logged = document.getElementById('logged');
const alertMsg = document.getElementById('alert-msg');

form.addEventListener("click", function (e) {
  e.preventDefault()
});

function signUp() {
  const newUser = {
    Username: inputUser.value,
    Password: inputPass.value,
  };

  if (!inputUser.value || !inputPass.value) {
    alertMsg.innerHTML = 'Digite os dados de acesso!';
    inputUser.style.outline = '0.8px solid red';
    inputPass.style.outline = '0.8px solid red';
    return;
  };

  if (loginValues.length == 0) {
    loginValues.push({
      ...newUser,
    });

    saveNewUser();
    inputUser.value = '';
    inputPass.value = '';
    return;
  }

  loginValues.push({
    ...newUser,
  });

  saveNewUser();
  inputUser.value = '';
  inputPass.value = '';

};

function saveNewUser() {
  localStorage.setItem(localStorageLoginKey, JSON.stringify(loginValues));
};

function signIn() {
  for (let i in loginValues) {
    if (loginValues[i].Username === inputUser.value && loginValues[i].Password === inputPass.value) {
      login.style.display = 'none';
      logged.style.display = 'flex';
      return;
    }

    alertMsg.innerHTML = 'Dados de acesso inválidos!';
    inputUser.style.outline = '0.8px solid red';
    inputPass.style.outline = '0.8px solid red';
  };
};