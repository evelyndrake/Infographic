var cardNums = 0;
var PAGE_SIZE = 10;
// Load cards from database and display them on the page
var pokemon = [];
$.getJSON("/cards", function(data) {
    for (var i = 0; i < data.results.length; i++) {
        pokemon.push(data.results[i]);
    }

var deck = document.getElementById("deck");

loadMoreCards();
});
const container = document.querySelector('.container');
window.addEventListener('scroll', ()=>{
    if (window.scrollY + window.innerHeight + 1 > document.documentElement.scrollHeight) {
        // run drawElements() again
        
        // load more cards if search bar empty
        if (search.value == "") {
            cardNums += PAGE_SIZE;
            loadMoreCards();
        }
    }
})

async function loadMoreCards() {
    for (var x = cardNums; x < cardNums + PAGE_SIZE; x++) {
        if (x >= pokemon.length) {
            return;
        }
        var new_card = document.createElement("div");
        new_card.className = "card";
        var div = new_card.appendChild(document.createElement("div"));
        div.className = "card-body";
        var h4 = div.appendChild(document.createElement("h4"));
        h4.className = "card-title";
        // capitalize first letter of name
        h4.innerHTML = pokemon[x].name.charAt(0).toUpperCase() + pokemon[x].name.slice(1);
        var subtitle = div.appendChild(document.createElement("p"));
        subtitle.className = "card-subtitle mb-2 text-muted";
        subtitle.innerHTML = "#" + (x + 1);
        var p = div.appendChild(document.createElement("p"));
        p.className = "card-text";
        await $.getJSON(pokemon[x].url, function(data) {
            var img = p.appendChild(document.createElement("img"));
            img.className = "card-img-top";
            img.src = data.sprites.front_default;
            img.setAttribute("data-bs-toggle", "modal");
            img.setAttribute("data-bs-target", "#infoModal");
            // when button clicked, run setmodal with id parameter

            img.onclick = (function(x) {
                return function() {
                    setModal(x);
                }
            })(x);
            // create container for badges
            var badge_group = div.appendChild(document.createElement("div"));
            badge_group.className = "badge-group row justify-content-center";
            for (var i = 0; i < data.types.length; i++) {
                // create column for each badge
                var badge_col = badge_group.appendChild(document.createElement("div"));
                badge_col.className = "col-auto";
                // create badge
                var badge = badge_col.appendChild(document.createElement("span"));
                badge.className = "badge bg-primary";
                badge.innerHTML = data.types[i].type.name.charAt(0).toUpperCase() + data.types[i].type.name.slice(1);
                // give each badge a different color
                if (data.types[i].type.name == "normal") {
                    badge.className = "badge bg-secondary";
                } else if (data.types[i].type.name == "fighting") {
                    badge.className = "badge bg-danger";
                } else if (data.types[i].type.name == "flying") {
                    badge.className = "badge bg-info";
                } else if (data.types[i].type.name == "poison") {
                    badge.className = "badge bg-success";
                } else if (data.types[i].type.name == "ground") {
                    badge.className = "badge bg-warning text-dark";
                } else if (data.types[i].type.name == "rock") {
                    badge.className = "badge bg-secondary";
                } else if (data.types[i].type.name == "bug") {
                    badge.className = "badge bg-success";
                } else if (data.types[i].type.name == "ghost") {
                    badge.className = "badge bg-dark";
                } else if (data.types[i].type.name == "steel") {
                    badge.className = "badge bg-secondary";
                } else if (data.types[i].type.name == "fire") {
                    badge.className = "badge bg-danger";
                } else if (data.types[i].type.name == "water") {
                    badge.className = "badge bg-primary";
                } else if (data.types[i].type.name == "grass") {
                    badge.className = "badge bg-success";
                } else if (data.types[i].type.name == "electric") {
                    badge.className = "badge bg-warning text-dark";
                } else if (data.types[i].type.name == "psychic") {
                    badge.className = "badge bg-danger";
                } else if (data.types[i].type.name == "ice") {
                    badge.className = "badge bg-info";
                } else if (data.types[i].type.name == "dragon") {
                    badge.className = "badge bg-primary";
                } else if (data.types[i].type.name == "dark") {
                    badge.className = "badge bg-dark";
                } else if (data.types[i].type.name == "fairy") {
                    badge.className = "badge bg-danger";
                }
            }
        });
        

        deck.appendChild(new_card);
        // when button clicked, change modal content
        
    }
}

