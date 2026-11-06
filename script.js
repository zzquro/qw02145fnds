'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const money = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
const number = value => new Intl.NumberFormat('ru-RU').format(value);

const icon = (name, className = 'icon') =>
  `<svg class="${className}" aria-hidden="true"><use href="#${name}"/></svg>`;

const games = [
  {
    id: 'roblox',
    name: 'Roblox',
    currency: 'Robux',
    caption: 'Мир без границ',
    platforms: ['pc', 'mobile'],
    keywords: 'роблокс робуксы robux',
    logo: 'logo-roblox',
    tint: '#2b4738',
    banner: 'img/roblox.jpg',
    packs: [[80, 99], [400, 449], [800, 849], [1700, 1690], [4500, 4290], [10000, 9290]],
    account: 'Никнейм Roblox',
    placeholder: 'Например, FragPlayer',
    hint: 'Нужен никнейм для входа, а не отображаемое имя.',
    note: 'Укажи никнейм Roblox. Никогда не передавай пароль от своего аккаунта.',
    regions: ['Россия', 'Казахстан', 'Другой регион'],
    pattern: /^[A-Za-z0-9_]{3,20}$/,
    error: 'Введи никнейм Roblox: от 3 до 20 латинских букв, цифр или символов _.'
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    currency: 'V-Bucks',
    caption: 'Королевская битва',
    platforms: ['pc', 'mobile'],
    keywords: 'фортнайт фортнит вбаксы v-bucks vbucks',
    logo: 'logo-fortnite',
    tint: '#3a2f6b',
    banner: 'img/fortnite.png',
    packs: [[1000, 899], [2800, 2290], [5000, 3990], [13500, 9990]],
    account: 'Никнейм Epic Games',
    placeholder: 'Например, FragPlayer',
    hint: 'Никнейм аккаунта Epic Games, не отображаемое имя.',
    note: 'V-Bucks зачисляются на аккаунт Epic Games. Проверь никнейм перед заказом.',
    regions: ['Россия', 'Европа', 'Другой регион'],
    pattern: /^[A-Za-z0-9_]{3,32}$/,
    error: 'Введи никнейм Epic Games: от 3 до 32 латинских букв, цифр или символов _.'
  },
  {
    id: 'valorant',
    name: 'VALORANT',
    currency: 'VP',
    caption: 'Valorant Points',
    platforms: ['pc'],
    keywords: 'валорант вальорант валь valorant points',
    logo: 'logo-valorant',
    tint: '#713047',
    banner: 'img/valorant.png',
    portrait: true,
    packs: [[475, 449], [1000, 890], [2050, 1790], [3650, 3090], [5350, 4390], [11000, 8790]],
    account: 'Riot ID',
    placeholder: 'FragPlayer#RU1',
    hint: 'Никнейм и тег через #. Без пароля и кодов доступа.',
    note: 'Для пополнения нужен только Riot ID. Пароль от аккаунта остается у тебя.',
    regions: ['Европа (EU)', 'Турция (TR)', 'Северная Америка (NA)'],
    pattern: /^.{3,16}#[A-Za-z0-9]{2,5}$/u,
    error: 'Введи Riot ID в формате Никнейм#ТЕГ. Никнейм: 3–16 символов, тег: 2–5 букв или цифр.'
  },
  {
    id: 'league',
    name: 'League of Legends',
    shortName: 'LoL',
    currency: 'RP',
    caption: 'Riot Points',
    platforms: ['pc'],
    keywords: 'лига легенд лол риот поинтс rp league of legends',
    logo: 'logo-league',
    tint: '#2b4a6b',
    banner: 'img/league.jpg',
    packs: [[650, 449], [1380, 890], [2800, 1790], [5000, 3090], [7200, 4390]],
    account: 'Никнейм призывателя',
    placeholder: 'Например, FragPlayer',
    hint: 'Никнейм в League of Legends, без тега и региона.',
    note: 'RP зачисляются по никнейму призывателя. Проверь регион аккаунта.',
    regions: ['Европа (EUW/EUNE)', 'Россия', 'Турция'],
    pattern: /^[A-Za-z0-9 ]{3,16}$/,
    error: 'Введи никнейм призывателя: от 3 до 16 латинских букв или цифр.'
  },
  {
    id: 'apex',
    name: 'Apex Legends',
    shortName: 'Apex',
    currency: 'Apex Coins',
    caption: 'Монеты Apex',
    platforms: ['pc'],
    keywords: 'апекс легендс монеты apex coins ea',
    logo: 'logo-apex',
    tint: '#8a2f2f',
    banner: 'img/apex.jpg',
    packs: [[1000, 899], [2150, 1790], [4350, 3490], [6700, 5290], [11500, 8990]],
    account: 'Никнейм EA',
    placeholder: 'Например, FragPlayer',
    hint: 'Никнейм аккаунта EA, к которому привязана игра.',
    note: 'Apex Coins зачисляются на аккаунт EA, привязанный к игре.',
    regions: ['Россия', 'Европа', 'Другой регион'],
    pattern: /^[A-Za-z0-9_]{3,32}$/,
    error: 'Введи никнейм EA: от 3 до 32 латинских букв, цифр или символов _.'
  },
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    shortName: 'CS2',
    currency: '₽ Steam',
    caption: 'Пополнение Steam',
    platforms: ['pc'],
    keywords: 'кс кс2 ксго csgo counter strike',
    logo: 'logo-cs2',
    tint: '#6a4c2b',
    banner: 'img/cs2.jpg',
    packs: [[250, 279], [500, 549], [1000, 1090], [2000, 2150], [5000, 5290], [10000, 10490]],
    account: 'Логин Steam',
    placeholder: 'Твой логин для входа в Steam',
    hint: 'Не никнейм профиля и не ссылка. Только логин.',
    note: 'Для CS2 пополняется кошелек Steam в рублях. Скины в заказ не входят.',
    regions: ['Россия', 'Казахстан', 'Другой регион'],
    pattern: /^[A-Za-z0-9_]{3,64}$/,
    error: 'Введи логин Steam: от 3 до 64 латинских букв, цифр или символов _.'
  },
  {
    id: 'steam',
    name: 'Steam',
    currency: '₽ Steam',
    caption: 'Баланс библиотеки',
    platforms: ['pc'],
    keywords: 'стим кошелек баланс игры',
    logo: 'logo-steam',
    tint: '#244053',
    banner: 'img/steam.jpg',
    packs: [[100, 119], [500, 549], [1000, 1090], [2000, 2150], [5000, 5290], [10000, 10490]],
    account: 'Логин Steam',
    placeholder: 'Твой логин для входа в Steam',
    hint: 'Логин для входа, не имя профиля или ссылка.',
    note: 'Пополнение кошелька Steam. Обязательно проверь логин и регион аккаунта.',
    regions: ['Россия', 'Казахстан', 'Другой регион'],
    pattern: /^[A-Za-z0-9_]{3,64}$/,
    error: 'Введи логин Steam: от 3 до 64 латинских букв, цифр или символов _.'
  },
  {
    id: 'standoff',
    name: 'Standoff 2',
    currency: 'Gold',
    caption: 'Голда',
    platforms: ['mobile'],
    keywords: 'стандофф стандоф 2 голда голд gold',
    logo: 'logo-standoff',
    tint: '#6b3a2b',
    banner: 'img/standoff.png',
    packs: [[100, 99], [300, 279], [600, 549], [1300, 1090], [2800, 2290]],
    account: 'ID игрока',
    placeholder: 'Например, 1234567',
    hint: 'Числовой ID из профиля Standoff 2.',
    note: 'Голда зачисляется на ID аккаунта Standoff 2. Проверь цифры.',
    regions: ['Россия', 'Другой регион'],
    pattern: /^\d{5,12}$/,
    error: 'Введи ID игрока Standoff 2: от 5 до 12 цифр.'
  },
  {
    id: 'brawl',
    name: 'Brawl Stars',
    currency: 'Гемы',
    caption: 'Гемы',
    platforms: ['mobile'],
    keywords: 'браво старс бравл старс гемы gems brawl stars',
    logo: 'logo-brawl',
    tint: '#6b5a2b',
    banner: 'img/brawl.png',
    packs: [[30, 89], [80, 219], [170, 449], [360, 890], [950, 2190]],
    account: 'Тег игрока',
    placeholder: 'Например, #2P0L8C0V',
    hint: 'Тег игрока из профиля Brawl Stars, со знаком #.',
    note: 'Гемы зачисляются по тегу игрока. Проверь тег в профиле игры.',
    regions: ['Россия', 'Европа', 'Другой регион'],
    pattern: /^#?[A-Z0-9]{5,12}$/,
    error: 'Введи тег игрока Brawl Stars, например #2P0L8C0V.'
  },
  {
    id: 'freefire',
    name: 'Free Fire',
    currency: 'Алмазы',
    caption: 'Алмазы',
    platforms: ['mobile'],
    keywords: 'фри фаер фрифаер алмазы diamonds free fire garena',
    logo: 'logo-freefire',
    tint: '#8a3a2f',
    banner: 'img/freefire.png',
    packs: [[100, 99], [310, 279], [520, 449], [1060, 890], [2180, 1790], [5600, 4390]],
    account: 'ID игрока',
    placeholder: 'Например, 1234567890',
    hint: 'Числовой ID из профиля Free Fire.',
    note: 'Алмазы зачисляются на ID аккаунта Free Fire. Проверь цифры.',
    regions: ['Россия', 'Другой регион'],
    pattern: /^\d{8,15}$/,
    error: 'Введи ID игрока Free Fire: от 8 до 15 цифр.'
  },
  {
    id: 'genshin',
    name: 'Genshin Impact',
    currency: 'крист.',
    caption: 'Кристаллы Сотворения',
    platforms: ['pc', 'mobile'],
    keywords: 'геншин кристаллы сотворения примогемы',
    logo: 'logo-genshin',
    tint: '#384b65',
    banner: 'img/genshin.png',
    packs: [[60, 99], [300, 449], [980, 1290], [1980, 2490], [3280, 4090], [6480, 7990]],
    account: 'UID персонажа',
    placeholder: 'Например, 700123456',
    hint: '9–10 цифр. UID находится в правом нижнем углу игры.',
    note: 'Выбери сервер своего персонажа. Бонус первого пополнения зависит от аккаунта.',
    regions: ['Европа', 'Азия', 'Америка', 'TW, HK, MO'],
    pattern: /^\d{9,10}$/,
    error: 'UID должен содержать 9 или 10 цифр. Его можно найти в правом нижнем углу игры.'
  },
  {
    id: 'pubg',
    name: 'PUBG Mobile',
    currency: 'UC',
    caption: 'Unknown Cash',
    platforms: ['mobile'],
    keywords: 'пабг пубг юси uc pubgm',
    logo: 'logo-pubg',
    tint: '#5c5034',
    banner: 'img/pubg.webp',
    packs: [[60, 99], [325, 449], [660, 849], [1800, 2190], [3850, 4490], [8100, 8890]],
    account: 'Player ID',
    placeholder: 'Например, 5123456789',
    hint: 'Числовой ID из игрового профиля, не никнейм.',
    note: 'Для глобальной версии PUBG Mobile. Укажи Player ID из профиля игрока.',
    regions: ['Global'],
    pattern: /^\d{5,15}$/,
    error: 'Введи Player ID из профиля PUBG Mobile: от 5 до 15 цифр.'
  }
];

