/* Global Variables */
let currentPresenter= 0;

let players = [
    "Jimi",
    "Tim",
    "Jojo",
    "Jazzy",
    "Trieu",
    "Kevin",
    "Stephen",
    "Alex",
    "Kernn",
    "Toby",
    "Zhao",
    "Winson",
    "Calvin",
    "Lyndon",
    "Johnny"
]

let beerList = [
    /*1*/{brewery: "Snake Lake Brewing",beername: "Skal",beertype: "Champagne Pilsner"},
    /*2*/{brewery: "Canmore Brewing",beername: "Railway Avenue",beertype: "Rye IPA / Strong Ale"},
    /*3*/{brewery: "Flying Monkey",beername: "The Chocolate Manifesto",beertype: "Triple Chocolate Milk Stout"},
    /*4*/{brewery: "The Establishment",beername: "My Best Friend's Girl",beertype: "Kolsch-Style Ale"},
    /*5*/{brewery: "Eighty Eight Brewing",beername: "Good Morning",beertype: "Vietnamese Coffee Stout"},
    /*6*/{brewery: "Hopworks Urban Brewery",beername: "When Life Gives You Blueberries",beertype: "Sour Ale"},
    /*7*/{brewery: "Rogue Ales",beername: "Dead 'N' Dead",beertype: "Whiskey barrel-aged Dead Guy Ale"},
    /*8*/{brewery: "Born Brewing",beername: "Canela",beertype: "Horchata Style Milk Stout"},
    /*9*/{brewery: "Analog Brewing",beername: "In Another Castle",beertype: "Peach Mango Milkshake IPA"},
    /*10*/{brewery: "Parallel 49 Brewing",beername: "Peach Bod",beertype: "Sparkling Peach Ale"},
    /*11*/{brewery: "Wychwood Brewery",beername: "Hobgoblin Ruby Beer",beertype: "English Bitter"},
    /*12*/{brewery: "Fernie Brewing Co.",beername: "Ghostrider",beertype: "Pumpkin Brown Ale"},
    /*13*/{brewery: "Flying Monkeys Craft Brewery",beername: "Space Age Sunshine",beertype: "Orange Creamsicle Quadruple IPA"},
    /*14*/{brewery: "Tailgunner Brewing Co.",beername: "Bobby Sox",beertype: "Dry-Hopped Sour"},
    /*15*/{brewery: "Unibroue",beername: "La Fin Du Monde",beertype: "Tripel"}
]

let scores = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
]

/* Beer Loader */
function loadBeers(){

    for (let i = 1; i < 16 ; i++) {
        /* assign image */
        let beerpic = "beerpic" + i;
        let beerimg = "img/beer" + i + ".png";
        document.getElementById(beerpic).src=beerimg;
        /* assign beer details */
        let curbrew = "brewery" + i;
        document.getElementById(curbrew).innerHTML=beerList[i-1].brewery;
        let curname = "beername" + i;
        document.getElementById(curname).innerHTML=beerList[i-1].beername;
        let curtype = "beertype" + i;
        document.getElementById(curtype).innerHTML=beerList[i-1].beertype;
    }
}

/* Beer Selection */
function beerSelected(x){
    /* First, clear all highlights. */
    
    for (let i = 1; i < 16 ; i++) {
        let boxclear = "box" + i;
        document.getElementById(boxclear).style=("background-color: rgba(146, 174, 235, 0.808);");
    }
    let chosenimg = "img/beer" + x + ".png";
    let chosenbox = "box" + x;
    let chosenp = "p" + (currentPresenter+1) + "choice";
    document.getElementById("beerpresenting").src=chosenimg;
    document.getElementById(chosenbox).style=("background-color:yellow");
    document.getElementById("numberpresent").innerHTML="#" + x;
    document.getElementById("brewerypresent").innerHTML=beerList[x-1].brewery;
    document.getElementById("namepresent").innerHTML=beerList[x-1].beername;
    document.getElementById("typepresent").innerHTML=beerList[x-1].beertype;
    document.getElementById(chosenp).value = x;
}

/* Presentations */

function shufflePlayers(){
    let para = "| "
    shuffleArray(players);
    localStorage.setItem("playerstorage",JSON.stringify(players));
    for (let i = 0; i < 15; i++) {
        para = para + players[i] + " | "
        let p = "p" + (i+1);
        document.getElementById(p).innerHTML=players[i] + ": ";
        document.getElementById("scoretable").rows[0].cells.item(i+1).innerHTML = players[i];
    }
    document.getElementById("presorder").innerHTML= para;
    document.getElementById("presenter").innerHTML= "Presenter 1: " + players[0];
    document.getElementById("shuffle").style="display:none;";
    document.getElementById("submission").style="display:block;margin:0 auto;";
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* Scores */

function submit() {
    let text = "Are you ready to submit scores for " + players[currentPresenter] + "'s presentation?";
    if (confirm(text) == true) {
        currentPresenter+=1;
        document.getElementById("presenter").innerHTML= "Presenter " + (currentPresenter+1) +": " + players[currentPresenter];
        scoreUpdate();
    } 
  
}

function scoreUpdate() {
    let x = document.getElementById("scoretable").rows[1].cells.item(1).innerHTML;
    let y = document.getElementById("scoretable").rows[1].cells.item(2).innerHTML;
    document.getElementById("testing").innerHTML = parseInt(x,10) + parseInt(y,10);
    for (let i = 0; i < 15; i++) {
        let choice = "p" + (i+1) + "choice";
        document.getElementById("scoretable").rows[currentPresenter].cells.item(i+1).innerHTML = document.getElementById(choice).value;
    }    
}

function rowScore(x){
    let presenterscore = 0;
    let actual = "p" + x + "actual";
    // First, calculate presenter score for each fool.
    for (let i = 1; i < 16; i++) {
        let presenter = document.getElementById("scoretable").rows[x].cells.item(x).innerHTML;
        let curr = document.getElementById("scoretable").rows[x].cells.item(i).innerHTML;
        if (curr == presenter) {
            presenterscore += 1000;
            scores[x-1] += 1000;
        } 
    }
    // Calculate score for each person that got it right, and change table colours.
    for (let i = 1; i < 16; i++) {
        let counter = 0;
        let col = document.getElementById("scoretable").rows[x].cells.item(i).innerHTML;         
        if (col == document.getElementById(actual).value) {
            scores[i-1]+=1000;
            counter+=1000;
            if (x == i) {
                document.getElementById("scoretable").rows[x].cells.item(i).style=("background-color:green;");
                scores[i-1]-=1000;
            }
            else {
                document.getElementById("scoretable").rows[x].cells.item(i).style=("background-color:rgba(199, 255, 199, 0.699);");
            }
            }
        else {
            if (x == i) {
                document.getElementById("scoretable").rows[x].cells.item(i).style=("background-color:rgb(197, 206, 74);");
                presenterscore -= 1000;
                scores[i-1]-=1000;
            }
            else {
                document.getElementById("scoretable").rows[x].cells.item(i).style=("background-color:red;");
            }
        }       
        document.getElementById("scoretable").rows[x].cells.item(i).innerHTML="+" + counter;
    }
    document.getElementById("scoretable").rows[x].cells.item(x).innerHTML = "+" + presenterscore;
}

function totalScore() {
    for (let i = 1; i < 16; i++) {
        document.getElementById("scoretable").rows[16].cells.item(i).innerHTML = scores[i-1];
    }
}
