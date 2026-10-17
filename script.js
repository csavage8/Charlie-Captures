/* ==========================================================================
   CHARLIE'S LENS - GALLERY MANAGEMENT SCRIPT (script.js)
   ========================================================================== */

// 1. CONFIGURATION & SECURITY
const ADMIN_PASSWORD = "Readingfc1871";

// 2. MASTER PHOTO DATASET
// Line 11: Add your photo details here using the image paths uploaded to GitHub
const myPhotos = [
  {
    id: 1,
    title: "Alpine Lake Reflection",
    category: "landscape",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    description: "Early morning reflection shot high up in the mountain trail."
  },
  {
    id: 2,
    title: "City Lights Rain",
    category: "street",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
    description: "Neon reflections captured during a late evening downpour."
  },
  {
    id: 3,
    title: "Golden Hour Portrait",
    category: "portrait",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    description: "Warm sunset portrait taken using natural window light."
  },
  {
    id: 4,
    title: "Misty Pine Forest",
    category: "landscape",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
    description: "Fog rolling through the forest trees right after dawn."
  },
  {
    id: 5,
    title: "Urban Geometry",
    category: "street",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    description: "Low-angle architectural perspective highlighting shadows and symmetry."
  },
  {
    id: 6,
    title: "Northern Sky Glow",
    category: "landscape",
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop",
    description: "Night skies lit up over cold northern mountains."
  }
];

// 3. RENDER GALLERY GRID
function displayGallery(photos) {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = '';

  photos.forEach(photo => {
    const card = document.createElement('div');
    card.className = 'bg-brand-card border border-brand-border rounded-2xl overflow-hidden img-hover-container cursor-pointer hover:border-brand-gold/40 transition-all';
    card.onclick = () => openLightbox(photo);

    card.innerHTML = `
      <div class="h-64 bg-black overflow-hidden relative">
        <img src="${photo.image}" alt="${photo.title}" class="w-full h-full object-cover">
        <span class="absolute top-3 left-3 bg-brand-dark/80 text-brand-gold text-[10px] font-mono px-2.5 py-1 rounded border border-brand-gold/20 uppercase tracking-widest">
          ${photo.category}
        </span>
      </div>
      <div class="p-5 flex items-center justify-between">
        <div>
          <h3 class="font-bold text-white text-lg">${photo.title}</h3>
          <p class="text-xs text-gray-400 mt-1">${photo.description}</p>
        </div>
        <div class="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center text-gray-400">
          <i class="fa-solid fa-expand text-xs"></i>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// 4. FILTER GALLERY BY CATEGORY
function filterCategory(category) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.classList.remove('bg-brand-gold', 'text-black', 'border-brand-gold', 'font-semibold');
    btn.classList.add('border-brand-border', 'text-gray-400');
  });

  if (window.event && window.event.target) {
    window.event.target.classList.add('bg-brand-gold', 'text-black', 'border-brand-gold', 'font-semibold');
    window.event.target.classList.remove('border-brand-border', 'text-gray-400');
  }

  if (category === 'all') {
    displayGallery(myPhotos);
  } else {
    const filtered = myPhotos.filter(item => item.category === category);
    displayGallery(filtered);
  }
}

// 5. AUTHENTICATED ADMIN FUNCTIONS
function openAdmin() {
  const pass = prompt("Enter Admin Password:");
  if (pass === ADMIN_PASSWORD) {
    document.getElementById('admin-modal').classList.remove('hidden');
  } else if (pass !== null) {
    alert("Incorrect Password!");
  }
}

function closeAdmin() {
  document.getElementById('admin-modal').classList.add('hidden');
}

function addPhoto(e) {
  e.preventDefault();
  
  const newPhoto = {
    id: Date.now(),
    title: document.getElementById('admin-title').value,
    category: document.getElementById('admin-category').value,
    image: document.getElementById('admin-image').value,
    description: document.getElementById('admin-desc').value
  };

  myPhotos.unshift(newPhoto);
  displayGallery(myPhotos);
  closeAdmin();
  e.target.reset();
}

// 6. LIGHTBOX FUNCTIONS
function openLightbox(photo) {
  document.getElementById('lightbox-img').src = photo.image;
  document.getElementById('lightbox-tag').innerText = photo.category;
  document.getElementById('lightbox-title').innerText = photo.title;
  document.getElementById('lightbox-desc').innerText = photo.description;

  document.getElementById('lightbox').classList.remove('hidden');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
}

// 7. MOBILE MENU TOGGLE
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('hidden');
}

// INITIAL LOAD
window.onload = function() {
  displayGallery(myPhotos);
  const menuBtn = document.getElementById('mobile-menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMobileMenu);
  }
};
