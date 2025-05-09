

// Quotes
const quotes = [
  { text: "Falen is geen optie", author: "— Rox" },
  { text: "Opgeven is voor de Mongooltjes", author: "— Stef Galler" },
  { text: "Je bent goed bezig, lieve muis.", author: "— jouw poepie ;)" },
  { text: "Ik hou van u, aapje.", author: "— Tijger" },
  { text: "Dat gaat niet bestaat niet!", author: "— Katleen" },
  { text: "Doe het voor de Sonny Angels!", author: "— Stef Galler" },
  { text: "Als je echt in jezelf gelooft, dan kun ja alles.", author: "— Mega Mindy" },
  { text: "Plopperdeplop!", author: "— Kabouter plop" },
  { text: "Als je doomt, dan kun je vliegen.", author: "— K3" },
  { text: "Same kunnen we alles aan!", author: "— Wickie de Viking" },
  { text: "Als je niet durft, zal je nooit weten wat je had kunnen doen.", author: "— Nachtwacht" },
  { text: "Ook kleine helden kunnen grote dingen doen.", author: "— Mega Toby" },
  { text: "Als je valt sta je gewoon weer op.", author: "— Samson & Gert" },
  { text: "Soms moet je springen voor je vleugels krijgt.", author: "— Amika" },
  { text: "Bang zijn is niet erg, opgeven wel.", author: "— Nachtwacht" },
];

function showNextQuote() {
  const quoteBox = document.getElementById("quoteBox");
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");

  if (!quoteBox || !quoteText || !quoteAuthor) return;

  quoteBox.style.opacity = 0;
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex].text;
    quoteAuthor.textContent = quotes[randomIndex].author;
    quoteBox.style.opacity = 1;
  }, 500);
}

// Klok
function updateDateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
  const date = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  document.getElementById("time").textContent = time;
  document.getElementById("date").textContent = date;
}

// Menu
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.classList.toggle("show");
}

// Toon/verberg blokken
function toggleVisibility(id) {
    const el = document.getElementById(id);
    if (el) {
        const isVisible = el.style.display !== 'none';
        el.style.display = isVisible ? 'none' : 'block';
        localStorage.setItem(id, isVisible ? 'false' : 'true');
        
        // Als het de todo-list is en we tonen hem, laad dan de items
        if (id === 'todoList' && !isVisible) {
            loadTodos();
        }
    }
    
    // Speciale behandeling voor streak counter
    if (id === 'streakCounter') {
        const streakEl = document.querySelector('.streak-counter');
        if (streakEl) {
            const isVisible = streakEl.style.display !== 'none';
            streakEl.style.display = isVisible ? 'none' : 'flex';
            localStorage.setItem(id, isVisible ? 'false' : 'true');
        }
    }
}

// Achtergrond wisselen
let backgroundIndex = 0;
const backgrounds = [
  'url("unnamed.jpg")',
  'url("Funko.jpg")',
  'url("Sonny.jpg")',
  'url("berg.jpg")',
  'url("vis.jpg")',
  'url("uil.jpg")',
  'url("vissen.jpg")',
  'url("cactus.webp")',
  'url("Ppc.jpg")',
  'url("Parijs.jpg")',
  'url("palm.jpg")',
  'url("boom.jpg")',
  'url("toren.jpg")',
  'url("apex.jpg")',
  'url("gotg.jpg")',
  'url("onep.jpg")',
  'url("space.jpg")'



  
];



function changeBackground() {
  backgroundIndex = (backgroundIndex + 1) % backgrounds.length;
  document.querySelector('.background-image').style.backgroundImage = backgrounds[backgroundIndex];
}

// Coin system
let coinCount = parseInt(localStorage.getItem("mysteryCoins")) || 0;
let mysteryTokens = parseInt(localStorage.getItem("mysteryTokens")) || 0;
document.getElementById("coinCount").textContent = coinCount;

// Slotmachine functionaliteit
const slotPopup = document.getElementById('slotPopup');
const startSlotBtn = document.getElementById('startSlot');
const reels = document.querySelectorAll('.slots .reel');

