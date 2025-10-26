'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

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



 // Matching above strategy
document.querySelector('.nav__links').addEventListener('click',(e)=>{
  e.preventDefault();
  console.log(e.target)
  console.log(e.target.classList)
    if(e.target.classList.contains("nav__link")){
    const hrefId = e.target.getAttribute('href');
    document.querySelector(hrefId).scrollIntoView({ behavior: 'smooth'})
    }
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

// Creating and inserting an element


  //.insertAdjacentHTML

  // const message = document.createElement('div');
  // message.classList.add('cookie-message');
  // message.innerHTML =  `We use cookie for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>`;

  // header.prepend(message)
  // header.append(message.cloneNode(true))
  // header.before(message)
//   header.after(message)


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




