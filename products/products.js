const createCard = (product_details) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";

    const image = document.createElement("img");
    image.classList.add("card-img-top");
    image.src = product_details.image;
    card.appendChild(image);

    const card_body = document.createElement("div");
    card_body.classList.add("card-body");
    card.appendChild(card_body);

    const card_title = document.createElement("h5");
    card_title.classList.add("card-title");
    card_title.textContent = product_details.name;
    card_body.appendChild(card_title);

    const card_description = document.createElement("p");
    card_description.classList.add("card-text");
    card_description.textContent = product_details.description;
    card_body.appendChild(card_description);

    const product_price = document.createElement("div");
    product_price.classList.add("card-text", "fs-6", "fw-semibold");
    product_price.textContent = `$${product_details.price}`;
    card_body.appendChild(product_price);

    const button = document.createElement("a");
    button.classList.add("btn","btn-primary");
    button.href = "#";
    button.textContent = "Go somewhere";
    card_body.appendChild(button);

    return card;
}

const product_card_container = document.querySelector("main .product_card_container");

// import data from json file
fetch("./products.json")
.then(res => res.json())
.then(products => {
    products.forEach(product => {
        const product_card = createCard(product);
        product_card_container.appendChild(product_card);
    });
})
.catch(err => console.log(err))
