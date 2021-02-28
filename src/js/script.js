/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

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

  class BookList {
    constructor() {
      const thisBookList = this;
      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.determineRatingBgc();
      thisBookList.initActions();
    }
    initData() {
      const thisBookList = this;
      thisBookList.data = dataSource.books;
    }
    getElements() {
      const thisBookList = this;

      thisBookList.booksContainer = document.querySelector(select.containerOf.booksList);
      thisBookList.filtersContainer = document.querySelector(select.containerOf.filters);
      thisBookList.favoriteBooks = []; // dodajemy tablicę favoriteBooks w której będą przechowywane książki z klasą favorite // 10.2.2 //
      thisBookList.filters = []; // dodajemy tablicę do "wyfiltrowanych" elementów // 10.2.5 //
    }

    render() {
      const thisBookList = this;

      /* Petla przechodząca po każdym elemencie dataSource.books z pliku data.js // 10.2 Ćwiczenie 1 // */
      for(let books of thisBookList.data) {
        // stałe ratingBgc i ratingWidth // 10.2.6//
        books.ratingBgc = thisBookList.determineRatingBgc(books.rating);
        books.ratingWidth = books.rating * 10;
        //books.ratingWidth = determineRatingWidth(books.rating);

        /* generate HTML base on booksTample (SZABLON) */
        const generatedHTML = templates.booksTemplate(books);

        /* create DOM element (używamy utils.createDOMFromHTML z  functions.js) */
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);

        /* finde menu container (.books-list) */
        // const booksContainer = document.querySelector(select.containerOf.booksList);

        /* Add DOM element to menu container (.books-list) */
        thisBookList.booksContainer.appendChild(generatedDOM);
      }
    }

    // tworzymy funkcje initActions odpowwidzialną za nadawanie klasy favorite
    initActions() {
      const thisBookList = this;

      // tworzymy referencję do listy wszystkich elementów .book__image w liście .booksList
      // const booksContainer = document.querySelector(select.containerOf.booksList);  // nasz kontener na książki

      // wyszukujemy nie każdy pojedyńczy element a CAŁY kontener //10.2.4 //
      thisBookList.booksContainer.addEventListener('dblclick', function(event) {
        event.preventDefault();

        const clickedElement = event.target.offsetParent;
        const id = clickedElement.getAttribute('data-id');

        if (!clickedElement.classList.contains('favorite')) {
          thisBookList.favoriteBooks.push(id);
          clickedElement.classList.add('favorite');
        } else {
          thisBookList.favoriteBooks.splice(thisBookList.favoriteBooks.indexOf(id), 1);
          clickedElement.classList.remove('favorite');
        }
      });

      // filtrowanie książek // 10.2.5 //
      // const filtersContainer = document.querySelector(select.containerOf.filters);
      thisBookList.filtersContainer.addEventListener('click', function(event) {

        // sprawdzamy czy kliknięty element to nasz checkbox (czy jego tagName to INPUT, type to checkbox, a name to filter) // 10.2.5 //
        const clickedElement = event.target;

        if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name ==='filter'){
          console.log(clickedElement.value);

          // sprawdzamy czy INPUT jest zaznaczony (checked): jeżeli tak to dodajemy "value" do tablicy
          if(clickedElement.checked){
            thisBookList.filters.push(clickedElement.value);
            console.log('filters', thisBookList.filters);

          // jeżeli nie, to usuwamy do z tablicy
          } else {
            const id = thisBookList.filters.indexOf(clickedElement.value);
            thisBookList.filters.splice(thisBookList.filters.indexOf(id), 1);
            console.log('filters', thisBookList.filters);
          }
        }
        thisBookList.filterBooks();
      });
    }
    // console.log(favoriteBooks);

    // dokończenie - filtrowanie właściwe // 10.2.5 //
    filterBooks() {
      const thisBookList = this;

      for(let book of thisBookList.data) {
        let shouldBeHidden = false; // zmienna która określa czy dodać do książki "hidden"

        for(let filter of thisBookList.filters) {  // pętla sprawdzająca czy filtr pasuje do informacji o danej książce
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

    // funkcja determineRatingBgc(rating) zwracająca odpowiedni background
    determineRatingBgc(rating) {

      let background = '';
      if(rating<6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      } else if(rating >6 && rating<=8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      } else if(rating>8 && rating<=9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }  else if(rating>9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return background;
    }
  }
  const app = {
    initializeProject: function(){
      new BookList();
    }
  };
  app.initializeProject();
}
