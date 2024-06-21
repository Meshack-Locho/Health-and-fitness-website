const goods = [
    {
        id: 0,
        name: "Black barbel 21 Kg",
        altDesc: "Black 21 Kg barbel for sale",
        price: 89.95,
        image: "images/store images/black barbel 21kg.jpg",
        deliveryFee: 0.9,
    },
    {
        id: 1,
        name: "Blue 2kg dumbells",
        altDesc: "Blue 2kg dumbells for sale",
        price: 29.99,
        image: "images/store images/blue 2kg dumbells.jpg",
        deliveryFee: 0.9,
    },
    {
        id: 2,
        name: "White nike jordans",
        altDesc: "White nike jordan for sale",
        price: 59.95,
        image: "images/store images/white shoes.jpg",
        deliveryFee: 0.9,
    },
    {
        id: 3,
        name: "Black and white nike running shoes",
        altDesc: "Black and white nike running shoes for sale",
        price: 43.25,
        image: "images/store images/black and white nike running shoes.jpg",
        deliveryFee: 0.9,
    },
    {
        id: 4,
        name: "Addidas running shoes",
        altDesc: "Addidas running shoes for sale",
        price: 55.32,
        image: "images/store images/addidas running shoes.jpg",
        deliveryFee: 0.9,
    },
    {
        id: 5,
        name: "Full female gym kit",
        altDesc: "Full female gym kit for sale",
        price: 98.75,
        image: "images/store images/full female gym kit.jpg",
        deliveryFee: 0.9,
    },
    {
        id: 6,
        name: "Black yoga mat",
        altDesc: "Black yoga mat for sale",
        price: 42.15,
        image: "images/store images/yoga mat.jpg",
        deliveryFee: 0.9,
    },
    {
        id: 7,
        name: "grey barbel 128 Kg",
        altDesc: "Black 128 Kg barbel for sale",
        price: 89.95,
        image: "images/store images/grey barbel 128kg.jpg",
        deliveryFee: 0.9,
    },
    {
        id: 8,
        name: "Black punching bag",
        altDesc: "Black punching bag for sale",
        price: 129.95,
        image: "images/store images/punching bag.jpg",
        deliveryFee: 0.9,
    },
    {
        id: 9,
        name: "Full male boxing kit (red)",
        altDesc: "red boxing kit men for sale",
        price: 45.75,
        image: "images/store images/full boxing kit male.jpg",
        deliveryFee: 0.9,
    },
    {
        id: 10,
        name: "Black cool water bottles",
        altDesc: "Black cool water bottles for sale",
        price: 29.95,
        image: "images/store images/water bottles.jpg",
        deliveryFee: 0.9,
    },
    {
        id: 0,
        name: "Black kettle dumbells",
        altDesc: "Black Kettle dumbells for sale",
        price: 59.99,
        image: "images/store images/kettle dumbells 28kg.jpg",
        deliveryFee: 0.9,
    },
]

const allGoods = [...new Set(goods.map((items)=>{
    return items
}))]

let storeItemsContainer = document.querySelector(".store-items")
let cartInc = 0

storeItemsContainer.innerHTML = allGoods.map((good)=>{
    let {name, altDesc, price, image, deliveryFee} = good

    return(
        `<div class="items-in-store">
           <img src="${image}" alt="${altDesc}">
           <h3>${name}</h3>
           <h4>Price: $ ${price}</h4>
           <p>Payment is on delivery, fee: $${deliveryFee}</p>` +
           "<button onclick=addToCart("+(cartInc++)+")>Add to cart</button>" +
        `</div>`
    )
})

const cart = JSON.parse(localStorage.getItem("cartItems")) || []
let cartEl = document.querySelector(".cart")
let itemsOnCart = document.querySelectorAll(".items-on-cart")
let itemsCount = JSON.parse(localStorage.getItem("numberofitems"))
let totalAmt

function addItems() {
    for (let i = 0; i < itemsOnCart.length; i++) {
        if (itemsCount) {
            itemsOnCart[i].textContent = itemsCount
        }
        
    }
}