// Create rewards menu
const rewardsMenu = document.createElement('div');
rewardsMenu.className = 'rewards-menu';
rewardsMenu.innerHTML = `
  <h3>Beloningen</h3>
  <ul>
    <li>2 dezelfde: 2 coins</li>
    <li>🎰🎰🎰: 4 coins</li>
    <li>🍒🍒🍒: 6 coins</li>
    <li>🍋🍋🍋: 8 coins</li>
    <li>🍊🍊🍊: 10 coins</li>
    <li>🍉🍉🍉: 12 coins</li>
    <li>🍇🍇🍇: 14 coins</li>
    <li>🍌🍌🍌: 16 coins</li>
    <li>🔔🔔🔔: 18 coins</li>
    <li>7️⃣7️⃣7️⃣: Mystery Token + 20 coins</li>
  </ul>
  <div class="token-counter">Mystery Tokens: <span id="tokenCount">${mysteryTokens}</span></div>
`;
document.querySelector('.slot-popup .popup-content').appendChild(rewardsMenu);

// Reward system
const rewardRanks = [
  { combo: "seven-seven-seven", coins: 20, mystery: true },
  { combo: "bell-bell-bell", coins: 18 },
  { combo: "banana-banana-banana", coins: 16 },
  { combo: "plum-plum-plum", coins: 14 },
  { combo: "melon-melon-melon", coins: 12 },
  { combo: "orange-orange-orange", coins: 10 },
  { combo: "lemon-lemon-lemon", coins: 8 },
  { combo: "cherry-cherry-cherry", coins: 6 },
  { combo: "bar-bar-bar", coins: 4 }
];

// Close popup when clicking outside
slotPopup.addEventListener('click', (e) => {
  if (e.target === slotPopup) {
    hideSlotPopup();
  }
});

// Slot machine configuration
const iconMap = ["banana", "melon", "lemon","bar", "bell", "orange", "plum", "cherry",  "seven"];
const iconHeight = 79;
const numIcons = 9;
const spinDuration = 3000;
let isSpinning = false;
let slotInitialized = false; // Voeg deze toe om dubbele initialisatie te voorkomen

// Initialize reels
function initReels() {
  if (slotInitialized) return;
  slotInitialized = true;
  
  reels.forEach(reel => {
    reel.style.backgroundImage = 'url(https://assets.codepen.io/439000/slotreel.webp)';
    reel.style.backgroundRepeat = 'repeat-y';
    reel.style.width = '79px';
    reel.style.height = '237px';
    reel.style.overflow = 'hidden';
    reel.style.position = 'relative';
    reel.style.transition = 'none';
    reel.style.backgroundPositionY = '0px';
  });
}

// Verbeterde spin functie met betere random stops
function spinReel(reel, index, forceSymbol = null) {
  return new Promise(resolve => {
    const spins = 5 + Math.floor(Math.random() * 3);
    const symbolIndex = forceSymbol !== null ? iconMap.indexOf(forceSymbol) : Math.floor(Math.random() * numIcons);

    const totalMovement = (numIcons * spins + symbolIndex) * iconHeight;

    reel.style.transition = `background-position-y ${spinDuration}ms cubic-bezier(0.1, 0.7, 0.1, 1)`;
    reel.style.backgroundPositionY = `-${totalMovement}px`;

    setTimeout(() => {
      reel.style.transition = 'none';
      // Correct visuele positie instellen
      reel.style.backgroundPositionY = `-${symbolIndex * iconHeight}px`;
      resolve(symbolIndex);
    }, spinDuration);
  });
}


function startSlot() {
  // Voorkom dubbele spins
  if (isSpinning) return;
  
  if (coinCount < 1) {
    alert("Je hebt niet genoeg coins!");
    return;
  }

  coinCount--;
  document.getElementById("coinCount").textContent = coinCount;
  localStorage.setItem("mysteryCoins", coinCount);
  
  isSpinning = true;
  startSlotBtn.disabled = true;

  // Bepaal eerst of we een jackpot forceren 1/400 kans
  const forceJackpot = Math.random() < 0.0025;


  
  // Als we een jackpot forceren, zorg dat minstens één seven aanwezig is
  const forcedSymbol = forceJackpot ? "seven" : null;
  
  Promise.all(Array.from(reels).map((reel, i) => spinReel(reel, i, forcedSymbol)))
    .then(stops => {
      const results = stops.map(stop => iconMap[stop]);
      
      // Als we een jackpot forceren, maak dan alle symbolen seven
      if (forceJackpot) {
        results[0] = "seven";
        results[1] = "seven";
        results[2] = "seven";
        // Pas de visuele positie aan om seven te tonen
        reels[0].style.backgroundPositionY = `-${iconMap.indexOf("seven") * iconHeight}px`;
        reels[1].style.backgroundPositionY = `-${iconMap.indexOf("seven") * iconHeight}px`;
        reels[2].style.backgroundPositionY = `-${iconMap.indexOf("seven") * iconHeight}px`;
      }
      
      checkWin(results);
      isSpinning = false;
      startSlotBtn.disabled = false;
    });
}

