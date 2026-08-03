// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Papaya Reworks storefront initialized.');

    // Prototype: Basic interaction setup for product cards
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Future logic: Swap to a secondary image or show quick-add sizes
        });

        card.addEventListener('click', () => {
            // Future logic: Route to individual product page view
            const productName = card.querySelector('.uppercase').innerText;
            console.log(`Routing to product view for: ${productName}`);
        });
    });
});