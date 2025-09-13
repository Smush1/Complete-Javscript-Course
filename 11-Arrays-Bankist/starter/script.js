'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements){
  containerMovements.innerHTML = '';

  movements.forEach((mov, i, )=>{
    const type =  ( mov > 0 )? 'deposit': 'withdrawal'
    const html= `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1 } ${type}</div>
          <div class="movements__date"></div>
          <div class="movements__value">${mov}€</div>
        </div>
    `
      containerMovements.insertAdjacentHTML("afterbegin",html)
  })
}

displayMovements(account1.movements)


const calcDisplayBalance = function(movements){
 const balance = movements.reduce((acc, mov)=>{
    return acc + mov
  })
  labelBalance.textContent = `${ balance}€`
}











const createUserName = (accs)=>{
  accs.forEach((acc)=>{
    acc.username = acc.owner.toLowerCase()
  .split(' ')
  .map((name)=>{ return name.charAt(0)})
  .join('')
  })


}




createUserName(accounts)


 console.log(accounts)


const calcDisplaySummary = (movements)=>{
 const incomes = movements.filter((mov)=> mov > 0)
           .reduce((acc, mov)=> acc + mov, 0)
  labelSumIn.textContent = `${incomes}€`


  const out = movements.filter((mov)=> mov < 0)
                       .reduce((acc, mov)=> acc + mov, 0)
  labelSumOut.textContent = `${Math.abs(out)}€`

  const interest = movements.filter((mov=> mov > 0))
                            .map((deposit)=> deposit * 1.2/100)
                            .filter((int, i, arr )=> { 
                              // console.log(int, arr)
                              return int >= 1
                            })
                            .reduce((acc, int)=> acc + int )
  labelSumInterest.textContent = interest
}


calcDisplaySummary(account1.movements)









/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


/* Find method */

/* const firstWithrawal = movements.find((mov)=> mov < 0)

console.log(firstWithrawal) */

const account = accounts.find((acc)=> acc.owner === 'Jessica Davis' )

console.log(account)







/*  CHAINING ARRAY METHODS */
// const depositTotalUSD = movements.filter((mov)=> mov > 0)
//                                   .map((mov)=> mov * 1.1)
//                                   .reduce((acc, mov)=> acc + mov,0)

// console.log(movements)
// console.log(depositTotalUSD)


//console.log(movements)


/* const balance = movements.reduce((sum, mov, i)=>{
  console.log(`Iteration ${i}: Total is ${sum}`)
  return sum + mov
},0)

console.log(balance)





let sum=0;
for (let mov of movements){
  sum += mov;
  console.log(`Iteration : Total is ${sum}`)
  
} */




// const max = movements.reduce((acc, mov)=>{
//   if(acc < mov){
//     return acc
//   }
//   else 
//     return mov
// })

// console.log(max)


/* Coding challenge */

// const calcAverageHumanAge = (dogAges)=>{
//   const dogAgeInHumanYears = dogAges.map(( dogAge)=>{
//     // if(dogAge <= 2)
//     //   return dogAge * 2
//     // else
//     //   return 16 + (dogAge * 4)

//       return (dogAge <= 2) ? dogAge * 2: 16 + (dogAge * 4)
//   })

//   console.log(dogAgeInHumanYears)

//   const adultDogs = dogAgeInHumanYears.filter((age)=>{
//     return age >= 18
//   })
  
//   console.log(adultDogs)
//   // const adultDogsAverageAge = adultDogs.reduce((acc, adultAge)=>{
//   //   return acc  + adultAge 
    
//   // }, 0)/adultDogs.length

//   const adultDogsAverageAge = adultDogs.reduce((acc, adultAge, i, arr)=>{
//     return acc  + adultAge / arr.length
    
//   }, 0)


//   return adultDogsAverageAge
// }


// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3 ]))






// const deposits = movements.filter( mov=> mov > 0 )

// console.log(deposits)


// const withdrawal = movements.filter( mov=> mov < 0 )

// console.log(withdrawal)

// Accumulator -> SNOWBALL -> Total








// const eurToUsd = 1.1;

// const movementsUsd = movements.map((mov)=>{
//   return mov * eurToUsd
// })

// console.log(movementsUsd)




// const movementDescriptions = movements.map((mov, i)=>{

//     return (`You ${(mov > 0)? 'deposited': 'withdrew'} ${Math.abs(mov)}`)

//   //   if(mov > 0){
//   //   return (`You deposited ${mov}`)
//   // } else{
//   //   return (`You withdrew ${Math.abs(mov)}`)
//   // }

// })


/* console.log(movementDescriptions) */

// const movementsUsd2 =[]
// for (const mov of movements){
//   movementsUsd2.push(mov * eurToUsd)

// }
//   console.log(movementsUsd2)






// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function(value, key, map){
//   console.log(`${key} :${value}, and map is:${map}`)
// })



 
/*
for (const movement of movements){
  if(movement > 0){
    console.log(`You deposited ${movement}`)
  } else{
    console.log(`You withdrew ${Math.abs(movement)}`)
  }
} */









//  Extra Tasks and challenges
/////////////////////////////////////////////////


/* let arr = ['a', 'b', 'c', 'd','e']

let arr2 = ['j', 'i','h','g','f'] */

//console.log(arr2.reverse())

//let allArr = arr.concat(arr2)

//console.log(allArr)

//console.log(allArr)

//console.log(allArr.join('\n'))


// getting the last element

// console.log(arr.slice(-1)[0])

// console.log(arr[arr.length -1 ])

// console.log(arr.at(-1))






/* const checkDogs = function ( [...dogsJulia], [...dogsKate]){

  let dogsJuliaCopy = dogsJulia.slice(1).slice(0,-2) ;

  function internalCheck(dogsArray){
     dogsArray.forEach((dogAge, n)=>{
    (dogAge >= 3 ) ? 
    console.log(`Dog number ${n+1} is an adult, and is ${dogAge} years old`) :  
    console.log(`Dog number ${n+1} is still a puppy`)
  })

  }

  internalCheck(dogsJuliaCopy.concat(dogsKate));


  console.log(dogsJuliaCopy, dogsKate)
  
}


checkDogs([10,11,2,15,8], [4,3,6,5,8]) */