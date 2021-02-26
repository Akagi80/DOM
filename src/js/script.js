/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      booksTemplate: '#template-book', //szablon
    },
    containerOf: {
      booksList: '.books-list', //box HTML
    },
  };

  /* make a template for a book (SZABLON) */
  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };
  
  /* Petla przechodząca po każdym elemencie dataSource.books z pliku data.js 10.2 Ćwiczenie 1*/
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
  
}