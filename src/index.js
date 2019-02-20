import { sum } from "./js/functions";
import "./css/main.css";
import "./sass/main.sass";

const testFunc = document.querySelector("#testFunc");

testFunc.addEventListener("click", function() {
  alert(`sum-work === ${sum(2, 2)}`);
});

console.log(sum(2, 2));
