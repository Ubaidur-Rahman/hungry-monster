const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetails = document.getElementById('meal-details-gradients');
searchBtn.addEventListener('click', getListOfMeal);


// get meal list function defined
function getListOfMeal() {
    let mealResult = document.getElementById('meal-result')
    let searchInput = document.getElementById('meal-input').value;
    let notFound = document.getElementById('notFound');
    let nameUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
    fetch(nameUrl)
        .then(res => res.json())
        .then(data => {
            if (data.meals === null || searchInput.length === 0) {
                notFound.innerHTML = `<p class="text-center">Sorry! we didn't find any meal</p>`;
                notFound.style.display = 'block';
                mealResult.style.display = 'none';
                mealDetails.style.display = 'none'

            } else {
                let mealNameArea = ''
                data.meals.forEach(meal => {
                    mealNameArea += `
                <div class="meal-item" onclick="seeDetails('${meal.idMeal}')" id = "${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class="meal-name">
                        <h4>${meal.strMeal}</h4>
                    </div>
                </div>
            `;
                });
                mealList.innerHTML = mealNameArea;
                notFound.style.display = 'none';
                mealResult.style.display = 'block'
                mealDetails.style.display = 'none'
            }
        });
    document.getElementById('meal-input').value = '';
};


// see details function defined 
const seeDetails = id => {
    const urlId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(urlId)
        .then(res => res.json())
        .then(data => {
            let accessMeal = data.meals[0];
            let mealDetail = `
            <div class="meal-detail-img">
                <img src="${accessMeal.strMealThumb}" alt="">
            </div>
            <div class="meal-detail-name">
                <h4>${accessMeal.strMeal}</h4>
            </div>
            <h6 class="my-4 ">Ingredients</h6>
            <div id="ingredient-list">
                <ul>
                    <li>${accessMeal.strIngredient1}  ${accessMeal.strMeasure1}</li>
                    <li>${accessMeal.strIngredient2}  ${accessMeal.strMeasure2}</li>
                    <li>${accessMeal.strIngredient3}  ${accessMeal.strMeasure3}</li>
                    <li>${accessMeal.strIngredient4}  ${accessMeal.strMeasure4}</li>
                    <li>${accessMeal.strIngredient5}  ${accessMeal.strMeasure5}</li>
                    <li>${accessMeal.strIngredient6}  ${accessMeal.strMeasure6}</li>
                    <li>${accessMeal.strIngredient7}  ${accessMeal.strMeasure7}</li>
                    <li>${accessMeal.strIngredient8}  ${accessMeal.strMeasure8}</li>
                    <li>${accessMeal.strIngredient9}  ${accessMeal.strMeasure9}</li>
                    <li>${accessMeal.strIngredient10}  ${accessMeal.strMeasure10}</li>
                </ul>
            </div>
        `;
            mealDetails.innerHTML = mealDetail;
        });
    mealDetails.style.display = 'block';
};