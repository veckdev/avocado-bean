/* =============================================================
   AVOCADO BEAN — recipes.js
   Handles the recipes page functionality:
   1. Recipe data (ingredients + steps for each dish)
   2. Filter buttons — show/hide cards by category
   3. Modal — open, fill with content, and close
   ============================================================= */


/* =============================================================
   RECIPE DATA
   All recipe content lives here as a JavaScript object.
   Each recipe has: title, category, time, description,
   a photo path, a list of ingredients, and cooking steps.
   To add a new recipe, just add a new entry to this object.
   ============================================================= */
const recipes = {

  'chickpea-curry': {
    title:       'Chickpea Curry Bowl',
    category:    'Bowls',
    pillClass:   'green-pill',
    time:        '35 min',
    photo:       '../images/dishes/img-003.webp',
    photoAlt:    'Chickpea curry bowl with coconut sauce and fresh lime',
    description: 'Golden chickpeas in a rich tomato curry sauce, served with steamed jasmine rice, crispy falafel bites, fresh cucumber, cherry tomatoes, pickled red onion, coriander & lime.',
    ingredients: [
      '400g tin of chickpeas, drained and rinsed',
      '400ml tin of coconut milk',
      '400g tin of chopped tomatoes',
      '1 medium cauliflower, cut into small florets',
      '200g jasmine rice',
      '1 red onion, thinly sliced',
      '1 lime, cut into wedges',
      'Fresh coriander, a large handful',
      '2 tbsp curry powder',
      '1 tsp turmeric',
      '1 tsp cumin seeds',
      '2 cloves of garlic, minced',
      '1 thumb-sized piece of fresh ginger, grated',
      'Salt and black pepper to taste',
      '2 tbsp olive oil'
    ],
    steps: [
      'Cook the jasmine rice according to packet instructions. Once cooked, set aside and keep warm.',
      'Heat olive oil in a large pan over medium heat. Add cumin seeds and cook for 30 seconds until fragrant.',
      'Add the minced garlic and grated ginger. Cook for 1 minute, stirring constantly so it does not burn.',
      'Add the curry powder and turmeric. Stir well and cook for another minute to toast the spices.',
      'Add the chopped tomatoes and coconut milk. Stir to combine, then bring to a gentle simmer.',
      'Add the drained chickpeas and cauliflower florets. Cook for 20 minutes until the cauliflower is tender and the sauce has thickened.',
      'Season with salt and pepper. Taste and adjust spices as needed.',
      'To serve, place a mound of rice in the centre of the bowl and ladle the curry around it. Top with fresh coriander, sliced red onion and a wedge of lime.'
    ]
  },

  'tofu-katsu': {
    title:       'Tofu Katsu Bowl',
    category:    'Bowls',
    pillClass:   'dark-pill',
    time:        '40 min',
    photo:       '../images/dishes/img-004.webp',
    photoAlt:    'Tofu katsu bowl with crispy tofu and katsu curry sauce',
    description: 'Crispy panko-breaded tofu cutlet served over jasmine rice with a silky katsu curry sauce, fresh red chilli and coriander.',
    ingredients: [
      '400g firm tofu, pressed and cut into thick slices',
      '100g panko breadcrumbs',
      '3 tbsp plain flour',
      '3 tbsp soy sauce (for marinade)',
      '200g jasmine rice',
      '2 medium carrots, diced',
      '1 medium onion, diced',
      '2 cloves of garlic, minced',
      '1 tbsp mild curry powder',
      '1 tbsp plain flour (for sauce)',
      '400ml vegetable stock',
      '1 tbsp soy sauce (for sauce)',
      '1 tsp maple syrup',
      'Fresh red chilli, sliced',
      'Fresh coriander to serve',
      '3 tbsp vegetable oil for frying'
    ],
    steps: [
      'Press the tofu for at least 15 minutes to remove excess water. Cut into thick rectangular slices about 1cm thick.',
      'Marinate the tofu slices in soy sauce for 10 minutes.',
      'Set up a breading station: flour on one plate, panko breadcrumbs on another. Coat each tofu slice in flour, then press firmly into the panko so it is fully coated.',
      'For the katsu sauce: fry the diced onion and carrot in 1 tbsp oil for 8 minutes until soft. Add the garlic and curry powder and cook for 1 minute. Add the flour and stir well. Gradually pour in the vegetable stock, stirring constantly. Add soy sauce and maple syrup. Simmer for 10 minutes, then blend until smooth.',
      'Cook the jasmine rice according to packet instructions.',
      'Heat 2 tbsp oil in a frying pan over medium-high heat. Fry the breaded tofu for 3–4 minutes each side until deep golden and crispy.',
      'To serve, place rice in the bowl, slice the tofu cutlet and lay it over the rice. Pour the katsu sauce alongside. Top with sliced red chilli and fresh coriander.'
    ]
  },

  'turmeric-scramble': {
    title:       'Turmeric Scramble',
    category:    'Toasts',
    pillClass:   'orange-pill',
    time:        '20 min',
    photo:       '../images/dishes/img-005.webp',
    photoAlt:    'Turmeric scrambled tofu on sourdough toast with red chilli',
    description: 'Silken tofu scrambled with turmeric, nutritional yeast and cumin, served on thick sourdough toast with fresh red chilli.',
    ingredients: [
      '400g firm tofu, crumbled by hand',
      '2 thick slices of sourdough bread',
      '2 tbsp nutritional yeast',
      '1 tsp turmeric powder',
      '½ tsp cumin powder',
      '½ tsp garlic powder',
      '1 tbsp soy sauce',
      '1 tbsp olive oil',
      '1 fresh red chilli, thinly sliced',
      'Salt and black pepper to taste',
      'Fresh rocket or spinach to serve (optional)'
    ],
    steps: [
      'Crumble the tofu by hand into a bowl. It should look like rough scrambled eggs — some bigger pieces are fine.',
      'Mix the turmeric, cumin, garlic powder, nutritional yeast and soy sauce together in a small bowl to make a seasoning paste.',
      'Heat the olive oil in a non-stick pan over medium heat. Add the crumbled tofu and cook for 2 minutes without stirring to let it develop some colour.',
      'Add the seasoning paste and stir well to coat all the tofu. Cook for another 3–4 minutes, stirring occasionally, until heated through and slightly golden.',
      'While the tofu cooks, toast the sourdough until deep golden and crispy.',
      'Season the scramble with salt and pepper. Taste and adjust turmeric if needed.',
      'Pile the scramble generously onto the toast. Top with fresh sliced red chilli and serve immediately.'
    ]
  }

};


