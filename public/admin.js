// public/admin.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Papaya Reworks Admin initialized.');

    // ----------------------------------------------------
    // 0. PROTOTYPE AUTHENTICATION CHECK
    // ----------------------------------------------------
    // If the token is missing, redirect to login and stop script
    if (sessionStorage.getItem('papaya_auth_token') !== 'true') {
        window.location.href = 'login.html';
        return; 
    }

    // ----------------------------------------------------
    // 1. SIDEBAR NAVIGATION TAB LOGIC
    // ----------------------------------------------------
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = {
        'dashboard': document.getElementById('section-dashboard'),
        'catalog': document.getElementById('section-catalog'),
        'categories': document.getElementById('section-categories'),
        'settings': document.getElementById('section-settings')
    };

    const activeClasses = ['font-bold', 'text-cardWhite', 'bg-brandBlack', 'shadow-chunky-sm', 'active'];

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');

            // Hide all sections
            Object.values(sections).forEach(sec => {
                sec.classList.remove('flex');
                sec.classList.add('hidden');
            });

            // Show selected section
            if (sections[target]) {
                sections[target].classList.remove('hidden');
                sections[target].classList.add('flex');
            }

            // Reset tabs
            navButtons.forEach(nav => {
                nav.classList.remove(...activeClasses);
                nav.classList.add('text-brandBlack', 'border-transparent');
            });

            // Highlight active tab
            btn.classList.remove('text-brandBlack', 'border-transparent');
            btn.classList.add(...activeClasses);
        });
    });


    // ----------------------------------------------------
    // 2. THE JSON "DATABASE"
    // ----------------------------------------------------
    let catalogData = [
        { id: 1, name: "Classic Patchwork Button Down", category: "Different Artist", image: "assets/1000020772.jpg", status: "Available", isFeatured: true, isNew: false },
        { id: 2, name: "Nature-Inspired Skirt", category: "Appliqué", image: "assets/1000020768.jpg", status: "Archived", isFeatured: true, isNew: false },
        { id: 3, name: "Yellow Barong Laced Fleur", category: "Different Artist", image: "assets/1000020776.jpg", status: "Available", isFeatured: true, isNew: true },
        { id: 5, name: "Orange Hirono Button Down", category: "Different Artist", image: "assets/1000020760.jpg", status: "Available", isFeatured: false, isNew: true },
        { id: 6, name: "Denim Jacket Classic Floral", category: "Reverie Collection", image: "assets/1000020764.jpg", status: "Available", isFeatured: false, isNew: true },
        { id: 8, name: "Classic Patchwork Fleur", category: "Appliqué", image: "assets/1000020774.jpg", status: "Available", isFeatured: false, isNew: true },
        { id: 9, name: "Orange Collar Paint Splash", category: "Different Artist", image: "assets/1000020755.jpg", status: "Available", isFeatured: false, isNew: true },
        { id: 10, name: "Grey Breakfast Collection", category: "Appliqué", image: "assets/1000020758.jpg", status: "Available", isFeatured: false, isNew: true },
        { id: 11, name: "Grey Space Collection", category: "Different Artist", image: "assets/1000020761.jpg", status: "Available", isFeatured: false, isNew: true },
        { id: 12, name: "Reversible Vest", category: "Appliqué", image: "assets/1000020765.jpg", status: "Archived", isFeatured: false, isNew: false },
        { id: 13, name: "Classic Patchwork Collection 2 Button Down", category: "Different Artist", image: "assets/1000020775.jpg", status: "Available", isFeatured: true, isNew: true },
        { id: 14, name: "Denim Crop Top", category: "Appliqué", image: "assets/1000020777.jpg", status: "Archived", isFeatured: true, isNew: false },
        { id: 15, name: "Tulips Dress", category: "Reverie Collection", image: "assets/1000020771.jpg", status: "Available", isFeatured: true, isNew: true },
        { id: 16, name: "Maroon Barong Laced Fleur", category: "Appliqué", image: "assets/1000020778.jpg", status: "Available", isFeatured: true, isNew: false },
    ];

    // DOM Elements
    const tableBody = document.getElementById('admin-catalog-body');
    const itemCountDisplay = document.getElementById('admin-item-count');
    
    // Add Modal Elements
    const addModal = document.getElementById('add-modal');
    const openAddModalBtn = document.getElementById('open-add-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const addPieceForm = document.getElementById('add-piece-form');
    const newImageInput = document.getElementById('new-image');
    const newImagePreviewContainer = document.getElementById('new-image-preview-container');
    const newImagePreview = document.getElementById('new-image-preview');

    // Edit Modal Elements
    const editModal = document.getElementById('edit-modal');
    const closeEditModalBtn = document.getElementById('close-edit-modal-btn');
    const editPieceForm = document.getElementById('edit-piece-form');
    const editImageInput = document.getElementById('edit-image');
    const editImagePreviewContainer = document.getElementById('edit-image-preview-container');
    const editImagePreview = document.getElementById('edit-image-preview');

    // Dashboard Stat Elements
    const statTotal = document.getElementById('stat-total');
    const statActive = document.getElementById('stat-active');
    const statArchived = document.getElementById('stat-archived');

    // ----------------------------------------------------
    // 3. TABLE & STATS RENDERING
    // ----------------------------------------------------
    const renderTable = () => {
        tableBody.innerHTML = ''; 
        let activeCount = 0;
        let archivedCount = 0;

        catalogData.forEach(piece => {
            let placementText = "Latest Drops";
            let badgeClass = "bg-leafGreen text-white";

            if (piece.status === 'Archived') {
                placementText = "Archive";
                badgeClass = "bg-cardWhite text-brandBlack";
                archivedCount++;
            } else if (piece.isFeatured) {
                placementText = "Featured 🔥";
                badgeClass = "bg-papayaOrange text-brandBlack";
                activeCount++;
            } else {
                activeCount++;
            }

            const rowHTML = `
                <tr class="border-b-4 border-brandBlack hover:bg-brandYellow transition-colors group">
                    <td class="p-4 border-r-4 border-brandBlack text-center font-normal text-gray-700">
                        ${String(piece.id).padStart(3, '0')}
                    </td>
                    <td class="p-4 border-r-4 border-brandBlack">
                        <div class="w-12 h-12 rounded-lg border-2 border-brandBlack overflow-hidden bg-bubblegumPink group-hover:scale-105 transition-transform">
                            <img src="${piece.image}" alt="${piece.name}" class="w-full h-full object-cover">
                        </div>
                    </td>
                    <td class="p-4 border-r-4 border-brandBlack font-semibold uppercase text-brandBlack">
                        ${piece.name}
                    </td>
                    <td class="p-4 border-r-4 border-brandBlack font-normal text-gray-800">
                        ${piece.category}
                    </td>
                    <td class="p-4 border-r-4 border-brandBlack">
                        <span class="${badgeClass} text-xs font-bold uppercase py-1 px-3 rounded-full border-2 border-brandBlack shadow-[2px_2px_0_0_#1A1A1A]">
                            ${placementText}
                        </span>
                    </td>
                    <td class="p-4 flex justify-center gap-2 items-center h-full">
                        <button class="bg-papayaOrange text-brandBlack border-2 border-brandBlack rounded uppercase font-bold text-xs py-1 px-3 shadow-chunky-sm hover:-translate-y-0.5 hover:shadow-chunky transition-all" onclick="editPiece(${piece.id})">Edit</button>
                        <button class="bg-strawberryRed text-white border-2 border-brandBlack rounded uppercase font-bold text-xs py-1 px-3 shadow-chunky-sm hover:-translate-y-0.5 hover:shadow-chunky transition-all" onclick="deletePiece(${piece.id})">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', rowHTML);
        });

        itemCountDisplay.innerText = `Showing ${catalogData.length} pieces`;
        
        // Update Dashboard Stats
        if(statTotal) statTotal.innerText = catalogData.length;
        if(statActive) statActive.innerText = activeCount;
        if(statArchived) statArchived.innerText = archivedCount;
    };

    // ----------------------------------------------------
    // 4. DELETE FUNCTIONALITY
    // ----------------------------------------------------
    window.deletePiece = (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this piece from the catalog?");
        if (confirmDelete) {
            catalogData = catalogData.filter(piece => piece.id !== id);
            renderTable();
        }
    };

    // ----------------------------------------------------
    // 5. IMAGE PREVIEW HANDLERS
    // ----------------------------------------------------
    const setupImagePreview = (inputElement, previewContainer, previewImage) => {
        if (!inputElement) return;
        inputElement.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                previewImage.src = URL.createObjectURL(file);
                previewContainer.classList.remove('hidden');
            } else {
                previewImage.src = '';
                previewContainer.classList.add('hidden');
            }
        });
    };

    setupImagePreview(newImageInput, newImagePreviewContainer, newImagePreview);
    setupImagePreview(editImageInput, editImagePreviewContainer, editImagePreview);

    // ----------------------------------------------------
    // 6. ADD MODAL LOGIC
    // ----------------------------------------------------
    openAddModalBtn.addEventListener('click', () => {
        addModal.classList.remove('hidden');
        addModal.classList.add('flex');
    });

    const resetAddModal = () => {
        addModal.classList.add('hidden');
        addModal.classList.remove('flex');
        addPieceForm.reset();
        newImagePreviewContainer.classList.add('hidden');
        newImagePreview.src = '';
    };

    closeModalBtn.addEventListener('click', resetAddModal);

    addPieceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('new-name').value;
        const newCategory = document.getElementById('new-category').value;
        const newPlacement = document.getElementById('new-placement').value;
        
        let newImageURL = "assets/image_80c89f.jpg"; // fallback
        if (newImageInput.files && newImageInput.files[0]) {
            newImageURL = URL.createObjectURL(newImageInput.files[0]);
        }

        const newId = catalogData.length > 0 ? Math.max(...catalogData.map(p => p.id)) + 1 : 1;

        let isFeatured = false;
        let isNew = true;
        let status = 'Available';

        if (newPlacement === 'featured') {
            isFeatured = true;
        } else if (newPlacement === 'archive') {
            status = 'Archived';
            isNew = false;
        }

        const newPiece = { id: newId, name: newName, category: newCategory, image: newImageURL, status: status, isFeatured: isFeatured, isNew: isNew };
        catalogData.unshift(newPiece);
        renderTable();
        
        resetAddModal();
        alert("New piece successfully added to the catalog!");
    });

    // ----------------------------------------------------
    // 7. EDIT MODAL LOGIC
    // ----------------------------------------------------
    window.editPiece = (id) => {
        const piece = catalogData.find(p => p.id === id);
        if (!piece) return;

        document.getElementById('edit-id').value = piece.id;
        document.getElementById('edit-name').value = piece.name;
        document.getElementById('edit-category').value = piece.category;
        editImageInput.value = ''; // Clear file input
        
        // Show current image in preview by default
        editImagePreview.src = piece.image;
        editImagePreviewContainer.classList.remove('hidden');

        let placementVal = 'latest';
        if (piece.status === 'Archived') {
            placementVal = 'archive';
        } else if (piece.isFeatured) {
            placementVal = 'featured';
        }
        document.getElementById('edit-placement').value = placementVal;

        editModal.classList.remove('hidden');
        editModal.classList.add('flex');
    };

    const resetEditModal = () => {
        editModal.classList.add('hidden');
        editModal.classList.remove('flex');
        editPieceForm.reset();
        editImagePreviewContainer.classList.add('hidden');
        editImagePreview.src = '';
    };

    closeEditModalBtn.addEventListener('click', resetEditModal);

    editPieceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = parseInt(document.getElementById('edit-id').value);
        const updatedName = document.getElementById('edit-name').value;
        const updatedCategory = document.getElementById('edit-category').value;
        const updatedPlacement = document.getElementById('edit-placement').value;

        const pieceIndex = catalogData.findIndex(p => p.id === id);
        if (pieceIndex === -1) return;

        let finalImage = catalogData[pieceIndex].image;
        if (editImageInput.files && editImageInput.files[0]) {
            finalImage = URL.createObjectURL(editImageInput.files[0]);
        }

        let isFeatured = false;
        let isNew = true;
        let status = 'Available';

        if (updatedPlacement === 'featured') {
            isFeatured = true;
        } else if (updatedPlacement === 'archive') {
            status = 'Archived';
            isNew = false;
        }

        catalogData[pieceIndex] = {
            ...catalogData[pieceIndex],
            name: updatedName,
            category: updatedCategory,
            image: finalImage,
            status: status,
            isFeatured: isFeatured,
            isNew: isNew
        };

        renderTable();
        
        resetEditModal();
        alert("Catalog piece updated successfully!");
    });

    // Initial Render Trigger
    renderTable();
});