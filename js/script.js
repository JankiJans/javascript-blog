'use strict';

/* const { active } = require("browser-sync"); */

/*
document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
*/

const titleClickHandler = function(event) {
  event.preventDefault();

  const clickedElement = this;

  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');

};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);

  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);

  let html = '';

  for (let article of articles) {

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */
    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */

    html = html + linkHTML;
    console.log(html);
  }



  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

function generateTags() {
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper */

    const titleList = article.querySelector(optArticleTagsSelector);
    console.log(titleList);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray) {
      console.log(tag);

      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML)

      /* add generated code to html variable */
      html = html + linkHTML;

    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

    titleList.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const allTags = document.querySelector('a.active[href^="#tag-"]');
  console.log(allTags)

  /* START LOOP: for each active tag link */

  for(let allTag of allTags) {

    /* remove class active */

    allTag.classList.remove('active');

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]' );

  /* START LOOP: for each found tag link */

  for(let tagLink of tagLinks){

    /* add class active */

    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */

  const allLinksTags = document.querySelectorAll('.post-tags list a')

  /* START LOOP: for each link */
  for(let allLinkTag of allLinksTags){

    /* add tagClickHandler as event listener for that link */

    allLinkTag.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
}
}

addClickListenersToTags();


function generateAuthors() {

const articles = document.querySelectorAll(optArticleSelector);
console.log(articles)

for (let author of articles) {

  const wrapperAuthors = author.querySelector(optArticleAuthorSelector)
  console.log(wrapperAuthors);

  let html = '';

  const authorTags = author.getAttribute('data-authors');
  console.log(authorTags);

  const authorHTML = '<p class="post-author">by <a href="#author-' + authorTags + '">' + authorTags + '</a></p>';
  console.log(authorHTML);

  html = html + authorHTML;

  wrapperAuthors.innerHTML = html;

}
}

generateAuthors();

function authorClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const extractAuthors = href.replace('#author-', '');
  /* find all tag links with class active */
  const allAuthors = document.querySelector('a.active[href^="#author-"]');
  console.log(allAuthors);
  /* START LOOP: for each active tag link */
  for(let allAuthor of allAuthors){
    /* remove class active */
    allAuthor.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorHrefs = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let authorHref of authorHrefs){
    /* add class active */
    authorHref.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-authors="' + extractAuthors + '"]');
}


function addClickListenersToAuthors (){

  /* find all links to tags */

 const authorLinks = document.querySelectorAll('.post-author a');
 console.log(authorLinks);

 /* START LOOP: for each link */

 for(let authorLink of authorLinks){

   /* add tagClickHandler as event listener for that link */

   authorLink.addEventListener('click', authorClickHandler);

 /* END LOOP: for each link */
 }
}

addClickListenersToAuthors ()
