
// Example usage:
const currentDate = new Date(); // Use the current date as a starting point
const thisWeek = getMonday(currentDate);
let selectedWeek = thisWeek


//temporary variable for testing
const myStudentsString = JSON.parse(localStorage.getItem('jomoTeacher'))
const myStudents = myStudentsString[0].students



function updateLocalStorage(){
jomoSchoolTeacherArray[0].students = myStudents
localStorage.setItem('jomoTeacher', JSON.stringify(jomoSchoolTeacherArray));
}




function thePage(){
  window.location.replace("main.html")
}


//  FIX SCHEDULE (IT REPRINTS EVERY TIME YOU COME BACK TO IT)
//  START TO ORGANIZE ADMIN ENTRY DATA
// STUDENT ENTRY + DISPLAY
// TEACHER ENTRY + DISPLAY
//---------------
//  ADD A YELLOW COLOR TO BUTTON FOR EXCUSED ABSENCE
//  EVENTUALLY FIGURE OUT HOW TO SAVE PAST DATE THAT WAS USED
//      TO LOG OLD INFO (LESSON DAY/TIME/RATE)
//  KEEP THINKING ABOUT LOCAL STORAGE FOR ADMIN DATA ENTRY
//  CLEAN UP CODE AND LABEL WHAT EVERYTHING DOES
//  CREATE NEW PAGE TO INPUT/CREATE NEW TEACHER AND ADD STUDENTS






//Fill page with list of student buttons

function currentWeekStudents() {
  const currentPage = document.getElementById('current-week');
  currentPage.innerHTML = '';

  let counter = 0;
  let currentColumn = null; // Initialize a reference to the current column


  // Iterate thru myStudents object to create buttons for each student
  for (const studentName in myStudents) {
    const student = myStudents[studentName];
    const fullName = student.name;


    // Create a new column for every two students
    if (counter % 2 === 0) {
      currentColumn = document.createElement('div');
      currentColumn.className = 'column';
      currentPage.appendChild(currentColumn); // Append the new column
    }

    // Create a student button and add it to the current column
    const studentButton = document.createElement('button');
    //const uniqueStudentClass = fullName + getStudentClassDate(fullName)
    studentButton.className = 'studentButton';
    //studentButton.id = `${fullName}${weeklyStudentId()}`
    studentButton.textContent = fullName;
    currentColumn.appendChild(studentButton);


    counter++;

    //Update color of buttons according to attendance
    const studentsMonthOfAttendance = getStudentAttendanceMonth(myStudents[studentName].name)
    const attendanceId = getStudentClassDate(myStudents[studentName].name)

    // If attendance month category doesn't exist for student, return
    if (!myStudents[studentName].attendance[studentsMonthOfAttendance]){
      continue;
    }
    else if (myStudents[studentName].attendance[studentsMonthOfAttendance][attendanceId]){
    if (studentButton.textContent === myStudents[studentName].name && myStudents[studentName].attendance[studentsMonthOfAttendance][attendanceId] === 'Present'){
      studentButton.style.backgroundColor = 'green'
    } else if (studentButton.textContent === myStudents[studentName].name && myStudents[studentName].attendance[studentsMonthOfAttendance][attendanceId] === 'Absent'){
      studentButton.style.backgroundColor = 'red'
    }
  } 
  }


  // Add buttons Save This Week and This Month
  const saveAndMonthButton = document.createElement('div')
  saveAndMonthButton.innerHTML = `<div class="column">
  <button class="saveButton" id="btn-save">Show Schedule</button>
  <button class="saveButton" id="currentMonthOverview">This Month</button>
  </div>`
  currentColumn.appendChild(saveAndMonthButton)
  document.getElementById('btn-save').addEventListener('click', showSchedule)

  // ADD CLICK EVENT TO 'THIS MONTH' BUTTON, SHOWING MONTH TABLE
document.getElementById('currentMonthOverview').addEventListener('click', getMonthOverview)

function showSchedule(){
  document.getElementById('schedule-container').style.display = 'flex'
  document.getElementById('week-one-list').style.display = 'none'
  const container = document.getElementById("schedule-container");

  const scheduleTable = createTeacherSchedule(myStudents, dates)
  


  container.appendChild(scheduleTable);

}





  //  MAKE EACH BUTTON CLICKABLE

// Get all buttons with the class "studentButton"
const buttons = document.querySelectorAll('.studentButton');


// Define a function to perform the same action for each button
function handleButtonClick(event) {
    // Get the specific button that was clicked
    const clickedButton = event.target;
    // Access button-specific information
    const buttonText = clickedButton.textContent
    let buttonColor = clickedButton.style.backgroundColor
   
    // attendanceId is the dateId formate used to log present or absent EX:  WedOct042023
    for (const student in myStudents) {

      const studentsMonthOfAttendance = getStudentAttendanceMonth(myStudents[student].name)
      const attendanceId = getStudentClassDate(myStudents[student].name)

      // If attendance month category doesn't exist for student, create it
      if (buttonText === myStudents[student].name && !myStudents[student].attendance[studentsMonthOfAttendance]){
        myStudents[student].attendance[studentsMonthOfAttendance] = {};
      }

      // If attendance date Id does not exist, create it and make the button green
      if (buttonText === myStudents[student].name && !myStudents[student].attendance[studentsMonthOfAttendance][attendanceId]){
          myStudents[student].attendance[studentsMonthOfAttendance][attendanceId] = 'Present';
          clickedButton.style.backgroundColor = 'green'
        

      // If attendance date Id equals 'Present', turn to 'Absent'
      } else if (buttonText === myStudents[student].name && myStudents[student].attendance[studentsMonthOfAttendance][attendanceId] === 'Present'){
        myStudents[student].attendance[studentsMonthOfAttendance][attendanceId] = 'Absent';
        clickedButton.style.backgroundColor = 'red'
      } else if (buttonText === myStudents[student].name && myStudents[student].attendance[studentsMonthOfAttendance][attendanceId] === 'Absent'){
        myStudents[student].attendance[studentsMonthOfAttendance][attendanceId] = 'Present';
        clickedButton.style.backgroundColor = 'green'
      }
      }
      //studentLocalStorage()
      console.log(myStudents)
      updateLocalStorage();
  }

        // Attach the event listener to each button
      buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
      });
   
}
  
