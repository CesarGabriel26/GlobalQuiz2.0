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

//Esta variavel guardara o caminho/link da iamgem escolhida
var FilePath = ""
//Esta varaivel armazena as informações das paginas do quiz
var QuizData = []
//Esta guarda a quantidade de paginas
var cont_pagias = 0
//Esta guarda qual é a pagina atual
var PaginaAtual = 0

//esta constante guarda o formato de pagina de um quiz vasio
const EmptyData = {
    Pergunta: "",
    Img: "",
    Respsotas: [
        ["", true],
        ["", false],
        ["", false],
        ["", false]
    ]
}

//Aqui carregamos todos os quizes no do local storage, se for vasio pegamos os dados do banco de perguntas
var AllQuizes = JSON.parse(localStorage.getItem('GlobalQuiz_Quizes')) || BancoPErguntas()

//Aqui vemos se a imagem foi clicada
Imagem.addEventListener('click', () => {
    //se sim chamamos o Input de imagem e resetamos se ele tiver algum arquivo
    ImagemINP.click()
    ImagemINP.files[0] = ""
})

//Chacamos se A um input de imagem
if (ImagemINP) {
    //se ouver checamos se o valor nele mudou
    ImagemINP.addEventListener('change', e => {
        //Se mudou armazenamos este valor 
        const file = ImagemINP.files[0]
        //Criamos um "Leitor de Arquivos"
        const reader = new FileReader();

        //Checamos se ele ja carregou
        reader.addEventListener('load', () => {
            //Se sim armazenamos o link gerado
            FilePath = reader.result
            Imagem.src = FilePath

        })
        //Aqui chamamos o Leitor com a função para trasformar o arquivo em um Link
        reader.readAsDataURL(file);
    })
}

//Esta função não é obrigatoria mais a fiz para sempre estar atualizando a UI do site 
//(User interface || Interface de usuario)
setInterval(() => {
    LoadUI()
}, 100);

//Esta função é chamada quando o usuario clica no + para adicionar uma nova pagina
function AddPage() {
    //Salvamos as informações da pagina em um Objeto
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

    //Verificamos se tudo esta preenchido
    if (Validar()) {
        //Se sim armazenamos a pagiana
        QuizData[PaginaAtual] = Data

        //e almentamos a conagem de pagians e a pagina atual EX:
        /* 
            Valor inicial:
            cont_pagias = 0
            PaginaAtual = 0

            Adicionamos
            cont_pagias++
            PaginaAtual++

            Valor final
            cont_pagias = 1
            PaginaAtual = 1
        */
        cont_pagias++
        PaginaAtual++
        //Esta função limpa todos os inputs para criar uma nova pagina
        Clear()
    } else {
        //se não damos um alerta para o usuario preencher todas os inputs requisitados
        alert('Preencha os campos obrigatorios[Respsota correta, pergunta e respsotas]')
    }

}

//Esta função é chamada quando o usuario clica no - para apagar a pagina atual
function RemovePage() {
    //Primeiro chegamos se a contagem de paginas é maior que 0
    if (cont_pagias > 0) {
        //Se sim Apagamos a pagina com a função splice do Array QuizData
        QuizData.splice(PaginaAtual, 1)
        // e diminuimos a quantidade de paginas
        cont_pagias--
        //E carregamos a pagina que estava na frente da pagina deletada
        Load(QuizData[cont_pagias])
    }
}

//Esta função é chamada quando criamos uma nova pagina
function Validar() {
    //Checamos se a pergunta esta vasia, se estiver retornamos falso
    if (Pergunta.value == "") {
        return false
    }
    //Checamos se a resposta certa foir marcada, se não for retornamos falso
    if (Certo_RespostaA.checked == false && Certo_RespostaB.checked == false && Certo_RespostaC.checked == false && Certo_RespostaD.checked == false) {
        return false
    }
    //Checamos se as respostas foram preenchidas, se não for retornamos falso
    if (RespostaA.value == "" && RespostaB.value == "" && RespostaC.value == "" && RespostaD.value == "") {
        return false
    }
    //Se tudos estiver certo retornamos verdadeiro
    return true
}

