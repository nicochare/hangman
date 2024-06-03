const hangmanWords = ["Apple", "Banana", "Carrot", "Dragon", "Eagle", "Flower", "Giraffe", "Horse", "Island", "Jungle", "Kitten", "Lemon", "Monkey", "Napkin", "Orange", "Pumpkin", "Quilt", "Rainbow", "Sunshine", "Tiger", "Unicorn", "Violet", "Waterfall", "Xylophone", "Yacht", "Zebra", "Airplane", "Balloon", "Chocolate", "Dolphin", "Elephant", "Firefly", "Garden", "Helicopter", "Igloo", "Jellyfish", "Kangaroo", "Lighthouse", "Mountain", "Notebook", "Octopus", "Penguin", "Quicksand", "Raccoon", "Strawberry", "Tumbleweed", "Umbrella", "Volcano", "Whistle", "Xenon", "Yak", "Zipper", "Almond", "Bicycle", "Cactus", "Diamond", "Envelope", "Feather", "Grapefruit", "Hummingbird", "Iceberg", "Jasmine", "Koala", "Lollipop", "Mango", "Necklace", "Olive", "Pancake", "Quokka", "Robot", "Seahorse", "Telescope", "Ukulele", "Vacation", "Windmill", "Xylophone", "Yogurt", "Zebra", "Apricot", "Broccoli", "Cupcake", "Doughnut", "Evergreen", "Fireplace", "Guitar", "Hedgehog", "Iguana", "Jellybean", "Kaleidoscope", "Ladybug", "Marigold", "Nest", "Ostrich", "Pineapple", "Quartz", "Raindrop", "Snowflake", "Teacup", "Ukelele", "Vulture"];
const bodyparts = document.getElementsByName("bodypart");
const hanger = document.getElementById("hanger");
const start_modal = new bootstrap.Modal(document.getElementById('start_modal'), {
    backdrop: 'static',
    keyboard: false,
});
const rules_button = document.getElementById("rules");
const rules_modal = new bootstrap.Modal(document.getElementById('rules_modal'), {
    backdrop: 'static',
    keyboard: false, 
});
const end_modal = new bootstrap.Modal(document.getElementById('end_modal'), {
    backdrop: 'static',
    keyboard: false,
});
const restart_button = document.getElementById("restart");
const close_end_button = document.getElementById("close_end_button");
const result_text = document.getElementById("result_text");

const close_rules = document.getElementsByName("close_rules");

const underscores_cont = document.getElementById("underscores_cont");
var unders_list;

const keyboard = document.getElementById("keyboard");
const keys = document.getElementsByName("key");
keys.forEach((child) => {
    child.addEventListener("click", key_clicked.bind(null, child));
});

const keep_guessing = document.getElementById("keep_guessing");
const keep_guessing_toast = bootstrap.Toast.getOrCreateInstance(keep_guessing)
const kept_restart = document.getElementById("kept_restart");

var _guess_;
var lifes = 6;
const won_games = 0;

function getRandomNumber() {
    return Math.floor(Math.random() * hangmanWords.length) + 1;
}

function getRandomWord() {
    return hangmanWords[getRandomNumber()];
}

function set_underscores(l) {
    underscores_cont.innerHTML = '';
    for (var i = 0; i < l; i++) {
        const underscore = document.createElement("p");
        underscore.innerText = "_";
        underscore.classList = "fs-1 hangman-font underscore";
        underscores_cont.appendChild(underscore);
    }
    unders_list = underscores_cont.childNodes;
}

function start() {
    _guess_ = getRandomWord();
    _guess_ = _guess_.toUpperCase();
    var w_length = _guess_.length;
    hanger.classList.toggle("invisible");
    lifes = 6;
    set_underscores(w_length);
    keyboard.classList.toggle("invisible");
}

function get_underscores() {
    return underscores_cont.childNodes;
}

function show_letters(letter) {
    var i = 0;
    var index = _guess_.indexOf(letter, i);

    while (index > -1) {
        unders_list[index].innerText = letter;
        i += 1;
        index = _guess_.indexOf(letter, i);
    }
}

function lose_life() {
    bodyparts[6-lifes].classList.toggle("invisible");
    lifes = lifes - 1;
}

function no_underscores() {
    var i = 0;
    while (unders_list[i].innerText != "_" && i < _guess_.length-1)
    {
        i += 1;
    }
    if (unders_list[i].innerText != "_") {
        return true;
    } else {
        return false;
    }
}

function set_body_invis() {
    for (var i = 0; i < bodyparts.length; i++) {
        if (!bodyparts[i].classList.contains("invisible")) {
            bodyparts[i].classList.add("invisible");
        }
    }
}

function enable_letters() {
    for (var i = 0; i < keys.length; i++) {
        keys[i].disabled = false;
    }
}

function restart() {
    hanger.classList.toggle("invisible");
    keyboard.classList.toggle("invisible");
    enable_letters();
    set_body_invis();
    start();
}

function now_restart() {
    kept_restart.classList.toggle("invisible");
    restart();
}

function show_toast() {
    kept_restart.classList.toggle("invisible");
    kept_restart.addEventListener("click", now_restart);
    keep_guessing_toast.show();
}

function end(result) {
    if (result) {
        result_text.innerText = "You win!";
    } else {
        result_text.innerText = "You lost.";
    }
    restart_button.addEventListener("click", restart);
    close_end_button.addEventListener("click", show_toast);
    end_modal.show();
}

function won() {
    won_games = won_games + 1;
    end(true);
}

function lost() {
    end(false);
}

function check_inword(letter) {
    if (_guess_.includes(letter)) {
        show_letters(letter);
        if (no_underscores()) {
            if (lifes > 0) {
                won();
            }
        }
    } else {
        lose_life();
        if (lifes == 0) {
            lost();
        }
    }
}

function key_clicked(key) {
    key.disabled = true;
    check_inword(key.innerText);
}
    
function get_won_games() {
    return won_games;
}

start_modal.show();
rules_button.addEventListener("click", function() {
    start_modal.hide();
    rules_modal.show();
    close_rules.forEach((child) => {
        child.addEventListener("click", function() {
            rules_modal.hide();    
            start_modal.show();
        })});
});
    
const play_button = document.getElementById("play");
play_button.addEventListener("click", start);
get_won_games();