function checkStudentObject(){
  console.log(leviStudent)
  console.log(`the current selected week is ${selectedWeek.start}`)
  console.log(`current date array is: ${dates}`)
}



















// const weeklyStudentId = () => {
//   //monthdateyear
//   const month = selectedWeek.start.getMonth() + 1;
//   const date = selectedWeek.start.getDate();
//   const year = selectedWeek.start.getFullYear();
//   return `${month}${date}${year}`
// }


currentWeekStudents();








function getStudentClassDate(studentFirstName){
   // Save the original selectedWeek.start value
   const originalStart = new Date(selectedWeek.start);

  for ( const student in myStudents){
       
    if (studentFirstName === myStudents[student].name){
      const studentDayNum = myStudents[student].classDay
      const dayDifference = studentDayNum - selectedWeek.start.getDay();

      // Add or subtract days to reach the desired class day
      selectedWeek.start.setDate(selectedWeek.start.getDate() + dayDifference);


      const options = { year: "numeric", month: "short", day: "2-digit" };
      const formattedDate = selectedWeek.start.toDateString();
      const classDate = formattedDate.replace(/\s+/g, '');

      // Restore the original selectedWeek.start value
      selectedWeek.start = originalStart;
  
      return classDate
    }
  }
}

function getStudentAttendanceMonth(studentFirstName){
    // Save the original selectedWeek.start value
    const originalStart = new Date(selectedWeek.start);

  for ( const student in myStudents){
       
    if (studentFirstName === myStudents[student].name){
      const studentDayNum = myStudents[student].classDay
      const dayDifference = studentDayNum - selectedWeek.start.getDay();

      // Add or subtract days to reach the desired class day
      selectedWeek.start.setDate(selectedWeek.start.getDate() + dayDifference);

     
      const theMonth = selectedMonth[selectedWeek.start.getMonth()]
      const attendanceMonthCategory = theMonth + selectedWeek.start.getFullYear()

      // Restore the original selectedWeek.start value
      selectedWeek.start = originalStart;
  
      return attendanceMonthCategory
    }
  }
}



// GET BACK TO STUDENT LIST FROM MONTH CONTAINER

function studentList(){
  document.getElementById('week-one-list').style.display = 'flex'
  document.getElementById('month-list').style.display = 'none'
  document.getElementById('schedule-container').style.display = 'none'
}

