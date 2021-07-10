; (function () {
    let pEle = document.createElement('p');
    pEle.innerText = 'home：Home paragraph';
    console.log(pEle);
    let parEle = document.getElementById('content-id');
    console.log(parEle);
    parEle.appendChild(pEle);
})();