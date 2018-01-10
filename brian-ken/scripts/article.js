'use strict';

console.log('article works');

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// Constructor function and instantiates article objects, the name is capitalized because it's a constructor. This refers to the input field and "rawdataobj" is the input.

function Article(rawDataObj) {
  // TODO: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.rawDataObj=rawDataObj;
  console.log(rawDataObj);
}

Article.prototype.toHtml = function() {
  console.log('18');
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // PUT YOUR RESPONSE HERE
  // Allows programmers to move elements without removing or deleting the first instance of the element. Also, you can modify cloned elements before resubmitting them into the document.

  let $newArticle = $('article.template').clone();

  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  $newArticle.addClass('cloned');
  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */
  $newArticle.attr('data-author', this.author);
  $newArticle.attr('data-authorUrl', this.authorUrl);
  $newArticle.attr('data-title', this.title);
  $newArticle.attr('data-body', this.body);
  $newArticle.attr('data-publishedOn', this.publishedOn);

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  console.log('46', $newArticle[0].innerHTML);
  return $newArticle[0].innerHTML;
  
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  console.log('52');
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

// for(let i = 0; i < rawData.length; i++) {
//   articles.push(new Article(rawData[i]));
// }

rawData.forEach(function(rawData){
  articles.push(new Article(rawData));
  // console.log(rawData);
  console.log(articles);
});

// for(let i = 0; i < articles.length; i++) {
//   $('#articles').append(articles[i].toHtml());
// }

articles.forEach(function(article){
  $('#articles').append(article.toHtml());
  // console.log(article.rawDataObj.title);
  console.log('74');
})