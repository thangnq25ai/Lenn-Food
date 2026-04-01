document.addEventListener("DOMContentLoaded", function () {

  // ===== MENU TOGGLE =====
  const btnMenu = document.getElementById("btnMenu");
  const menuSection = document.getElementById("menuSection");

  let isOpen = false;

  if (btnMenu && menuSection) {
    btnMenu.addEventListener("click", function (e) {
      e.preventDefault();
      isOpen = !isOpen;

      if (isOpen) {
        menuSection.style.display = "block";
        menuSection.scrollIntoView({ behavior: "smooth" });
      } else {
        menuSection.style.display = "none";
      }
    });
  }

  // ===== SCROLL TO MENU =====
  const btnScroll = document.getElementById("btnScroll");

  if (btnScroll && menuSection) {
    btnScroll.addEventListener("click", function () {
      menuSection.style.display = "block";

      menuSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      menuSection.style.boxShadow = "0 0 30px rgba(34,197,94,0.6)";

      setTimeout(() => {
        menuSection.style.boxShadow = "none";
      }, 2000);
    });
  }

  // ===== CART =====
  let cart = [];
  let total = 0;

  window.toggleCart = function () {
    document.getElementById("cartPanel").classList.toggle("active");
  };

  // ===== ADD TO CART =====
  const buttons = document.querySelectorAll(".food-card button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".food-card");
      const name = card.querySelector("h4").innerText;

      const priceText = card.querySelector(".price").innerText;
      const price = parseInt(priceText.replace(/\D/g, ""));

      const select = card.querySelector("select");

      if (select) {
        if (select.selectedIndex === 0) {
          alert("🌶 Vui lòng chọn cấp độ cay!");
          return;
        }
        const level = select.value;
        addToCart(`${name} (Cay ${level})`, price);
      } else {
        addToCart(name, price);
      }
    });
  });

  function addToCart(name, price) {
    cart.push({ name, price });
    total += price;

    document.getElementById("cart-count").innerText = cart.length;
    document.getElementById("cart-total").innerText = total.toLocaleString();

    renderCart();
  }

  function renderCart() {
    const list = document.getElementById("cart-items");
    list.innerHTML = "";

    cart.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${item.name}</span>
        <span>${item.price.toLocaleString()}đ</span>
      `;
      list.appendChild(li);
    });
  }

  // ===== CHECKOUT =====
  const checkoutBtn = document.querySelector(".checkout");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const name = document.getElementById("customer-name").value.trim();
      const phone = document.getElementById("customer-phone").value.trim();
      const address = document.getElementById("customer-address").value.trim();

      if (cart.length === 0) {
        alert("🛒 Giỏ hàng đang trống!");
        return;
      }

      if (!name || !phone || !address) {
        alert("❗ Vui lòng nhập đầy đủ thông tin");
        return;
      }

      // 👉 HIỆN POPUP THANH TOÁN
      document.getElementById("paymentModal").style.display = "block";
    });
  }

});
function closePayment() {
  document.getElementById("paymentModal").style.display = "none";
}

function payCOD() {
  alert("🎉 Đặt hàng thành công!\nThanh toán khi nhận hàng.");
  closePayment();
}

function payQR() {
  alert(
    "📱 Vui lòng chuyển khoản:\n\n" +
    "Ngân hàng: MB Bank\n" +
    "STK: 123456789\n" +
    "Tên: LEN FOOD"
  );
  closePayment();
}