// Verbeterde winstcontrole
function checkWin(results) {
  const resultStr = results.join('-');
  const symbolCounts = {};
  
  // Tel symbolen
  results.forEach(symbol => {
    symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(symbolCounts));
  const uniqueSymbols = Object.keys(symbolCounts).length;
  
  // Controleer eerst op exacte combinaties (777, 3 bellen, etc.)
  for (const rank of rewardRanks) {
    if (resultStr === rank.combo) {
      let winMessage = "";
      let winAmount = rank.coins;
      
      if (rank.mystery) {
        mysteryTokens++;
        localStorage.setItem("mysteryTokens", mysteryTokens);
        document.getElementById("tokenCount").textContent = mysteryTokens;
        winMessage = `🎰 Jackpot! Mystery Token + ${winAmount} coins`;
      } else {
        winMessage = `🎉 3 ${results[0]}! +${winAmount} coins`;
      }
      
      coinCount += winAmount;
      showWinFeedback(winMessage);
      updateCounters();
      return;
    }
  }

  // Algemene winstregels
  if (maxCount === 3 && uniqueSymbols === 1) {
    // 3 exact dezelfde (niet gespecificeerd in rewardRanks)
    const winAmount = 3;
    coinCount += winAmount;
    showWinFeedback(`🎉 3 ${results[0]}! +${winAmount} coins`);
    updateCounters();
    return;
  } else if (maxCount === 2 && uniqueSymbols === 2) {
    // Slechts 2 dezelfde (niet 2x één symbool en 1x ander)
    const matchingSymbol = Object.keys(symbolCounts).find(key => symbolCounts[key] === 2);
    const winAmount = 2;
    coinCount += winAmount;
    showWinFeedback(`🎉 2 ${matchingSymbol}! +${winAmount} coins`);
    updateCounters();
    return;
  }

  // Geen winst
  showWinFeedback("❌");
}

// Hulpfunctie voor winstfeedback
function showWinFeedback(message) {
  const feedback = document.createElement('div');
  feedback.className = 'win-feedback';
  feedback.textContent = message;
  document.body.appendChild(feedback);
  
  // Fade-out na 1 seconde
  setTimeout(() => {
    feedback.classList.add('fade-out');
  }, 1000);
  
  // Verwijder na animatie
  setTimeout(() => {
    feedback.remove();
  }, 2000);
}

// Voeg deze CSS toe:
const feedbackStyle = document.createElement('style');
feedbackStyle.textContent = `
.win-feedback {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,0.8);
  color: gold;
  padding: 15px 25px;
  border-radius: 10px;
  font-size: 1.2em;
  font-weight: bold;
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.5s ease;
  box-shadow: 0 0 20px rgba(255,215,0,0.5);
}
.win-feedback.fade-out {
  opacity: 0;
}
`;
document.head.appendChild(feedbackStyle);


function updateCounters() {
  document.getElementById("coinCount").textContent = coinCount;
  document.getElementById("tokenCount").textContent = mysteryTokens;
  localStorage.setItem("mysteryCoins", coinCount);
  localStorage.setItem("mysteryTokens", mysteryTokens);
}

// Mystery popup
function showMysteryPopup() {
  document.getElementById("mysteryPopup").style.display = "block";
  
}

function hideMysteryPopup() {
  document.getElementById("mysteryPopup").style.display = "none";
}

function showSlotPopup() {
  document.getElementById("slotPopup").style.display = "flex";
}

function hideSlotPopup() {
  document.getElementById("slotPopup").style.display = "none";
}

// Timer
// Timer
let totalSeconds = 60 *  60 ;
let remainingSeconds = totalSeconds;
let countdownInterval = null;
let isPaused = true;

function updateCountdownDisplay() {
  const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
  const seconds = (remainingSeconds % 60).toString().padStart(2, '0');
  document.getElementById("countdown").textContent = `${minutes}:${seconds}`;
}

function showMysteryPopup() {
  // Voeg 3 coins toe wanneer de timer afloopt
  coinCount += 3;
  updateCounters();
  
  // Toon de popup
  document.getElementById("mysteryPopup").style.display = "block";
  
  // Toon visuele feedback voor de coin toevoeging

  
  setTimeout(() => {
    coinChange.style.opacity = '0';
    setTimeout(() => coinChange.remove(), 500);
  }, 1000);

  resetCountdown();
  startCountdown();
  
}

// Voeg CSS toe voor de coin feedback
const timerStyle = document.createElement('style');
timerStyle.textContent = `
.coin-change-feedback {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,0.7);
  color: gold;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 1.5em;
  font-weight: bold;
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.5s ease;
}
`;
document.head.appendChild(timerStyle);

// Rest van de timer functies blijven hetzelfde
function saveTimerState() {
  localStorage.setItem("timerRemaining", remainingSeconds);
  localStorage.setItem("timerLastSaved", Date.now());
  localStorage.setItem("timerPaused", isPaused);
}

function restoreTimerState() {
  const savedRemaining = parseInt(localStorage.getItem("timerRemaining"), 10);
  const savedTimestamp = parseInt(localStorage.getItem("timerLastSaved"), 10);
  const wasPaused = localStorage.getItem("timerPaused") === "true";

  if (!isNaN(savedRemaining) && !isNaN(savedTimestamp)) {
    const elapsed = Math.floor((Date.now() - savedTimestamp) / 1000);
    remainingSeconds = wasPaused ? savedRemaining : Math.max(0, savedRemaining - elapsed);
    isPaused = wasPaused;
  } else {
    remainingSeconds = totalSeconds;
  }

  updateCountdownDisplay();
  if (!isPaused && remainingSeconds > 0) startCountdown();
}

function startCountdown() {
  if (countdownInterval) return;
  countdownInterval = setInterval(() => {
    if (!isPaused && remainingSeconds > 0) {
      remainingSeconds--;
      updateCountdownDisplay();
      saveTimerState();
      if (remainingSeconds === 0) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        showMysteryPopup();
        resetCountdown();
      }
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = true;
  saveTimerState();
  clearInterval(countdownInterval);
  countdownInterval = null;
}

function startOrResumeCountdown() {
  if (remainingSeconds === 0) resetCountdown();
  isPaused = false;
  saveTimerState();
  startCountdown();
}

function resetCountdown() {
  remainingSeconds = totalSeconds;
  updateCountdownDisplay();
  saveTimerState();
}

// Sticky Note
const stickyContent = document.getElementById("stickyContent");
stickyContent?.addEventListener("input", () => {
  localStorage.setItem("stickyNote", stickyContent.value);
});

function clearStickyNote() {
  stickyContent.value = "";
  localStorage.removeItem("stickyNote");
}

// Initialize everything
document.addEventListener("DOMContentLoaded", function () {
  // Initialize clock
  updateDateTime();
  setInterval(updateDateTime, 60000);
  
  // Initialize quotes
  showNextQuote();
  setInterval(showNextQuote, 900000);
  
  // Initialize menu click handler
  document.addEventListener("click", function(e) {
    const menu = document.getElementById("sideMenu");
    const toggle = document.querySelector(".menu-toggle");
    if (menu.classList.contains("show") && !menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove("show");
    }
  });
  
  // Initialize slot machine
  initReels();
  startSlotBtn.addEventListener('click', startSlot);
  
  // Restore timer state
  restoreTimerState();
  
  // Restore sticky note
  const savedNote = localStorage.getItem("stickyNote");
  if (savedNote !== null) {
    stickyContent.value = savedNote;
  }
  
  // Update all counters
  updateCounters();
  
  // Initialize visibility settings
  ["quoteBox", "datetime", "spotifyWidget", "stickyNote","streak" ].forEach(id => {
    const state = localStorage.getItem(id);
    const el = document.getElementById(id);
    if (el) {
      if (state === "false") {
        el.style.display = "none";
      } else if (id === "spotifyWidget") {
        el.style.display = "none";
      }
    }
  });
});

// Add CSS for rewards menu
const style = document.createElement('style');
style.textContent = `
.rewards-menu {
  position: absolute;
  right: -250px;
  top: 50%;
  transform: translateY(-50%);
  width: 220px;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  border: 1px solid rgba(0,0,0,0.05);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.rewards-menu:hover {
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  transform: translateY(-50%) scale(1.02);
}

.rewards-menu h3 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 1.2rem;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 2px solid #f1c40f;
}

.rewards-menu ul {
  list-style-type: none; /* Dit verwijdert de opsommingstekens */
  padding-left: 0; /* Verwijder ook de default padding */
  margin: 0; /* Optioneel: standaard marge aanpassen */
}

.rewards-menu li {
  margin-bottom: 10px; /* Behoud wat ruimte tussen items */
  padding-left: 0; /* Zorg dat er geen extra padding overblijft */
}

.reward-item:hover {
  background: white;
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.reward-combo {
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
}

.reward-prize {
  font-weight: bold;
  color: #27ae60;
  background: rgba(39, 174, 96, 0.1);
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.9rem;
}

.jackpot-item {
  background: linear-gradient(135deg, rgba(241, 196, 15, 0.1), rgba(230, 126, 34, 0.1));
  border-left: 4px solid #e67e22;
}

.jackpot-item .reward-combo {
  color: #e74c3c;
}

.jackpot-item .reward-prize {
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
}

.current-tokens {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed #ddd;
  display: flex;
  justify-content: space-between;
}

.token-count, .coin-count {
  font-weight: bold;
  font-size: 1.1rem;
}

.token-count {
  color: #9b59b6;
}

.coin-count {
  color: #f1c40f;
}
  .token-counter {
    margin-top: 10px;
    font-weight: bold;
    color: #6b6bff;
  }
  .slot-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    z-index: 1000;
  }
  .slots.win1 {
    animation: win1 200ms steps(2, end) infinite;
  }
  .slots.win2 {
    animation: win2 200ms steps(2, end) infinite;
  }
  @keyframes win1 {
    0% { background: linear-gradient(45deg, orange 0%, yellow 100%); box-shadow: 0 0 80px orange; }
    100% { background: linear-gradient(45deg, grey 0%, lightgrey 100%); box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.3); }
  }
  @keyframes win2 {
    0% { background: linear-gradient(45deg, lightblue 0%, lightgreen 100%); box-shadow: 0 0 80px lightgreen; }
    100% { background: linear-gradient(45deg, grey 0%, lightgrey 100%); box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.3); }
  }
`;
document.head.appendChild(style);

// To-Do Lijst Functionaliteit
const todoInput = document.getElementById('todoInput');
const todoItems = document.getElementById('todoItems');

// Laad opgeslagen taken
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todoItems.innerHTML = '';
  todos.forEach((todo, index) => {
    addTodoToDOM(todo.text, todo.completed, index);
  });
}

// Voeg taak toe aan DOM
function addTodoToDOM(text, completed, index) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.onchange = () => toggleTodo(index);
  
  const span = document.createElement('span');
  span.textContent = text;
  if (completed) {
    span.classList.add('completed');
  }
  
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.className = 'delete-todo';
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    removeTodo(index);
  };
  
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoItems.appendChild(li);
}