let selectedGameId = 'valorant';
let selectedPack = 1;
let currentCategory = 'all';
let checkoutSnapshot = null;
let lastOrder = null;

const accountDrafts = new Map();
const storageKey = 'frag-demo-orders-v1';

const getGame = () => games.find(game => game.id === selectedGameId);

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function renderGames() {
  const grid = $('#games-grid');
  grid.innerHTML = games.map(game => `
    <button
      class="game-button"
      type="button"
      data-game="${game.id}"
      aria-pressed="${game.id === selectedGameId}"
      aria-controls="topup"
      aria-label="Выбрать ${game.name}"
      style="--game-tint:${game.tint}"
    >
      <span class="game-banner${game.portrait ? ' portrait' : ''}" aria-hidden="true">
        ${game.banner ? `<img src="${game.banner}" alt="" loading="eager" decoding="async" fetchpriority="low">` : ''}
      </span>

      <span class="game-watermark" aria-hidden="true">
        ${icon(game.logo, 'game-logo')}
      </span>

      <span class="game-top">
        ${icon(game.logo, 'game-logo')}
        <span class="game-indicator">
          ${icon('i-arrow-up', 'icon game-arrow-icon')}
          ${icon('i-check', 'icon game-selected-icon')}
        </span>
      </span>

      <span class="game-bottom">
        <span>
          <span class="game-name">${game.shortName || game.name}</span>
          <span class="game-currency">${game.id === 'roblox' ? 'Robux' : game.caption}</span>
        </span>
        <span class="game-price">от ${money(game.packs[0][1])}</span>
      </span>
    </button>
  `).join('');

  $$('.game-button', grid).forEach(button => {
    button.addEventListener('click', () => {
      if (button.dataset.game === selectedGameId) {
        $('#topup').scrollIntoView({
          behavior: reducedMotion() ? 'auto' : 'smooth',
          block: 'start'
        });
        return;
      }

      accountDrafts.set(selectedGameId, {
        account: $('#account-input').value,
        region: $('#region-input').value
      });

      selectedGameId = button.dataset.game;
      selectedPack = 1;

      $$('.game-button', grid).forEach(tile => {
        tile.setAttribute('aria-pressed', String(tile.dataset.game === selectedGameId));
      });

      renderTopup(true);

      $('#selection-status').textContent = `Выбрана игра ${getGame().name}. Укажи номинал и аккаунт.`;
    });
  });

  $$('.game-banner img', grid).forEach(image => {
    const loaded = () => image.parentElement.classList.add('is-loaded');

    const unavailable = () => {
      if (image.hidden) return;
      image.hidden = true;
      const tile = image.closest('.game-button');
      const game = games.find(item => item.id === tile.dataset.game);
      const fallback = document.createElement('span');
      fallback.style.cssText = 'position:absolute;right:10%;top:12%;width:135px;height:135px;opacity:.35;transform:rotate(-12deg)';
      fallback.innerHTML = icon(game.logo, 'game-logo');
      $('svg', fallback).style.cssText = 'width:100%;height:100%';
      image.parentElement.append(fallback);
    };

    image.addEventListener('load', loaded, { once: true });
    image.addEventListener('error', unavailable, { once: true });

    if (image.complete) {
      image.naturalWidth ? loaded() : unavailable();
    }
  });
}

