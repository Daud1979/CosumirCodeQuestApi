
btngenerate = document.querySelector('#generateQuestions');
const output = document.querySelector("#output");
const questionsContainer = document.querySelector('#questions-container');
const spinner = document.getElementById("spinner");
document.addEventListener('DOMContentLoaded', () => {
  // Manejador de Tabs
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.questions-container');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover la clase "active" de todas las pestañas y contenido
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Agregar la clase "active" a la pestaña seleccionada
      button.classList.add('active');
      const target = document.querySelector(button.dataset.target);
      target.classList.add('active');
    });
  });

  // Aquí puedes agregar tu lógica para consumir la API y mostrar los datos
});
btngenerate.addEventListener('click', ()=>{
   apiurl = document.querySelector('#apiurl');
   api = document.querySelector('#api-select').value;
   categories = document.querySelector('#category-select').value;
   count= document.querySelector('#question-count').value;
   api =='ia'? api='https://codequestapi.onrender.com/api/v1/questions/ai':api='https://codequestapi.onrender.com/api/v1/questions/random'
   categories=='all'?categories='':categories=categories   
   apiurl.value=`${api}?amount=${count}&categories=${categories}`;
   const API_URL = `${api}?amount=${count}&categories=${categories}`;
   output.innerHTML='';
   questionsContainer.innerHTML='';
   spinner.style.display = "block";
   axios.get(API_URL, {
      headers: {
        "Content-Type": "application/json", 
      },
    })
    .then((response) => {      
      output.textContent = JSON.stringify(response.data, null, 2);
      const results = response.data.results;     
      results.forEach(question => {
        const questionCard = document.createElement('div');
        questionCard.classList.add('question-card');

        // Categorías de la pregunta
        const categories = document.createElement('p');
        categories.classList.add('categories');
        categories.textContent = `Categories: ${question.categories}`;

        // Título de la pregunta
        const questionText = document.createElement('h3');
        questionText.textContent = question.question;

        // Opciones de respuesta
        const answerOptions = document.createElement('div');
        answerOptions.classList.add('answer-options');
        
        question.answerOptions.forEach(option => {
          const answer = document.createElement('div');
          answer.classList.add('answer');
          if (option.isCorrect) {
            answer.classList.add('correct');
            answer.textContent = option.answer; // Respuesta correcta
          } else {
            answer.classList.add('incorrect');
            answer.textContent = option.answer; // Respuesta incorrecta
          }
          answerOptions.appendChild(answer);
        });

        // Mostrar los ejemplos de código si existen
        if (question.codeExamples.length > 0) {
          const codeExample = document.createElement('div');
          codeExample.classList.add('code-example');
          codeExample.textContent = question.codeExamples;
          questionCard.appendChild(codeExample);
        }

        // Agregar todo al contenedor de preguntas
        questionCard.appendChild(categories);
        questionCard.appendChild(questionText);
        questionCard.appendChild(answerOptions);
        questionsContainer.appendChild(questionCard);
      });
      spinner.style.display = "none";
    })
    .catch((error) => {
      output.textContent = `Error: ${error.message}`;
      console.error("Error fetching data:", error.message);
    }) 

});
