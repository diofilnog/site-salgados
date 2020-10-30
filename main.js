
//funcao para scroll suave

const menuItens = document.querySelectorAll('#menu a[href^="#"]') // o que está entre colchete é um filtro para pegar so a cerquilha


menuItens.forEach(item =>{ // para reconhecer o local do click
    item.addEventListener('click', scrollToIdOnClick);
})

function scrollToIdOnClick(event){
    event.preventDefault() // para prevenir um padrao de uma funcao(atualizacao de tela)
    const to = getScrollTopByHref(event.target) - 20//funcao  para ver qual elemento estou clicando
    scrollToPosition(to) // pasando a funcao para evento de click
    
}


function getScrollTopByHref(element){ // funcao para pegar o id
    const id = element.getAttribute('href') // estamos pegando o id que está sendo clicado
     
    return document.querySelector(id).offsetTop // estamos selecionando o id que será clicado // o offsetTop mostra a distancia em tamanho entre o elemento e o topo
}

function scrollToPosition(to){ // funcao para passar a altura do elemento e o topo( os tres primeiros itens e padrao mas so funciona no crome)
    //window.scroll({ // foi criado um objeto para passar mais parametros
        //top: to,
        //behavior: "smooth" // para um comportamento suave de rolagem
    //})
        smoothScrollTo(0,to,700)
    
}

// Caso deseje suporte a browsers antigos / que não suportam scroll smooth nativo
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
    * @param {int} duration: animation duration in ms
    */
   function smoothScrollTo(endX, endY, duration) {
     const startX = window.scrollX || window.pageXOffset;
     const startY = window.scrollY || window.pageYOffset;
     const distanceX = endX - startX;
     const distanceY = endY - startY;
     const startTime = new Date().getTime();
   
     duration = typeof duration !== 'undefined' ? duration : 400;
   
     // Easing function
     const easeInOutQuart = (time, from, distance, duration) => {
       if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
       return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
     };
   
     const timer = setInterval(() => {
       const time = new Date().getTime() - startTime;
       const newX = easeInOutQuart(time, startX, distanceX, duration);
       const newY = easeInOutQuart(time, startY, distanceY, duration);
       if (time >= duration) {
         clearInterval(timer);
       }
       window.scroll(newX, newY);
     }, 1000 / 60); // 60 fps
   };


   