function renderTopup(changed = false) {
  const game = getGame();
  const draft = accountDrafts.get(game.id);

  $('#topup-title').textContent = `Пополнение ${game.name}`;
  $('#topup-game-icon').innerHTML = icon(game.logo, 'game-logo');
  $('#account-label').textContent = game.account;
  $('#account-input').placeholder = game.placeholder;
  $('#account-input').value = draft?.account || '';
  $('#account-input').inputMode = ['genshin', 'pubg', 'standoff', 'freefire'].includes(game.id) ? 'numeric' : 'text';

  $('#account-hint').textContent = game.hint;
  $('#package-note').textContent = game.note;

  const regionSelect = $('#region-input');
  regionSelect.replaceChildren(...game.regions.map(region => new Option(region, region)));

  if (draft && game.regions.includes(draft.region)) {
    regionSelect.value = draft.region;
  }

  clearAccountError();

  const pkgGrid = $('#package-grid');
  pkgGrid.innerHTML = game.packs.map((pack, index) => `
    <label class="package">
      <input
        type="radio"
        name="package"
        value="${index}"
        ${index === selectedPack ? 'checked' : ''}
        aria-label="${number(pack[0])} ${game.currency}, ${money(pack[1])}"
      >
      <span class="package-content">
        <span>
          <strong class="package-amount">${number(pack[0])}</strong>
          <span class="package-unit">${game.currency}</span>
        </span>
        <span class="package-price">${money(pack[1])}</span>
        ${icon('i-check', 'icon package-check')}
      </span>
    </label>
  `).join('');

  $$('input[name="package"]', pkgGrid).forEach(input => {
    input.addEventListener('change', () => {
      selectedPack = Number(input.value);
      updateTotal();
    });
  });

  updateTotal();

  if (changed && !reducedMotion() && $('#topup-header')?.animate) {
    $('#topup-header').animate([{ opacity: 0.35 }, { opacity: 1 }], { duration: 300 });
  }
}