async function loadAllCards() {
    // deck.style.display = "none";
    cardNums = 0;
    deck.innerHTML = "";
    for (var x = 0; x < pokemon.length; x++) {
        var new_card = document.createElement("div");
        new_card.className = "card";
        var div = new_card.appendChild(document.createElement("div"));
        div.className = "card-body";
        var h4 = div.appendChild(document.createElement("h4"));
        h4.className = "card-title";
        // capitalize first letter of name
        h4.innerHTML = pokemon[x].name.charAt(0).toUpperCase() + pokemon[x].name.slice(1);
        var subtitle = div.appendChild(document.createElement("p"));
        subtitle.className = "card-subtitle mb-2 text-muted";
        subtitle.innerHTML = "#" + (x + 1);
        var p = div.appendChild(document.createElement("p"));
        p.className = "card-text";
        await $.getJSON(pokemon[x].url, function(data) {
            var img = p.appendChild(document.createElement("img"));
            img.className = "card-img-top";
            img.src = data.sprites.front_default;
            img.setAttribute("data-bs-toggle", "modal");
            img.setAttribute("data-bs-target", "#infoModal");
            // when button clicked, run setmodal with id parameter
            img.onclick = (function(x) {
                return function() {
                    setModal(x);
                }
            })(x);
            // create container for badges
            var badge_group = div.appendChild(document.createElement("div"));
            badge_group.className = "badge-group row justify-content-center";
            for (var i = 0; i < data.types.length; i++) {
                // create column for each badge
                var badge_col = badge_group.appendChild(document.createElement("div"));
                badge_col.className = "col-auto";
                // create badge
                var badge = badge_col.appendChild(document.createElement("span"));
                badge.className = "badge bg-primary";
                badge.innerHTML = data.types[i].type.name.charAt(0).toUpperCase() + data.types[i].type.name.slice(1);
                // give each badge a different color
                if (data.types[i].type.name == "normal") {
                    badge.className = "badge bg-secondary";
                } else if (data.types[i].type.name == "fighting") {
                    badge.className = "badge bg-danger";
                } else if (data.types[i].type.name == "flying") {
                    badge.className = "badge bg-info";
                } else if (data.types[i].type.name == "poison") {
                    badge.className = "badge bg-success";
                } else if (data.types[i].type.name == "ground") {
                    badge.className = "badge bg-warning text-dark";
                } else if (data.types[i].type.name == "rock") {
                    badge.className = "badge bg-secondary";
                } else if (data.types[i].type.name == "bug") {
                    badge.className = "badge bg-success";
                } else if (data.types[i].type.name == "ghost") {
                    badge.className = "badge bg-dark";
                } else if (data.types[i].type.name == "steel") {
                    badge.className = "badge bg-secondary";
                } else if (data.types[i].type.name == "fire") {
                    badge.className = "badge bg-danger";
                } else if (data.types[i].type.name == "water") {
                    badge.className = "badge bg-primary";
                } else if (data.types[i].type.name == "grass") {
                    badge.className = "badge bg-success";
                } else if (data.types[i].type.name == "electric") {
                    badge.className = "badge bg-warning text-dark";
                } else if (data.types[i].type.name == "psychic") {
                    badge.className = "badge bg-danger";
                } else if (data.types[i].type.name == "ice") {
                    badge.className = "badge bg-info";
                } else if (data.types[i].type.name == "dragon") {
                    badge.className = "badge bg-primary";
                } else if (data.types[i].type.name == "dark") {
                    badge.className = "badge bg-dark";
                } else if (data.types[i].type.name == "fairy") {
                    badge.className = "badge bg-danger";
                }
            }
        });
        deck.appendChild(new_card);
        deck.style.display = "";
    }
}