// Voeg nieuwe taak toe
function addTodo() {
  const text = todoInput.value.trim();
  if (text) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ text, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
    todoInput.value = '';
    loadTodos();
  }
}

// Taak afvinken
function toggleTodo(index) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos[index].completed = !todos[index].completed;
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}

// Verwijder taak
function removeTodo(index) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}

// Voeg toe wanneer op Enter wordt gedrukt
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// Initialiseer bij laden

document.addEventListener('DOMContentLoaded', () => {
  // Laad alleen todos als de lijst zichtbaar is
  const todoList = document.getElementById('todoList');
  if (todoList.style.display !== 'none') {
      loadTodos();
  }
});
  
  // Rest van je init code...
  function toggleVisibility(id) {
    const el = document.getElementById(id);
    if (el) {
        const isVisible = el.style.display !== 'none';
        el.style.display = isVisible ? 'none' : 'block';
        localStorage.setItem(id, isVisible ? 'false' : 'true');
        
        // Als het de todo-list is en we tonen hem, laad dan de items
        if (id === 'todoList' && !isVisible) {
            loadTodos();
        }
    }
}


// STREAK COUNTER - Voeg dit toe boven aan je bestaande JS


// STREAK STYLING - Voeg toe aan je CSS
const streakStyle = document.createElement('style');
streakStyle.textContent = `
.streak-counter {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  text-align: center;
}
.streak-shield {
  width: 60px;
  height: 70px;
  background: linear-gradient(145deg, #f1c40f, #e67e22);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  border: 3px solid white;
  margin: 0 auto;
}
.streak-label {
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #2c3e50;
  background: rgba(255,255,255,0.8);
  padding: 2px 10px;
  border-radius: 10px;
  display: inline-block;
}
@keyframes shieldPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
.streak-shield.changed {
  animation: shieldPulse 0.5s ease;
}`;
document.head.appendChild(streakStyle);