function updateTotal() {
  $('#total-price').textContent = money(getGame().packs[selectedPack][1]);
}

function clearAccountError() {
  $('#account-error').hidden = true;
  $('#account-input').removeAttribute('aria-invalid');
}

function filterGames() {
  const query = $('#search-games').value.trim().toLocaleLowerCase('ru-RU');
  let visible = 0;

  games.forEach(game => {
    const searchable = `${game.name} ${game.shortName || ''} ${game.currency} ${game.keywords}`.toLocaleLowerCase('ru-RU');
    const match = (currentCategory === 'all' || game.platforms.includes(currentCategory)) && searchable.includes(query);

    const btn = $(`[data-game="${game.id}"]`);
    if (btn) btn.hidden = !match;
    if (match) visible++;
  });

  $('#no-results').hidden = visible > 0;
  $('#clear-search').hidden = !$('#search-games').value;
  $('#catalog-status').textContent = `Игр найдено: ${visible}.`;

  $$('.category-filter').forEach(button => {
    const active = button.dataset.category === currentCategory;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function closeMobileMenu() {
  $('#mobile-menu').hidden = true;
  $('#menu-toggle').setAttribute('aria-expanded', 'false');
  $('#menu-toggle').setAttribute('aria-label', 'Открыть меню');
}

function openDialog(dialog) {
  closeMobileMenu();
  $$('dialog[open]').forEach(open => open.close());
  dialog.showModal();
  document.body.classList.add('has-dialog');
}

$$('dialog').forEach(dialog => {
  $$('[data-close]', dialog).forEach(button => {
    button.addEventListener('click', () => dialog.close());
  });

  dialog.addEventListener('close', () => {
    if (!$$('dialog[open]').length) {
      document.body.classList.remove('has-dialog');
    }
  });

  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)
    ) {
      dialog.close();
    }
  });
});

