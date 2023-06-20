var Users = []
Users = JSON.parse(localStorage.getItem('GlobalQuizUsers'))
if (Users == null) {
    Users = []
}


var Card = (user,Rank) => `
<div class="Card">
    <img id="Foto" src="${user.foto}"
        alt="">
    <h1 id="Colocacao">${user.nome}</h1>
    <h1 id="Colocacao">${Rank}°</h1>
    <img id="Clasificacao" src="../Img/Trofeu vitoria.png" alt="">
    <h1>${user.Pontuacao}</h1>
</div>
`

var UsersShorted = []


Users.forEach(user =>{
    UsersShorted.push(user)
})

UsersShorted.sort(function(a, b){
    return b.Pontuacao - a.Pontuacao
});

localStorage.setItem('GlobalQuizUsers',JSON.stringify(Users))


function LoadRank() {
    Rank.innerHTML = ""
    UsersShorted.forEach((user,i) => {
        Rank.innerHTML += Card(user,i+1)
    })
}
LoadRank()
