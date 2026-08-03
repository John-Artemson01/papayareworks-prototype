// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Papaya Reworks storefront initialized.');

    // Cart State Management
    let cart = [];

    // DOM Elements
    const cartToggleBtn = document.getElementById('cart-toggle');
    const closeCartBtn = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartCountDisplay = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // --- Sidebar Toggle Logic ---
    const openCart = () => {
        cartSidebar.classList.remove('translate-x-full');
        cartOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeCart = () => {
        cartSidebar.classList.add('translate-x-full');
        cartOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    cartToggleBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // --- Add to Cart Logic ---
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents clicking the image if it routes somewhere else
            
            // Extract product data from the button and parent card
            const card = button.closest('.product-card');
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const imageSrc = card.querySelector('img').src;

            // Check if item already exists in the cart array
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1; // Increment quantity
            } else {
                cart.push({ name, price, imageSrc, quantity: 1 }); // Add new item
            }

            updateCartUI();
            openCart(); // Automatically slide out the cart when an item is added
        });
    });

    // --- Remove from Cart Logic (Attached to window for inline onclick) ---
    window.removeFromCart = (name) => {
        cart = cart.filter(item => item.name !== name);
        updateCartUI();
    };

    // --- Render UI Updates ---
    const updateCartUI = () => {
        // 1. Update the header cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountDisplay.textContent = totalItems;

        // 2. Clear current cart DOM
        cartItemsContainer.innerHTML = '';
        
        // 3. Re-render items or show empty state
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center text-gray-400 font-bold uppercase mt-10">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemHTML = `
                    <div class="flex items-center gap-4 border-4 border-brandBlack p-3 rounded-2xl bg-cardWhite shadow-[2px_2px_0_0_#1A1A1A]">
                        <img src="${item.imageSrc}" alt="${item.name}" class="w-16 h-20 object-cover rounded-xl border-2 border-brandBlack bg-bubblegumPink">
                        <div class="flex-1">
                            <h4 class="uppercase font-bold text-sm leading-tight mb-1">${item.name}</h4>
                            <p class="font-bold text-strawberryRed">$${item.price} <span class="text-xs text-gray-500">x ${item.quantity}</span></p>
                        </div>
                        <button onclick="removeFromCart('${item.name}')" class="text-2xl font-bold hover:text-strawberryRed px-2 transition-colors">&times;</button>
                    </div>
                `;
                cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
            });
        }

        // 4. Calculate and update total cost
        const totalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalDisplay.textContent = `$${totalCost}`;
    };
});