function loadOrders() {
  try {
    const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (!Array.isArray(data)) return [];

    return data.filter(order =>
      order &&
      games.some(game => game.id === order.gameId) &&
      typeof order.id === 'string' &&
      order.id.length < 50 &&
      typeof order.account === 'string' &&
      order.account.length <= 64 &&
      typeof order.region === 'string' &&
      order.region.length < 50 &&
      Number.isFinite(order.amount) &&
      order.amount > 0 &&
      Number.isFinite(order.price) &&
      order.price > 0 &&
      Number.isFinite(new Date(order.createdAt).getTime())
    ).slice(0, 20);
  } catch {
    return [];
  }
}

let orders = loadOrders();

function persistOrders() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(orders));
    return true;
  } catch {
    return false;
  }
}

$('#topup-form').addEventListener('submit', event => {
  event.preventDefault();

  const game = getGame();
  const account = $('#account-input').value.trim();

  if (!game.pattern.test(account)) {
    $('#account-error').textContent = account
      ? game.error
      : `Укажи ${game.account.toLocaleLowerCase('ru-RU')}, чтобы продолжить.`;

    $('#account-error').hidden = false;
    $('#account-input').setAttribute('aria-invalid', 'true');
    $('#account-input').focus();
    return;
  }

  clearAccountError();

  checkoutSnapshot = {
    gameId: game.id,
    amount: game.packs[selectedPack][0],
    price: game.packs[selectedPack][1],
    account,
    region: $('#region-input').value
  };

  $('#checkout-game').textContent = game.name;
  $('#checkout-amount').textContent = `${number(checkoutSnapshot.amount)} ${game.currency}`;
  $('#checkout-account').textContent = account;
  $('#checkout-region').textContent = checkoutSnapshot.region;
  $('#checkout-total').textContent = money(checkoutSnapshot.price);

  $('#checkout-details').hidden = false;
  $('#checkout-success').hidden = true;
  $('#checkout-dialog').setAttribute('aria-labelledby', 'checkout-title');
  $('#checkout-consent').checked = false;
  $('#copy-fallback').hidden = true;
  $('#copy-order').textContent = 'Скопировать детали заявки';

  openDialog($('#checkout-dialog'));
  $('#checkout-email').focus({ preventScroll: true });
});

