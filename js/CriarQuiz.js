let ImagemINP = document.getElementById('ImagemINP')
let Imagem = document.getElementById('Imagem')
let NumeroDeQuestoes = document.getElementById('NumeroDeQuestoes')
let Categoria = document.getElementById('Categoria')
//pergunta
let Pergunta = document.getElementById('Pergunta')

//Respostas
let RespostaA = document.getElementById('RespostaA')
let RespostaB = document.getElementById('RespostaB')
let RespostaC = document.getElementById('RespostaC')
let RespostaD = document.getElementById('RespostaD')
//Radio butons
let Certo_RespostaA = document.getElementById('Certo_RespostaA')
let Certo_RespostaB = document.getElementById('Certo_RespostaB')
let Certo_RespostaC = document.getElementById('Certo_RespostaC')
let Certo_RespostaD = document.getElementById('Certo_RespostaD')

var FilePath = ""
var QuizData = []
var cont_pagias = 0
var PaginaAtual = 0
var EmptyData = {
    Pergunta: "",
    Img: "",
    Respsotas: [
        ["", true],
        ["", false],
        ["", false],
        ["", false]
    ]
}


var AllQuizes = []
AllQuizes = JSON.parse(localStorage.getItem('GlobalQuiz_Quizes'))
if (AllQuizes == null) {
    AllQuizes = []
}
console.log(AllQuizes);


Imagem.addEventListener('click', () => {
    ImagemINP.click()
})

if (ImagemINP) {
    ImagemINP.addEventListener('change', e => {
        const file = ImagemINP.files[0]
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            FilePath = reader.result
            Imagem.src = FilePath

        })
        reader.readAsDataURL(file);
    })
}

setInterval(() => {
    LoadUI()
}, 100);

function AddPage() {
    var Data = {
        Pergunta: Pergunta.value,
        Img: FilePath,
        Respsotas: [
            [RespostaA.value, Certo_RespostaA.checked],
            [RespostaB.value, Certo_RespostaB.checked],
            [RespostaC.value, Certo_RespostaC.checked],
            [RespostaD.value, Certo_RespostaD.checked]
        ]
    }

    if (Validar()) {
        QuizData[PaginaAtual] = Data
        cont_pagias++
        PaginaAtual++
        Clear()
    } else {
        console.log(Data.Respsotas);
        alert('Preencha os campos obrigatorios[Respsota correta, pergunta e respsotas]')
    }

}

function RemovePage() {
    if (cont_pagias > 0) {
        QuizData.splice(PaginaAtual, 1)
        cont_pagias--
        Load(QuizData[cont_pagias])
    }
}

function Validar() {
    if (Pergunta.value == "") {
        return false
    }
    if (Certo_RespostaA.checked == false && Certo_RespostaB.checked == false && Certo_RespostaC.checked == false && Certo_RespostaD.checked == false) {
        return false
    }
    if (RespostaA.value == "" && RespostaB.value == "" && RespostaC.value == "" && RespostaD.value == "") {
        return false
    }
    return true
}

function Clear() {
    RespostaA.value = ""
    RespostaB.value = ""
    RespostaC.value = ""
    RespostaD.value = ""
    FilePath = ""
    Imagem.src = FilePath
    Certo_RespostaA.checked = false
    Certo_RespostaB.checked = false
    Certo_RespostaC.checked = false
    Certo_RespostaD.checked = false
    Pergunta.value = ""
}

function LoadUI() {
    NumeroDeQuestoes.innerHTML = `<p>${QuizData.length}</p>`
}

function Befote_After_PAge(Value) {
    PaginaAtual += Value
    if (PaginaAtual < 0) {
        PaginaAtual = 0
    } else if (PaginaAtual > (QuizData.length - 1)) {
        PaginaAtual = (QuizData.length - 1)
    }
    console.log(PaginaAtual);
    Load(QuizData[PaginaAtual])
}

function Load(Data) {
    RespostaA.value = Data.Respsotas[0][0]
    RespostaB.value = Data.Respsotas[1][0]
    RespostaC.value = Data.Respsotas[2][0]
    RespostaD.value = Data.Respsotas[3][0]
    FilePath = Data.Img
    Imagem.src = FilePath
    Certo_RespostaA.checked = Data.Respsotas[0][1]
    Certo_RespostaB.checked = Data.Respsotas[1][1]
    Certo_RespostaC.checked = Data.Respsotas[2][1]
    Certo_RespostaD.checked = Data.Respsotas[3][1]

    Pergunta.value = Data.Pergunta

    Imagem.src = Data.Img
}

function ValidarBuild() {
    if (QuizData.length > 0) {
        document.getElementById("Confirm").style.display = 'flex'
    } else {
        alert('Seu quiz presiza ter ao menos uma pagina')
    }
}
function Voltar() {
    document.getElementById("Confirm").style.display = 'none'
}

var QuizImage = document.getElementById('QuizImage')

function Build() {

    var nome = document.getElementById('QuizName')
    var Link = document.getElementById('LinkImagem')

    QuizData.forEach((data, i) => {
        if (data === EmptyData || data.Respsotas === EmptyData.Respsotas || data.Pergunta === EmptyData.Pergunta) {
            QuizData.splice(i, 1)
        }
    })

    var img = "../img/Capa dos quizes.png"
    if (Link.value != "") {
        img = Link.value
    }

    if (nome.value != "") {
        var finalData = {
            QuizNome: nome.value,
            Foto: img,
            categoria: Categoria.value,
            quizData: QuizData
        }
        AllQuizes.push(finalData)
        localStorage.setItem('GlobalQuiz_Quizes', JSON.stringify(AllQuizes))
        alert('Quiz salvo com suceço')
        location.href = "principal.html"
    } else {
        nome.focus()
        alert('De um nome ao seu quiz')
    }
}
