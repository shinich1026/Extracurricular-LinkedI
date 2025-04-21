let gpa = 0;
let health = 100;
let gold = 50;
let currentTool = 0;
let fighting;
let monsterHealth;
let inventory = ["computer"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const gpaText = document.querySelector("#gpaText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const helthText = document.querySelector("#healthText");
const monsterStats = document.querySelector("#teacherStats");
const monsterNameText = document.querySelector("#teacherName");
const monsterHealthText = document.querySelector("#teacherHealth");

const locations = [
    {
        name: "Respone point",
        "button text": ["Go to geegle", "Go to NIC", "Fight NIC"],
        "button functions": [goGeegle, goClassroom, fightNIC],
        text: "Your enter the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Charge 10 Caffeine (10 gold)", "Get AI tool (30 gold)", "Go to Home"],
        "button functions": [getCaffeine, getAI, goHome],
        text: "Your enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightGeorge, fightAndy, goHome],
        text: "Your enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goHome],
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Report"],
        "button functions": [goHome, goHome, easterEgg],
        text: "The monster screams 'Arg!' as it dies. You gain experience points and find gold."
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. ☠️"
    }
]

const weapons = [{
    name: "computer",
    power: 5
},
{
    name: "ShoutGPT",
    power: 30
},
{
    name: "Graemmarly",
    power: 50
},
{
    name: "Jemini",
    power: 100
}];

const monsters = [
    {
        name: "George",
        level: 2,
        health: 15
    },
    {
        name: "Andy",
        level: 8,
        health: 60
    },
    {
        name: "Hirose",
        level: 20,
        health: 300
    },
]


//initialize buttons

button1.onclick = goGeegle;
button2.onclick = goClassroom;
button3.onclick = fightNIC;

function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;// only works if the key is one string
}

function goHome(){
    update(locations[0]);
}
// back slash = escape character

function goGeegle(){
    update(locations[1]);
}

function goClassroom(){
    update(locations[2]);
    
}

function fightNIC(){
    fighting = 2;
    goFight();
    
}

function getCaffeine() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }  else{
        text.innerText = "You do not have enough gold to buy health.";
    }  
}

function getAI() {
    if(currentWeapon < 3){
        if(gold >= 30){
            gold -= 30;
            currentTool++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentTool].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        }else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
} else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
}
}

function sellWeapon(){
    if(inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    }else {
        text.innerText = "Don't sell your only weapon!";
    }
}
function fightGeorge(){
    fighting = 0;
    goFight();
}
function fightAndy(){
    fighting = 1;
    goFight();
}

function goTownsquare() {
    console.log("Going to town square.")
}

function attack() {
    text.innertext = "The " + monsters[fighting].name + " attacks.";
    text.innertext = "You attack it with your " + weapons[currentWeapon].name + ".";
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    if (health <= 0) {
        lose();
    }else if (monsterHealth <= 0){
        if (fighting === 2){
            winGame();
        }else {
            defeatMonster();
        }
    }
    
}

//age >= 18 ? adultFunction() : childFunction();

function dodge(){
    text.innertext = "You dodge the attack from the " + monsters[fighting].name + ".";
}
function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}
function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose(){
    update(locations[5]);
}

function easterEgg() {
    update(locations[5]);
}

function winGame() {
    text.innerText = "Congratulations! You defeated the dragon! You won the game! 🎉";
    update(locations[5]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}
