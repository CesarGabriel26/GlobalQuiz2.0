var hmtl = `
<!DOCTYPE html5>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Global Quiz</title>
    <link rel="stylesheet" href="../css/root.css">
    <link rel="shortcut icon" href="../Img/Globo.png" type="image/x-icon">
</head>
<style>
    body {
        background: var(--Preto);
    }
</style>
<body>


    <object style="height: 100%; width:100%;" data="../Img/GlobalQuizAnimada.svg" type=""></object>
 
</body>

</html>
`

function GotoPage(page = "") {

    window.document.write(hmtl)

    setTimeout (change,4000,page)
}

function change(page) {
    location.href = `${page}.html`
}