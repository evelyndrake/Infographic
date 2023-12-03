var cardNums = 0;
var PAGE_SIZE = 10;
// Load cards from database and display them on the page
var pokemon = [];
$.getJSON("/cards", function(data) {
    for (var i = 0; i < data.results.length; i++) {
        pokemon.push(data.results[i]);
    }
    console.log(pokemon.length)
    console.log(data);

var deck = document.getElementById("deck");

loadMoreCards();

async function drawElements() {
    
    for (var x = cardNums; x < cardNums + PAGE_SIZE; x++) {
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
        // var flipper = p.appendChild(document.createElement("div"));
        // flipper.className = "flipper";
        
        await $.getJSON(pokemon[x].url, function(data) {
            // var front = flipper.appendChild(document.createElement("div"));
            // front.className = "card-img-bottom";
            // front.id = "front";
            // var back = flipper.appendChild(document.createElement("div"));
            // back.className = "card-img-bottom back";
            // back.id = "back";
            var img = p.appendChild(document.createElement("img"));
            img.className = "card-img-top";
            img.src = data.sprites.front_default;
            // front.appendChild(document.createElement("img")).src = data.sprites.front_default;
            // back.appendChild(document.createElement("img")).src = data.sprites.back_default;
        });
        // p.innerHTML = "Some quick example text to build on the card title and make up the bulk of the card's content.";
        // var footer = new_card.appendChild(document.createElement("div"));
        // footer.className = "card-footer";
        // footer.innerHTML = "Footer";
        deck.appendChild(new_card);
    }
    loadMoreCards();
}
});
const container = document.querySelector('.container');
window.addEventListener('scroll', ()=>{
    
    console.log("scrolly" + (window.scrollY + window.innerHeight)) //scrolled from top
    console.log("sh" + document.documentElement.scrollHeight) //visible part of screen
    if (window.scrollY + window.innerHeight + 1 > document.documentElement.scrollHeight) {
        // run drawElements() again
        cardNums += PAGE_SIZE;
        loadMoreCards();
    }
})

async function loadMoreCards() {
    
    console.log("Loading more cards...");
    for (var x = cardNums; x < cardNums + PAGE_SIZE; x++) {
        if (x >= pokemon.length) {
            console.log("No more cards to load.");
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
        });
        

        deck.appendChild(new_card);
        // when button clicked, change modal content
        
    }
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
    });
    

    var modal_text = modal_body.appendChild(document.createElement("p"));
    modal_text.innerHTML = "Some quick example text to build on the card title and make up the bulk of the card's content.";
}