function toWeekOne(){
  document.getElementById('week-one-list').style.display = 'flex'
  document.getElementById('week-two-list').style.display = 'none'
  document.getElementById('week-three-list').style.display = 'none'
  document.getElementById('week-four-list').style.display = 'none'
}



// CURRENT DAY VARIABLES

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
let currentDayOfWeek = today.toString().split(" ")[0]
let currentDateOfWeek = today.toString().split(" ")[2]


//  SET THE WEEK START AND END DATES

function getMonday(currentDate) {
  // Get the current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const currentDayOfWeek = currentDate.getDay();

  // Calculate the number of days until the next Monday
  const daysToPreviousMonday = 7 - ((7 - currentDayOfWeek + 1) % 7);

  // Create a new Date object for the next Monday
  const previousMonday = new Date(currentDate);
  previousMonday.setDate(currentDate.getDate() - daysToPreviousMonday);

  // Calculate the end of the week (Sunday) by adding 6 days to the next Monday
  const endOfWeek = new Date(previousMonday);
  endOfWeek.setDate(previousMonday.getDate() + 6);

  // Return the start and end dates of the week as an object
  return {
    start: previousMonday,
    end: endOfWeek,
  };
}




// PUT CURRENT SELECTED WEEK IN HEADER OF PAGE

function labelHeaderDate(){
  const selectedMonthIndex = selectedWeek.start.getMonth()
  const startDay = selectedWeek.start.toString().split(" ")[0]
  const startMonth = selectedWeek.start.toString().split(" ")[1]
  const startDate = selectedWeek.start.toString().split(" ")[2]
  const endDay = selectedWeek.end.toString().split(" ")[0]
  const endMonth = selectedWeek.end.toString().split(" ")[1]
  const endDate = selectedWeek.end.toString().split(" ")[2]
  document.getElementById('wk-one').textContent = `${selectedMonth[selectedMonthIndex]} ${year}`
  document.getElementById('wk-dates').textContent = `${startDay} ${startMonth} ${startDate} - ${endDay} ${endMonth} ${endDate}`
}

labelHeaderDate();

// FIND START AND END DATES FOR THE NEXT OR PREV WEEK BY CHOSEN DIRECTION

function pushToDifWeek(selectedDate, direction) {
  const oneDay = 24* 60 * 60 * 1000;
  const offset = direction === 'next' ? 7 : -7;
  const nextWeekStart = new Date(selectedDate.getTime() + offset * oneDay);
  const nextWeekEnd = new Date(nextWeekStart.getTime() + 6 * oneDay);
  selectedWeek = { start: nextWeekStart, end: nextWeekEnd };
  
  //probably move this outside of function
  labelHeaderDate();
  // console.log(selectedWeek)
  currentWeekStudents();

  //I added these two functions to update the date array when the next week is selected
  getStudentDateArray();
  iterateAndSkipDuplicates(studentDateArray)

  // do i need these here? should the OG variables go back to const?
  let sortedDates = datesInOrder();

  const container = document.querySelector(".container-table");
    if (container.contains(table)) {
      container.removeChild(table);
    } else {
      console.log("Table not found in the container.");
    }

 
  table = createStudentAttendanceTable(myStudents, sortedDates);
}



// ADD EVENT LISTENERS TO ARROW BUTTONS TO CHOOSE WEEK

document.getElementById('next-week').addEventListener("click", function () {pushToDifWeek(selectedWeek.start, 'next')})

document.getElementById('previous-week').addEventListener("click", function () {pushToDifWeek(selectedWeek.start, 'previous')})










let dates = [];
let studentDateArray = [];


// PLACE THE DAY OF WEEK EACH STUDENT HAS CLASS IN AN ARRAY (TUES = 2)
function getStudentDateArray(){
for (const student in myStudents) {
  const classDayMonth = myStudents[student].classDay;
  studentDateArray.push(classDayMonth)
}
}

getStudentDateArray();

// USE THE NUMBER DAY FOR FIND THE DATE FOR EVERY WED(etc) OF THE MONTH
//  ADD DATES TO ARRAY, REMOVE REPEATS

