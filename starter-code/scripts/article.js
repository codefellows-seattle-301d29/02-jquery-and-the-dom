'use strict';
// this is an empty array that will hold created article objects
let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// This is a constructor function, as indicated by the capitolized name.  'this' just saves it to the object it is currently on.

function Article(rawDataObj) {
  // DONE: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

// this prototype will render each article instance to the DOM .
Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // it is a deep copy taking all children, ids, classes and text nodes.

  let $newArticle = $('article.template').clone();
  /* DONE: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  $('article.template').removeClass('template');
  // $($newArticle).replace('Author Name', Article.author);


  // adding a class is a good way to change the style on an element.  If the object does not have a published on date this will add one.

  if (!this.publishedOn) $newArticle.addClass('draft');
  
  
  $newArticle.attr('data-category', this.category);
  $newArticle.find('address').html('<a href="' + this.authorUrl + '">' + this.author + '</a>');
  $newArticle.find('h1').html(this.title);
  $newArticle.find('.article-body').html('<p>' + this.body + '</p>');


  /* DONE: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */

  // REVIEW: Display the date as a relative number of 'days ago'

  // grabs the time element and changes it.
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};
//this sorts the articles by date with newest first.
rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// DONE: Refactor these for loops using the .forEach() array method.
// this instantiates each dataset into an object and adds it to the array at the top of this file.

rawData.forEach(function(rawData) {
  articles.push(new Article(rawData));
})

articles.forEach(function(item){
  $('#articles').append(item.toHtml());
})
// this for loop adds each article from the array to the html.
