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
});