function iterateAndSkipDuplicates(arr) {
  const seenNumbers = new Set();
  let newDates = []
  for (const num of arr) {
    if (!seenNumbers.has(num)) {
      // Process or do something with the unique number
      const selectedMonth = selectedWeek.start.getMonth()
      const selectedYear = selectedWeek.start.getFullYear()
      const classesInMonth = getClassDaysOfMonth(selectedYear, selectedMonth, num)

      for (const monthlyClassDays of classesInMonth) {
          newDates.push(monthlyClassDays)
         
}
      
      // Add the number to the set to mark it as seen
      seenNumbers.add(num);
      

     

    } else {
      // Skip repeated numbers
      //console.log(`Skipping duplicate: ${num}`);
    }
  }
  //Added this to update date array when new week/month is selected
  dates = newDates
}


iterateAndSkipDuplicates(studentDateArray)






function getClassDaysOfMonth(year, month, classDay) {
  const classesInMonth = [];
  const date = new Date(year, month, 1); // Start with the first day of the month

  while (date.getMonth() === month) {
    if (date.getDay() === classDay) { // Wednesday has a day of the week value of 3 (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      classesInMonth.push(new Date(date)); // Add the date to the list of Wednesdays
    }
    date.setDate(date.getDate() + 1); // Move to the next day
  }

  return classesInMonth;
}



// //Put dates in order

// // Custom comparison function to compare date strings
// function compareDates(a, b) {
//   const dateA = new Date(a);
//   const dateB = new Date(b);
//   return dateA - dateB;
// }

// // Sort the array using the custom comparison function
// dates.sort(compareDates);


// MAKING A SINGLE FUNCTION OUT OF THE ABOVE CODE WHICH IS IMPORTANT

function datesInOrder() {
  // Custom comparison function to compare date strings
  function compareDates(a, b) {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  }

  // Sort the array using the custom comparison function and return the sorted array
  return dates.sort(compareDates);
}

// Example usage:

let sortedDates = datesInOrder();


let table = createStudentAttendanceTable(myStudents, sortedDates);






//populate table with student Names
//give each cell an Id = PoppyFriOct272023

function createStudentAttendanceTable(myStudents, dates) {
  const mainTable = document.createElement("table");
  mainTable.id = 'my-table'
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const tfoot = document.createElement('tfoot');
  mainTable.appendChild(tfoot);
  const tfootRow = document.createElement('tr');
  tfoot.appendChild(tfootRow);
  const cell1 = document.createElement('td');
  cell1.textContent = 'Total';
  cell1.id = 'Total-cell'
  tfootRow.appendChild(cell1);

  

  // Create the table header row
  const headerRow = document.createElement("tr");

  // Add an empty cell in the top-left corner
  const emptyHeaderCell = document.createElement("th");
  headerRow.appendChild(emptyHeaderCell);


  // Add student names to the header cells
  for (const studentId in myStudents) {
    const studentHeaderCell = document.createElement("th");
    studentHeaderCell.textContent = myStudents[studentId].name;
    headerRow.appendChild(studentHeaderCell);
    const emptyFooterCell = document.createElement('td')
    const footerId = studentId + 'Total'
    emptyFooterCell.id = footerId
    tfootRow.appendChild(emptyFooterCell)
  }

  // Add the header row to the table header
  thead.appendChild(headerRow);

  // Create table body rows with dates
  for (const date of dates) {
    const row = document.createElement("tr");
    // Add the date in the first cell of each row
    const dateCell = document.createElement("td");

    const classEachMonth = date.toDateString().split(" ");
    const sliceYear = classEachMonth.slice(0, -1)
    const dateString = sliceYear.join(' ')

    dateCell.textContent = dateString;
    row.appendChild(dateCell);

    // Add attendance cells for each student
    for (const studentId in myStudents) {
      const student = myStudents[studentId];
      const attendanceCell = document.createElement("td");
      //Turn datestring into dateobject
      const dateObject = new Date(date)
      // Set the ID of the cell
      const attendanceYear = date.getFullYear()
      const attendanceMonth = selectedMonth[date.getMonth()]
      const attendanceObject = attendanceMonth.toString() + attendanceYear
      const attendanceCellId = student.name + dateString.replace(/\s+/g, "") + attendanceYear 
      attendanceCell.id = attendanceCellId

      attendanceCell.classList.add(student.id)
      
  
      row.appendChild(attendanceCell); 
    }

    // Add the row to the table body
    tbody.appendChild(row);
  }

  // Add the table header and body to the table
  mainTable.appendChild(thead);
  mainTable.appendChild(tbody);

  
  


  // Optionally, you can add more styling or attributes to the table as needed.
  return mainTable;
}

