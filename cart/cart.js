const updateTotalPrice = () => {
    let total_price = 0;
    document.querySelectorAll(".product_card").forEach(product => {
        const quantity = parseFloat(product.getAttribute("quantity"));
        const price = parseFloat(product.getAttribute("price"));
        total_price += quantity*price;
    });
    document.getElementById("cart_total").textContent = total_price.toFixed(2);
}

const createCard = (product) => {
    const container = document.createElement("div");
    container.setAttribute("quantity", product.quantity);
    container.setAttribute("price", product.price);
    container.classList.add("product_card");

    const img = document.createElement("img");
    img.src = product.image;
    container.appendChild(img);

    const title = document.createElement("div");
    title.classList.add('title');
    title.textContent = product.name;
    container.appendChild(title);

    const price = document.createElement("div");
    price.classList.add('price');
    price.textContent = `$${product.price}`;
    container.appendChild(price);

    const action_container = document.createElement("div");
    action_container.classList.add("actions");
    container.appendChild(action_container);

    const quantity = document.createElement("input");
    quantity.classList.add('quantity');
    quantity.type = "number";
    quantity.min = 1;
    quantity.max = 10;
    quantity.value = product.quantity;
    action_container.appendChild(quantity);
    quantity.addEventListener("change", (event) => {
        container.setAttribute("quantity", event.target.value);
        updateTotalPrice();
    });

    const remove_button = document.createElement("button");
    remove_button.classList.add('remove_product');
    remove_button.textContent = "Remove";
    action_container.appendChild(remove_button);

    // add remove event listener
    remove_button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        let products = JSON.parse(localStorage.getItem("cart"));
        products = products.filter((prod) => prod.name!==product.name);
        localStorage.setItem("cart", JSON.stringify(products));
        container.remove();
        updateTotalPrice();
    });

    return container;
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("./cart.json")
    .then(res => res.json())
    .then(products => {
        // console.log(products);
        localStorage.setItem("cart", JSON.stringify(products) || []);

        const card_container = document.querySelector(".products_container");
        card_container.textContent = "";

        if(!JSON.parse(localStorage.getItem("cart"))?.length){
            card_container.textContent = "Your cart is empty.";
            return;
        }

        let total_price = 0;
        JSON.parse(localStorage.getItem("cart")).forEach((product, index) => {
            const card = createCard(product);
            card_container.appendChild(card);

            total_price += product.quantity * product.price;
        });
        localStorage.setItem("total_price", total_price.toString());
        document.getElementById("cart_total").textContent = total_price;
    })
    .catch(error => {
        console.log(error);
    })
});