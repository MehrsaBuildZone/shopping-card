   let items = [
    {
        id: 1,
        name: "Ultra",
        image: "images/1.jpg",
        price:970
    },
    {
        id: 2,
        name: "Dreams",
        image: "images/2.jpg",
        price:1140
    },
    {
        id: 3,
        name: "Full Throttle",
        image: "images/3.jpg",
        price:890
    },
    {
        id: 4,
        name: "Paradise",
        image: "images/4.jpg",
        price:1300
    },
    {
        id: 5,
        name: "Pineapple",
        image: "images/5.jpg",
        price:1250
    },
    {
        id: 6,
        name: "Mixed Berry",
        image: "images/6.jpg",
        price:950
    }
    
    
];
let listBox = document.querySelector('.list');
let shopping = document.querySelector('.shopping');
let closebtn = document.querySelector('.closebtn');
let number = document.querySelector('.number');
let cartcontainer = document.querySelector('.cartcontainer ul')
let total = document.querySelector('.total span');

let showItem = items.map((item,key) =>{
    return `<div class="product">
                <div class="imgbox">
                  <img src=${item.image}>
                </div>
                <div class="text">
                    <div>
                        <div class="name">${item.name}</div>
                        <div class="price"><small>$</small>${item.price}</div>
                    </div>
                    <button class="ATC" onClick="addtocart(${key})" >Add To Cart</button>
                </div>
            </div>
        </div>`;
}).join("");

listBox.innerHTML = showItem;

shopping.addEventListener('click',()=>{
    document.body.classList.toggle('active');
});
closebtn.addEventListener('click',()=>{
    document.body.classList.remove('active');
});

let storeProducts = [];
function addtocart(id){
    if(storeProducts[id] == null ){
        storeProducts[id] = items[id];
        storeProducts[id].number = 1;
    }
    else{
        storeProducts[id].number += 1;
    }
    reloadProducts();
}

function reloadProducts(){
    cartcontainer.innerHTML = '';
    let count = 0;
    let totalCount = 0;

    storeProducts.forEach((item,key)=> {
        count += item.number;
        totalCount += item.price * item.number;

        let productLi = document.createElement('li');
        productLi.innerHTML = ` <img src=${item.image}>
                    <div class="name">${item.name}</div>
                    <div class="price"><small>$</small>${item.price}</div>
                    <div class="changenumber">
                        <button class="minus" onClick="changeCount(${key},${item.number - 1})"> - </button>
                        <span>${item.number}</span>
                        <button class="plus" onClick="changeCount(${key},${item.number + 1})">+</button>
                    </div>`;
                    cartcontainer.append(productLi);
    })
    number.style.display = "block";
    number.innerHTML = count;
    total.innerHTML = +totalCount;
}

function changeCount(key,number){
    if(number == 0){
        delete storeProducts[key];
    }
    else{
        storeProducts[key].number = number;
    }
    reloadProducts();
}