for (let i = 0; i < itemsOnCart.length; i++) {
    if (itemsCount) {
        itemsOnCart[i].textContent = itemsCount
    }
    
}
const succesfullPurchaseMessage = document.querySelector(".purchase-succesful-mess")
function displayCart() {
    let del = 0
    if (cart.length == 0) {
        cartEl.innerHTML = "Cart is empty" + `<i class="fa-solid fa-xmark" onclick=closeCart()></i>`
      }else{
        totalAmt = Math.round(cart.reduce((n, {price}) => n + price, 0))
        cartEl.innerHTML =
        `<h1>Cart</h1>` +
        `<h2 class="total-amt">Total Amount: $${totalAmt}</h2>`+
        `<i class="fa-solid fa-xmark" onclick=closeCart()></i>` +
        `<button class="purchase-btn">Purchase</button>` +
        cart.map((items)=>{
            let {image, name, price} = items
            return(
                `<div class="cart-item">
                   <img src="${image}">
                   <h3>${name}</h3>
                   <h4>${price}</h4>
                   <div id="paypal">Paypal</div>` +
                   "<i class='fa-solid fa-trash' onclick=deleteItems("+(del++)+")></i>" +
                `</div>`
            )
        }).join('')
        let cartItemsDiv = document.querySelector(".cart-item")
        let qty = document.querySelectorAll(".amount")
        let prices = cartItemsDiv.querySelectorAll("h4")
        for (let i = 0; i < qty.length; i++) {
            qty[i].addEventListener("change", ()=>{
                for (let i = 0; i < cart.length; i++) {
                    totalAmt = Math.round(cart.reduce((n, {price}) => n + cart[i].price * qty[i].value, 0))
                    for (let i = 0; i < prices.length; i++) {
                        prices[i].textContent = cart[i].price * qty[i].value
                        document.querySelector(".total-amt").textContent = "Total: " + totalAmt
                        
                    }
                     
                }
            })
            
        }
        let purchaseBtn = document.querySelector(".purchase-btn")

        purchaseBtn.addEventListener("click", ()=>{
            succesfullPurchaseMessage.classList.add("active")
            localStorage.clear()

            setTimeout(()=>{
                succesfullPurchaseMessage.classList.remove("active")
                window.location.reload()
            }, 2000)
        })
      }
}


function addToCart(a) {
    cart.push({...allGoods[a]})
    displayCart()
    itemsCount++
    addItems()
    storage()
}
displayCart()

function deleteItems(itemsToDelete) {
    console.log("clicked")
    cart.splice(itemsToDelete, 1)
    itemsCount--
    addItems()
    displayCart()
    storage()
}

function storage() {
    localStorage.setItem("cartItems", JSON.stringify(cart))
    localStorage.setItem("numberofitems", JSON.stringify(itemsCount))
}



const cartOpenBtn = document.querySelectorAll(".fa-cart-shopping")

for (let i = 0; i < cartOpenBtn.length; i++) {
    cartOpenBtn[i].addEventListener("click", ()=>{
    cartEl.classList.toggle("active")
})
    
}


function closeCart() {
    cartEl.classList.remove("active")
}

function searchingItems() {
    const searchBar = document.getElementById("search-bar").value.toUpperCase()
    const allItems = document.querySelectorAll(".items-in-store")
    const section = document.querySelector("section")
    let itemTitle = section.getElementsByTagName("h3")
    const resultsTitle = document.querySelector(".search-result-title")
    for (let i = 0; i < itemTitle.length; i++) {
        let matchingTitle = allItems[i].getElementsByTagName('h3')[0]
        if (matchingTitle) {
            let rightMatch = matchingTitle.textContent || matchingTitle.innerHTML

            if (rightMatch.toUpperCase().indexOf(searchBar) > -1) {
                allItems[i].style.display = ""
            }else{
                allItems[i].style.display = "none"
            }
        }
        
    }
}

let menuToggleBtns = document.querySelectorAll(".mobile-menu-toggle")
let mobileMenu = document.querySelector(".mobile-menu")

for (let i = 0; i < menuToggleBtns.length; i++) {
    menuToggleBtns[i].addEventListener("click", ()=>{
        mobileMenu.classList.toggle("active")
    })
    
}