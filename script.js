

const searchBtn = document.getElementById('search-btn');
const mealListWrapper = document.getElementById('meal-list-wrapper');



searchBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const searchInputText = document.getElementById('search-input').value;
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`

  fetch(url)
  .then(response => response.json())
  .then(data => getMealList(data.meals))

})


const getMealList = (meals) => {

  let searchResult = '';
  if(meals) {
    meals.forEach(meal => {

      searchResult += `
        <div class="single-meal" data-id="${meal.idMeal}">
          <div class="meal-image">
            <img class="meal-thumb" src="${meal.strMealThumb}" alt="">
          </div>
          <div class="meal-info">
            <h3> <a class="meal-title" href="#0"> ${meal.strMeal} </a> </h3>
          </div>
        </div>
      `
    });

    mealListWrapper.classList.remove('not-found');
  } else {
    searchResult = "Sorry, we didn't find any meal!";
    mealListWrapper.classList.add('not-found'); 
  }

  mealListWrapper.innerHTML = searchResult;
}




mealListWrapper.addEventListener('click', getMealRecipe);
function getMealRecipe(e) {
  e.preventDefault();

  if(e.target.classList.contains('meal-title' || 'meal-thumb')) {

    let mealItem = e.target.parentElement.parentElement.parentElement;



    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
    .then(response => response.json())

    .then(data => {
      mealDetails(data.meals[0]);

    })
  }
}

const mealDetails = (meal) => {
  let mealDetailsWrapper = document.getElementById('meal-details-wrapper');

  console.log(meal);

  mealDetailsWrapper.innerHTML = `
    <div class="meal-details-modal"> 
      <div class="meal-image">
        <img class="meal-thumb" src="${meal.strMealThumb}" alt="">
      </div>
      <div class="meal-info">
        <h3> <strong>Meal Name:</strong> ${meal.strMeal} </h3>
        <p> <strong>Category:</strong> ${meal.strCategory} </p>
        <p> <strong>Area:</strong> ${meal.strArea} </p>

        <ul class="ingredient">
          <h5>Ingredients</h5>
          <li> <span class="bollet"></span> ${meal.strIngredient1} </li>
          <li> <span class="bollet"></span> ${meal.strIngredient2} </li>
          <li> <span class="bollet"></span> ${meal.strIngredient3} </li>
          <li> <span class="bollet"></span> ${meal.strIngredient4} </li>
          <li> <span class="bollet"></span> ${meal.strIngredient5} </li>
        </ul>
      </div>
      <button class="close-btn" id="close-modal" onclick="closeModal()"> Close </button>
    </div>
  `

  document.querySelector('.main-wrapper').appendChild(mealDetailsWrapper);
  mealDetailsWrapper.classList.add('open')

}

function closeModal() {
  document.getElementById('meal-details-wrapper').classList.remove('open')
}