// STREAK LOGICA - Vervang je bestaande showMysteryPopup functie
let streakCount = parseInt(localStorage.getItem("streakCount")) || 0;

function updateStreak() {
  const el = document.getElementById("streakShield");
  el.textContent = `🔥 ${streakCount} dagen`;
}

function resetStreak() {
  streakCount = 0;
  updateStreak();
}

document.getElementById("streakShield").textContent = streakCount;

function showMysteryPopup() {
  // Voeg 3 coins toe
  coinCount += 3;
  
  // Update streak
  streakCount++;
  localStorage.setItem("streakCount", streakCount);
  updateStreakDisplay();
  
  // Toon popup
  document.getElementById("mysteryPopup").style.display = "block";
  resetCountdown();
  startCountdown();
  updateCounters();
  
  // Feedback animatie
  const feedback = document.createElement('div');
  feedback.className = 'win-feedback';
  feedback.textContent = '+3 Coins!';
  document.body.appendChild(feedback);
  setTimeout(() => {
    feedback.classList.add('fade-out');
    setTimeout(() => feedback.remove(), 500);
  }, 1000);
  

}

updateStreakDisplay();

// Update functie met progressieve kleur en gloed
function updateStreakDisplay() {
  const shield = document.getElementById("streakShield");
  const glowIntensity = Math.min(streakCount / 10, 10); // Max 10x versterking
  const redness = Math.min(streakCount / 100, 1); // 0-1 scale voor roodheid
  
  // Basis kleur berekening (geel -> oranje -> rood)
  const baseHue = 30 - (redness * 30); // 30 (oranje) naar 0 (rood)
  const baseColor = `hsl(${baseHue}, 100%, 50%)`;
  const darkColor = `hsl(${baseHue}, 100%, 35%)`;
  
  // Pas het schild aan
  shield.textContent = streakCount;
  shield.style.background = `linear-gradient(to bottom, ${baseColor}, ${darkColor})`;
  shield.style.boxShadow = `
    0 0 ${10 + glowIntensity * 5}px ${baseColor},
    0 0 ${20 + glowIntensity * 10}px rgba(255, 69, 0, 0.7),
    0 0 ${30 + glowIntensity * 15}px rgba(255, 0, 0, 0.5)
  `;
  
  // Puls effect bij update
  shield.classList.add("streak-updated");
  setTimeout(() => shield.classList.remove("streak-updated"), 1000);
}