$('#checkout-form').addEventListener('submit', event => {
  event.preventDefault();

  if (!checkoutSnapshot || !event.target.reportValidity()) return;

  const suffix = globalThis.crypto?.randomUUID
    ? crypto.randomUUID().slice(0, 6).toUpperCase()
    : Math.random().toString(36).slice(2, 8).toUpperCase();

  lastOrder = {
    ...checkoutSnapshot,
    id: `FR-${Date.now().toString(36).toUpperCase()}-${suffix}`,
    createdAt: new Date().toISOString()
  };

  orders = [lastOrder, ...orders].slice(0, 20);
  const saved = persistOrders();

  $('#order-reference').textContent = lastOrder.id;
  $('#success-description').textContent = saved
    ? 'Демозаявка сохранена в этом браузере. Найдешь ее в разделе «Мои заказы» на этом устройстве.'
    : 'Хранилище браузера недоступно. Демозаявка останется в разделе «Мои заказы» только до закрытия страницы.';

  $('#checkout-details').hidden = true;
  $('#checkout-success').hidden = false;
  $('#checkout-dialog').setAttribute('aria-labelledby', 'success-title');
  $('#copy-order').focus({ preventScroll: true });

  $('#checkout-email').value = '';
  checkoutSnapshot = null;
});

$('#copy-order').addEventListener('click', async () => {
  if (!lastOrder) return;
  const game = games.find(item => item.id === lastOrder.gameId);

  const text =
    `FRAG / ДЕМОЗАЯВКА ${lastOrder.id}\n` +
    `Игра: ${game.name}\n` +
    `Пополнение: ${number(lastOrder.amount)} ${game.currency}\n` +
    `Аккаунт: ${lastOrder.account}\n` +
    `Регион: ${lastOrder.region}\n` +
    `Стоимость: ${money(lastOrder.price)}\n` +
    'Деньги не списаны. Валюта не отправлена.';

  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    $('#copy-order').textContent = 'Детали скопированы';
    setTimeout(() => { $('#copy-order').textContent = 'Скопировать детали заявки'; }, 2500);
  } catch {
    const fallback = $('#copy-fallback');
    fallback.value = text;
    fallback.hidden = false;
    fallback.focus();
    fallback.select();
    $('#copy-order').textContent = 'Выделено. Нажми «Копировать»';
  }
});

function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderOrderHistory() {
  const list = $('#order-list');
  list.replaceChildren();
  $('#clear-orders').hidden = !orders.length;

  if (!orders.length) {
    list.append(element('p', 'history-empty', 'Здесь пока тихо. Выбери игру и создай первую демозаявку.'));
    const link = element('a', 'primary-button', 'Найти свою игру');
    link.href = '#catalog';
    link.addEventListener('click', () => $('#orders-dialog').close());
    list.append(link);
    return;
  }

  orders.forEach(order => {
    const game = games.find(item => item.id === order.gameId);
    const article = element('article', 'order-item');
    const top = element('div', 'order-item-top');

    top.append(element('strong', '', game.name), element('span', '', money(order.price)));
    article.append(top, element('p', 'order-item-details', `${number(order.amount)} ${game.currency} · ${order.account} · ${order.region}`));

    const date = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(order.createdAt));
    article.append(element('p', 'order-item-meta', `${order.id} / ${date} / Демозаявка`));

    list.append(article);
  });
}

$$('[data-open-orders]').forEach(button => {
  button.addEventListener('click', () => {
    renderOrderHistory();
    openDialog($('#orders-dialog'));
  });
});

$('#clear-orders').addEventListener('click', () => {
  if (!window.confirm('Удалить все демонстрационные заявки из этого браузера?')) return;
  orders = [];
  persistOrders();
  renderOrderHistory();
});

