; (function () {
    let pEle = document.createElement('p');
    pEle.innerText = 'topic: topic paragraph';
    console.log(pEle);
    let parEle = document.getElementById('content-id');
    console.log(parEle);
    parEle.appendChild(pEle);
})();