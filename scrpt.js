document.addEventListener("DOMContentLoaded", function () {

    const boton = document.getElementById("btn-sintonia");
    const audio = document.getElementById("audio-sintonia");

    boton.addEventListener("click", function () {

        if (audio.paused) {
            audio.play();
            boton.textContent = "⏸️ Pausar sintonía";
        } else {
            audio.pause();
            boton.textContent = "🎵 Escucha nuestra sintonía";
        }

    });

});

document.addEventListener("DOMContentLoaded", () => {
  const cartItems   = document.querySelectorAll(".cart-item");
  const subtotalDD  = document.querySelector(".summary__row:nth-of-type(1) dd");
  const impuestosDD = document.querySelector(".summary__row:nth-of-type(2) dd");
  const totalDD     = document.querySelector(".summary__total dd");
  const vaciarBtn   = document.querySelector(".cart-actions button");

  // Recalcula subtotal general y total
  function actualizarTotales() {
    let subtotal = 0;

    cartItems.forEach(item => {
      const subtotalEl = item.querySelector(".subtotal");
      const valor = parseFloat(subtotalEl.textContent.replace("$", "")) || 0;
      subtotal += valor;
    });

    subtotalDD.textContent = `$${subtotal}`;

    const impuestos = parseFloat(impuestosDD.textContent.replace("$", "")) || 0;
    const total = subtotal + impuestos;

    totalDD.textContent = `$${total}`;
  }

  // Configuramos cada línea del carrito
  cartItems.forEach(item => {
    const precioEl    = item.querySelector(".cart-item__info .muted");
    const precioUnidad = parseFloat(precioEl.textContent.replace("$", "")) || 0;

    const qtySpan     = item.querySelector(".qty-value");
    const btnMinus    = item.querySelector(".qty-minus");
    const btnPlus     = item.querySelector(".qty-plus");
    const subtotalEl  = item.querySelector(".subtotal");

    // Recalcular subtotal de este producto
    function actualizarSubtotalItem() {
      const cantidad = parseInt(qtySpan.textContent, 10) || 0;
      const subtotalItem = precioUnidad * cantidad;
      subtotalEl.textContent = `$${subtotalItem}`;
    }

    // Botón +
    btnPlus.addEventListener("click", () => {
      let cantidad = parseInt(qtySpan.textContent, 10) || 0;
      cantidad++;
      qtySpan.textContent = cantidad;
      actualizarSubtotalItem();
      actualizarTotales();
    });

    // Botón -
    btnMinus.addEventListener("click", () => {
      let cantidad = parseInt(qtySpan.textContent, 10) || 0;
      if (cantidad > 1) {          // para que no baje de 1
        cantidad--;
        qtySpan.textContent = cantidad;
        actualizarSubtotalItem();
        actualizarTotales();
      }
    });

    // Por si cambias cantidades/precios en el HTML
    actualizarSubtotalItem();
  });

  // Botón "Vaciar carrito"
  if (vaciarBtn) {
    vaciarBtn.addEventListener("click", () => {
      cartItems.forEach(item => {
        const qtySpan    = item.querySelector(".qty-value");
        const subtotalEl = item.querySelector(".subtotal");

        qtySpan.textContent = "0";
        subtotalEl.textContent = "$0";
      });
      actualizarTotales();
    });
  }

  // Cálculo inicial
  actualizarTotales();
});
