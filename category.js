const data = {
    burger: [
        { name: "Veg Burger", price: 80, img: "images/bveg.png"},
        { name: "Cheese Burger", price: 120, img: "images/cheeseb.png" },
        { name: "Chicken Burger", price: 150, img: "images/chbur.png" }
    ],

    shakes: [
        { name: "Chocolate Shake", price: 90, img: "images/chocoshake.png" },
        { name: "Strawberry Shake", price: 100, img: "images/strawshake.png" },
        { name: "Berrylicious", price: 150, img: "images/blueberry.png" }
    ],
    sandwich: [
        { name: "Grilled Sandwich", price: 80, img: "images/grilledsand.png" },
        { name: "Paneer Sandwich", price: 80, img: "images/paneer.png" },
        { name: "Tandoori sandwich", price: 80, img: "images/tansand.png" }
    ],
    noodles: [
        { name: "Chilly Noodles", price: 80, img: "images/chillynoo.png"},
        { name: "Cheesey Noodles", price: 120, img: "images/chnoodles.png"},
        { name: "Hakka noodles ", price: 150, img: "images/hakka.png"}
    ],
    Desserts: [
        { name: "Chocolate pastry", price: 80, img: "images/chocopas.png"},
        { name: "Vanilla pastry", price: 120, img: "images/vanilla.png" },
        { name: "Pineapple pastry", price: 150, img: "images/pine.png" }
    ],
    Chaat: [
        { name: "Pani Puri", price: 120, img: "images/panipuri.png" },
        { name: "Samosa chaat", price: 150, img: "images/samosa.png" },
        { name: "momos", price: 150, img: "images/momos.png" }
    ],
    Pasta: [
        { name: "Tango tomato pasta", price: 80, img: "images/tangy.png"},
        { name: "White sauce pasta", price: 120, img: "images/ccnoo.png" },
        { name: "creamy carbonara pasta", price: 150, img: "images/ccpasta.png" }
    ],
    Pizza: [
        { name: "Cheese n corn", price: 80, img: "Picture8.png"},
        { name: "Farm house pizza", price: 120, img: "images/farmpizza.png" },
        { name: "Tandoori paneer pizza", price: 150, img: "images/tanpizza.png" }
    ]
};

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("cat");

document.getElementById("categoryTitle").innerText = category.toUpperCase();

const container = document.getElementById("itemsContainer");

data[category].forEach((item, index) => {

    let div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
    <img src="${item.img}">
    <h3>${item.name}</h3>
    <p>₹${item.price}</p>

    <div>
        <button onclick="decrease(${index})">-</button>
        <span id="qty-${index}"> 0 </span>
        <button onclick="increase(${index})">+</button>
    </div>
    <button onclick="addToCart(${index})">Add to Cart</button>
`;

    container.appendChild(div);
});

let quantities = {};

function increase(i) {
    quantities[i] = (quantities[i] || 0) + 1;
    document.getElementById("qty-" + i).innerText = quantities[i];

    addToCart(i);
}

function decrease(i) {
    if (quantities[i] > 0) {
        quantities[i]--;
        document.getElementById("qty-" + i).innerText = quantities[i];

        addToCart(i); 
    }
}

/*cart*/
let cart = [];
let total = 0;

function addToCart(index) {
    let qty = quantities[index] || 0;
    let item = data[category][index];

    // ❌ remove item if qty = 0
    if (qty === 0) {
        cart = cart.filter(i => i.name !== item.name);
        updateCart();
        return;
    }

    let existing = cart.find(i => i.name === item.name);

    if (existing) {
        existing.qty = qty;  // update quantity
    } else {
        cart.push({
            name: item.name,
            price: item.price,
            qty: qty,
            img: item.img
        });
    }

    updateCart();
}

function updateCart() {
    let cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        let div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <img src="${item.img}">
            <div>
                <p>${item.name}</p>
                <p>${item.qty} x ₹${item.price}</p>
            </div>
        `;

        cartContainer.appendChild(div);
    });

    document.getElementById("total").innerText = total;
}

/*coupon*/

let discount = 0;

function applyCoupon() {
    let code = document.getElementById("coupon").value;

    if (code === "SAVE10") {
        discount = 0.1;
    } else if (code === "SAVE20") {
        discount = 0.2;
    } else {
        alert("Invalid Coupon");
        discount = 0;
    }

    updateCart();
}

function applyDiscount() {
    let finalTotal = total - (total * discount);
    document.getElementById("total").innerText = finalTotal.toFixed(0);
}


function placeOrder() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    let payment = document.getElementById("payment").value;

    alert("Order placed successfully via " + payment);

    cart = [];
    total = 0;
    discount = 0;

    updateCart();
}