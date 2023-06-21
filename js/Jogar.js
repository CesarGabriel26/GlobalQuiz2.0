let ImagemINP = document.getElementById('ImagemINP')
let Imagem = document.getElementById('Imagem')
let NumeroDeQuestoes = document.getElementById('NumeroDeQuestoes')

//pergunta
let Pergunta = document.getElementById('Pergunta')

//Respostas
let RespostaA = document.getElementById('RespostaA')
let RespostaB = document.getElementById('RespostaB')
let RespostaC = document.getElementById('RespostaC')
let RespostaD = document.getElementById('RespostaD')


var FilePath = ""

var QuizData = []
var Respostas = []
var PaginaAtual = 0
//0 Acertos V V Erros 1 //
var Pontuacao = [0, 0]

AllQuizes = JSON.parse(localStorage.getItem('GlobalQuiz_Quizes')) || BancoPErguntas()

LoadQuizData()
function LoadQuizData() {
    AllQuizes.forEach(data => {
        if (data.QuizNome == localStorage.getItem('QuizAtual')) {
            QuizData = data.quizData
            Load(QuizData[PaginaAtual])
        }
    })

}
var oneshot = true

function Load(Data) {

    if (PaginaAtual == QuizData.length) {
        FimDeJogo()
    } else {
        RespostaA.innerHTML = Data.Respsotas[0][0]
        RespostaB.innerHTML = Data.Respsotas[1][0]
        RespostaC.innerHTML = Data.Respsotas[2][0]
        RespostaD.innerHTML = Data.Respsotas[3][0]

        RespostaA.parentElement.disabled = false
        RespostaB.parentElement.disabled = false
        RespostaC.parentElement.disabled = false
        RespostaD.parentElement.disabled = false

        document.getElementById('Elimina1').disabled = false
        document.getElementById('Elimina2').disabled = false

        Respostas[0] = Data.Respsotas[0][1]
        Respostas[1] = Data.Respsotas[1][1]
        Respostas[2] = Data.Respsotas[2][1]
        Respostas[3] = Data.Respsotas[3][1]

        Pergunta.innerHTML = Data.Pergunta

        if (Data.Img != "") {
            Imagem.style.display = "block"
            Imagem.src = Data.Img
        } else {
            Imagem.style.display = "none"
        }

        oneshot = true
    }
}
var jarespondeu = false
function Responder(ID) {
    if (!jarespondeu) {
        if (Respostas[ID]) {
            Pontuacao[0] += 1
            TocarAuduio('Acerto')
        } else {
            Pontuacao[1] += 1
            TocarAuduio('Errado')
        }
        jarespondeu = true
    }
}

function TocarAuduio(Audio = "", Estado = "") {
    if (oneshot) {
        oneshot = false
        var a = document.createElement('audio')
        a.src = `../audio/${Audio}.mp3`
        a.play()
        a.addEventListener('ended', () => {
            if (Estado == "") {
                PaginaAtual++
                Load(QuizData[PaginaAtual])
                jarespondeu = false
            }
        })
    }
}

var Users = []
Users = JSON.parse(localStorage.getItem('GlobalQuizUsers'))
if (Users == null) {
    Users = []
}
var usuarioatual = JSON.parse(localStorage.getItem("GlobalQuizUsuarioAtual"))


function FimDeJogo() {
    oneshot = true
    document.getElementById('TelaFInal').style.display = "flex"

    if (Pontuacao[0] > Pontuacao[1]) {
        document.getElementById('BandeiraPrincipal').innerHTML = `<p>${Pontuacao[0]} Acertos</p>`
        document.getElementById('BandeiraSegundaria').innerHTML = `<p>${Pontuacao[1]} Erros</p>`
        TocarAuduio("Vitoria", 'Fim De Jogo')
    } else {
        document.getElementById('Trofeu').src = "../img/Trofeu derrota.png"

        document.getElementById('BandeiraPrincipal').innerHTML = `<p>${Pontuacao[1]} Erros</p>`
        document.getElementById('BandeiraPrincipal').style.backgroundImage = 'url("../img/bandeira muito erro.png")'

        document.getElementById('BandeiraSegundaria').innerHTML = `<p>${Pontuacao[0]} Acertos</p>`
        document.getElementById('BandeiraSegundaria').style.backgroundImage = 'url("../img/bandeira muito acerto.png")'
        TocarAuduio("derrota", 'Fim De Jogo')
    }

    Usuarios = JSON.parse(localStorage.getItem('GlobalQuizUsers'))
    Usuarios.forEach(Usuario => {
        if (usuarioatual.Nome == Usuario.nome && usuarioatual.Email == Usuario.email) {
            console.log(Usuario);
            Usuario.Pontuacao += Pontuacao[0]
            console.log(Usuario.Pontuacao);
        }
    })
    localStorage.setItem('GlobalQuizUsers', JSON.stringify(Usuarios))
}

// painelAjuda
let painelAjuda = document.getElementById('painelAjuda')
function MostrarAjuda() {
    if (painelAjuda.style.display == 'none') {
        painelAjuda.style.display = 'block'
    } else {
        painelAjuda.style.display = 'none'
    }
}

function EliminaRespErrada(Quantidade) {
    for (let num = 0; num < Quantidade; num++) {
        Elimina()
    }

    document.getElementById('Elimina1').disabled = true
    document.getElementById('Elimina2').disabled = true

    MostrarAjuda()
}

function Elimina() {
    var jafoi = []

    var i = parseInt(Math.random() * 4)
    if (jafoi.indexOf(i) == -1 && QuizData[PaginaAtual].Respsotas[i][1] == false) {

        if (i == 0) {
            RespostaA.parentElement.disabled = true;
        } else if (i == 1){
            RespostaB.parentElement.disabled = true;
        } else if (i == 2){
            RespostaC.parentElement.disabled = true;
        } else {
            RespostaD.parentElement.disabled = true;
        }

        jafoi.push(i)
        console.log(i);
    } else {
        Elimina()
    }
}