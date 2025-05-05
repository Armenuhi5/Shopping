const container = document.querySelector(".container");
const basket = document.querySelector(".basket");
const card = [];

fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((result) => {
        result.products.forEach((product) => {
            const div = document.createElement("div");
            div.className = "product";
            div.innerHTML = `
                <img src="${product.thumbnail}">
                <h2>${product.title}</h2>
                <p class="not_m">${product.brand}</p>
                <p class="not_m">${product.price}$</p>
                <button class="buy">Buy Now</button>
            `;
            container.append(div);

            div.querySelector(".buy").addEventListener("click", () => {
                const found = card.find((item) => item.id === product.id);
                if (found) {
                    found.count++;
                } else {
                    card.push({ ...product, count: 1 });
                }
                Basket();
            });
        });
    });

const basketDiv = document.createElement("div");
basketDiv.className = "basketDiv";
basketDiv.style.display = "none"; 
container.append(basketDiv);

function Basket() {
    let totalPrice = 0;
    basketDiv.innerHTML = "";

    card.forEach((product) => {
        totalPrice += product.price * product.count;
    });

    totalPrice = Math.round(totalPrice * 100) / 100; 
    basketDiv.innerHTML += `<h2>Total Price: ${totalPrice}$</h2>`

    card.forEach((product) => {
        const miniDiv = document.createElement("div");
        miniDiv.className = "miniDiv";
        miniDiv.innerHTML = `
            <img src="${product.thumbnail}">
            <h1>${product.title}</h1>
            <p>${product.price}$</p>
            <button class="add">+</button> ${product.count} 
            <button class="del">-</button>
            <button class="delete"><i class="bi bi-trash3-fill"></i></button>
            <button class="credit"><i class="bi bi-credit-card-fill"></i></button>
        `;

        basketDiv.append(miniDiv);

        miniDiv.querySelector(".add").addEventListener("click", () => {
            product.count++;
            Basket();
        });

        miniDiv.querySelector(".del").addEventListener("click", () => {
            if (product.count > 1) product.count--;
            Basket();
        });

        miniDiv.querySelector(".delete").addEventListener("click", () => {
            const index = card.findIndex((item) => item.id === product.id);
            card.splice(index, 1);
            Basket();
        });

        miniDiv.querySelector(".credit").addEventListener("click", () => {
            container.innerHTML = " ";
            const divCard = document.createElement("div");
            divCard.className = "divCard";
            divCard.innerHTML = `
                <input type="text" placeholder="Full Name">
                <input min="16" max="16" type="number" placeholder="Card Number">
                <input min="16" max="16" type="number" placeholder="MM">
                <input min="16" max="16" type="number" placeholder="YY">
                <input min="16" max="16" type="number" placeholder="CVV">
            `;
            container.append(divCard);

            divCard.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    card.length = 0
                    container.innerHTML = `<p class="pay">Payment was successful<i class="bi bi-check-lg"></i></p>`
                }
            });
        });

    });
}

let isBasketOpen = false;
basket.addEventListener("click", () => {
    isBasketOpen = !isBasketOpen;
    basketDiv.style.display = isBasketOpen ? "block" : "none"; 
    if (isBasketOpen) {
        Basket(); 
    }
});

function BasketCount() {
    let totalCount = 0;
    card.forEach(product => {
        totalCount += product.count;
    });
    basket.innerHTML = `<i class="bi bi-cart-fill"></i> ${totalCount}`;
}

setInterval(BasketCount, 100);