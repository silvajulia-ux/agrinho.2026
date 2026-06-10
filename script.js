// ============================================
// SCRIPT - FUTURO SUSTENTABILIDADE
// Funcionalidades: Acessibilidade + Quiz Interativo
// ============================================

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. BOTÃO DE ACESSIBILIDADE ==========
    const botaoAcessibilidade = document.getElementById('botaoAcessibilidade');
    const painelAcessibilidade = document.getElementById('painelAcessibilidade');
    const btnAcessibilidade = document.querySelector('.btn-acessibilidade');
    
    // Abrir/fechar painel de acessibilidade
    if (btnAcessibilidade) {
        btnAcessibilidade.addEventListener('click', function() {
            painelAcessibilidade.classList.toggle('visivel');
        });
    }
    
    // Fechar painel se clicar fora
    document.addEventListener('click', function(event) {
        if (botaoAcessibilidade && !botaoAcessibilidade.contains(event.target)) {
            if (painelAcessibilidade) {
                painelAcessibilidade.classList.remove('visivel');
            }
        }
    });
    
    // ========== 2. AUMENTAR E DIMINUIR FONTE ==========
    const aumentarFonte = document.getElementById('aumentarFonte');
    const diminuirFonte = document.getElementById('diminuirFonte');
    let tamanhoAtual = 'media'; // media, grande, pequena
    
    function aplicarTamanhoFonte(tamanho) {
        document.body.classList.remove('fonte-pequena', 'fonte-media', 'fonte-grande');
        document.body.classList.add(tamanho);
    }
    
    if (aumentarFonte) {
        aumentarFonte.addEventListener('click', function() {
            if (tamanhoAtual === 'media') {
                aplicarTamanhoFonte('fonte-grande');
                tamanhoAtual = 'grande';
            } else if (tamanhoAtual === 'pequena') {
                aplicarTamanhoFonte('fonte-media');
                tamanhoAtual = 'media';
            } else if (tamanhoAtual === 'grande') {
                alert('A fonte já está no tamanho máximo!');
            }
        });
    }
    
    if (diminuirFonte) {
        diminuirFonte.addEventListener('click', function() {
            if (tamanhoAtual === 'media') {
                aplicarTamanhoFonte('fonte-pequena');
                tamanhoAtual = 'pequena';
            } else if (tamanhoAtual === 'grande') {
                aplicarTamanhoFonte('fonte-media');
                tamanhoAtual = 'media';
            } else if (tamanhoAtual === 'pequena') {
                alert('A fonte já está no tamanho mínimo!');
            }
        });
    }
    
    // ========== 3. ALTO CONTRASTE ==========
    const altoContraste = document.getElementById('altoContraste');
    let contrasteAtivo = false;
    
    if (altoContraste) {
        altoContraste.addEventListener('click', function() {
            if (!contrasteAtivo) {
                document.body.classList.add('alto-contraste');
                contrasteAtivo = true;
                altoContraste.textContent = '🌓 Modo Normal';
            } else {
                document.body.classList.remove('alto-contraste');
                contrasteAtivo = false;
                altoContraste.textContent = '🌓 Alto Contraste';
            }
        });
    }
    
    // ========== 4. FECHAR PAINEL AO ROLAR ==========
    window.addEventListener('scroll', function() {
        if (painelAcessibilidade) {
            painelAcessibilidade.classList.remove('visivel');
        }
    });
    
    // ========== 5. QUIZ SOBRE SUSTENTABILIDADE (FUNCIONALIDADE PRINCIPAL) ==========
    // Definição das perguntas do quiz (8 perguntas)
    const perguntasQuiz = [
        {
            texto: "1. O que é biodiversidade?",
            opcoes: [
                "A variedade de espécies de seres vivos em um ecossistema",
                "Apenas as plantas de uma região",
                "Somente os animais da floresta",
                "A quantidade de água disponível"
            ],
            correta: 0
        },
        {
            texto: "2. Qual é uma das principais consequências do desmatamento?",
            opcoes: [
                "Aumento da biodiversidade",
                "Melhora da qualidade do solo",
                "Perda de habitats e redução da biodiversidade",
                "Diminuição do efeito estufa"
            ],
            correta: 2
        },
        {
            texto: "3. Qual é uma vantagem da energia solar em propriedades rurais?",
            opcoes: [
                "Aumenta a conta de luz",
                "Polui o ar",
                "É uma energia limpa e renovável que reduz custos",
                "Depende de combustíveis fósseis"
            ],
            correta: 2
        },
        {
            texto: "4. O que são matas ciliares?",
            opcoes: [
                "Florestas no topo das montanhas",
                "Vegetação que cresce às margens de rios e nascentes",
                "Plantações de eucalipto",
                "Áreas desmatadas para pastagem"
            ],
            correta: 1
        },
        {
            texto: "5. Como a biodiversidade ajuda na agricultura?",
            opcoes: [
                "Atrapalha o crescimento das plantas",
                "Garante polinização, controle de pragas e solo fértil",
                "Aumenta a necessidade de agrotóxicos",
                "Diminui a produção de alimentos"
            ],
            correta: 1
        },
        {
            texto: "6. Qual destas é uma solução sustentável para o campo?",
            opcoes: [
                "Desmatar mais áreas para plantar",
                "Usar energia solar para irrigação",
                "Utilizar agrotóxicos em excesso",
                "Ignorar a preservação das nascentes"
            ],
            correta: 1
        },
        {
            texto: "7. A energia solar é considerada uma fonte de energia:",
            opcoes: [
                "Não renovável e poluente",
                "Renovável e limpa",
                "Fóssil e cara",
                "Nuclear e perigosa"
            ],
            correta: 1
        },
        {
            texto: "8. Qual ação ajuda a preservar a biodiversidade no campo?",
            opcoes: [
                "Plantar monocultura em toda a propriedade",
                "Preservar áreas nativas e plantar espécies variadas",
                "Usar fogo para limpar o terreno",
                "Desviar o curso dos rios"
            ],
            correta: 1
        }
    ];
    
    // Função para gerar o quiz na página
    function gerarQuiz() {
        const quizContainer = document.getElementById('quiz-container');
        if (!quizContainer) return;
        
        let html = '';
        
        for (let i = 0; i < perguntasQuiz.length; i++) {
            const pergunta = perguntasQuiz[i];
            html += `
                <div class="pergunta-quiz" data-pergunta="${i}">
                    <div class="pergunta-texto">${pergunta.texto}</div>
                    <div class="opcoes-quiz">
            `;
            
            for (let j = 0; j < pergunta.opcoes.length; j++) {
                html += `
                    <div class="opcao-quiz">
                        <input type="radio" name="pergunta${i}" value="${j}" id="p${i}o${j}">
                        <label for="p${i}o${j}">${pergunta.opcoes[j]}</label>
                    </div>
                `;
            }
            
            html += `
                    </div>
                </div>
            `;
        }
        
        html += `<button class="btn-enviar-quiz" id="btnEnviarQuiz">✅ Ver minhas respostas</button>`;
        quizContainer.innerHTML = html;
        
        // Adicionar evento ao botão de enviar
        const btnEnviar = document.getElementById('btnEnviarQuiz');
        if (btnEnviar) {
            btnEnviar.addEventListener('click', corrigirQuiz);
        }
    }
    
    // Função para corrigir o quiz
    function corrigirQuiz() {
        let acertos = 0;
        const totalPerguntas = perguntasQuiz.length;
        
        for (let i = 0; i < totalPerguntas; i++) {
            const opcoes = document.getElementsByName(`pergunta${i}`);
            let respostaSelecionada = null;
            
            for (let j = 0; j < opcoes.length; j++) {
                if (opcoes[j].checked) {
                    respostaSelecionada = parseInt(opcoes[j].value);
                    break;
                }
            }
            
            if (respostaSelecionada !== null && respostaSelecionada === perguntasQuiz[i].correta) {
                acertos++;
            }
        }
        
        // Exibir resultado
        const resultadoDiv = document.getElementById('resultado-quiz');
        const percentual = (acertos / totalPerguntas) * 100;
        
        let mensagem = '';
        let emoji = '';
        
        if (percentual === 100) {
            emoji = '🏆🌟';
            mensagem = 'Excelente! Você é um especialista em sustentabilidade!';
        } else if (percentual >= 75) {
            emoji = '🌱👍';
            mensagem = 'Muito bom! Você já sabe bastante sobre o tema. Continue aprendendo!';
        } else if (percentual >= 50) {
            emoji = '📚🌿';
            mensagem = 'Bom! Estude mais um pouco e você se tornará um defensor do meio ambiente!';
        } else {
            emoji = '🌍💚';
            mensagem = 'Que tal revisar o conteúdo do site e tentar novamente? A sustentabilidade é importante para todos!';
        }
        
        resultadoDiv.innerHTML = `
            <h3>📊 Seu resultado ${emoji}</h3>
            <p><strong>Você acertou ${acertos} de ${totalPerguntas} perguntas</strong></p>
            <p>${mensagem}</p>
            <p>🌎 Lembre-se: pequenas atitudes fazem a diferença para um futuro sustentável!</p>
        `;
        resultadoDiv.style.display = 'block';
        
        // Rolar até o resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Inicializar o quiz
    gerarQuiz();
});
