//LINKS FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDk3vn-TbklfpygEMks8F0NYvgRLh6KU5Q",
  authDomain: "pratica-70bce.firebaseapp.com",
  databaseURL: "https://pratica-70bce-default-rtdb.firebaseio.com",
  projectId: "pratica-70bce",
  storageBucket: "pratica-70bce.appspot.com",
  messagingSenderId: "455435785123",
  appId: "1:455435785123:web:67ad2fde5e87aba8e84016"
};

firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("userName"); //pegar o nome do usuário do localStorage
roomName = localStorage.getItem("roomName"); //pegar o nome da sala do LocalStorage

function send() //função enviar
{
  msg = document.getElementById("msg").value; //armazenando a mensagem a ser enviada nessa variável
  firebase.database().ref(roomName).push({ //aqui o nome, mensagem e like serão adicionados a pasta da sala que estamos mandando a mensagem
    nome: userName,
    message: msg,
    like: 0
  });

  msg = ""; //ao enviar a mensagem limpamos o campo input para poder escrever uma nova mensagem
}

//Termina aqui

function getData() {
  firebase.database().ref("/" + roomName).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
        firebaseMessageId = childKey; //chave única para cada mensagem contendo o nome, mensagem e like
        messageData = childData;
        //Início do código
        console.log(firebaseMessageId);
        console.log(messageData);
        nome = messageData['nome'];
        message = messageData['message'];
        like = messageData['like'];
        nameWithTag = "<h4> " + nome + "<img class='user_tick' src='tick.png'></h4>";
        messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebaseMessageId + " value=" + like + " onclick='updateLike(this.id)'>";
        spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

        row = nameWithTag + messageWithTag + like_button + spanWithTag;
        document.getElementById("output").innerHTML += row;
        //Fim do código
      }
    });
  });
}
getData();

function updateLike(messageId) {
  console.log("botão de like pressionado - " + messageId);
  buttonId = messageId;
  likes = document.getElementById(buttonId).value;
  updatedLikes = Number(likes) + 1;
  console.log(updatedLikes);

  firebase.database().ref(roomName).child(messageId).update({
    like: updatedLikes
  });
}

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location.replace("index.html");
}