//Esta função é chamada quando criamos uma nova pagina
function Clear() {
    //Resumidamente setamos todos os falores como vasio
    RespostaA.value = ""
    RespostaB.value = ""
    RespostaC.value = ""
    RespostaD.value = ""
    FilePath = ""
    Imagem.src = FilePath
    //Somante a respsota A fica verdadeira como padrão
    Certo_RespostaA.checked = true
    Certo_RespostaB.checked = false
    Certo_RespostaC.checked = false
    Certo_RespostaD.checked = false
    Pergunta.value = ""
}

//Esta função é chamada toda vez a cada 100 milesegundos
function LoadUI() {
    //Ela somente atualiza a contagem de paginas
    NumeroDeQuestoes.innerHTML = `<p>${QuizData.length}</p>`
}

//Esta função é chamada quando o usuario clica nas setas < e > para avanças ou voltar uma pagina
function Befote_After_PAge(Value) {
    //Aqui adicionamos o valor recebido a pagina atual (recebemos 1 ou -1)
    PaginaAtual += Value

    //Checamos se a contagem é menor que 0
    if (PaginaAtual < 0) {
        //se sim setamos como 0
        PaginaAtual = 0
    } else if (PaginaAtual > (QuizData.length - 1)) {
        //Checamos se a contagem é manor que a quantidade de paginas ja salvas
        //e se for setamos como a quantidade total de paginas
        PaginaAtual = (QuizData.length - 1)
    }
    //e chamamos a função de carregamento com a nova pagina atual
    Load(QuizData[PaginaAtual])
}

//Esta função carrega a informação do quiz quando a chamamos na remoção,criação, avanço e retorno
function Load(Data) {
    //Resumindamente ela seta todos os elementos com as informações salvas que recebemos no parametro
    //Data
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

//esta função é chamada quando o usuario clica no martelo para contruir o quiz
function ValidarBuild() {
    //Primeiramente checamos se o tamanho do quiz é maior que 0
    //Ou seja, se Á pagina salva
    if (QuizData.length > 1) {
        //Se sim mostramos a tela de construção
        document.getElementById("Confirm").style.display = 'flex'
    } else {
        //Se não alertamos para o usuario salvar ao menos duas pagina
        alert('Seu quiz presiza ter ao menos 2 pagina')
    }
}

function Voltar() {
    //Esta função é chamada pela tela de construção para o usuario voltar a tela de edição do quiz
    document.getElementById("Confirm").style.display = 'none'
}

//E aqui construimos o quiz
function Build() {
    //Primeiro pegamos o nome e o link para o quiz (link para imagem do quiz se não ouver um a imagem
    //padrão sera carregada )
    var nome = document.getElementById('QuizName')
    var Link = document.getElementById('LinkImagem')

    //Aqui checamos em toda a informação das paginas do quiz se a alguma vasia
    QuizData.forEach((data, i) => {
        if (data === EmptyData || data.Respsotas === EmptyData.Respsotas || data.Pergunta === EmptyData.Pergunta) {
            QuizData.splice(i, 1)
            //Se ouver apagamos a pagina vasia
        }
    })

    //Aqui carrecamos a imagem padrão do quiz / capa

    var img = "../Img/Capa dos quizes.png"
    
    //Checamos se o valor do link não é vasio
    if (Link.value != "") {
        //se tiver algum link o setamos como capa
        img = Link.value
    }

    //checamos se o nome bão esta vasio
    if (nome.value != "") {
        //se não estiver armazenamos toda a informação em um novo objeto
        var finalData = {
            QuizNome: nome.value,
            Foto: img,
            categoria: Categoria.value,
            quizData: QuizData
        }
        //Adicionamos ele juntamente com todos os quizes 
        AllQuizes.push(finalData)
        // e o gardamos
        localStorage.setItem('GlobalQuiz_Quizes', JSON.stringify(AllQuizes))
        //Alertamos que o quiz foi criado
        alert('Quiz salvo com suceço')
        //E por fim redirecionamos o usuario a pagina inicial
        location.href = "principal.html"
    } else {
        //se estiver vasio alertamos ao usuario
        nome.focus()
        alert('De um nome ao seu quiz')
    }
}
