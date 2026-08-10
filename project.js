// ===================== PROJECT DATA =====================
const projects = [
  {
    id: 1,
    title: "Awesome Solar",
    category: "Website",
    image: "image/awesome-solar.png",
    description: "Designed and developed a modern solar energy landing page with a responsive layout, engaging visuals, smooth interactions, and reusable components using HTML, CSS, and JavaScript.",
    technologies: [
        "HTML",
        "CSS",
        "JavaScript"
    ],
    github: "https://github.com/dammy-peter/AwesomeSolar",
    live: "https://awesome-solar.vercel.app/",
    features: [
        "Responsive design",
        "Interactive hero section",
        "Image slider",
        "Service sections",
        "Newsletter subscription",
        "Modern UI/UX"
    ]
  }
  // STEP 1: Duplicate this object to add a new project
  // STEP 2: Replace the values inside the curly braces {}
  // STEP 3: Save the file - the new project will appear automatically!
];

// ===================== RENDER PROJECTS =====================
const projectsGrid = document.getElementById('projectsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');

function renderProjects(projectsToRender) {
  if (!projectsToRender || projectsToRender.length === 0) {
    projectsGrid.innerHTML = `
      <div class="projects__no-results">
        <h3>No projects found</h3>
        <p>Try adjusting your search or filter.</p>
      </div>
    `;
    return;
  }

  projectsGrid.innerHTML = projectsToRender.map(project => `
    <div class="project-card" data-category="${project.category}" data-title="${project.title.toLowerCase()}">
      <div class="project-card__image">
        <img src="${project.image}" alt="${project.title} screenshot" loading="lazy" onerror="this.src='https://via.placeholder.com/600x400/1a1a1a/3b82f6?text=Project+Image'" />
        <div class="project-card__overlay">
          <button class="btn btn--solid" onclick="openModal(${project.id})">Preview</button>
          <a href="${project.github}" target="_blank" rel="noopener" class="btn btn--outline">GitHub</a>
        </div>
      </div>
      <div class="project-card__body">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-card__tech">
          ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// ===================== FILTER PROJECTS =====================
function filterProjects() {
  const searchTerm = searchInput.value.toLowerCase();
  const activeFilter = document.querySelector('.filter-btn.active');
  const filter = activeFilter ? activeFilter.dataset.filter : 'all';

  const filtered = projects.filter(project => {
    const matchesCategory = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm) ||
                          project.description.toLowerCase().includes(searchTerm) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(searchTerm));
    return matchesCategory && matchesSearch;
  });

  renderProjects(filtered);
}

// ===================== FILTER BUTTONS =====================
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filterProjects();
  });
});

// ===================== SEARCH =====================
searchInput.addEventListener('input', filterProjects);

// ===================== MODAL =====================
const modal = document.getElementById('projectModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalFeatures = document.getElementById('modalFeatures');
const modalTech = document.getElementById('modalTech');
const modalLive = document.getElementById('modalLive');
const modalGithub = document.getElementById('modalGithub');

function openModal(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return;

  console.log(project.image);

  modalImage.src = project.image + "?v=" + Date.now();
  modalImage.alt = `${project.title} screenshot`;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;

  modalFeatures.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
  modalTech.innerHTML = project.technologies.map(tech => `<span>${tech}</span>`).join('');

  modalLive.href = project.live;
  modalGithub.href = project.github;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  function openModal(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return;

  console.log(project.image);
  console.log(modalImage);

  modalImage.src = project.image;

  
}
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Make functions globally accessible
window.openModal = openModal;
window.closeModal = closeModal;

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});

// ===================== INITIAL RENDER =====================
// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  renderProjects(projects);
});