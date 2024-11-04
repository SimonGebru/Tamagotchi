// Startvärden för status
let hunger = 60;
let happiness = 60;
let energy = 60;

function updateStatus() {
  document.getElementById("hunger").textContent = hunger;
  document.getElementById("happiness").textContent = happiness;
  document.getElementById("energy").textContent = energy;
  updateAppearance();

  console.log(
    `Status uppdaterad: Hunger=${hunger}, Glädje=${happiness}, Energi=${energy}`
  );
}

document.getElementById("feed").addEventListener("click", () => {
  hunger = Math.min(hunger + 10, 100);
  console.log("Mata-knappen tryckt. Hunger ökas med 10.");
  updateStatus();
});

document.getElementById("play").addEventListener("click", () => {
  happiness = Math.min(happiness + 10, 100);
  console.log("Lek-knappen tryckt. Glädje ökas med 10.");
  updateStatus();
});

document.getElementById("sleep").addEventListener("click", () => {
  energy = Math.min(energy + 10, 100);
  console.log("Sov-knappen tryckt. Energi ökas med 10.");
  updateStatus();
});

setInterval(() => {
  hunger = Math.max(hunger - 1, 0);
  happiness = Math.max(happiness - 1, 0);
  energy = Math.max(energy - 1, 0);
  console.log("Tidsbaserad händelse: Status minskar med 1 varje sekund.");
  updateStatus();
  checkIfDead();
}, 5000);

function checkIfDead() {
  if (hunger === 0 || happiness === 0 || energy === 0) {
    console.log("Kritisk status uppnådd. Husdjuret har lämnat dig...");
    alert("Ditt husdjur har lämnat dig...");
    resetGame();
  }
}

function updateAppearance() {
  const tamagotchi = document.getElementById("tamagotchi");

  if (hunger < 10 || happiness < 10 || energy < 10) {
    // Börja fadea när någon status är under 10
    let opacityValue = Math.min(hunger, happiness, energy) / 10;
    tamagotchi.style.opacity = opacityValue.toString();

    console.log(`Tamagotchi fadar: Opacity är nu ${opacityValue}`);

    // När status är 0, sätt opacity till 0 för att dölja helt
    if (hunger === 0 || happiness === 0 || energy === 0) {
      tamagotchi.style.opacity = "0";
      console.log("Tamagotchi har försvunnit helt.");
    }
  } else if (hunger < 20 || happiness < 20 || energy < 20) {
    tamagotchi.style.backgroundColor = "red"; // Låg status
    tamagotchi.style.opacity = "1"; // Helt synlig vid röd färg
    console.log(
      "Utseende ändrat: Husdjuret är nu rött på grund av låg status."
    );
  } else if (hunger < 50 || happiness < 50 || energy < 50) {
    tamagotchi.style.backgroundColor = "yellow"; // Medellåg status
    tamagotchi.style.opacity = "1";
    console.log(
      "Utseende ändrat: Husdjuret är nu gult på grund av medellåg status."
    );
  } else {
    tamagotchi.style.backgroundColor = "green"; // Bra status
    tamagotchi.style.opacity = "1";
    console.log("Utseende ändrat: Husdjuret är nu grönt (god status).");
  }
}

function resetGame() {
  hunger = 60;
  happiness = 60;
  energy = 60;
  console.log("Spelet återställs. Statusvärden sätts till 50.");
  updateStatus();
}
