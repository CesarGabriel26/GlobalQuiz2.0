var Users = []
Users = JSON.parse(localStorage.getItem('GlobalQuizUsers'))
if (Users == null) {
    Users = []
}

//
var Card = (user, Rank) => `
    <div class="Card">
        <img id="Foto" src="${user.foto}"
            alt="">
        <h1 id="nome">${user.nome}</h1>
        <h1 id="Colocacao">${Rank + 1}°</h1>
        <img id="Clasificacao" src="${Return_Trofeu(Rank + 1)}" alt="">
        <h1>${user.Pontuacao} Pontos</h1>
    </div>
`



function Return_Trofeu(RankPos) {
    var a = `../Img/Trofeu vitoria.png`

    if (RankPos == 2) {
        a = `../Img/Trofeu 2lugar.png`
    } else if (RankPos == 3) {
        a = `../Img/Trofeu 3lugar.png`
    }

    return a
}

function LoadRank() {
    var UsersShorted = []

    Users.forEach(user => {
        UsersShorted.push(user)
    })

    UsersShorted.sort(function (a, b) {
        return b.Pontuacao - a.Pontuacao
    });

    localStorage.setItem('GlobalQuizUsers', JSON.stringify(Users))

    Rank.innerHTML = ""
    UsersShorted.forEach((user, i) => {
        Rank.innerHTML += Card(user, i)
    })
}
LoadRank()