const buttonDiv = document.getElementById('buttons')
const monthInvoiceButton = document.createElement('div')
monthInvoiceButton.classList.add('month-button-class')
monthInvoiceButton.innerHTML = `<div>
<button onclick="studentList()">Back To Students</button>
<button onclick="sendInvoice()">Send Invoice</button>`
buttonDiv.appendChild(monthInvoiceButton)


// Append the table to your HTML document, e.g., by selecting a container element and using appendChild:

function getMonthOverview(){
document.getElementById('week-one-list').style.display = 'none'
document.getElementById('month-list').style.display = 'flex'
const container = document.querySelector(".container-table");

 
  
let monthlyTotal = 0

container.appendChild(table);

console.log(table)

  for (const student in myStudents){
    const studentsMonthOfAttendance = getStudentAttendanceMonth(myStudents[student].name)
    const theStudentName = myStudents[student].name
    let datesArray= []

    if (myStudents[student].attendance[studentsMonthOfAttendance]){
      datesArray = Object.keys(myStudents[student].attendance[studentsMonthOfAttendance])
      }

    datesArray.forEach((x)=> {
      const elementId = theStudentName + x

      if (myStudents[student].attendance[studentsMonthOfAttendance][x] === 'Present'){
        document.getElementById(elementId).style.backgroundColor = 'green'
        // Get the cell element by its ID
        const cell = document.getElementById(elementId);

        // Create a text node with the content you want to add
        const text = document.createTextNode(`$${myStudents[student].rate}`);

        // Append the text node to the cell
        cell.appendChild(text);
        cell.style.color = '#ffffff'


        //TRYING TO ADD STUDENTS TOTAL AND PLACE IN FOOTER OF TABLE
        const footerId = student + 'Total'
        console.log(footerId)
        const footerCell = document.getElementById(footerId)
        const footerTotal = `$${getStudentTotal(student)}`
        footerCell.textContent = footerTotal

        
        

      } else if (myStudents[student].attendance[studentsMonthOfAttendance][x] === 'Absent'){
        document.getElementById(elementId).style.backgroundColor = 'red'
      }
    })
    monthlyTotal += getStudentTotal(student)
  }
  const totalCell = document.getElementById('Total-cell')
  totalCell.textContent = `Total: $${monthlyTotal}`
  console.log(monthlyTotal)
}



function getStudentTotal(studentId){
    console.log(myStudents[studentId])
   
    const month = selectedMonth[selectedWeek.start.getMonth()]
  const year = selectedWeek.start.getFullYear()
  const attendanceMonthTag = month + year

  console.log(attendanceMonthTag)

  const buttonTotal = document.querySelector('.invoiceButton')
  const footerId = studentId + 'Total'
  const footerCell = document.getElementById(footerId)
 

    let studentTotal = 0
    if (myStudents[studentId].attendance[attendanceMonthTag]){
      const monthAttendance = myStudents[studentId].attendance[attendanceMonthTag]
   

      for (const attendance in monthAttendance){
        console.log(monthAttendance[attendance])

        if (monthAttendance[attendance] === 'Present'){
          
          studentTotal += myStudents[studentId].rate
          console.log(`${studentId}'s total is ${studentTotal}`)
        }
      }  
      }
  
  console.log(studentTotal)
  return studentTotal
}





//Student {name: 'Brayden', id: 'BraydenId', classDay: 3, rate: 22.5, attendance: {…}}

//  If selected month + selected year category exists in myStudents[student].attendance[selectedMonthYear]

//  For each class date === present, add rate to total and place total in button





//localStorage.clear();








// Function to calculate the sum of a column
function calculateColumnSum(columnClassName) {
  var columnCells = document.querySelectorAll("." + columnClassName);
  var sum = 0;

  columnCells.forEach(function (cell) {
    var cellValue = parseInt(cell.textContent, 10); // Parse cell content as an integer
    if (!isNaN(cellValue)) {
      sum += cellValue;
    }
  });

  return sum;
}

// Call the function to calculate the sum of a specific column
var columnSum = calculateColumnSum("column-cell");
console.log("Sum of the column: " + columnSum);


function sendInvoice(){
  alert('Are you sure you want to send this invoice?')
}

