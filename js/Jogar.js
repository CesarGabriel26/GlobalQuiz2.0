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



//Variavel onde sera armazenada a informação do quiz que esta sendo jogado
var QuizData = []
// Aqui armazenamos as respsotas da pagina atual
var Respostas = []
// esta variavel é usada para determinar qual pagina sera carregada na tela
var PaginaAtual = 0

//Esta variavel recebe todos os usuario cadastrados
var Users = JSON.parse(localStorage.getItem('GlobalQuizUsers')) || []
//Ja esta recebe o usuario atual logado
var usuarioatual = JSON.parse(localStorage.getItem("GlobalQuizUsuarioAtual"))

//     0 Acertos V  V Erros 1 //
var Pontuacao = [0, 0]

// Variavel que impede o usuario de usar mais de uma ajuda na mesma pergunta
var JaAjudou = false
// jarespondeu Não permite que o usuario clique varias vezes na mesma pergunta 
var jarespondeu = false
// Oneshot Não permite o som de tocar mais de uma vez
var oneshot = true

//Armazenando o Objeto que esta dentro do local storage na variavel All AllQuizes
//Se ele for vasio a variavel ira receber o Objeto salvo no Banco de Perguntas
var AllQuizes = JSON.parse(localStorage.getItem('GlobalQuiz_Quizes')) || BancoPErguntas()

//Chamando a função para carregar o quiz


LoadQuizData()
var tempo = 30
document.getElementById('Timer').innerHTML = tempo

function LoadQuizData() {
    //Fazendo um loop por todos os quizes registrados
    AllQuizes.forEach(data => {
        // Se o nome do quiz atual no loop for igual ao nome do quiz que a pessoa clicou (que esta armaze)
        //nado no local storage 'QuizAtual' ele armazena as informaçoes do quiz em QuizData e chama a função
        //de carregamento
        if (data.QuizNome == localStorage.getItem('QuizAtual')) {
            QuizData = data.quizData
            //Chamando a função de carregamento passando como parametro A informação do quiz atual
            //Iniciando na pagina 0 "PaginaAtual = 0"
            Load(QuizData[PaginaAtual])
        }
    })

    setInterval(() => {
        tempo--
        if (tempo < 0) {
            Pontuacao[1] += 1
            TocarAuduio('Errado')
            return
        }else if (tempo < 10) {
            tempo = `0${tempo}`
        }

        document.getElementById('Timer').innerHTML = tempo
        
    }, 1000);
}

function Load(Data) {
    tempo = 30
    //Primeiro verificamos se a pagina atual é igual a nossa quantidade de paginas em QuizData
    if (PaginaAtual == QuizData.length) {
        // Se for finalizamos o jogo chamando a função FimDeJogo
        FimDeJogo()
    } else {
        // Se não carregamos todas as informações na tela

        //Aqui carregamos cada Testo da esposta na posição 0
        RespostaA.innerHTML = Data.Respsotas[0][0]
        RespostaB.innerHTML = Data.Respsotas[1][0]
        RespostaC.innerHTML = Data.Respsotas[2][0]
        RespostaD.innerHTML = Data.Respsotas[3][0]

        // Aqui Resetamos so botões desabilitados
        //No caso esta parte é usada quando o usuario usa uma das ajudas então é necessario o reset
        RespostaA.parentElement.disabled = false
        RespostaB.parentElement.disabled = false
        RespostaC.parentElement.disabled = false
        RespostaD.parentElement.disabled = false

        //document.getElementById('Elimina1').disabled = false
        //document.getElementById('Elimina2').disabled = false
        // Aqui resetamos a variavel de ajuda para caso o usuario tenha usado uma
        JaAjudou = false

        // Aqui carregamos as respostas na variavel de respostas
        // A jeitos mais faceis porem fiz da maneira que mais entendia
        Respostas[0] = Data.Respsotas[0][1]
        Respostas[1] = Data.Respsotas[1][1]
        Respostas[2] = Data.Respsotas[2][1]
        Respostas[3] = Data.Respsotas[3][1]

        //Aqui carregamos a pergunta 
        Pergunta.innerHTML = Data.Pergunta

        //Aqui verificamos se á imagem nas informações da pagina
        if (Data.Img != "") {
            //Se sim carregamos a imagem e a mostramos
            Imagem.style.opacity = "1"
            Imagem.src = Data.Img
        } else {
            //Se não escondemos a imagem
            Imagem.style.opacity = "0"
        }

        // E por fim resetamos a variavel OneShot 
        oneshot = true
    }
}

