/// Hover sub-product highlight
const subProducts = document.querySelectorAll('.product .sub-product');

subProducts.forEach(subProduct => {
  subProduct.onclick = function () {

  };

  subProduct.onmouseover = function () {
    subProduct.style.border = '2px solid orange';
  };

  subProduct.onmouseout = function () {
    subProduct.style.border = '';
  };
});


/// Prevent Button 'Đặt hàng' Bubbles
const btnCart = document.querySelectorAll('.add-to-cart');
btnCart.forEach((btn) => {
  btn.addEventListener('click', function (event) {
    event.stopPropagation()
  })
})


function showCart() {
  document.getElementById("sub-cart").classList.add("active");
}

function hideCart() {
  document.getElementById("sub-cart").classList.remove("active");
}


function showNav() {
  document.getElementById("nav-bar").classList.add("active");
}

function hideNav() {
  document.getElementById("nav-bar").classList.remove("active");
}


//  onClick to push data in localStorage.

let products = JSON.parse(localStorage.getItem('product')); // []

if (!products) {
  products = [];
}
btnCart.forEach(button => {
  button.addEventListener('click', () => {
    const productDiv = button.parentElement;
    const imgSrc = productDiv.querySelector('.imgcontent').src;
    const name = productDiv.querySelector('p:nth-of-type(1)').textContent.trim();
    const price = productDiv.querySelector('p:nth-of-type(2)').textContent.trim();

    const product = {
      imgSrc,
      name,
      price,
      quantity: 1
    };



    // map
    // init array = [] => push item
    if (products.length === 0 || products && !products.find(item => item.name === product.name)) {
      products.push(product);
      localStorage.setItem('product', JSON.stringify(products));
      updateCart();
      return;
    }

    if (products && products.find(item => item.name === product.name)) {
      products = products.map(item => {
        if (item.name === product.name) {
          return {
            ...item,
            quantity: item.quantity + product.quantity,
            price: ((parseFloat(item.price) + parseFloat(product.price)).toFixed(3)).toLocaleString() + 'đ'
          };
        }
        return item;
      });

      localStorage.setItem('product', JSON.stringify(products));
      updateCart();
    }
  });
});

//// Auto reload data from localStorage to Subcart
window.addEventListener('load', updateCart);



/////Push value to Cart-mini
function updateCart() {
  const getProducts = JSON.parse(localStorage.getItem('product'));
  const getData_cart = document.querySelector('.getData_cart')
  getData_cart.innerHTML = '';
  if (getProducts && getProducts.length > 0) {
    getProducts.forEach(function (item) {
      getData_cart.innerHTML +=
        `<div class="getData-cart1">
   <img class="cart-img" src="${item.imgSrc}">  
   <p><b class="cart-name">${item.name}</b></p>
   <p class="cart-quantity">x${item.quantity}</p>
   <p class="cart-price">${item.price}</p>
   </div>`;
    });
  } else {
    getData_cart.innerHTML = `<div class="notifi">
  <img src="https://altvibes.com/images/emptycart.webp" alt="">
  <p>Chưa có sản phẩm.</p>
</div>`;
  }
}


////Clear All Cart
const btnClear_cart = document.querySelector('.btnClear_cart');
btnClear_cart.addEventListener('click', () => {
  localStorage.clear();
  window.location.reload();
})


//  Click to redirect Product Details
  subProducts.forEach(idProduct => {
  const id = idProduct.dataset.id;
  idProduct.addEventListener('click', () => {
    const url = `/product_details.html?id=${id}`
    window.location.href = url;
  });
});
  
  
  // Toast function
function toast(
  { title = "", 
  message = "", 
  type = "info", 
  duration = 3000 
}) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle"
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast__body">
                        <h3 class="toast__title">${title}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                `;
    main.appendChild(toast);
  }
}
function showSuccessToast() {
  toast({
    title: "Success!",
    message: "Add a item to cart success.",
    type: "success",
    duration: 3000
  });
}

btnCart.forEach(function(e){
  e.addEventListener('click', showSuccessToast);
})


