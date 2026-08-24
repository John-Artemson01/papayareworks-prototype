// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Papaya Reworks storefront initialized.');

    // --- EMAIL ORDER FORM LOGIC ---
    const localEmailTemplate = `Papaya Order Form

Hi! Kindly fill out the details below, and we’ll send you the complete order breakdown.

• Name:
• Contact Number:
• Complete Address:
• Product/Design:
• Size:

Payment
• GCash
• BPI
• RCBC

Shipping
• J&T Express
• Lalamove

Inventory Location (SJDM, Bulacan) Strictly no cancellation of confirmed orders. Thank you!`;

    const intlEmailTemplate = `Papaya International Order Form

Hi! Thank you for your interest in Papaya. Kindly fill out the details below, and we’ll send you the total order breakdown, including your DHL shipping fee.

• Full Name:
• Contact Number:
• Country:
• Complete Shipping Address:
• Postal/ZIP Code:
• Product/Design:
• Size:

Payment Method Wise Bank Transfer

Shipping DHL Express (Worldwide) Inventory Location: Manila, Philippines Please double-check your details before submitting. Strictly no cancellation of confirmed orders. Thank you!`;

    // Dropdown Elements
    const gmailToggle = document.getElementById('gmail-toggle');
    const gmailDropdown = document.getElementById('gmail-dropdown');
    const localOrderBtn = document.getElementById('local-order-btn');
    const intlOrderBtn = document.getElementById('intl-order-btn');
    const targetEmail = "papayareworks@gmail.com";

    // Toggle Dropdown Visibility
    if (gmailToggle && gmailDropdown) {
        gmailToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents click from bubbling up
            gmailDropdown.classList.toggle('hidden');
            gmailDropdown.classList.toggle('flex');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!gmailToggle.contains(e.target) && !gmailDropdown.contains(e.target)) {
                gmailDropdown.classList.add('hidden');
                gmailDropdown.classList.remove('flex');
            }
        });
    }

    // Email Triggers
    if (localOrderBtn) {
        localOrderBtn.addEventListener('click', () => {
            const subject = encodeURIComponent("Papaya Reworks: Local Order Form");
            const body = encodeURIComponent(localEmailTemplate);
            window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
        });
    }

    if (intlOrderBtn) {
        intlOrderBtn.addEventListener('click', () => {
            const subject = encodeURIComponent("Papaya Reworks: International Order Form");
            const body = encodeURIComponent(intlEmailTemplate);
            window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
        });
    }


    // --- CATALOG & UI LOGIC ---

    // 1. THE JSON "DATABASE"
    const catalogData = [
        { id: 1, name: "Checkered Rework Top", category: "Different Artist", image: "assets/1000020772.jpg", status: "Available", isFeatured: true, isNew: false },
        { id: 2, name: "Starry Appliqué Vest", category: "Appliqué", image: "assets/1000020768.jpg", status: "Archived", isFeatured: true, isNew: false },
        { id: 3, name: "Vintage Graphic Crop", category: "Different Artist", image: "assets/1000020776.jpg", status: "Available", isFeatured: true, isNew: true },
        { id: 4, name: "Distressed Denim Halter", category: "Reverie Collection", image: "assets/1000020773.jpg", status: "Available", isFeatured: true, isNew: false },
        { id: 5, name: "Upcycled Denim Jacket", category: "Different Artist", image: "assets/1000020760.jpg", status: "Available", isFeatured: false, isNew: true },
        { id: 6, name: "Floral Tie-Up Shirt", category: "Reverie Collection", image: "assets/1000020764.jpg", status: "Available", isFeatured: false, isNew: true },
        { id: 8, name: "Strawberry Motif Tee", category: "Appliqué", image: "assets/1000020774.jpg", status: "Available", isFeatured: false, isNew: true },
        { id: 9, name: "Colorblock Button-Up", category: "Different Artist", image: "assets/1000020755.jpg", status: "Available", isFeatured: false, isNew: true },
        { id: 10, name: "Cropped Utility Jacket", category: "Appliqué", image: "assets/1000020758.jpg", status: "Available", isFeatured: false, isNew: true },
        { id: 11, name: "Fleece Contrast Zip", category: "Different Artist", image: "assets/1000020761.jpg", status: "Available", isFeatured: false, isNew: true },
        { id: 12, name: "Oversized Stitch Sweater", category: "Appliqué", image: "assets/1000020765.jpg", status: "Archived", isFeatured: false, isNew: false },
        { id: 13, name: "Spliced Band Tee", category: "Different Artist", image: "assets/1000020775.jpg", status: "Available", isFeatured: true, isNew: true },
        { id: 14, name: "Teddy Bear Zip-Up", category: "Appliqué", image: "assets/1000020777.jpg", status: "Archived", isFeatured: true, isNew: false },
        { id: 15, name: "Corset String Halter", category: "Reverie Collection", image: "assets/1000020771.jpg", status: "Available", isFeatured: true, isNew: true },
        { id: 16, name: "Puffer Vest Rebuild", category: "Appliqué", image: "assets/1000020778.jpg", status: "Available", isFeatured: true, isNew: false },
    ];

    // DOM Elements
    const featuredContainer = document.getElementById('featured-container');
    const latestDropsContainer = document.getElementById('latest-drops-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    const viewArchiveBtn = document.getElementById('view-archive-btn');

    // 2. HELPER FUNCTION: GENERATE HTML CARD
    const createProductCard = (product, isHorizontal = false) => {
        let badgeHTML = '';
        if (product.status === 'Archived') {
            badgeHTML = `<div class="absolute top-2 right-2 bg-cardWhite text-brandBlack text-xs font-bold uppercase py-1 px-3 rounded-full border-2 border-brandBlack z-10">Archived</div>`;
        } else if (product.isNew) {
            badgeHTML = `<div class="absolute top-2 right-2 bg-papayaOrange text-brandBlack text-xs font-bold uppercase py-1 px-3 rounded-full border-2 border-brandBlack z-10">New</div>`;
        } else {
            badgeHTML = `<div class="absolute top-2 right-2 bg-leafGreen text-white text-xs font-bold uppercase py-1 px-3 rounded-full border-2 border-brandBlack z-10">Available</div>`;
        }

        const statusText = product.status === 'Archived' ? 
            `<span class="font-bold text-gray-400 text-sm uppercase">1-of-1 Piece</span>` : 
            `<span class="font-bold text-strawberryRed text-sm uppercase">View Details &rarr;</span>`;

        const layoutClasses = isHorizontal ? "snap-start flex-shrink-0 w-72 md:w-80" : "";

        return `
            <div class="${layoutClasses} group product-card bg-cardWhite border-4 border-brandBlack rounded-2xl p-4 shadow-chunky hover:shadow-chunky-hover hover:-translate-y-2 transition-all duration-300 flex flex-col relative cursor-pointer" data-category="${product.category}">
                ${badgeHTML}
                <div class="aspect-[4/5] overflow-hidden rounded-xl border-2 border-brandBlack mb-4 relative bg-bubblegumPink">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-col mt-auto">
                    <span class="uppercase font-bold text-lg leading-tight mb-1">${product.name}</span>
                    ${statusText}
                </div>
            </div>
        `;
    };

    // 3. RENDER FEATURED PIECES & SETUP SCROLLING
    const renderFeatured = () => {
        const featuredItems = catalogData.filter(item => item.isFeatured === true);
        featuredContainer.innerHTML = featuredItems.map(item => createProductCard(item, true)).join('');

        if (scrollLeftBtn && scrollRightBtn) {
            scrollLeftBtn.addEventListener('click', () => {
                featuredContainer.scrollBy({ left: -320, behavior: 'smooth' });
            });
            scrollRightBtn.addEventListener('click', () => {
                featuredContainer.scrollBy({ left: 320, behavior: 'smooth' });
            });
        }
    };

    // 4. RENDER LATEST DROPS / ARCHIVE
    const renderLatestDrops = (categoryFilter = null) => {
        let itemsToRender = [];

        if (categoryFilter === 'All') {
            itemsToRender = catalogData; 
            document.querySelector('#catalog h2').innerText = `Full Archive 🗃️`;
        } else if (categoryFilter) {
            itemsToRender = catalogData.filter(item => item.category === categoryFilter);
            document.querySelector('#catalog h2').innerText = `${categoryFilter} 💧`;
        } else {
            itemsToRender = catalogData.filter(item => item.isFeatured === false);
            document.querySelector('#catalog h2').innerText = `Latest Drops 💧`;
        }

        if (itemsToRender.length === 0) {
            latestDropsContainer.innerHTML = `<p class="col-span-full text-center font-bold text-xl text-gray-500 py-10 uppercase">No pieces found for this category.</p>`;
            return;
        }

        latestDropsContainer.innerHTML = itemsToRender.map(item => createProductCard(item, false)).join('');
    };

    // 5. ATTACH EVENT LISTENERS
    const setupInteractions = () => {
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const buttonText = button.querySelector('span').innerText;
                const category = buttonText.replace('VIEW ', '').trim(); 
                
                renderLatestDrops(category);
                document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
            });
        });

        if (viewArchiveBtn) {
            viewArchiveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                renderLatestDrops('All');
                document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
            });
        }
    };

    // Initialize Everything
    renderFeatured();
    renderLatestDrops(); 
    setupInteractions();
});