async function loadSpecificCard(x) {
    // deck.style.display = "none";
    var new_card = document.createElement("div");
    new_card.className = "card";
    var div = new_card.appendChild(document.createElement("div"));
    div.className = "card-body";
    var h4 = div.appendChild(document.createElement("h4"));
    h4.className = "card-title";
    // capitalize first letter of name
    h4.innerHTML = pokemon[x].name.charAt(0).toUpperCase() + pokemon[x].name.slice(1);
    var subtitle = div.appendChild(document.createElement("p"));
    subtitle.className = "card-subtitle mb-2 text-muted";
    subtitle.innerHTML = "#" + (x + 1);
    var p = div.appendChild(document.createElement("p"));
    p.className = "card-text";
    await $.getJSON(pokemon[x].url, function(data) {
        var img = p.appendChild(document.createElement("img"));
        img.className = "card-img-top";
        img.src = data.sprites.front_default;
        img.setAttribute("data-bs-toggle", "modal");
        img.setAttribute("data-bs-target", "#infoModal");
        // when button clicked, run setmodal with id parameter
        img.onclick = (function(x) {
            return function() {
                setModal(x);
            }
        })(x);
        // create container for badges
        var badge_group = div.appendChild(document.createElement("div"));
        badge_group.className = "badge-group row justify-content-center";
        for (var i = 0; i < data.types.length; i++) {
            // create column for each badge
            var badge_col = badge_group.appendChild(document.createElement("div"));
            badge_col.className = "col-auto";
            // create badge
            var badge = badge_col.appendChild(document.createElement("span"));
            badge.className = "badge bg-primary";
            badge.innerHTML = data.types[i].type.name.charAt(0).toUpperCase() + data.types[i].type.name.slice(1);
            // give each badge a different color
            if (data.types[i].type.name == "normal") {
                badge.className = "badge bg-secondary";
            } else if (data.types[i].type.name == "fighting") {
                badge.className = "badge bg-danger";
            } else if (data.types[i].type.name == "flying") {
                badge.className = "badge bg-info";
            } else if (data.types[i].type.name == "poison") {
                badge.className = "badge bg-success";
            } else if (data.types[i].type.name == "ground") {
                badge.className = "badge bg-warning text-dark";
            } else if (data.types[i].type.name == "rock") {
                badge.className = "badge bg-secondary";
            } else if (data.types[i].type.name == "bug") {
                badge.className = "badge bg-success";
            } else if (data.types[i].type.name == "ghost") {
                badge.className = "badge bg-dark";
            } else if (data.types[i].type.name == "steel") {
                badge.className = "badge bg-secondary";
            } else if (data.types[i].type.name == "fire") {
                badge.className = "badge bg-danger";
            } else if (data.types[i].type.name == "water") {
                badge.className = "badge bg-primary";
            } else if (data.types[i].type.name == "grass") {
                badge.className = "badge bg-success";
            } else if (data.types[i].type.name == "electric") {
                badge.className = "badge bg-warning text-dark";
            } else if (data.types[i].type.name == "psychic") {
                badge.className = "badge bg-danger";
            } else if (data.types[i].type.name == "ice") {
                badge.className = "badge bg-info";
            } else if (data.types[i].type.name == "dragon") {
                badge.className = "badge bg-primary";
            } else if (data.types[i].type.name == "dark") {
                badge.className = "badge bg-dark";
            } else if (data.types[i].type.name == "fairy") {
                badge.className = "badge bg-danger";
            }
        }
    });
    deck.appendChild(new_card);
    deck.style.display = "";
}

