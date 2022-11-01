import { thumbsActiveFunc } from "./single-product/thumbsActive.js";

import { singleThumbs } from "./glide.js";

import zoomFunc from "./single-product/zoom.js";
import colorsFunc from "./single-product/colors.js";
import valuesFunc from "./single-product/values.js";
import tabsFunc from "./single-product/tabs.js";
import commentsFunc from "./single-product/comments.js";

thumbsActiveFunc();

const productId = localStorage.getItem("productId")
  ? JSON.parse(localStorage.getItem("productId"))
  : localStorage.setItem("productId", JSON.stringify(1));

const products = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : localStorage.setItem("products", JSON.stringify([]));

const findProduct = products.find((item) => item.id === Number(productId));
//! product title

const productTitle = document.querySelector(".product-title");

productTitle.innerHTML = findProduct.name;

//!product price

const newPriceDom = document.querySelector(".new-price");

const oldPriceDom = document.querySelector(".old-price");

newPriceDom.innerHTML = `$${findProduct.price.newPrice.toFixed(2)}`;
oldPriceDom.innerHTML = `$${findProduct.price.oldPrice.toFixed(2)}`;

//! product gallery

const singleImageDom = document.querySelector("#single-image");

singleImageDom.src = findProduct.img.singleImage;

const galleryThumbs = document.querySelector(".gallery-thumbs");
let result = "";
findProduct.img.thumbs.forEach((item) => {
  result += `
    <li class="glide__slide">
    <img
      src= ${item}
      class="img-fluid"
    />
  </li>
`;
});

galleryThumbs.innerHTML = result;

singleThumbs();
thumbsActiveFunc();

const productThumb = document.querySelectorAll(
  ".product-thumb .glide__slide img"
);

productThumb[0].classList.add("active");

//! add to cart

let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const findCart = cart.find((item) => item.id === findProduct.id);
const btnAddToCart = document.getElementById("add-to-cart");
const quantityDOM = document.getElementById("quantity");
let cartItems = document.querySelector(".header-cart-count");

if (findCart) {
  btnAddToCart.setAttribute("disabled", "disabled");
} else {
  btnAddToCart.addEventListener("click", function () {
    cart.push({ ...findProduct, quantity: Number(quantityDOM.value) });
    btnAddToCart.setAttribute("disabled", "disabled");
    localStorage.setItem("cart", JSON.stringify(cart));
    cartItems.innerHTML = cart.length;
  });
}
