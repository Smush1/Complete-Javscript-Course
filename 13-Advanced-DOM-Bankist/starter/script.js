'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav')

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')



const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});







/////// Smooth scrolling



btnScrollTo.addEventListener('click',(e)=>{

  const s1Coords= section1.getBoundingClientRect()
  console.log(s1Coords)

  // console.log(e.target.getBoundingClientRect())

  console.log(`Current Scroll X ${window.scrollX}
Current Scroll Y ${window.scrollY}`)

console.log('height/width viewport', 
  document.documentElement.clientHeight,
  document.documentElement.clientWidth
);

//scrolling
// window.scrollTo(
//   s1Coords.x + window.scrollX, 
//   s1Coords.y + window.scrollY);

// window.scrollTo({
//  left: s1Coords.x + window.scrollX, 
//  top : s1Coords.y + window.scrollY,
//  behavior: 'smooth'
// } );

section1.scrollIntoView({ behavior: 'smooth'})

})

///////////////////////
//////////// Page navigation


// Smooth scrolling by creating a copy of click event function in each link
// document.querySelectorAll('.nav__link')
// .forEach( function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();

//       const currentElementHref =  e.currentTarget.getAttribute('href')
//       console.log(currentElementHref)

//       const NewElement = document.querySelector(`${currentElementHref}`);
//       NewElement.scrollIntoView({ behavior: 'smooth' })

//   })
// })


// 1. Add event listener to common parent element;
// 2. Determine what element originated the event;




document.querySelector('.nav__links').addEventListener('click',(e)=>{
  e.preventDefault();
  console.log(e.target)
  console.log(e.target.classList)
   // Matching above strategy
    if(e.target.classList.contains("nav__link")){
    const hrefId = e.target.getAttribute('href');
    document.querySelector(hrefId).scrollIntoView({ behavior: 'smooth'})
    }
})




//  Tabbed Components



// tabs.forEach(t=>t.addEventListener('click',(e)=>{
//   console.log('TAB')
// }))


tabsContainer.addEventListener('click',(e)=>{
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked)


  // Guard Clause
  if(!clicked) return

  // Active Tab
  tabs.forEach(tab=>tab.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  //Activate Content
  console.log(clicked.dataset.tab)

  tabsContent.forEach(content=> content.classList.remove('operations__content--active'))
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active')

})


// Menu Fade Animation

const handleHover = (e, opacity)=>{
      if(e.target.classList.contains('nav__link')){
      const link = e.target;
      const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
      const logo = e.target.closest('.nav').querySelector('img')

      siblings.forEach((el)=>{
        if( el !== link){ 
          el.style.opacity = opacity;
          logo.style.opacity = opacity;
         }
      })
    }
}


// passing "argument" to event handler


nav.addEventListener('mouseover', function(e){
  handleHover(e, 0.5)
}
  
  
  /* (e)=>{
    if(e.target.classList.contains('nav__link')){
      const link = e.target;
      const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
      const logo = e.target.closest('.nav').querySelector('img')

      siblings.forEach((el)=>{
        if( el !== link){ 
          el.style.opacity = 0.5;
          logo.style.opacity = 0.5;
         }
      })
    }
} */)


nav.addEventListener('mouseout', function(e){
  handleHover(e, 1)
})


// Sticky Navigation 

// const initialCoords =  section1.getBoundingClientRect();

// console.log(initialCoords)


// window.addEventListener('scroll',()=>{
//   console.log(window.scrollY)
//   if (window.scrollY > initialCoords.top)
//     nav.classList.add('sticky')
//   else
//     nav.classList.remove('sticky')
// })


///// Sticky navigation Implementation using Intersection Observer API


// The callback will be called everytime root element intersect at given threshold
// const obsCallback = function( enteries, observer){
//   enteries.forEach((entry) =>
//   console.log(entry) )
// }


// here "root: null" meand we are observing whole viewport for intersection element,
//  "threshold: 0.1" means we are looking for 10% intersection

// The calback function will we called whenever section1 element intersect the viewport at 10% 
// (no matter scrolling up or down)

// const obsOptions = {
//   root: null,
//   threshold: 0.1
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1)


const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const stickyNavCallback = function(enteries){
  const [entry] = enteries;
  if (!entry.isIntersecting)
   nav.classList.add('sticky')
  else{
    nav.classList.remove('sticky')
  }
}


const headerObserver = new IntersectionObserver(stickyNavCallback,{
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});


headerObserver.observe(header)


// Reveal on Scroll

const allSections = document.querySelectorAll('.section');

const revealOnScroll = function(entries, observer){
  entries.forEach((entry)=>
   { 
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');

  })
}

const sectionObserver = new IntersectionObserver( revealOnScroll, {
  root: null,
  threshold: 0.15
})

allSections.forEach((section)=>{
/*   section.classList.add('section--hidden'); */
  sectionObserver.observe(section);
})


////  Lazy Loading Images

const imgTargets = document.querySelectorAll('img[data-src]');


const lazyLoad = (entries, observer)=>{
  entries.forEach((entry)=>{

    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load',()=>{
        entry.target.classList.remove('lazy-img');
    })
    observer.unobserve(entry.target)
  })
}

const imgObserver = new IntersectionObserver( lazyLoad, {
  root: null,
  threshold: 0.6
} )


imgTargets.forEach((imgTarget)=>{
  // observing each section seperately
  imgObserver.observe(imgTarget);
})


//// Slider