/* =============================================================
   FILTER FUNCTIONALITY
   When a filter button is clicked:
   1. Mark that button as active (is-active class)
   2. Loop through all recipe cards
   3. Show cards that match the filter, hide others
   ============================================================= */
const filterButtons = document.querySelectorAll('.filter-btn');
const recipeCards   = document.querySelectorAll('.menu-recipe-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {

    /* Update active button */
    filterButtons.forEach(btn => btn.classList.remove('is-active'));
    button.classList.add('is-active');

    const selectedFilter = button.dataset.filter; /* e.g. "bowls" or "all" */

    /* Show or hide each card based on its category */
    recipeCards.forEach(card => {
      const cardCategory = card.dataset.category;

      if (selectedFilter === 'all' || cardCategory === selectedFilter) {
        card.classList.remove('is-hidden'); /* show the card */
      } else {
        card.classList.add('is-hidden');    /* hide the card */
      }
    });

  });
});


/* =============================================================
   MODAL FUNCTIONALITY
   Opens a full-screen side panel with the full recipe content.
   ============================================================= */
const modal        = document.getElementById('recipe-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose   = document.getElementById('modal-close');
const modalContent = document.getElementById('modal-content');

/* --- Build the modal HTML from recipe data --- */
function buildModalContent(recipeKey) {
  const recipe = recipes[recipeKey];
  if (!recipe) return; /* exit if recipe not found */

  /* Build the ingredients list HTML */
  const ingredientsHTML = recipe.ingredients
    .map(item => `<li>${item}</li>`)
    .join('');

  /* Build the steps list HTML */
  const stepsHTML = recipe.steps
    .map((step, index) => `
      <li>
        <span class="step-number">${String(index + 1).padStart(2, '0')}</span>
        <span>${step}</span>
      </li>
    `)
    .join('');

  /* Inject everything into the modal */
  modalContent.innerHTML = `
    <img
      class="modal-photo"
      src="${recipe.photo}"
      alt="${recipe.photoAlt}"
    >
    <div class="modal-body">
      <div class="modal-meta">
        <span class="category-pill ${recipe.pillClass}">${recipe.category}</span>
        <span class="modal-time">${recipe.time}</span>
      </div>
      <h2 class="modal-title">${recipe.title}</h2>
      <p class="modal-description">${recipe.description}</p>

      <h3 class="modal-section-title">Ingredients</h3>
      <ul class="ingredients-list">${ingredientsHTML}</ul>

      <h3 class="modal-section-title">How to make it</h3>
      <ol class="steps-list">${stepsHTML}</ol>

      <a href="contact.html" class="modal-cta">Order ingredients →</a>
    </div>
  `;
}

/* --- Open the modal --- */
function openModal(recipeKey) {
  buildModalContent(recipeKey);
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden'; /* prevent page scrolling behind modal */
}

/* --- Close the modal --- */
function closeModal() {
  modal.classList.remove('is-open');
  document.body.style.overflow = ''; /* restore page scrolling */
}

/* Listen for clicks on all "See recipe" buttons */
document.querySelectorAll('[data-recipe]').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.stopPropagation(); /* prevent the click bubbling up to the card */
    const recipeKey = trigger.dataset.recipe;
    openModal(recipeKey);
  });
});

/* Close when clicking the X button */
modalClose.addEventListener('click', closeModal);

/* Close when clicking the dark overlay */
modalOverlay.addEventListener('click', closeModal);

/* Close when pressing the Escape key */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});