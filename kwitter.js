
function addUser() {

  userName = document.getElementById("userName").value; //Obtenha o nome do usuário da input box e armazene dentro de uma variável.

  localStorage.setItem("userName", userName); //armazenamos o valor da variável userName no local storage com a palavra-chave userName.

  window.location = "kwitterRoom.html"; //redirecionamento da página

}


