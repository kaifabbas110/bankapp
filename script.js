const account1 = {
  owner: "Kaif Abbas Rizvi",
  movements: [100.1, -500, -350.55, 450.55, 1674.99, 20.922, -651.1111, 1000],
  interestRate: 1.2,
  pin: 1111,
  movementsDates: [
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
    "2023-05-04T09:15:04.904Z",
    "2023-05-06T07:42:02.383Z",
    "2023-05-07T21:31:17.178Z",
  ],
  currency: "PKR",
  locale: "ur-PK", // de-DE
};
const account2 = {
  owner: "Nisha Alvi",
  movements: [5000, 3400, -150, -740, -3976, -1000, 8050, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const account3 = {
  owner: "Bala Hatoon",
  movements: [1000, 2200, -3300, 4540, -174, 2340, -50, 1480],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "TRY",
  locale: "tr-TR",
};
const account4 = {
  owner: "Steven Thomas Williams",
  movements: [600, -2200, -1300, 450, -974, 210, -150, 9230],
  interestRate: 2,
  pin: 4444,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "de-DE",
};
const accounts = [account1, account2, account3, account4];

let popMov = document.querySelector(".item1");
let navUser = document.querySelector(".nav_user");
let navPin = document.querySelector(".nav_pin");
let btnLogin = document.querySelector(".nav_arrow");
let mainOpacity = document.querySelector(".main");
let totalBalance = document.querySelector(".transaction_section_upper_Ca");
let totalInAmount = document.querySelector(".transaction_section_lower_in");
let totalOutAmount = document.querySelector(".transaction_section_lower_out");
let interestRate = document.querySelector(
  ".transaction_section_lower_interest"
);
let navHeading = document.querySelector(".nav_heading");
let inputTransferTobtn = document.querySelector(".item2_records_btn");
let btnRequestLoan = document.querySelector(".item3_records_btn");
let requestLoanAmount = document.querySelector(".item3_records_input_amount");
let inputLogOut = document.querySelector(".item4_records_btn");
let inputTransferTo = document.querySelector(".item2_records_input_transferTo");
let inputTransferAmount = document.querySelector(".item2_records_input_amount");
let closeAccountUsername = document.querySelector(
  ".item4_records_input_username"
);
let closeAccountPin = document.querySelector(".item4_records_input_pin");
let closeAccountBtn = document.querySelector(".item4_records_btn");
let sortBtn = document.querySelector(".transaction_section_lower_btn");
let currDateTime = document.querySelector(".transaction_section_upper_Cd");
let transTime = document.querySelector(".item1_records_time");
let logoutTimer = document.querySelector(".transaction_section_lower_logTime");

//-------------------------Display transactions------------------------.
function formateDates(date, locale) {
  const calcDaysPassed = (date, date2) =>
    Math.trunc(Math.abs(date - date2) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(date, new Date());
  // console.log(daysPassed);
  if (daysPassed === 0) {
    return "Today";
  }
  if (daysPassed === 1) {
    return "yesterday";
  }
  if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  }

  return new Intl.DateTimeFormat(locale).format(date);
}
function formatedCurr(value,locale,currency){
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}
function movements(acc, sort = false) {
  popMov.innerHTML = "";
  //we use slice() to create a copy so that the original array wouldn't mutate.
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((e, i) => {
    const date = new Date(acc.movementsDates[i]);
    const displaydate = formateDates(date, acc.locale);
    const formattedMov = formatedCurr(e,acc.locale,acc.currency)
    const type = e < 0 ? "withdrawal" : "deposit";
    let html = `
      <div class="item1_records">
      <span class="item1_records_${type}">${i + 1} ${type}</span>
      <span class="item1_records_time">${displaydate}</span>
              <span class="item1_records_amount">${formattedMov}</span>
              </div>
              `;
    // console.log(html);
    // popMov.innerHTML = 'html';
    popMov.insertAdjacentHTML("afterbegin", html);
  });
}


//----------------Create Username and add on accounts-----------------.
function createUserName(accounts) {
  accounts.forEach((acc) => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
    // console.log(userName);
  });
}
createUserName(accounts);

//----------------Display Current Balance-----------------.
function calcTotalBalance(acc) {
  acc.balance = acc.movements.reduce((acc, e) => acc + e, 0);
  totalBalance.textContent = formatedCurr(acc.balance,acc.locale,acc.currency);
}

function calcDisplaySummary(acc) {
  //----------------Display Total In Amount-----------------.
  let calcTotalInAmount = acc.movements
    .filter((e) => e > 0)
    .reduce((acc, e) => acc + e, 0);
  totalInAmount.textContent = formatedCurr(calcTotalInAmount,acc.locale,acc.currency);
  totalInAmount.style.color = "lightgreen";

  //----------------Display Total Out Amount-----------------.
  let calcTotalOutAmount = Math.abs(acc.movements
    .filter((e) => e < 0)
    .reduce((acc, e) => acc + e, 0));
  totalOutAmount.textContent = formatedCurr(calcTotalOutAmount,acc.locale,acc.currency);
  totalOutAmount.style.color = "red";

  //----------------Display Interest Rate-----------------.
  let calcInterestRate = acc.movements
  .filter((e) => e > 0)
  .map((e) => (e * currentAccount.interestRate) / 100)
  .filter((e) => e >= 1) //every interet should be greater or equal than 1.
  .reduce((acc, e) => acc + e, 0);
  interestRate.textContent = formatedCurr(calcInterestRate,acc.locale,acc.currency);
  interestRate.style.color = "green";
}

//-------------------Login Implementation--------------------.
function logoutTimerCount() {
  let time = 120;
  // we export tick() seperatlly & calling it immediatelly to prevent 1 second problem.
  const tick = () => {
    let min = String(Math.trunc(time/60)).padStart(2,'0');
    let sec = String(time%60).padStart(2,'0');
    logoutTimer.textContent = `You will be logged out in ${min}:${sec}`
    
    if (time === 0) {
      clearInterval(timer);
      mainOpacity.style.opacity = "0";
      navHeading.textContent = `Log in to get started`;
    }
    time--;
  }
  tick();
  const timer =  setInterval(tick, 1000);
  //We return timer because to clear existing timer we need a variable.
  return timer;
}


let currentAccount,timer;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  //If username matches, the currentAccount becomes the account of that username.
  currentAccount = accounts.find((acc) => acc.userName === navUser.value);
  // currentAccount = accounts.find(acc => acc.pin === parseInt(navPin.value))
  //Use optional chaining to chech wheather the current exist or not.
  if (currentAccount?.pin === parseInt(navPin.value)) {
    mainOpacity.style.opacity = "1";
    navHeading.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
  } else {
    mainOpacity.style.opacity = "0";
    navHeading.textContent = `Log in to get started`;
  }

  // Clear input field.
  navUser.value = navPin.value = "";
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    // second: 'numeric',
    // month : 'long',
    year: "numeric",
    // weekday : 'long',
  };

  //It will check if the timer already exist it'll clear the interval.
  if (timer) {clearInterval(timer)}
  timer =  logoutTimerCount();
    //Update UI.
    updateUI(currentAccount);
  });


  
