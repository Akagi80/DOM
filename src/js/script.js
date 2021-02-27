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
      filters: '.filters', // 10.2.5
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

  // dodajemy tablicę favoriteBooks w której będą przechowywane książki z klasą favorite // 10.2.2 //
  const favoriteBooks = [];

  // dodajemy tablicę do "wyfiltrowanych" elementów // 10.2.5 //
  const filters = [];

  // tworzymy funkcje initActions odpowwidzialną za nadawanie klasy favorite
  function initActions() {

    // tworzymy referencję do listy wszystkich elementów .book__image w liście .booksList
    const booksContainer = document.querySelector(select.containerOf.booksList);  // nasz kontener na książki

    // wyszukujemy nie każdy pojedyńczy element a CAŁY kontener //10.2.4 //
    booksContainer.addEventListener('dblclick', function(event) {
      event.preventDefault();

      const clickedElement = event.target.offsetParent;
      const id = clickedElement.getAttribute('data-id');

      if (!clickedElement.classList.contains('favorite')) {
        favoriteBooks.push(id);
        clickedElement.classList.add('favorite');
      } else {
        favoriteBooks.splice(favoriteBooks.indexOf(id), 1);
        clickedElement.classList.remove('favorite');
      }
    });

    // filtrowanie książek // 10.2.5 //
    const filtersContainer = document.querySelector(select.containerOf.filters);
    filtersContainer.addEventListener('click', function(event) {

      // sprawdzamy czy kliknięty element to nasz checkbox (czy jego tagName to INPUT, type to checkbox, a name to filter) // 10.2.5 //
      const clickedElement = event.target;

      if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name ==='filter'){
        console.log(clickedElement.value);

        // sprawdzamy czy INPUT jest zaznaczony (checked): jeżeli tak to dodajemy "value" do tablicy
        if(clickedElement.checked){
          filters.push(clickedElement.value);
          console.log('filters', filters)

        // jeżeli nie, to usuwamy do z tablicy
        } else {
          const id = filters.indexOf(clickedElement.value);
          filters.splice(filters.indexOf(id), 1);
          console.log('filters', filters);
        }
      }
      filterBooks();
    });
  }
  initActions();
  // console.log(favoriteBooks);

  // dokończenie - filtrowanie właściwe // 10.2.5 //
  function filterBooks() {
    for(let book of dataSource.books) {
      let shouldBeHidden = false; // zmienna która określa czy dodać do książki "hidden"

      for(let filter of filters) {  // pętla sprawdzająca czy filtr pasuje do informacji o danej książce
        if(!book.details[filter]) { // jak włąściwość DANEJ KSIAŻKI [filter] (aldus lub nonFiction) jest true to...
          shouldBeHidden = true; // shouldBeHidden zmieniamy na true
          break; // przerywamy dzaiłanie pętli - pierwszy filtr od razu dyskwalifikuje książkę - wymogi zadania
        }
      }
      // pętla sprawdzająca wartość shouldBeHidden i jezeli jest równa "true" to nadaje jej klasę "hidden" aby ukryć książkę, jeżeli jest "false" to zabiera klasę "hidden"
      if(shouldBeHidden) {
        document.querySelector('.book__image[data-id="' + book.id + '"]').classList.add('hidden');
      } else {
        document.querySelector('.book__image[data-id="' + book.id + '"]').classList.remove('hidden');
      }
    }
  }
}
