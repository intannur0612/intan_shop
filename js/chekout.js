document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.getElementById("checkout-items-list");
  const totalEl = document.getElementById("checkout-grand-total");
  const form = document.getElementById("checkout-form");

  const cart = getCart();
  if (cart.length === 0) {
    alert("Keranjang belanja kosong!");
    window.location.href = "product.html";
    return;
  }

  let grandTotal = 0;
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;
    if (listContainer) {
      listContainer.innerHTML += `
                <div class="summary-item">
                    <span>${item.name} <strong>(x${item.quantity})</strong></span>
                    <span>Rp ${itemTotal.toLocaleString("id-ID")}</span>
                </div>
            `;
    }
  });

  if (totalEl) totalEl.textContent = `Rp ${grandTotal.toLocaleString("id-ID")}`;

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const orderMeta = {
        name: document.getElementById("cust-name").value,
        phone: document.getElementById("cust-phone").value,
        address: document.getElementById("cust-address").value,
        total: grandTotal,
        items: cart,
      };
      localStorage.setItem("intan_current_order", JSON.stringify(orderMeta));
      window.location.href = "payment.html";
    });
  }
});
