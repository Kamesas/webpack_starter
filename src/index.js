import { sum } from "./js/functions";
import "./css/main.css";
import "./sass/main.scss";

console.log(sum(2, 2));

console.log("main.js - common js file");

console.log("window", window.location.search);

const pages = {
  post1: {
    title: 'Post1',
    h1: 'Heading post 1',
    p: "Paragraph post 1"
  },
  post2: {
    title: 'Post2',
    h1: 'Heading post 2',
    p: "Paragraph post 2"
  }
}

if(window.location.search.includes('?_')) {
  const page = pages[`${window.location.search.slice(2)}`];
  const heading = document.getElementById('post-heading');
  const content = document.getElementById('post-content');

  document.title = page.title;
  
  heading.innerHTML = page.h1;
  content.innerHTML = page.p;
}