var listaLogin = []

listaLogin = JSON.parse(localStorage.getItem('GlobalQuizUsers'))
if (listaLogin == null) {
    listaLogin = []
}


function validarCadastro(nome, email, senh, FotoLink) {
    if (nome != '' && email != '' && senha != '' && FotoLink != "") {
        return true
    } else {
        return false
    }
}

function Cadastro() {
    var nomeCadastro = document.getElementById("nome").value
    var emailCadastro = document.getElementById("email").value
    var senhaCadastro = document.getElementById("senha").value
    var FotoLink = document.getElementById('FotoLink').value

    var possoCadastrar = validarCadastro(nomeCadastro, emailCadastro, senhaCadastro, FotoLink)
    if (possoCadastrar == false) {
        alert('Verifique os dados antes de cadastrar')
        return
    }

    var Cadastro = {
        nome: nomeCadastro,
        email: emailCadastro,
        senha: senhaCadastro,
        foto: FotoLink,
        Pontuacao: 0
    }
    listaLogin.push(Cadastro)

    localStorage.setItem('GlobalQuizUsers', JSON.stringify(listaLogin))

    document.getElementById("nome").value = ''
    document.getElementById("email").value = ''
    document.getElementById("senha").value = ''
    document.getElementById("nome").focus()
    alert('Cadastro Concluido')
    location.href = "login.html"
}

function entrar() {
    var email = document.getElementById("email").value
    var senha = document.getElementById("senha").value

    if (validarCadastro("nome", email, senha)) {
        var encontrado = false
        listaLogin.forEach(item => {
            if (senha == item.senha && email == item.email) {
                alert(`Bem vindo ao sistema, ${item.nome}`)
                localStorage.setItem('GlobalQuizUsuarioAtual', JSON.stringify({
                    Nome: item.nome,
                    Email: item.email
                }))
                encontrado = true

            }

        })
        if (encontrado == false) {
            alert('Usuario não encontrado')
        } else {
            GotoPage('principal')
        }
    }


}
