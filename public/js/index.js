document.addEventListener("DOMContentLoaded", () => {
    displayPokeTypeColor();
    //populatePaginationNav();
});

const populatePaginationNav = () => {
    let navParent = document.querySelector(".pagination-nav");

    let numberOfPages = Math.ceil(964 / 20);
    console.log(numberOfPages);
}

const displayPokeTypeColor = () => {
    let types = document.getElementsByClassName("poke-type");
    for (let i = 0; i < types.length; i++) {
        let backgroundColor = "transparent";
        let color = "black";
        switch(types[i].textContent) {
            case "normal":
                backgroundColor = "#A8A77A";
                break;
            case "fire":
                backgroundColor = "#EE8130";
                break;
            case "water":
                backgroundColor =  "#6390F0";
                break;
            case "electric":
                backgroundColor = "#F7D02C";
                break;
            case "grass":
                backgroundColor = "#7AC74C";
                break;
            case "ice":
                backgroundColor = "#96D9D6";
                break;
            case "fighting":
                backgroundColor = "#C22E28";
                color = "white";
                break;
            case "poison":
                backgroundColor = "#A33EA1";
                color = "white";
                break;
            case "ground":
                backgroundColor = "#E2BF65";
                break;
            case "flying":
                backgroundColor = "#A98FF3";
                break;
            case "psychic":
                backgroundColor = "#F95587";
                break;
            case "bug":
                backgroundColor = "#A6B91A";
                break;
            case "rock":
                backgroundColor = "#B6A136";
                break;
            case "ghost":
                backgroundColor = "#735797";
                color = "white";
                break;
            case "dragon":
                backgroundColor = "#6F35FC";
                color = "white";
                break;
            case "dark":
                backgroundColor = "#705746";
                color = "white";
                break;
            case "steel":
                backgroundColor = "#B7B7CE";
                break;
            case "fairy":
                backgroundColor = "#D685AD";
                break;
        }
        types[i].style.backgroundColor = backgroundColor;
        types[i].style.color = color;
    }
}