//--------------------------------------Transfer Amount-----------------------------------------.

inputTransferTobtn.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = parseInt(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );

  inputTransferTo.value = inputTransferAmount.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    //  && receiverAcc because it is necessary to check whether the receiverAcc exists or not.
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }

  //Transfer date.
  currentAccount.movementsDates.push(new Date());
  // receiverAcc.movementsDates.push(new Date());
  clearInterval(timer)
  timer = logoutTimerCount()
  updateUI(currentAccount);
});

//--------------------------------------Request Loan-----------------------------------------.
btnRequestLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = parseInt(requestLoanAmount.value);
  //Apply condition that the requested loan must not be greater than the highest deposited amount
  setTimeout(() => {
    
    if (
      amount > 0 &&
      currentAccount.movements.some((mov) => mov >= amount * 0.1)
      ) {
        currentAccount.movements.push(amount);
        currentAccount.movementsDates.push(new Date().toISOString());
        updateUI(currentAccount);
      }
      clearInterval(timer)
      timer = logoutTimerCount()
    }, 5000);
  //Transfer date.
  // currentAccount.movementsDates.push(new Date().toDateString());
  requestLoanAmount.value = "";
});

//--------------------------------------Close Account-----------------------------------------.

closeAccountBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // const index = accounts.findIndex(acc => acc.userName === closeAccountUsername.value) //if this code exists outside the if condition then it'll always give index 1 & delete.

  if (
    closeAccountUsername.value === currentAccount.userName &&
    parseInt(closeAccountPin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === closeAccountUsername.value
    );
    console.log(index);
    // index!== -1
    if (index !== -1) {
      accounts.splice(index, 1);
      mainOpacity.style.opacity = "0";
    }
  }
  console.log(accounts);
});

//--------------------------Update UI--------------------------------.
function updateUI(currentAccount) {
  // Display Movements.
  movements(currentAccount);

  // Display Balance.
  calcTotalBalance(currentAccount);

  // Display Summary.
  calcDisplaySummary(currentAccount);
}

//---------------------------------Sort Transacsions---------------------------------.
/* The "sorted" variable is negated using the logical NOT operator "!" to toggle its value from "false" to "true" or vice versa.
The updated value of "sorted" is stored so that the next time the function is called, it will sort the array in the opposite order. */
let sorted = false;
sortBtn.addEventListener("click", function (e) {
  e.preventDefault();
  movements(currentAccount, !sorted);
  // movements(currentAccount,!sort) ???

  // toggle the value of the "sorted" variable.
  //1: !sorted = true
  //2: !sorted = false
  //3: !sorted = true....
  sorted = !sorted;
  //1: sorted = true
  //2: sorted = false
  //3: sorted = true.....
});

// console.log(navigator.userAgent);
let nowt1 = new Date();
// console.log(Intl.DateTimeFormat(account2.locale).format(nowt1))

let nowt = new Date();
let options = {
  hour: "numeric",
  minutes: "numeric",
  day: "numeric",
  // month : 'numeric',
  month: "long",
  year: "numeric",
  // weekday : 'long',
  // seconds : 'numeric',
};
console.log(Intl.DateTimeFormat(account3.locale, options).format(nowt));

// setInterval(() => {
//   const now = new Date()
//   const hours = now.getHours()
//   const minutes = now.getMinutes()
//   const seconds = now.getSeconds()
//   console.log(hours,minutes,seconds);
// }, 1000);
console.log(('12').padStart(2, '0'));