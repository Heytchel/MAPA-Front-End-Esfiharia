$(document).ready(function() {
    // Dados do cardápio - Atualizado com novos sabores
    const destaques = [
        { nome: "Carne", desc: "Carne moída temperada", preco: "R$ 5,50", img: "esfiha-carne.png" },
        { nome: "Frango", desc: "Frango com requeijão", preco: "R$ 5,00", img: "esfiha-frango.png" },
        { nome: "Romeu e Julieta", desc: "Goiabada com queijo", preco: "R$ 5,50", img: "esfiha-romeu-julieta.png" },
        { nome: "Calabresa", desc: "Calabresa com cebola", preco: "R$ 5,50", img: "esfiha-calabresa.png" },
        { nome: "Ricota", desc: "Ricota com ervas finas", preco: "R$ 4,50", img: "esfiha-ricota.png" }
    ];

    const salgadas = [
        { nome: "Carne", desc: "Carne moída temperada", preco: "R$ 5,50", img: "esfiha-carne.png" },
        { nome: "Frango", desc: "Frango com requeijão", preco: "R$ 5,00", img: "esfiha-frango.png" },
        { nome: "Ricota", desc: "Ricota com ervas", preco: "R$ 4,50", img: "esfiha-ricota.png" },
        { nome: "Calabresa", desc: "Calabresa com cebola", preco: "R$ 5,50", img: "esfiha-calabresa.png" }
    ];

    const doces = [
        { nome: "Romeu e Julieta", desc: "Goiabada com queijo", preco: "R$ 5,50", img: "esfiha-romeu-julieta.png" },
        { nome: "Chocolate", desc: "Chocolate ao leite", preco: "R$ 5,50", img: "esfiha-chocolate.png" },
        { nome: "Chocolate Branco", desc: "Chocolate branco cremoso", preco: "R$ 5,50", img: "esfiha-chocolate-branco.png" }
    ];

    // Gerar itens dinamicamente
    function gerarItens(lista, container) {
        let html = '';
        lista.forEach(item => {
            html += `
                <div class="${container.includes('destaque') ? 'destaque-item' : 'cardapio-item'}">
                    <img src="images/${item.img}" alt="Esfiha de ${item.nome}">
                    <h3>${item.nome}</h3>
                    <p>${item.desc}</p>
                    <span class="preco">${item.preco}</span>
                </div>
            `;
        });
        $(container).html(html);
    }

    // Inicializar carrossel
    function initCarrossel() {
        const carrossel = $('.carrossel');
        const itemWidth = $('.destaque-item').outerWidth(true);
        let currentPosition = 0;
        const visibleItems = 3; // Quantos itens quer mostrar por vez
        const totalItems = $('.destaque-item').length;

        // Botão Próximo
        $('.proximo').click(function() {
            if (currentPosition > -(totalItems - visibleItems) * itemWidth) {
                currentPosition -= itemWidth;
                carrossel.css('transform', `translateX(${currentPosition}px)`);
            }
        });

        // Botão Anterior
        $('.anterior').click(function() {
            if (currentPosition < 0) {
                currentPosition += itemWidth;
                carrossel.css('transform', `translateX(${currentPosition}px)`);
            }
        });

        // Toque para mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carrossel.on('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        carrossel.on('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX) {
                $('.proximo').click(); // Swipe para esquerda
            }
            if (touchEndX > touchStartX) {
                $('.anterior').click(); // Swipe para direita
            }
        }
    }

    // Páginas específicas
    if ($('.destaque-container').length) {
        gerarItens(destaques, '.carrossel'); // Altere para carrossel
        initCarrossel();
    }

    if ($('#salgadas').length) {
        gerarItens(salgadas, '#salgadas');
        gerarItens(doces, '#doces');
    }

    // Validação de formulário
    $('#form-candidatura').submit(function(e) {
        e.preventDefault();
        let isValid = true;

        $('[required]', this).each(function() {
            if (!$(this).val()) {
                $(this).addClass('error');
                isValid = false;
            } else {
                $(this).removeClass('error');
            }
        });

        if (isValid) {
            alert('Obrigado por se candidatar! Entraremos em contato em breve.');
            this.reset();
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });

    // Efeitos hover nos cards
    $(document).on('mouseenter', '.destaque-item, .cardapio-item', function() {
        $(this).css('transform', 'translateY(-10px)');
    }).on('mouseleave', '.destaque-item, .cardapio-item', function() {
        $(this).css('transform', 'translateY(0)');
    });
});