function Responder(ID) {
    //Quando a função é chamda verificamos se o o usuario ja respondeu
    if (!jarespondeu) {
        // se não (!jarespondeu é o mesmo que jarespondeu == false]) verificamos a resposta
        if (Respostas[ID]) {
            //Se esta respsota for a verdadeira adicionamos 1 a contagem de acertos
            Pontuacao[0] += 1
            //E tocamos o som de acerto
            TocarAuduio('Acerto')
        } else {
            //Se não adicionamos 1 a contagem de erros
            Pontuacao[1] += 1
            //E tocamos o som de erro
            TocarAuduio('Errado')
        }
        // e por fim setamos jarespondeu como true para impedir o usuario de clicar mais de uma vez
        jarespondeu = true
    }
}

function TocarAuduio(Audio = "", Estado = "") {
    //Nesta função recebemos o audio e o estado do jogo
    //então começamos checando se Podemos tocar if (oneshot == true)
    if (oneshot) {
        //se sim setamos oneshot como false
        oneshot = false
        // Criamos um elemento de audio
        var a = document.createElement('audio')
        //Setamos o audio no elemento com o nome do audio recebido
        a.src = `../audio/${Audio}.mp3`
        // E o tocamos
        a.play()
        //Verificamos se o audiuo acabou de tocar
        a.addEventListener('ended', () => {
            //Se sim verificamos o estado do jogo
            if (Estado == "") {
                // se for igual a vasio passamos apra poxima pagina
                PaginaAtual++
                //E chamamos a função de carregamento com as informações da proxima pagina
                Load(QuizData[PaginaAtual])
                //E resetamos a ja respondeu
                jarespondeu = false
            }
        })
    }
}


