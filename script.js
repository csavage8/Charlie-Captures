/* ==========================================================================
   CHARLIE'S LENS - GALLERY MANAGEMENT & ALBUMS SCRIPT
   ========================================================================== */

// 1. MASTER PHOTO DATASET
const myPhotos = [
  {
    id: 1,
    title: "Nature & Wildlife Album",
    category: "nature",
    image: "images/DSC_2500.jpg",
    beforeImage: "images/DSC_2500.jpg",
    description: "Explore wildlife and natural landscapes captured across Berkshire."
  },
  {
    id: 2,
    title: "Alpine Lake Reflection",
    category: "landscape",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    beforeImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop&sat=-100",
    description: "Early morning reflection shot. Slide to compare the raw capture vs color-graded final."
  },
  {
    id: 3,
    title: "City Lights Rain",
    category: "street",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
    beforeImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop&sat=-80",
    description: "Neon reflections captured during a late evening downpour."
  },
  {
    id: 4,
    title: "Golden Hour Portrait",
    category: "portrait",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    beforeImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop&sat=-80",
    description: "Warm sunset portrait taken using natural window light."
  }
];

// 2. RENDER GALLERY GRID
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
        ${photo.beforeImage ? `
          <span class="absolute bottom-3 right-3 bg-brand-gold text-black text-[10px] font-bold font-mono px-2 py-0.5 rounded shadow">
            SLIDER AVAILABLE
          </span>
        ` : ''}
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

// 3. FILTER GALLERY BY CATEGORY
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

// 4. LIGHTBOX & BEFORE/AFTER SLIDER LOGIC
function openLightbox(photo) {
  const editedImg = document.getElementById('lightbox-img');
  const beforeImg = document.getElementById('lightbox-before-img');
  const beforeOverlay = document.getElementById('before-overlay');
  const handle = document.getElementById('slider-handle');
  const labelBefore = document.getElementById('label-before');
  const labelAfter = document.getElementById('label-after');
  const sliderInput = document.getElementById('slider-range');
  const wrapper = document.getElementById('slider-wrapper');

  editedImg.src = photo.image;
  
  if (photo.beforeImage) {
    beforeImg.src = photo.beforeImage;
    beforeOverlay.style.display = 'block';
    handle.style.display = 'block';
    labelBefore.style.display = 'block';
    labelAfter.innerText = 'EDITED';
    sliderInput.disabled = false;
    
    setTimeout(() => {
      if (wrapper && beforeImg) {
        beforeImg.style.width = wrapper.offsetWidth + 'px';
        beforeImg.style.height = wrapper.offsetHeight + 'px';
      }
    }, 50);

    updateSlider(50);
  } else {
    beforeOverlay.style.display = 'none';
    handle.style.display = 'none';
    labelBefore.style.display = 'none';
    labelAfter.innerText = 'PHOTO';
    sliderInput.disabled = true;
  }

  document.getElementById('lightbox-tag').innerText = photo.category;
  document.getElementById('lightbox-title').innerText = photo.title;
  document.getElementById('lightbox-desc').innerText = photo.description;

  document.getElementById('lightbox').classList.remove('hidden');
}

function updateSlider(val) {
  const beforeOverlay = document.getElementById('before-overlay');
  const handle = document.getElementById('slider-handle');
  
  if (beforeOverlay && handle) {
    beforeOverlay.style.width = val + '%';
    handle.style.left = val + '%';
  }
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
}

// 5. MOBILE MENU TOGGLE
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