function showBonusFeedback(bonus) {
  const bonusPopup = document.createElement('div');
  bonusPopup.className = 'win-feedback';
  bonusPopup.style.background = 'linear-gradient(145deg, #9b59b6, #8e44ad)';
  bonusPopup.textContent = `🎉 ${streakCount}-uur streak! +${bonus} coins!`;
  document.body.appendChild(bonusPopup);
  setTimeout(() => {
    bonusPopup.classList.add('fade-out');
    setTimeout(() => bonusPopup.remove(), 1000);
  }, 2000);
}

let hours = 0;  // Start van de tijd in uren
let streakFlame = document.querySelector('.streak-flame');  // Het element dat de vlam weergeeft

function updateFlame() {
  // Elke 5 uur een visuele upgrade triggeren
  let upgradeLevel = Math.min(Math.floor(hours / 5), 5); // Maximaal 5 upgrades
  streakFlame.className = 'streak-flame upgrade-' + upgradeLevel;
  
  // Volgende update
  hours++;
  
  // Herhaal elke uur
  if (hours <= 50) {
    setTimeout(updateFlame, 3600000);  // 1 uur = 3600000 ms
  }
}

// Start de update-functie
updateFlame();



// streaks
// achievements 10 uur, 20 uur, 30 uur, ...
// belonging timer fixen
// licht effect als je wint met slotmachine


