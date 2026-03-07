/* ============================================
   PepLogix Theme JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ---- Mobile Menu ---- */
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (mobileToggle && siteNav) {
    mobileToggle.addEventListener('click', () => {
      siteNav.classList.toggle('is-open');
      const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  /* ---- Cart Drawer ---- */
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartOverlay = document.querySelector('.cart-drawer__overlay');
  const cartOpenBtns = document.querySelectorAll('[data-cart-open]');
  const cartCloseBtn = document.querySelector('.cart-drawer__close');

  function openCart() {
    if (cartDrawer) cartDrawer.classList.add('is-open');
    if (cartOverlay) cartOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('is-open');
    if (cartOverlay) cartOverlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  cartOpenBtns.forEach(function (btn) {
    btn.addEventListener('click', openCart);
  });

  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeCart();
  });

  /* ---- Quantity Selector ---- */
  document.querySelectorAll('.quantity-selector').forEach(function (selector) {
    const input = selector.querySelector('.quantity-selector__input');
    const minusBtn = selector.querySelector('[data-qty-minus]');
    const plusBtn = selector.querySelector('[data-qty-plus]');

    if (!input) return;

    if (minusBtn) {
      minusBtn.addEventListener('click', function () {
        const current = parseInt(input.value, 10) || 1;
        if (current > 1) input.value = current - 1;
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener('click', function () {
        const current = parseInt(input.value, 10) || 1;
        input.value = current + 1;
      });
    }
  });

  /* ---- Variant Selector ---- */
  document.querySelectorAll('.variant-selector').forEach(function (selector) {
    const options = selector.querySelectorAll('.variant-selector__option');

    options.forEach(function (option) {
      option.addEventListener('click', function () {
        if (option.classList.contains('is-unavailable')) return;
        options.forEach(function (opt) {
          opt.classList.remove('is-selected');
        });
        option.classList.add('is-selected');

        const variantId = option.dataset.variantId;
        if (variantId) {
          const form = option.closest('form');
          if (form) {
            const variantInput = form.querySelector('input[name="id"]');
            if (variantInput) variantInput.value = variantId;
          }
        }
      });
    });
  });

  /* ---- Product Gallery Thumbnails ---- */
  const mainImage = document.querySelector('.product-gallery__main img');
  const thumbs = document.querySelectorAll('.product-gallery__thumb');

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      thumbs.forEach(function (t) { t.classList.remove('is-active'); });
      thumb.classList.add('is-active');
      if (mainImage) {
        const img = thumb.querySelector('img');
        if (img) mainImage.src = img.dataset.fullSrc || img.src;
      }
    });
  });

  /* ---- Add to Cart (AJAX) ---- */
  document.querySelectorAll('[data-add-to-cart]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Adding...';
      }

      fetch('/cart/add.js', {
        method: 'POST',
        body: formData,
      })
        .then(function (res) { return res.json(); })
        .then(function () {
          if (submitBtn) {
            submitBtn.textContent = 'Added!';
            setTimeout(function () {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Add to Cart';
            }, 2000);
          }
          updateCartDrawer();
          openCart();
        })
        .catch(function (err) {
          console.error('Add to cart error:', err);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Add to Cart';
          }
        });
    });
  });

  /* ---- Update Cart Drawer ---- */
  function updateCartDrawer() {
    fetch('/cart.js')
      .then(function (res) { return res.json(); })
      .then(function (cart) {
        var countEl = document.querySelector('.cart-count');
        if (countEl) countEl.textContent = cart.item_count;

        var itemsContainer = document.querySelector('.cart-drawer__items');
        if (!itemsContainer) return;

        if (cart.items.length === 0) {
          itemsContainer.innerHTML = '<p class="text-center mt-md">Your cart is empty</p>';
          return;
        }

        itemsContainer.innerHTML = cart.items
          .map(function (item) {
            return (
              '<div class="cart-item">' +
                '<img class="cart-item__image" src="' + item.image + '" alt="' + item.title + '">' +
                '<div>' +
                  '<p class="cart-item__title">' + item.title + '</p>' +
                  '<p class="cart-item__price">' + formatMoney(item.final_line_price) + '</p>' +
                  '<p>Qty: ' + item.quantity + '</p>' +
                  '<button class="cart-item__remove" data-line="' + item.key + '">Remove</button>' +
                '</div>' +
              '</div>'
            );
          })
          .join('');

        var totalEl = document.querySelector('.cart-drawer__total-price');
        if (totalEl) totalEl.textContent = formatMoney(cart.total_price);

        itemsContainer.querySelectorAll('.cart-item__remove').forEach(function (btn) {
          btn.addEventListener('click', function () {
            removeCartItem(btn.dataset.line);
          });
        });
      });
  }

  function removeCartItem(lineKey) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: lineKey, quantity: 0 }),
    })
      .then(function () { updateCartDrawer(); });
  }

  function formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2);
  }
})();
