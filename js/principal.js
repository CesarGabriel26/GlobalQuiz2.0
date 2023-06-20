let Pesquisa = document.getElementById('Pesquisar')

setInterval(Pesquisar, 200);

const card = (QUiz) => `
    <a onclick="GotoPlay('${QUiz.QuizNome}')" title="Jogar:${QUiz.QuizNome}" class="QuizCard">
        <img src="${QUiz.Foto}" alt="">
        <h3>${QUiz.QuizNome}</h3>
    </a>
`
LoadContainer()

function LoadContainer() {
    var QuizData = JSON.parse(localStorage.getItem('GlobalQuiz_Quizes')) || BancoPErguntas()

    QuizData.forEach(QUiz => {
        var Quizes = document.getElementById(QUiz.categoria)
        Quizes.innerHTML += card(QUiz)
    });
}

function Pesquisar() {
    var Cards = document.querySelectorAll('.QuizCard')

    var filtro = Pesquisa.value.toLowerCase()

    Cards.forEach(Card => {
        var titulo = Card.getElementsByTagName('h3')[0].innerHTML.toLowerCase()
        if (titulo.indexOf(filtro) > -1) {
            Card.style.display = "flex"

        } else {
            Card.style.display = "none"
        }
    })
}

function GotoPlay(Quiz) {
    localStorage.setItem('QuizAtual', Quiz)
    location.href = 'jogar.html'
}