const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.5)';
slider.style.overflow = 'visible';

const slides = document.querySelectorAll('.slide');

const leftBtn = document.querySelector('.slider__btn--left');
const rightBtn = document.querySelector('.slider__btn--right');

slides.forEach((s,i)=>
   s.style.transform = `translateX(${i * 100}%)`
// 0, 100%, 200%, 300%
)


let currSlide = 0;

rightBtn.addEventListener('click',()=>{
  currSlide++;

  slides.forEach((s,i)=>{
    if( currSlide === slides.length ) currSlide = 0;
   s.style.transform = `translateX(${(i-currSlide) * 100}%)`
// 0, 100%, 200%, 300%
}
)

console.log(currSlide)
})


leftBtn.addEventListener('click',()=>{
  currSlide--;

  slides.forEach((s,i)=>{
    if (currSlide < 0 ) currSlide = slides.length -1
   s.style.transform = `translateX(${(i-currSlide) * 100}%)`
// 0, 100%, 200%, 300%
}
)

console.log(currSlide)
})






///////////////
/////////////////////////
////////////////////


// Selecting the elements
// console.log(document.documentElement)
// console.log(document.head)
// console.log(document.body)

// const header = document.querySelector('.header')

// const allSections = document.querySelectorAll('.section')
// console.log(allSections)

// document.getElementById('section--1');
// const allBtns = document.getElementsByTagName('button'); // updated itself if any element will be deleted, unlike nodelist 

// console.log(allBtns)

////////////////////
// Creating and inserting an element


  //.insertAdjacentHTML

  // const message = document.createElement('div');
  // message.classList.add('cookie-message');
  // message.innerHTML =  `We use cookie for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>`;

// Inserting Elements

  // header.prepend(message)
  // header.append(message.cloneNode(true))
  // header.before(message)
//   header.after(message)


// Removing Child

// document.querySelector('.btn--close-cookie')
// .addEventListener('click',()=>{
//   // message.remove()
//   message.parentElement.removeChild(message)
// })


////////////////
// Style

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.height); // can console only inline style and not stylesheet properties
// console.log(message.style.backgroundColor)

// console.log(getComputedStyle(message).height)





// converting string to number and increasing height
// message.style.height =  Number.parseFloat( getComputedStyle(message).height) + 40 + 'px'  




// update css variable
// document.documentElement.style.setProperty('--color-primary', 'orangered')




// attributes

// const logo = document.querySelector('.nav__logo')

// console.log(logo.src)
// console.log(logo.alt)
// console.log(logo.id)
// console.log(logo.custom)



// For non standard attribute and relative links

// console.log(logo.getAttribute('custom'));
// logo.setAttribute('company', 'new');
  

  // relative links
// console.log(logo.src)
// console.log(logo.getAttribute('src'))

// const link = document.querySelector('.nav__link--btn');

// console.log(link.href);
// console.log(link.getAttribute('href'))




// Data Attributes

// console.log(logo.dataset.versionNumber)


// Classes

// logo.classList.add('c', 'h')
// logo.classList.remove('c', 'j')
// console.log(logo.classList.contains('c'))
// logo.classList.toggle('s')





///////////////
////Event Listeners


// const h1 = document.querySelector('h1');


// addEventListener can be used for multiple events
// h1.addEventListener('mouseenter',(e)=>{
//   alert("You have entered to the territory");
// })


// const alertFunc = (e)=>{
//   alert("You have entered to the territory");

  // to use it once
  // h1.removeEventListener('mouseenter',alertFunc)
// }

// h1.addEventListener('mouseenter', alertFunc)


// onmouseenter and similar function will override all the previous functions declared in a document

// h1.onmouseenter= (e)=>{
//   alert("2nd Alert: You have entered to the territory");
// }

// setTimeout(()=>{
//   h1.removeEventListener('mouseenter',alertFunc)
// },3000)




////////////////////
/////////// Event Capturing, Bubbling and Propogation


// const randomInt = (min, max)=>{
//   return Math.floor(Math.random() * (max -min + 1) + min)
// }

// const randomColor =()=>{
//  return `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`
// }


// const singleNavLink = document.querySelector(".nav__link");
// singleNavLink.addEventListener('click',function (e){
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget );
//   console.log(e.currentTarget === this)
  
//   //to stop event bubbling
//   // e.stopPropagation();  
// })


// document.querySelector(".nav__links")
// .addEventListener('click',function (e){
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget );

// })

// document.querySelector(".nav")
// .addEventListener('click',function (e){
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget )
// }, true // add "true" parameter to listen event in capturing phase
// ) 




/////////////////////
////////////// DOM Traversing


///// Child Element

// const h1 = document.querySelector('h1')

// Going downwards: child  -  It will go deep down to each element contain highlight class
// console.log(h1.querySelectorAll('.highlight'));


// for all type of child elements
// console.log(h1.childNodes)

// For direct child - HTML Collection (Live/ updated)

// console.log(h1.children)

// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "orangered";


//// Going Upwards- Parent

// console.log(h1.parentNode);
// console.log(h1.parentElement)

// h1.closest('header').style.background = 'var(--gradient-secondary)'
// h1.closest('h1').style.background = "var(--gradient-primary)"

//// Going Sideways 

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling)

// console.log(h1.previousSibling)
// console.log(h1.nextSibling)

// For all sibling
// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach((e)=>{
//   if(e !== h1) e.style.transform = "scale(0.5)"
// }
// )