const infoContent = {
  support: {
    title: 'На связи с тобой',
    html: `
      <p>Для пополнения достаточно игрового ID или логина. Проверь написание аккаунта и его регион.</p>
      <p>Вопрос про Steam, ошибку в данных или статус заявки? Ответы собрали в FAQ.</p>
      <button class="primary-button" type="button" id="open-faq">Перейти к ответам ${icon('i-arrow')}</button>
    `
  },
  terms: {
    title: 'Условия использования',
    html: `<p>FRAG является демонстрационной витриной. Оплата не требуется.</p>`
  },
  privacy: {
    title: 'Твои данные под контролем',
    html: `<p>Демозаявки сохраняются в localStorage только в этом браузере.</p>`
  }
};

$$('[data-info]').forEach(button => {
  button.addEventListener('click', () => {
    const content = infoContent[button.dataset.info];
    $('#info-title').textContent = content.title;
    $('#info-body').innerHTML = content.html;

    $('#open-faq')?.addEventListener('click', () => {
      $('#info-dialog').close();
      $('#faq').scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
    });

    openDialog($('#info-dialog'));
  });
});

$('#search-games').addEventListener('input', filterGames);
$('#clear-search').addEventListener('click', () => {
  $('#search-games').value = '';
  filterGames();
  $('#search-games').focus();
});

$$('.category-filter').forEach(button => {
  button.addEventListener('click', () => {
    currentCategory = button.dataset.category;
    filterGames();
  });
});

$('#reset-filters').addEventListener('click', () => {
  currentCategory = 'all';
  $('#search-games').value = '';
  filterGames();
});

$('#account-input').addEventListener('input', clearAccountError);

$('#menu-toggle').addEventListener('click', () => {
  const expanded = $('#menu-toggle').getAttribute('aria-expanded') !== 'true';
  $('#mobile-menu').hidden = !expanded;
  $('#menu-toggle').setAttribute('aria-expanded', String(expanded));
});

$$('#mobile-menu a').forEach(link => link.addEventListener('click', closeMobileMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMobileMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMobileMenu(); });

// Auth logic
const sessionKey = 'frag-demo-session-v1';
const loginEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
let session = null;

try {
  const raw = localStorage.getItem(sessionKey);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.email === 'string') session = { email: parsed.email };
  }
} catch {}

function renderAuthButton() {
  const button = $('#login-button');
  const label = $('#login-button-label');
  const mobile = $('#mobile-login-button');

  if (label && button) {
    if (session) {
      label.textContent = 'Профиль';
      button.classList.add('is-logged');
    } else {
      label.textContent = 'Вход';
      button.classList.remove('is-logged');
    }
  }
  if (mobile) mobile.textContent = session ? 'Профиль' : 'Вход в аккаунт';
}

function showLoginView(mode) {
  const formWrap = $('#login-form-wrap');
  const profile = $('#login-profile');
  if (mode === 'profile') {
    formWrap.hidden = true;
    profile.hidden = false;
    if (session) $('#login-profile-text').textContent = 'Вы вошли как ' + session.email;
  } else {
    formWrap.hidden = false;
    profile.hidden = true;
  }
}

$$('[data-open-login]').forEach(button => {
  button.addEventListener('click', () => {
    showLoginView(session ? 'profile' : 'form');
    openDialog($('#login-dialog'));
  });
});

$('#login-form').addEventListener('submit', event => {
  event.preventDefault();
  const email = $('#login-email').value.trim();
  const password = $('#login-password').value;

  if (!email || !loginEmailPattern.test(email) || password.length < 6) return;

  session = { email };
  try { localStorage.setItem(sessionKey, JSON.stringify(session)); } catch {}

  renderAuthButton();
  showLoginView('profile');
});

$('#logout-button').addEventListener('click', () => {
  session = null;
  try { localStorage.removeItem(sessionKey); } catch {}
  renderAuthButton();
  showLoginView('form');
});

renderAuthButton();
renderGames();
renderTopup();

$('#year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window && !reducedMotion()) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  $$('.reveal').forEach(section => observer.observe(section));
}

$('#hero-agent').addEventListener('error', function () { this.hidden = true; }, { once: true });