/**
 * TRIBUTO A CHICO GARAPA
 * Interatividade, Álbum com Dialog nativo (Light-Dismiss) e Persistência de Mensagens
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. ÁLBUM DE FOTOS & MODAL COM LIGHT-DISMISS
  // =========================================================================
  const photoDialog = document.getElementById('photoDialog');
  const dialogImg = document.getElementById('dialogImage');
  const dialogTitle = document.getElementById('dialogTitle');
  const dialogDesc = document.getElementById('dialogDesc');
  const btnCloseDialog = document.getElementById('btnCloseDialog');
  const galleryItems = document.querySelectorAll('.gallery-item');

  const photosData = [
    {
      src: './Imagens/IMG-20250919-WA0038.webp',
      title: 'A Troca dos Chapéus',
      desc: 'Neto usando o chapéu de Seu Chico, e o Vovô coroado de capelo universitário. Momento histórico de honra e cumplicidade!'
    },
    {
      src: './Imagens/IMG-20250919-WA0026.webp',
      title: 'Vitória Partilhada',
      desc: 'O sorriso de quem viu o neto vencer os desafios da universidade com a bênção e o suor de quem preparou a terra.'
    },
    {
      src: './Imagens/IMG-20250919-WA0031.webp',
      title: 'A Base de Tudo: Nossa Família',
      desc: 'Todos reunidos comemorando ao redor de Seu Chico, o tronco forte que sustenta as raízes desta história.'
    },
    {
      src: './Imagens/IMG_20250918_183828.webp',
      title: 'Amor de Vô e Vó',
      desc: 'A selfie mais preciosa do mundo: um abraço triplo cheio de bênçãos, carinho e gratidão sem fim.'
    }
  ];

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.getAttribute('data-index'), 10);
      const photo = photosData[index];

      if (photo && photoDialog) {
        dialogImg.src = photo.src;
        dialogImg.alt = photo.title;
        dialogTitle.textContent = photo.title;
        dialogDesc.textContent = photo.desc;

        if (typeof photoDialog.showModal === 'function') {
          photoDialog.showModal();
        }
      }
    });
  });

  if (btnCloseDialog && photoDialog) {
    btnCloseDialog.addEventListener('click', () => {
      photoDialog.close();
    });
  }

  // Fallback para navegadores sem suporte ao atributo declarative 'closedby="any"'
  if (photoDialog && !('closedBy' in HTMLDialogElement.prototype)) {
    photoDialog.addEventListener('click', (event) => {
      if (event.target !== photoDialog) return;
      const rect = photoDialog.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInside) {
        photoDialog.close();
      }
    });
  }

  // =========================================================================
  // 2. CONSELHOS DE CHICO GARAPA (O ALPENDRE)
  // =========================================================================
  const wisdomList = [
    {
      text: "A terra não mente, meu filho. Aquilo que você planta com carinho e rega todo dia, ela te devolve com fartura e paz de espírito.",
      theme: "— Sobre a Paciência e o Trabalho"
    },
    {
      text: "Não tenha pressa com a chuva: cada semente sabe a sua hora certa de brotar. O importante é o terreno estar arado e o coração em paz.",
      theme: "— Sobre a Fé e o Tempo"
    },
    {
      text: "Gente de bem a gente recebe com café fresco, cadeira na calçada e riso franco. Uma boa conversa vale mais do que qualquer ouro guardado.",
      theme: "— Sobre a Amizade e o Alpendre"
    },
    {
      text: "O respeito aos animais e ao chão que você pisa mostra quem você é por dentro. Quem cuida dos bichos da roça tem a alma limpa.",
      theme: "— Sobre o Trato com a Natureza"
    },
    {
      text: "A maior riqueza que um homem pode ter na vida é sentar na mesa no domingo e ver os filhos e netos com saúde e honradez.",
      theme: "— Sobre a Família"
    },
    {
      text: "Quando a lida estiver pesada, descanse na sombra de um juazeiro, respire fundo e lembre que Deus nunca esquece de quem peleja com dignidade.",
      theme: "— Sobre a Coragem Sertaneja"
    }
  ];

  let currentWisdomIdx = 0;
  const wisdomText = document.getElementById('wisdomText');
  const wisdomTheme = document.getElementById('wisdomTheme');
  const btnNewWisdom = document.getElementById('btnNewWisdom');
  const wisdomDisplay = document.getElementById('wisdomDisplay');

  if (btnNewWisdom && wisdomText && wisdomTheme) {
    btnNewWisdom.addEventListener('click', () => {
      wisdomDisplay.style.opacity = '0';

      setTimeout(() => {
        let nextIdx;
        do {
          nextIdx = Math.floor(Math.random() * wisdomList.length);
        } while (nextIdx === currentWisdomIdx && wisdomList.length > 1);

        currentWisdomIdx = nextIdx;
        const selected = wisdomList[currentWisdomIdx];
        wisdomText.textContent = selected.text;
        wisdomTheme.textContent = selected.theme;
        wisdomDisplay.style.opacity = '1';
      }, 200);
    });
  }

  // =========================================================================
  // 3. O CAFEZINHO DO ALPENDRE (CONTADOR INTERATIVO)
  // =========================================================================
  const coffeeCountEl = document.getElementById('coffeeCount');
  const btnServeCoffee = document.getElementById('btnServeCoffee');
  const coffeeFeedback = document.getElementById('coffeeFeedback');
  const steamCup = document.getElementById('steamCup');

  const STORAGE_COFFEE_KEY = 'chico_garapa_coffee_count';
  let coffeeCount = parseInt(localStorage.getItem(STORAGE_COFFEE_KEY), 10);
  if (isNaN(coffeeCount) || coffeeCount < 142) {
    coffeeCount = 142;
  }
  if (coffeeCountEl) {
    coffeeCountEl.textContent = coffeeCount;
  }

  if (btnServeCoffee) {
    btnServeCoffee.addEventListener('click', () => {
      coffeeCount++;
      localStorage.setItem(STORAGE_COFFEE_KEY, coffeeCount);
      if (coffeeCountEl) coffeeCountEl.textContent = coffeeCount;

      // Efeito visual na xícara
      if (steamCup) {
        steamCup.style.transform = 'scale(1.15)';
        setTimeout(() => steamCup.style.transform = 'scale(1)', 300);
      }

      if (coffeeFeedback) {
        coffeeFeedback.textContent = '☕ Cafézinho passado na hora com carinho para o Vovô Chico!';
        setTimeout(() => {
          coffeeFeedback.textContent = '';
        }, 4000);
      }
    });
  }

  // =========================================================================
  // 4. MURAL DE BÊNÇÃOS & MENSAGENS (COM LOCALSTORAGE)
  // =========================================================================
  const formMensagem = document.getElementById('formMensagem');
  const inputNome = document.getElementById('inputNome');
  const inputTexto = document.getElementById('inputTexto');
  const muralCards = document.getElementById('muralCards');

  const STORAGE_MURAL_KEY = 'chico_garapa_mural_msgs';

  const defaultMessages = [
    {
      author: 'Douglas Patrick (Neto)',
      text: 'Vô Chico, meu amor e admiração pelo senhor são maiores que o infinito. Esse diploma é uma homenagem a cada gota de suor sua na terra!',
      date: '19/09/2025'
    },
    {
      author: 'Família & Netos',
      text: 'O senhor é o nosso alicerce! Que Deus conserve essa alegria de sentar na calçada e nos acolher sempre de braços abertos.',
      date: 'Setembro/2025'
    },
    {
      author: 'Amigos da Calçada',
      text: 'Chico Garapa é sinônimo de honra, café quente e a melhor prosa do sertão potiguar. Um abraço grande ao nosso amigo!',
      date: 'Recentemente'
    }
  ];

  function loadMessages() {
    let saved = localStorage.getItem(STORAGE_MURAL_KEY);
    if (!saved) {
      return defaultMessages;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return defaultMessages;
    }
  }

  function renderMessages() {
    if (!muralCards) return;
    const msgs = loadMessages();
    muralCards.innerHTML = '';

    msgs.forEach(msg => {
      const card = document.createElement('div');
      card.className = 'mural-note';
      card.innerHTML = `
        <div class="note-pin" aria-hidden="true"></div>
        <p class="note-text">“${escapeHtml(msg.text)}”</p>
        <div class="note-footer">
          <span class="note-author">${escapeHtml(msg.author)}</span>
          <span class="note-date">${escapeHtml(msg.date)}</span>
        </div>
      `;
      muralCards.appendChild(card);
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  if (formMensagem) {
    formMensagem.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = inputNome.value.trim();
      const texto = inputTexto.value.trim();

      if (!nome || !texto) return;

      const msgs = loadMessages();
      const today = new Date();
      const dateStr = today.toLocaleDateString('pt-BR');

      const novaMsg = {
        author: nome,
        text: texto,
        date: dateStr
      };

      msgs.unshift(novaMsg);
      localStorage.setItem(STORAGE_MURAL_KEY, JSON.stringify(msgs));

      renderMessages();

      inputNome.value = '';
      inputTexto.value = '';

      // Scroll sutil para a nova mensagem
      const firstNote = muralCards.firstElementChild;
      if (firstNote) {
        firstNote.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  renderMessages();
});