async function setModal(id) {
    var modal_title = document.getElementById("modal_title");
    var modal_body = document.getElementById("modal_body");
    modal_body.innerHTML = "";
    var modal_img = modal_body.appendChild(document.createElement("img"));
    var modal_img_back = modal_body.appendChild(document.createElement("img"));
    await $.getJSON(pokemon[id].url, function(data) {
        modal_title.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        modal_img.src = data.sprites.front_default;
        modal_img_back.src = data.sprites.back_default;
        modal_img.className = "modal-img";
        modal_img_back.className = "modal-img";
        modal_body.appendChild(document.createElement("hr"));
        // if back sprite not found, hide back sprite
        if (data.sprites.back_default == null) {
            modal_img_back.style.display = "none";
        } else {
            modal_img_back.style.display = "";
        }
        // pokemon info in modal body
        var info = modal_body.appendChild(document.createElement("p"));
        info.innerHTML = "Height: " + data.height/10 + " m" + "<br>Weight: " + data.weight/10 + " kg";
        // pokemon types in modal body
        var types = modal_body.appendChild(document.createElement("p"));
        types.innerHTML = "Type(s): ";
        for (var i = 0; i < data.types.length; i++) {
            types.innerHTML += data.types[i].type.name.charAt(0).toUpperCase() + data.types[i].type.name.slice(1);
            if (i != data.types.length - 1) {
                types.innerHTML += ", ";
            }
        }

        // group of buttons to expand pokemon stats, moves, abilities, etc.
        var group = modal_body.appendChild(document.createElement("div"));
        group.className = "btn-group";
        group.id = "btnGroup"
        group.setAttribute("role", "group");
        group.setAttribute("aria-label", "Basic example");

        // button to expand pokemon abilities
        var abilities = group.appendChild(document.createElement("button"));
        abilities.className = "btn btn-primary";
        abilities.setAttribute("data-bs-toggle", "collapse");
        abilities.setAttribute("data-bs-target", "#abilities");
        abilities.innerHTML = "Abilities";
        // pokemon abilities in modal body
        var abilities_div = modal_body.appendChild(document.createElement("div"));
        abilities_div.className = "collapse";
        abilities_div.id = "abilities";
        var abilities_table = abilities_div.appendChild(document.createElement("table"));
        abilities_table.className = "table table-striped";
        var thead = abilities_table.appendChild(document.createElement("thead"));
        var tbody = abilities_table.appendChild(document.createElement("tbody"));
        var tr = thead.appendChild(document.createElement("tr"));
        var th = tr.appendChild(document.createElement("th"));
        th.innerHTML = "Ability";
        th = tr.appendChild(document.createElement("th"));
        th.innerHTML = "Hidden";
        th = tr.appendChild(document.createElement("th"));
        th.innerHTML = "Slot";
        for (var i = 0; i < data.abilities.length; i++) {
            tr = tbody.appendChild(document.createElement("tr"));
            var td = tr.appendChild(document.createElement("td"));
            td.innerHTML = data.abilities[i].ability.name.charAt(0).toUpperCase() + data.abilities[i].ability.name.slice(1);
            td = tr.appendChild(document.createElement("td"));
            td.innerHTML = data.abilities[i].is_hidden;
            td = tr.appendChild(document.createElement("td"));
            td.innerHTML = data.abilities[i].slot;
        }

        // button to expand pokemon moves
        var moves = group.appendChild(document.createElement("button"));
        moves.className = "btn btn-success";
        moves.setAttribute("data-bs-toggle", "collapse");
        moves.setAttribute("data-bs-target", "#moves");
        moves.innerHTML = "Moves";
        // pokemon moves in modal body
        var moves_div = modal_body.appendChild(document.createElement("div"));
        moves_div.className = "collapse";
        moves_div.id = "moves";
        var moves_table = moves_div.appendChild(document.createElement("table"));
        moves_table.className = "table table-striped";
        var thead = moves_table.appendChild(document.createElement("thead"));
        var tbody = moves_table.appendChild(document.createElement("tbody"));
        var tr = thead.appendChild(document.createElement("tr"));
        var th = tr.appendChild(document.createElement("th"));
        th.innerHTML = "Move";
        th = tr.appendChild(document.createElement("th"));
        th.innerHTML = "Level";
        th = tr.appendChild(document.createElement("th"));
        th.innerHTML = "Learn Method";
        for (var i = 0; i < data.moves.length; i++) {
            tr = tbody.appendChild(document.createElement("tr"));
            var td = tr.appendChild(document.createElement("td"));
            td.innerHTML = data.moves[i].move.name.charAt(0).toUpperCase() + data.moves[i].move.name.slice(1);
            td = tr.appendChild(document.createElement("td"));
            td.innerHTML = data.moves[i].version_group_details[0].level_learned_at;
            td = tr.appendChild(document.createElement("td"));
            td.innerHTML = data.moves[i].version_group_details[0].move_learn_method.name.charAt(0).toUpperCase() + data.moves[i].version_group_details[0].move_learn_method.name.slice(1);
        }

        // button to expand pokemon stats
        var stats = group.appendChild(document.createElement("button"));
        stats.className = "btn btn-danger";
        stats.setAttribute("data-bs-toggle", "collapse");
        stats.setAttribute("data-bs-target", "#stats");
        stats.innerHTML = "Stats";
        // pokemon stats in modal body
        var stats_div = modal_body.appendChild(document.createElement("div"));
        stats_div.className = "collapse";
        stats_div.id = "stats";
        var stats_table = stats_div.appendChild(document.createElement("table"));
        stats_table.className = "table table-striped";
        var thead = stats_table.appendChild(document.createElement("thead"));
        var tbody = stats_table.appendChild(document.createElement("tbody"));
        var tr = thead.appendChild(document.createElement("tr"));
        var th = tr.appendChild(document.createElement("th"));
        th.innerHTML = "Stat";
        th = tr.appendChild(document.createElement("th"));
        th.innerHTML = "Base Stat";
        th = tr.appendChild(document.createElement("th"));
        th.innerHTML = "Effort";
        for (var i = 0; i < data.stats.length; i++) {
            tr = tbody.appendChild(document.createElement("tr"));
            var td = tr.appendChild(document.createElement("td"));
            td.innerHTML = data.stats[i].stat.name.charAt(0).toUpperCase() + data.stats[i].stat.name.slice(1);
            td = tr.appendChild(document.createElement("td"));
            td.innerHTML = data.stats[i].base_stat;
            td = tr.appendChild(document.createElement("td"));
            td.innerHTML = data.stats[i].effort;
        }
        // when one button is clicked, collapse the others
        abilities.onclick = function() {
            moves_div.classList.remove("show");
            stats_div.classList.remove("show");
        }
        moves.onclick = function() {
            abilities_div.classList.remove("show");
            stats_div.classList.remove("show");
        }
        stats.onclick = function() {
            abilities_div.classList.remove("show");
            moves_div.classList.remove("show");
        }


    });
    
    
}
// when search bar updated with text, filter cards
var search = document.getElementById("search");
// when search bar updated, load all cards once
// wait for user to stop typing
var timeout = null;
search.onkeyup = function() {
    clearTimeout(timeout);
    cardNums = 0;
    deck.innerHTML = "";
    timeout = setTimeout(filterCards2, 1000);
}
async function filterCards() {
    // hide deck until done
    // deck.style.display = "none";

        // clear deck
        cardNums = 0;
        deck.innerHTML = "";
        
        await loadAllCards();

    
    var filter = search.value.toUpperCase();
    var cards = document.getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
        var card_title = cards[i].getElementsByClassName("card-title")[0];
        if (card_title.innerHTML.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
    // if search bar empty, load more cards
    if (search.value == "") {
        cardNums = 0;
        deck.innerHTML = "";
        loadMoreCards();
        // hide search warning
        var search_warning = document.getElementById("search_warning");
        // search_warning.style.display = "none";
    }
    // show deck again
    deck.style.display = "";
}

async function filterCards2() {
    // hide deck until done
    // deck.style.display = "none";

    // clear deck
    cardNums = 0;
    deck.innerHTML = "";
    var load_more = document.getElementById("load_more");
    load_more.style.display = "none";
        

    
    var filter = search.value.toUpperCase();
    // load only cards that match search
    for (var i = 0; i < pokemon.length; i++) {
        if (pokemon[i].name.toUpperCase().indexOf(filter) > -1) {
            await loadSpecificCard(i);
        }
    }

    // if search bar empty, load more cards
    if (search.value == "") {
        cardNums = 0;
        deck.innerHTML = "";
        loadMoreCards();
        // hide search warning
        var search_warning = document.getElementById("search_warning");
        search_warning.style.display = "none";
        load_more.style.display = "";
    }
    // show deck again
    deck.style.display = "";
}



// show search warning with animation when search bar focused
// var search_warning = document.getElementById("search_warning");
search_warning.style.display = "none";
search.onfocus = function() {
    // search_warning.style.display = "block";
}
// hide search warning when search bar unfocused
search.onblur = function() {
    // search_warning.style.display = "none";
}
// clear search bar on page refresh
search.value = "";

// when load_more button pressed, load more cards
var load_more = document.getElementById("load_more");
load_more.onclick = function() {
    cardNums += PAGE_SIZE;
    loadMoreCards();
}