function FimDeJogo() {
    //Quando esta função é chamada encerramos o jogo
    //Resetamos oneshot
    oneshot = true
    //Pegamos o elemento da tela de fim de jogo e o mostramos trocando seu display de none para flex
    document.getElementById('TelaFInal').style.display = "flex"

    //Checamos qual a maior pontuação
    if (Pontuacao[0] > Pontuacao[1]) {
        //Se ouver mais acertos deixamos a bandeira verde(de acertos) amior e no topo
        //e a de erros(vermelha) em baixo e menor
        document.getElementById('BandeiraPrincipal').innerHTML = `<p>${Pontuacao[0]} Acertos</p>`
        document.getElementById('BandeiraSegundaria').innerHTML = `<p>${Pontuacao[1]} Erros</p>`
        //E tocamos o som de vitoria com o estado 'Fim de jogo' para não adicionar +1 na pagina
        TocarAuduio("Vitoria", 'Fim De Jogo')
    } else {
        //se ouver mais erros
        //Trocamos o trofeu inteiro para o quebrado
        document.getElementById('Trofeu').src = "../Img/Trofeu derrota.png"

        //setamos a bandeira maior como a de erros
        document.getElementById('BandeiraPrincipal').innerHTML = `<p>${Pontuacao[1]} Erros</p>`
        document.getElementById('BandeiraPrincipal').style.backgroundImage = 'url("../Img/bandeira muito erro.png")'
        // e a menor como a de acertos ja que ouveram menos acertos
        document.getElementById('BandeiraSegundaria').innerHTML = `<p>${Pontuacao[0]} Acertos</p>`
        document.getElementById('BandeiraSegundaria').style.backgroundImage = 'url("../Img/bandeira muito acerto.png")'
        
        //E tocamos o som de derrota com o estado 'Fim de jogo' para não adicionar +1 na pagina
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

//Aqui pegamos o elemento do painel de ajuda
let painelAjuda = document.getElementById('painelAjuda')
//Escondemos ele setando seu diplay para none
painelAjuda.style.display = 'none'

//Esta função é chamada quando clicamos no botão da interrogação
function MostrarAjuda() {
    //checamos se o painel esta escondido
    if (painelAjuda.style.display == 'none') {
        //Se sim o mostramos
        painelAjuda.style.display = 'block'
    } else {
        //Se não o escondemos novamente
        painelAjuda.style.display = 'none'
    }
}

//Esta variavel armazena quantas de cada tipo de ajuda o usuario possui
// no cado 6 que removem uma respsota errada e 5 que removem duas
var Ajudar = {
    RemoverUma: 6,
    RemoverDuas: 5
}

//Esta variavel armazena qual das perguntas ja foi eliminada 
var jafoi = []

//Aqui pegamos os textos que mostram a quantidade de cada ajuda
document.getElementById('QUantidade1').innerHTML = Ajudar.RemoverUma
document.getElementById('QUantidade2').innerHTML =  Ajudar.RemoverDuas

//Esta função é chamada quando clicamos em uma das ajudas
function EliminaRespErrada(Quantidade) {
    //Resetamos a variavel de ajuda
    jafoi = []

    //E checamos se o usuario ja foi ajudado
    if (JaAjudou == false) {
        //se não setamos a variavel de ja ajudou como true
        JaAjudou = true
        //Checamos quantas respsotas teremos que eliminar
        if (Quantidade == 1) {
            //Se for sómente uma nos retiramos a quantidade deste tipo de ajuda
            Ajudar.RemoverUma--
        }else {
            //se for duas faremos o mesmo só que com a variavel de duas
            Ajudar.RemoverDuas--
        }
    
        //Aqui chamamos a vfunção que checa se temos ajudas para dar
        if (Checar()) {
            //se sim fazemos um loop pela quantidade que sera removida
            for (let num = 0; num < Quantidade; num++) {
                //e chamamos a função de eliminar
                Elimina()
            }
    
        }
        //Por fim Escondemos o painel de ajuda
        MostrarAjuda()
    }
}

function Elimina() {
    //Quando esta função é chamada geramos um numero aleatorio de 0 a 3 (A: 0, B:1, C:2, D:3)
    var i = parseInt(Math.random() * 4)
    //E checamos se este numero ja foi escolido e se ele não é a respsota correta
    if (jafoi.indexOf(i) == -1 && QuizData[PaginaAtual].Respsotas[i][1] == false) {
        //Se estiver tudo certo checamos qual das respsotas teremos que desabilitar e
        //a desabilitamos com .disabled = true;
        if (i == 0) {
            RespostaA.parentElement.disabled = true;
        } else if (i == 1){
            RespostaB.parentElement.disabled = true;
        } else if (i == 2){
            RespostaC.parentElement.disabled = true;
        } else {
            RespostaD.parentElement.disabled = true;
        }

        //e adicionamos esta valor a variavel Jafoi para que ele bão se repita
        jafoi.push(i)
    } else {
        //Se não estiver tudo correto chamamos esta função novamente para gerar um novo numero
        Elimina()
    }
}

function Checar() {
    //Quando esta função é chamada 

    //Checamos se a respsotas do tipo 1
    if (Ajudar.RemoverUma <= 0) {
        //Se não ouver desabilitamos esta opção
        document.getElementById('Elimina1').disabled = true
    }

    //Checamos se a respsotas do tipo 2
    if (Ajudar.RemoverDuas <= 0) {
        //Se não ouver desabilitamos esta opção
        document.getElementById('Elimina2').disabled = true
    }

    //Checamos se os dois tipos ja foram totalmente usados
    if (Ajudar.RemoverDuas <= 0 && Ajudar.RemoverUma <= 0) {
        //Se sim retornamos falso interormpendo a função de ajuda
        return false
    }

    //Se tudo estiver correto Setamos os testos de quantidade para cada
    //Quantidade, QUantidade1,QUantidade2 e RemoverUma, RemoverDuas respectivamente
    document.getElementById('QUantidade1').innerHTML = Ajudar.RemoverUma
    document.getElementById('QUantidade2').innerHTML =  Ajudar.RemoverDuas

    //E retornamos verdadeiro
    return true
}