let player_card_data = [];
let cpu_card_data = [];

let MAX_NUMBER = 21;

let MAX_RANGE = 11;

function get_ace_value(value, ace_value) {
    let ace_string = value;
    for (let i = 0; i < ace_value; i++) { ace_string -= 10; }
    return ace_string;
}

function get_card_data(card) {
    let real_value = 0;
    let ace_value = 0;
    let string = "";
    for (let data in card) {
        if (card[data].value == 11) ace_value += 1;
        real_value += card[data].value;
    }
    string = real_value;
    let ace_string = 0;
    if (ace_value > 0) {
        ace_string = get_ace_value(real_value, ace_value);
        string += ` (${ace_string})`
    }

    return {
        string: string,
        real_value: real_value,
        ace_string: ace_string,
    };
}

function getRndInteger(min, max) { return Math.floor(Math.random() * ((max+1) - min) ) + min; }

function drawCard(value) {
    value.push({ value: getRndInteger(1, MAX_RANGE), });

    let card_value = get_card_data(player_card_data);

    if (card_value.ace_string >= MAX_NUMBER) {
        if (card_value.ace_string == MAX_NUMBER) hit_max = true;
        allow_player_hit = false;
        updateDisplay();
        return;
    }

    if (card_value.real_value >= MAX_NUMBER && card_value.ace_string == 0) {
        if (card_value.real_value == MAX_NUMBER) hit_max = true;
        allow_player_hit = false;
        updateDisplay();
        return;
    }
    updateDisplay();
}

let allow_player_hit = true;
let hit_max = false;
function draw_player_card() {
    drawCard(player_card_data);
}

function reset_game() {
    player_card_data = [];
    cpu_card_data = [];
    allow_player_hit = true;
    hit_max = false;
    updateDisplay();
}

function stand() {
    allow_player_hit = false;
}

function updateDisplay() {
    let statusHTML = `
        <h2> Your goal is to hit until you get either ${MAX_NUMBER} or you bust!</h2>
        <p style="font-size: 20px;">It plays similar to BlackJack, Aces are 11 or 1's.</p>
        <p style="font-size: 25px;">- Card Amount -<br>${get_card_data(player_card_data).string}</p>
    `;

    if (hit_max)
        statusHTML += `
            <p>You Hit the max!</p>
        `;
    else if (!allow_player_hit)
        statusHTML += `
            <p>You Busted!</p>
        `;

    // Append Buttons
    if (allow_player_hit)
        statusHTML += `
            <button onclick="draw_player_card()">Hit</button>
        `;
    statusHTML += `
        <button onclick="reset_game()">Reset</button>
        <br><br>
        <form id="max_form">
            - Max Number -<br><input type="text" name="max" value="${MAX_NUMBER}"><br><br>
            <input type="button" onclick="set_max_number()" value="Set Max Number" >
        </form>
        <br><br>
        <form id="length_form">
            - Max Random Length -<br><input type="text" name="length" value="${MAX_RANGE}"><br><br>
            <input type="button" onclick="set_max_length()" value="Set Max Random Length" >
        </form>
    `;

    document.getElementById("game-area").innerHTML = statusHTML;
}

function set_max_number() {
    const set_value = document.getElementById("max_form").max.value;
    MAX_NUMBER = set_value;
    updateDisplay();
}

function set_max_length() {
    const set_value = parseInt(document.getElementById("length_form").length.value);
    MAX_RANGE = set_value;
    updateDisplay();
}

updateDisplay();