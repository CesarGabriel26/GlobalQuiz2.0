var dados = [
  {
    "QuizNome": "Perguntas de conhecimentos gerais",
    "Foto": "../img/Capa dos quizes.png",
    "categoria": "CONHECIMENTOS_GERAIS",
    "quizData": [
      {
        "Pergunta": "1. Quem foi a única pessoa na história a receber o Prêmio Nobel em áreas científicas diferentes?",
        "Img": "data:image/jpeg;base64,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",
        "Respsotas": [
          [
            "Albert Einstein",
            false
          ],
          [
            "Linus Pauling",
            false
          ],
          [
            "Mahatma Gandhi",
            false
          ],
          [
            "Marie Curie",
            true
          ]
        ]
      },
      {
        "Pergunta": "2. Qual a obra de arte mais cara já arrematada em um leilão?",
        "Img": "",
        "Respsotas": [
          [
            "O Grito, de Edvard Munch",
            false
          ],
          [
            "Intercâmbio, de Willem de Kooning",
            false
          ],
          [
            "Salvator Mundi, de Leonardo da Vinci",
            true
          ],
          [
            "O Sonho, de Pablo Picasso",
            false
          ]
        ]
      },
      {
        "Pergunta": "3. Pela primeira vez na história, as Olimpíadas de Tóquio 2020 foram adiadas, devido à Covid-19. Quais as edições que foram canceladas?",
        "Img": "",
        "Respsotas": [
          [
            "Berlim 1916, Tóquio 1940 e Londres 1944.",
            true
          ],
          [
            "Antuérpia 1920, Berlim 1936 e Londres 1948.",
            false
          ],
          [
            "Berlim 1916, Paris 1940 e Londres 1944.",
            false
          ],
          [
            "Estocolmo 1912, Antuérpia 1920 e Berlim 1936.",
            false
          ]
        ]
      },
      {
        "Pergunta": "4. De que lugar é essa bandeira?",
        "Img": "data:image/webp;base64,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",
        "Respsotas": [
          [
            "Sergipe",
            false
          ],
          [
            " Goiás",
            false
          ],
          [
            "Piauí",
            false
          ],
          [
            "Ilhas Salomão",
            true
          ]
        ]
      },
      {
        "Pergunta": "5. Qual o país mais novo do mundo?",
        "Img": "",
        "Respsotas": [
          [
            "Timor Leste",
            false
          ],
          [
            "Montenegro",
            false
          ],
          [
            "Kosovo",
            false
          ],
          [
            "Sudão do Sul",
            true
          ]
        ]
      },
      {
        "Pergunta": "6. Quem são a atriz e o ator com mais indicações ao Oscar?",
        "Img": "",
        "Respsotas": [
          [
            "Katherine Hepburn e Jack Nicholson",
            false
          ],
          [
            "Mery Streep e Spencer Tracy",
            false
          ],
          [
            "Mery Streep e Jack Nicholson.",
            true
          ],
          [
            "Katherine Hepburn e Marlon Brando",
            false
          ]
        ]
      },
      {
        "Pergunta": "7. Qual a maior operação militar da história, que contou com o deslocamento de 3,8 milhões de soldados?",
        "Img": "",
        "Respsotas": [
          [
            "Operação Barbarossa (Países do Eixo na Segunda Guerra Mundial)",
            true
          ],
          [
            "Operação Tempestade no Deserto (Exército dos Estados Unidos na Guerra do Golfo)",
            false
          ],
          [
            "Operação Overlord (Aliados na Segunda Guerra Mundial)",
            false
          ],
          [
            "Operação Downfall (Aliados na Segunda Guerra Mundial)",
            false
          ]
        ]
      },
      {
        "Pergunta": "8. Quem foi a primeira mulher a viajar para o espaço?",
        "Img": "",
        "Respsotas": [
          [
            "Sally Ride",
            false
          ],
          [
            "Valentina Tereshkova.",
            true
          ],
          [
            "Kathryn D. Sullivan",
            false
          ],
          [
            "Svetlana Savitskaya",
            false
          ]
        ]
      },
      {
        "Pergunta": "9. Quem foi a primeira mulher a se eleger presidente de um país?",
        "Img": "",
        "Respsotas": [
          [
            "Dilma Roussef",
            false
          ],
          [
            "Cristina Kirchner",
            false
          ],
          [
            "Vigdís Finnbogadóttir.",
            true
          ],
          [
            "Margareth Thatcher",
            false
          ]
        ]
      },
      {
        "Pergunta": "10. Quem foi a mulher negra que se recusou a ceder o lugar num ônibus para um homem branco e marcou a luta pelos direitos civis dos negros dos Estados Unidos em 1955?",
        "Img": "",
        "Respsotas": [
          [
            "Rosa Parks.",
            true
          ],
          [
            "Angela Davis",
            false
          ],
          [
            "Elaine Brown",
            false
          ],
          [
            "Kimberlé Crenshaw",
            false
          ]
        ]
      }
    ]
  },
  {
    "QuizNome": "teoria da evolução",
    "Foto": "../img/Capa dos quizes.png",
    "categoria": "BIOLOGIA",
    "quizData": [
      {
        "Pergunta": "Quando falamos em evolução, referimo-nos às mudanças que os organismos sofrem através do tempo. Diversos pesquisadores tiveram ideias evolucionistas; outros, no entanto, acreditavam que organismos eram imutáveis. Todos os nomes abaixo se referem a evolucionistas, exceto",
        "Img": "",
        "Respsotas": [
          [
            "Lamarck",
            false
          ],
          [
            "Darwin",
            false
          ],
          [
            "Wallace",
            false
          ],
          [
            "Aristóteles",
            true
          ]
        ]
      },
      {
        "Pergunta": "A seleção natural configura-se como o principal conceito dentro da teoria da evolução proposta por Darwin. Observe as alternativas abaixo e marque aquela que indica corretamente a ideia de seleção natural.",
        "Img": "",
        "Respsotas": [
          [
            "Os organismos mais fortes sobrevivem e transmitem essa característica para os seus descendentes.",
            false
          ],
          [
            "Os organismos mais fortes conseguem reproduzir-se e impedir a reprodução dos mais fracos.",
            false
          ],
          [
            "Os organismos mais aptos são selecionados pelo meio e todos os organismos mais fracos são extintos.",
            false
          ],
          [
            "Os organismos mais aptos a sobreviver no ambiente apresentam maior chance de reprodução e transmissão da característica vantajosa para os seus descendentes.",
            true
          ]
        ]
      },
      {
        "Pergunta": "De acordo com a teoria proposta por Darwin, humanos e outros organismos vivos, como a baleia, apresentam certo grau de parentesco. Isso ocorre porque todos os organismos:",
        "Img": "",
        "Respsotas": [
          [
            "passaram por processos de seleção natural.",
            false
          ],
          [
            "possuem um ancestral comum.",
            true
          ],
          [
            "possuem a capacidade de hereditariedade.",
            false
          ],
          [
            "passaram por processo de convergência adaptativa.",
            false
          ]
        ]
      },
      {
        "Pergunta": "A teoria da origem das espécies de Charles Darwin analisou:",
        "Img": "",
        "Respsotas": [
          [
            "a seleção natural",
            true
          ],
          [
            "as mutações",
            false
          ],
          [
            "o uso e desuso dos órgãos",
            false
          ],
          [
            "a hereditariedade dos caracteres adquiridos",
            false
          ]
        ]
      }
    ]
  }
]

function BancoPErguntas (){
    localStorage.setItem('GlobalQuiz_Quizes',JSON.stringify(dados))
    return dados
}