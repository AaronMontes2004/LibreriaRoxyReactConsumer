let listElements = document.querySelectorAll('.list__button--click');

console.log("FUNKAAA");

listElements.forEach(listElement => {
    listElement.addEventListener('click', ()=>{
        
        listElement.classList.toggle('arrow');

        console.log("CLICK");

        let height = 0;
        let menu = listElement.nextElementSibling;
        if(menu.clientHeight == "0"){
            height=menu.scrollHeight;   
        }

        menu.style.height = `${height}px`;

    })
});