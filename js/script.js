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
    alertMsg.style.color = 'rgb(247, 85, 80)';
    alertMsg.innerHTML = 'Digite os dados de acesso!';
    inputUser.style.outline = 'rgb(247, 85, 80) 0.8px solid';
    inputPass.style.outline = 'rgb(247, 85, 80) 0.8px solid';
    return;
  };

  if (loginValues.length == 0) {
    loginValues.push({
      ...newUser,
    });

    saveNewUser();
    inputUser.value = '';
    inputPass.value = '';
    inputUser.style.outline = 'none';
    inputPass.style.outline = 'none';
    alertMsg.style.color = 'rgb(80, 195, 111)';
    alertMsg.innerHTML = 'Dados de acesso salvos!';
    return;
  }

  loginValues.push({
    ...newUser,
  });

  saveNewUser();
  inputUser.value = '';
  inputPass.value = '';
  inputUser.style.outline = 'none';
  inputPass.style.outline = 'none';
  alertMsg.style.color = 'rgb(80, 195, 111)';
  alertMsg.innerHTML = 'Dados de acesso salvos!';
};

function saveNewUser() {
  localStorage.setItem(localStorageLoginKey, JSON.stringify(loginValues));
};

function signIn() {

  if (loginValues.length === 0 || !inputUser.value || !inputPass.value) {
    alertMsg.style.color = 'rgb(247, 85, 80)';
    alertMsg.innerHTML = 'Digite os dados de acesso!';
    inputUser.style.outline = 'rgb(247, 85, 80) 0.8px solid';
    inputPass.style.outline = 'rgb(247, 85, 80) 0.8px solid';
    return;
  };

  for (let i in loginValues) {
    if (loginValues[i].Username === inputUser.value && loginValues[i].Password === inputPass.value) {
      login.style.display = 'none';
      logged.style.display = 'flex';
      return;
    }

    alertMsg.style.color = 'rgb(247, 85, 80)';
    alertMsg.innerHTML = 'Dados de acesso inválidos!';
    inputUser.style.outline = 'rgb(247, 85, 80) 0.8px solid';
    inputPass.style.outline = 'rgb(247, 85, 80) 0.8px solid';
  };
};