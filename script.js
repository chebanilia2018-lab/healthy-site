document.addEventListener("DOMContentLoaded", () => {
 
  const bmiForm = document.getElementById("bmi-form");
  const bmiResult = document.getElementById("bmi-result");

  if (bmiForm && bmiResult) {
    bmiForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const heightInput = document.getElementById("height");
      const weightInput = document.getElementById("weight");

      const height = parseFloat(heightInput.value);
      const weight = parseFloat(weightInput.value);

      if (!height || !weight || height <= 0 || weight <= 0) {
        bmiResult.textContent = "Пожалуйста, введите корректные значения роста и веса.";
        bmiResult.style.color = "red";
        return;
      }

      const heightMeters = height / 100;
      const bmi = weight / (heightMeters * heightMeters);
      const bmiRounded = Math.round(bmi * 10) / 10;

      let status;
      if (bmi < 18.5) {
        status = "недостаточная масса тела";
      } else if (bmi < 25) {
        status = "нормальная масса тела";
      } else if (bmi < 30) {
        status = "избыточная масса тела";
      } else {
        status = "ожирение";
      }

      bmiResult.style.color = "#222";
      bmiResult.textContent = `Ваш ИМТ: ${bmiRounded} – ${status}.`;
    });
  }

 
  const recipeForm = document.getElementById("recipe-form");
  const recipesList = document.getElementById("recipes-list");
  const recipeMessage = document.getElementById("recipe-message");

  
  const STORAGE_KEY = "userRecipes";

  function loadUserRecipes() {
    if (!recipesList) return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const recipes = JSON.parse(saved);
      if (!Array.isArray(recipes)) return;

      recipes.forEach((recipe) => {
        addRecipeCardToDOM(recipe);
      });
    } catch (e) {
      console.error("Ошибка чтения рецептов из localStorage", e);
    }
  }

  function saveUserRecipe(recipe) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const recipes = saved ? JSON.parse(saved) : [];
      recipes.push(recipe);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    } catch (e) {
      console.error("Ошибка сохранения рецепта", e);
    }
  }

  function addRecipeCardToDOM(recipe) {
    if (!recipesList) return;

    const article = document.createElement("article");
    article.className = "card recipe user-recipe";

    const titleEl = document.createElement("h2");
    titleEl.textContent = recipe.title;

    const tagEl = document.createElement("p");
    tagEl.className = "tag";
    tagEl.textContent = recipe.type || "Рецепт";

    const ingredTitle = document.createElement("h3");
    ingredTitle.textContent = "Ингредиенты:";

    const ingredList = document.createElement("p");
    ingredList.textContent = recipe.ingredients;

    const stepsTitle = document.createElement("h3");
    stepsTitle.textContent = "Приготовление:";

    const stepsText = document.createElement("p");
    stepsText.textContent = recipe.steps;

    article.appendChild(titleEl);
    article.appendChild(tagEl);
    article.appendChild(ingredTitle);
    article.appendChild(ingredList);
    article.appendChild(stepsTitle);
    article.appendChild(stepsText);

    recipesList.appendChild(article);
  }

  if (recipeForm && recipesList) {
    // подгружаем уже сохранённые рецепты при открытии страницы
    loadUserRecipes();

    recipeForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const titleInput = document.getElementById("recipe-title");
      const typeSelect = document.getElementById("recipe-type");
      const ingredInput = document.getElementById("recipe-ingredients");
      const stepsInput = document.getElementById("recipe-steps");

      const title = titleInput.value.trim();
      const type = typeSelect.value;
      const ingredients = ingredInput.value.trim();
      const steps = stepsInput.value.trim();

      if (!title || !ingredients || !steps) {
        if (recipeMessage) {
          recipeMessage.textContent = "Пожалуйста, заполните все обязательные поля.";
          recipeMessage.style.color = "red";
        }
        return;
      }

      const newRecipe = { title, type, ingredients, steps };

      
      addRecipeCardToDOM(newRecipe);
      
      saveUserRecipe(newRecipe);

      
      recipeForm.reset();

      if (recipeMessage) {
        recipeMessage.textContent = "Рецепт сохранён!";
        recipeMessage.style.color = "#2e8b57";
      }
    });
  }
});

