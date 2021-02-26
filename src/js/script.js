/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  /*Add reference */
  const select = {
    templateOf: {
      booksTemplate: '#template-book', //szablon
    },
    containerOf: {
      booksList: '.books-list', //box HTML
    },
  };

  /* make a Handlebars.compile for a booksTemplate (SZABLON) */
  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };
  
  /* Petla przechodząca po każdym elemencie dataSource.books z pliku data.js // 10.2 Ćwiczenie 1 // */
  function render() {
    for(let books of dataSource.books) {

      /* generate HTML base on booksTample (SZABLON) */
      const generatedHTML = templates.booksTemplate(books);

      /* create DOM element (używamy utils.createDOMFromHTML z  functions.js) */
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);

      /* finde menu container (.books-list) */
      const booksContainer = document.querySelector(select.containerOf.booksList);

      /* Add DOM element to menu container (.books-list) */

      booksContainer.appendChild(generatedDOM);
    }
  }
  render(); 

  /* dodajemy tablicę favoriteBooks w której będą przechowywane książki z klasą favorite // 10.2 Ćwiczenie 2 // */
  const favoriteBooks = [];

  /* tworzymy funkcje initActions odpowwidzialną za nadawanie klasy favorite */
  function initActions() {
    
    const booksContainer = document.querySelector(select.containerOf.booksList);
    const booksImage = booksContainer.querySelectorAll('.book_image')
    
    /* double-clicked element */
    for(let image of booksImage) {
        image.addEventListener('dbclick', function(event) {
            event.preventDefault(); // zatrzymanie domyślnej akcji
            image.classList.add('favorite'); // dodanie klasy favorite 
            const id = image.getAttribute('data-id'); // pobranie identyfikatora książki
            favoriteBooks.push(id);

        });
    }
  }
  initActions();
}