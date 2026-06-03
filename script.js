const looks = [
  {
    number: "Look 1",
    title: "The New",
    category: ["power", "structure"],
    image: "assets/look-01-new.jpg",
    detail: "assets/look-01-detail.jpg",
    summary: "A round-collared jacket with detachable pointed-lapel-inspired flared panels, styled with a fold-over collared shirt and trousers.",
    materials: [
      "Custom woven fabric: 70% wool, 30% silk, with a hidden Chinese jacquard cloud pattern.",
      "Lining: 100% silk gauze.",
      "Shirt: 98% cotton, 2% spandex.",
      "Trousers: 100% wool."
    ]
  },
  {
    number: "Look 2",
    title: "The Trench",
    category: ["power", "structure"],
    image: "assets/look-02-trench.jpg",
    detail: "assets/look-02-detail.jpg",
    summary: "An overlapped-collar jacket with detachable oversized flared panels, styled with a fold-over collared shirt and wool shorts.",
    materials: [
      "Jacket: double-sided satin fabric, 100% cotton.",
      "Lining: 100% silk satin with a hidden Chinese jacquard cloud pattern.",
      "Shirt: 70% cotton, 30% linen.",
      "Shorts: 100% wool."
    ]
  },
  {
    number: "Look 3",
    title: "The Deconstructed",
    category: ["structure"],
    image: "assets/look-03-deconstructed.jpg",
    detail: "assets/look-03-detail.jpg",
    summary: "A round-collared jacket with deconstructed flared panels, styled with a fold-over collared shirt and deconstructed asymmetrical-waist trousers.",
    materials: [
      "Jacket: chalk-stripe fabric, 100% wool.",
      "Lining: 100% silk gauze with a hidden Chinese jacquard lotus pattern.",
      "Shirt: 98% cotton, 2% spandex.",
      "Trousers: 100% wool."
    ]
  },
  {
    number: "Look 4",
    title: "The Skeleprint",
    category: ["material", "minimal"],
    image: "assets/look-04-skeleprint.jpg",
    detail: "assets/look-04-detail.jpg",
    summary: "A round-collared dress developed with a 1:1 pattern and print derived from a historical artifact.",
    materials: [
      "Dress: double-sided twill fabric, 70% wool, 30% silk.",
      "Lining: pinstripe fabric, 98% cotton, 2% spandex."
    ]
  },
  {
    number: "Look 5",
    title: "The Pagoda",
    category: ["power", "structure"],
    image: "assets/look-05-pagoda.jpg",
    detail: "assets/look-05-detail.jpg",
    summary: "An overlapped-collar jacket with pagoda-sleeve-shaped flared panels, styled with a fold-over collared shirt and deconstructed crotch-seam trousers.",
    materials: [
      "Jacket: 100% cotton.",
      "Shirt: 98% cotton, 2% spandex.",
      "Trousers: 100% wool."
    ]
  },
  {
    number: "Look 6",
    title: "The Mix",
    category: ["material", "structure"],
    image: "assets/look-06-mix.jpg",
    detail: "assets/look-06-detail.jpg",
    summary: "A short round-collared jacket, a round-overlapped-collar shirt, shorts, and chaps-inspired outer leg panels.",
    materials: [
      "Jacket: 100% denim fabric.",
      "Shirt: 98% cotton, 2% spandex.",
      "Shorts: 100% cotton denim.",
      "Chaps-inspired panels: 100% silk gauze."
    ]
  },
  {
    number: "Look 7",
    title: "The Old",
    category: ["minimal"],
    image: "assets/look-07-old.jpg",
    detail: "assets/look-07-detail.jpg",
    summary: "An overlapped-collar jacket and overlapped-collar yisa dress, styled with a fold-over collared shirt and wool shorts.",
    materials: [
      "Jacket: 100% silk gauze.",
      "Yisa: 100% cotton.",
      "Shirt: 70% cotton, 30% linen.",
      "Shorts: 100% wool."
    ]
  },
  {
    number: "Look 8",
    title: "The Felt",
    category: ["material", "minimal"],
    image: "assets/look-08-felt.jpg",
    detail: "assets/look-08-detail.jpg",
    summary: "A stand-round-collared jacket, styled with a fold-over collared shirt and wool shorts, built through a handmade felted fabric solution.",
    materials: [
      "Jacket: handmade felted fabric made from two different wool fabrics: double-sided wool and single-sided wool.",
      "Shirt: 70% cotton, 30% linen.",
      "Shorts: 100% wool."
    ]
  }
];

const grid = document.querySelector('#lookGrid');
const modal = document.querySelector('#lookModal');
const modalImage = document.querySelector('#modalImage');
const modalDetailImage = document.querySelector('#modalDetailImage');
const modalNumber = document.querySelector('#modalNumber');
const modalTitle = document.querySelector('#modalTitle');
const modalDescription = document.querySelector('#modalDescription');
const modalMaterials = document.querySelector('#modalMaterials');
const closeModal = document.querySelector('.modal-close');

function renderLooks(filter = 'all') {
  grid.innerHTML = '';
  looks
    .filter(look => filter === 'all' || look.category.includes(filter))
    .forEach((look, index) => {
      const card = document.createElement('article');
      card.className = 'look-card';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Open ${look.number} ${look.title}`);
      card.innerHTML = `
        <figure><img src="${look.image}" alt="${look.number} ${look.title}" loading="lazy"></figure>
        <div class="look-card-content">
          <small>${look.number}</small>
          <h3>${look.title}</h3>
          <p>${look.summary}</p>
          <div class="tag-list">${look.category.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
        </div>`;
      card.addEventListener('click', () => openLook(look));
      card.addEventListener('keydown', e => { if (e.key === 'Enter') openLook(look); });
      grid.appendChild(card);
    });
}

function openLook(look) {
  modalImage.src = look.image;
  modalDetailImage.src = look.detail;
  modalNumber.textContent = look.number;
  modalTitle.textContent = look.title;
  modalDescription.textContent = look.summary;
  modalMaterials.innerHTML = look.materials.map(item => `<li>${item}</li>`).join('');
  modal.showModal();
}

closeModal.addEventListener('click', () => modal.close());
modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.open) modal.close(); });

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    renderLooks(button.dataset.filter);
  });
});

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', () => nav.classList.remove('open'));

document.querySelector('#year').textContent = new Date().getFullYear();


renderLooks();