//  ON THE MONTHLY INVOICE TABLE PAGE = MORE BUTTONS APPEAR WHEN A STUDENT ATTENDANCE IS MARKED
//  DOUBLE CHECK THE LOCALSTORAGE THING
//  FINISH UP INVOICE MENU WITH RATE BEING PLUGGED IN TO EACH CELL WHEN MARKED






function createTeacherSchedule(myStudents, dates) {
  const mainTable = document.createElement("table");
  mainTable.id = 'schedule-table'
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const tfoot = document.createElement('tfoot');
  mainTable.appendChild(tfoot);
  const tfootRow = document.createElement('tr');
  tfoot.appendChild(tfootRow);
  const cell1 = document.createElement('td');
  cell1.textContent = 'Total';
  cell1.id = 'Total-cell'
  tfootRow.appendChild(cell1);

  
  console.log(studentDateArray)
  // Create the table header row
  const headerRow = document.createElement("tr");

  // Add an empty cell in the top-left corner
  const emptyHeaderCell = document.createElement("th");
  headerRow.appendChild(emptyHeaderCell);

  const daysInSchedule = Array.from(new Set(studentDateArray))
  
  daysInSchedule.forEach((x) => {
    const datey = new Date(0, 0, x)
    const scheduledDay = datey.toLocaleDateString('en-US', { weekday: 'short' }); 
    const dayHeaderCell = document.createElement('th');
    dayHeaderCell.textContent = scheduledDay
    headerRow.appendChild(dayHeaderCell);
    const emptyFooterCell = document.createElement('td')
    tfootRow.appendChild(emptyFooterCell)
  })
  

  
  

  // Add the header row to the table header
  thead.appendChild(headerRow);

  let lessonTimes = []

  for (const student in myStudents){
    const studentDay = myStudents[student].classDay
    const classTime = myStudents[student].lessonTime.Start
    
    const timeSlot = convertTo24hr(classTime)
    console.log(timeSlot)
    lessonTimes.push(timeSlot)
  }

  lessonTimes.sort((a, b) => a - b);

  const uniqueTimes = new Set(); // Create a Set to store unique times

  lessonTimes.forEach((time) => {
    const timeIn12hrFormat = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  
    if (!uniqueTimes.has(timeIn12hrFormat)) {
      const row = document.createElement('tr');
      const dateCell = document.createElement('td');
      dateCell.textContent = timeIn12hrFormat;
      row.appendChild(dateCell);
      tbody.appendChild(row);
  
      uniqueTimes.add(timeIn12hrFormat); // Add the time to the Set to mark it as encountered
    }
  });


  for (const student in myStudents){
      const studentName = myStudents[student].name
      const studentTime = 0 + myStudents[student].lessonTime.Start
      //console.log(studentTime)
      const cell = document.createElement('td');
      const emptyCell = document.createElement('td')
      cell.textContent = studentName
      const rows = tbody.getElementsByTagName('tr');

      for (let i = 0; i < rows.length; i++) {
        if (rows[i].querySelector('td').textContent === studentTime) {
          rows[i].appendChild(cell);
          console.log('good job')
        } 
       
      }
  }

  // Add the table header and body to the table
  mainTable.appendChild(thead);
  mainTable.appendChild(tbody);

  
  


  // Optionally, you can add more styling or attributes to the table as needed.
  return mainTable;
}


//const newArray = Array.from(new Set(studentDateArray))



const time12hr = "2:00 PM";
const time24hr = convertTo24hr(time12hr);
const two30 = convertTo24hr("2:30 PM")

function convertTo24hr(time12hr) {
  const date = new Date(); // Create a new Date object

  // Parse the hours, minutes, and period (AM or PM) from the input time
  const parts = time12hr.match(/(\d+):(\d+) (AM|PM)/);
  if (!parts) {
    return null; // Return null if the input format is invalid
  }

  let hours = parseInt(parts[1], 10);
  const minutes = parseInt(parts[2], 10);
  const period = parts[3];

  // Adjust hours for the 12-hour format
  if (period.toLowerCase() === 'pm' && hours < 12) {
    hours += 12;
  } else if (period.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  // Set the hours and minutes on the Date object
  date.setHours(hours);
  date.setMinutes(minutes);

  return date; // Return the Date object with the 24-hour time
}

console.log(two30); // Output: Wed Dec 31 1969 14:00:00 GMT+0000 (Coordinated Universal Time)


if (time24hr > two30){
  console.log('this works')
}




console.log(typeof studentDateArray[0])


