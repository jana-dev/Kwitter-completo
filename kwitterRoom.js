const firebaseConfig = {
  apiKey: "AIzaSyDk3vn-TbklfpygEMks8F0NYvgRLh6KU5Q",
  authDomain: "pratica-70bce.firebaseapp.com",
  databaseURL: "https://pratica-70bce-default-rtdb.firebaseio.com",
  projectId: "pratica-70bce",
  storageBucket: "pratica-70bce.appspot.com",
  messagingSenderId: "455435785123",
  appId: "1:455435785123:web:67ad2fde5e87aba8e84016"
};

// ADICIONE SUS LINKS FIREBASE AQUI
firebase.initializeApp(firebaseConfig);
//ADICIONE SEUS LINKS FIREBASE

userName = localStorage.getItem("userName"); //pegando o valor username do local storage para armazenar na variável

document.getElementById("userName").innerHTML = "Boas vindas " + userName + "!";

function addRoom()
{
  roomName = document.getElementById("roomName").value; //armazenando o valor da sala criada na variável

  firebase.database().ref("/").child(roomName).update({ // acessando o banco de dados firebase, entrando na pasta principal com / e criando uma pasta no banco de dados com o nome da sala
    purpose : "adicionar nome de sala"
  });

  localStorage.setItem("roomName", roomName); //também armazenamos esse nome da sala no local storage
    
  window.location = "kwitterPage.html"; // alterando a página web para outro html
}
//Iniciar aqui com guilherme
function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; //linha que pega todos os dados do firebase e mostra em alguma div html, esse código é pego pela documentação do firebase
       roomNames = childKey; //armazenando todos os nomes de cada sala na variável
       console.log("Nome da Sala - " + roomNames); //só para verificação
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>"; //this.id significa a id do elemento do html atual, e a id do dessa div é o nome da sala, entao, quando clicar na sala saberemos para qual sala estamos entrando etc.
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData(); //chamando a função getData() assim que carregar a página

function redirectToRoomName(name) //name é uma referencia para o this.id para receber o nome da sala e redirecionar para ela
{
  console.log(name);
  localStorage.setItem("roomName", name); // salvando no localStorage
    window.location = "kwitterPage.html"; //indo para dentro da sala
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
    window.location = "index.html";
}
