// IF I NEED TO CHANGE THE STUDENTS CLASSDAY
// MAGE A CLONE OF THE STUDENT OBJECT??

const selectedMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class Parent {
  constructor(name, phoneNumber, eMail, rate) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.eMail = eMail;
    this.rate = rate;
    this.children = []; // Stores children (students)
    this.paymentHistory = {}
  }
}

// Define a Student class
class Student {
  constructor(name, id, classDay, rate, lastName, lessonLength) {
    this.name = name;
    this.id = id;
    this.classDay = classDay
    this.rate = rate
    this.lastName = lastName
    this.lessonLength = lessonLength
    this.lessonTime = {}
    this.attendance = {}; // Stores attendance records by date
    this.parentInfo = {}
  }

  // Mark a student as present for a given date
  markPresent(date) {
    this.attendance[date] = 'Present';
  }

  // Mark a student as absent for a given date
  markAbsent(date) {
    this.attendance[date] = 'Absent';
  }

  setParent(parent) {
    this.parentInfo.parent = parent;
  }
}

// Define a Teacher class
class Teacher {
  constructor(firstName, id, lastName, email, password) {
    this.firstName = firstName;
    this.id = id;
    this.lastName = lastName
    this.email = email
    this.password = password
    this.students = {}; // Stores students
  }

   // Add a student to the teacher's roster
   addStudent(student) {
    this.students[student.id] = student;
  }
}

// Define a School class
class School {
  constructor(name) {
    this.name = name;
    this.teachers = {}; // Stores teachers by ID
    // this.students = {}; // Stores students by ID
  }

  // Add a teacher to the school
  addTeacher(teacher) {
    this.teachers[teacher.id] = teacher;
  }
}

// Create instances of the School, Teacher, and Student classes
const jomoSchool = new School('JOMO School');

const jordanTeacher = new Teacher('Jordan', 'jordanHemphill', 'Hemphill', 'jordan@gmail.com', 'jordanpassword');
const makintoTeacher = new Teacher('George', 'georgeMakinto', 'Makinto', 'makinto@gmail.com','makintopassword')
const alexisTeacher = new Teacher('Alexis', 'alexisLastname', 'Lastname', 'alexis@gmail.com', 'alexispassword')

jomoSchool.addTeacher(jordanTeacher)
jomoSchool.addTeacher(makintoTeacher)
jomoSchool.addTeacher(alexisTeacher)



const chloeStudent = new Student('Chloe', 'ChloeId', 2, 22.5, 'Lastname', 30)
chloeStudent.lessonTime = {Start: '2:00 PM', End: '2:30 PM'}
makintoTeacher.addStudent(chloeStudent)

const cherryStudent = new Student('Cherry', 'CherryId', 4, 22.5, 'Lastname', 30)
cherryStudent.lessonTime = {Start: '2:00 PM', End: '2:30 PM'}
alexisTeacher.addStudent(cherryStudent)
const tarynStudent = new Student('Taryn', 'TarynId', 3, 22.5, 'Maier', 30)
tarynStudent.lessonTime = {Start: '3:00 PM', End: '3:30 PM'}
alexisTeacher.addStudent(tarynStudent)


//Jordan's students
const braydenStudent = new Student('Brayden', 'BraydenId', 3, 22.5, 'Maier', 30)
const tristanStudent = new Student('Tristan', 'TristanId', 3, 22.5, 'Maier', 30)
const poppyStudent = new Student('Poppy', 'PoppyId', 3, 22.5, 'Lastname', 30)
const leviStudent = new Student('Levi', 'LeviId', 3, 22.5, 'Lastname', 30)
const aspenStudent = new Student('Aspen', 'AspenId', 3, 33.75, 'Lastname', 60)
const hunterStudent = new Student('Hunter', 'HunterId', 3, 33.75, 'Lastname', 60)
const thomasStudent = new Student('Thomas', 'ThomasId', 4, 22.5, 'Lastname', 30)
const milesStudent = new Student('Miles', 'MilesId', 5, 22.5, 'Lastname', 30)
jordanTeacher.addStudent(braydenStudent)
jordanTeacher.addStudent(tristanStudent)
jordanTeacher.addStudent(poppyStudent)
jordanTeacher.addStudent(leviStudent)
jordanTeacher.addStudent(aspenStudent)
jordanTeacher.addStudent(hunterStudent)
jordanTeacher.addStudent(thomasStudent)
jordanTeacher.addStudent(milesStudent)



tristanStudent.lessonTime = {Start: '3:00 PM', End: '3:30 PM'}
braydenStudent.lessonTime = {Start: '3:30 PM', End: '4:00 PM'}
poppyStudent.lessonTime = {Start: '4:00 PM', End: '4:30 PM'}
aspenStudent.lessonTime = {Start: '5:00 PM', End: '6:00 PM'}
hunterStudent.lessonTime = {Start: '6:00 PM', End: '7:00 PM'}
thomasStudent.lessonTime = {Start: '4:30 PM', End: '5:00 PM'}
milesStudent.lessonTime = {Start: '4:30 PM', End: '5:00 PM'}
leviStudent.lessonTime = {Start: '4:30 PM', End: '5:00 PM'}

const jomoSchoolTeacherArray = [jordanTeacher, makintoTeacher, alexisTeacher]

// students parents

const erinMaier = new Parent('Erin', '3432521234', 'erin@gmail.com', 67.5)
erinMaier.children.push(braydenStudent, tristanStudent, tarynStudent)

const patriciaGeorge = new Parent('Patricia', '1234567899', 'patricia@gmail.com', 120)
patriciaGeorge.children.push(hunterStudent, aspenStudent)

const poppyParent = new Parent('Pop', '1234567899', 'pop@gmail.com', 22.5)
poppyParent.children.push(poppyStudent)

const jomoSchoolParentArray = [erinMaier, patriciaGeorge, poppyParent]

//console.log(erinMaier)

// localStorage.setItem('jomoTeacher', JSON.stringify(jomoSchoolTeacherArray));
//console.log(braydenStudent.lessonTime.Start)


//console.log(jomoSchoolParentArray[0].children[0].name)


braydenStudent.attendance.October2023 = {WedOct112023: "Present", WedOct182023: "Present", WedOct252023: "Present", WedOct042023: "Present"}

braydenStudent.attendance.September2023 = {WedSep062023: "Present", WedSep132023: "Present", WedSep202023: "Present", WedSep272023: "Present"}


tristanStudent.attendance.September2023 = {WedSep062023: "Present", WedSep132023: "Present", WedSep202023: "Present", WedSep272023: "Present"}























// const brayden = {
//   weekOne: 'test',
//   weekTwo: '',
//   weekThree: '',
//   weekFour: '',
//   name: 'Brayden',
// }

// const tristan = {
//   weekOne: '',
//   weekTwo: '',
//   weekThree: '',
//   weekFour: '',
//   name: 'Tristan',
// }

// const poppy = {
//   weekOne: '',
//   weekTwo: '',
//   weekThree: '',
//   weekFour: '',
//   name: 'Poppy',
// }

// const levi = {
//   weekOne: '',
//   weekTwo: '',
//   weekThree: '',
//   weekFour: '',
//   name: 'Levi',
// }
// const aspen = {
//   weekOne: '',
//   weekTwo: '',
//   weekThree: '',
//   weekFour: '',
//   name: 'Aspen',
// }

// const hunter = {
//   weekOne: '',
//   weekTwo: '',
//   weekThree: '',
//   weekFour: '',
//   name: 'Hunter',
// }
// const thomas = {
//   weekOne: '',
//   weekTwo: '',
//   weekThree: '',
//   weekFour: '',
//   name: 'Thomas',
// }

// const miles = {
//   weekOne: '',
//   weekTwo: '',
//   weekThree: '',
//   weekFour: '',
//   name: 'Miles',
// }


// studentGroup = {brayden, tristan, poppy, levi, aspen, hunter, thomas, miles}




// function currentMonthOverview(){
//   document.getElementById('month-list').style.display = 'flex'
//   document.getElementById('week-one-list').style.display = 'none'
//   const monthOverview = document.createElement('div')
//   const monthContainer = document.getElementById('month-list')
//   const tableBody = document.querySelector("#data-table tbody");
//   const table = document.getElementById("data-table");
//   const headerRow = table.querySelector("thead tr");
  
 
// for (const studentName in studentGroup) {
//   const student = studentGroup[studentName];
//   const fullName = student.name
//   const weekNames = Object.keys(studentGroup[studentName])
//   const row = tableBody.insertRow();
//   const nameCell = row.insertCell(0);
//   nameCell.textContent = studentName
  

//   // const extraTh1 = document.createElement('th')
//   // extraTh1.textContent = fullName
//   // headerRow.appendChild(extraTh1)


//   for (const monthlyClassDays of classesInCurrentMonth) {
//     const getString = monthlyClassDays.toDateString().split(" ")
//     const shiftYear = getString.pop()
//     console.log(`dis da dis ${getString}`); //Wed Oct 04
//   }



//   const weekOne = row.insertCell(1);
//   const weekTwo = row.insertCell(2);
//   const weekThree = row.insertCell(3);
//   const weekFour = row.insertCell(4);
//   weekOne.textContent = student.weekOne
//   weekTwo.textContent = student.weekTwo
//   weekThree.textContent = student.weekThree
//   weekFour.textContent = student.weekFour






// //  THIS IS WHERE I LEFT OFF!!!!
// //  TOO TIRED TO FIGURE OUT THE DIFFERENCE BETWEEN thisWeek.start and selectedWeek.start
// //   IN THE FUNCTION pushToDifWeek() I COMMENTED OUT: 
//  //probably move this outside of function
//   // labelHeaderDate();
//   // console.log(selectedWeek)
//   // currentWeekStudents();

//   //  IN THIS CURRENT FUNCTION I AM TRYING TO CONNECT EVERY CELL TO ITS DATE THAT FITS WITH THE MONTH AND GIVES IT ITS OWN UNIQUE ID BASED ON THE STUDENT AND WEEK/MONTH

//   //  ALSO NEED TO BE AWARE OF LOGGING ALL INFORMATION BETWEEN EVERY MONTH AND STUDENT -- EX: STUDENT WK1 WK2 WK3 WK4 MUST BE ORGANIZED BY EACH MONTH

//   //  BELOW I WAS TRYING TO GET EACH ROW ORGANIZED BY WEEK, FINDING THE FIRST WEEK OF THE MONTH AND PUSHING IT TO THE FOLLOWING WEEKS TO FILL OUT THE WHOLE MONTH



//   const dateString = selectedWeek.start.toDateString().split(" ")
//   if(dateString[2] < 7){
//     firstWeek = selectedWeek.start
//     secondWeek = pushToDifWeek(selectedWeek.start, 'next')
//   }
      
//   console.log(thisWeek)
//   weekOne.id = `${fullName}${weeklyStudentId()}`
//   weekTwo.id = `${fullName}${weeklyStudentId()}`
//   weekThree.id = `${fullName}${weeklyStudentId()}`
//   weekFour.id = `${fullName}${weeklyStudentId()}`
  
//   }
  
//   monthContainer.appendChild(monthOverview)
//   const monthIndex = selectedWeek.end.getMonth()
//   document.getElementById('month-overview').textContent = `${selectedMonth[monthIndex]} ${year}`
// }


/*



console.log('this where my new testing area has BEGUN!!!!!');

const getDate = new Date();
//const currentDate = (getDate.getMonth() + 1) + '-' + getDate.getDate() + '-' + getDate.getFullYear()
//console.log(currentDate);
const dateInput = document.getElementById('dateInput');

let chosenDay = getDate.getDay();
let startOfWeek = 1

console.log(`muthfuck ${chosenDay}`)
console.log(getDate)

if (getDate.getDay() == 0){
    console.log('sunday')
} if (chosenDay === 2){
  console.log('tuesday')
  startOfWeek = chosenDay - 1 
  dayOfWeek = 'tuesday'
}

//console.log(startOfWeek)
//const currentDates = new Date(dateInput.value);
//console.log(currentDates)

  // if (findDayOfWeek() === 'Monday'){
  //   console.log('we found monday!')
  // }else {
  //   console.log('try aginnn')
  // }



function previousWeek() {
  const currentDate = new Date(dateInput.value);
  let backToMonday = ''
  let crazyDateNumbers = ''
  if (findDayOfWeek() === 'Tuesday'){
    currentDate.setDate(currentDate.getDate()-1)
    console.log('we fucking found it!')
    backToMonday = currentDate.toISOString().split('T')[0];
    console.log(backToMonday)
  } else if (findDayOfWeek() === 'Wednesday'){
    currentDate.setDate(currentDate.getDate()-2)
    backToMonday = currentDate.toISOString().split('T')[0]
    console.log(backToMonday)
  } else if (findDayOfWeek() === 'Thursday'){
    currentDate.setDate(currentDate.getDate()-3)
    backToMonday = currentDate.toISOString().split('T')[0]
    console.log(backToMonday)
  }else if (findDayOfWeek() === 'Friday'){
    currentDate.setDate(currentDate.getDate()-4)
    backToMonday = currentDate.toISOString().split('T')[0]
    console.log(backToMonday)
  } else if (findDayOfWeek() === 'Saturday'){
    currentDate.setDate(currentDate.getDate()-5)
    backToMonday = currentDate.toISOString().split('T')[0]
    console.log(backToMonday)
  }else if (findDayOfWeek() === 'Sunday'){
    currentDate.setDate(currentDate.getDate()-6)
    backToMonday = currentDate.toISOString().split('T')[0]
    console.log(backToMonday)
  }
  console.log(findDayOfWeek())
  console.log(`this is the thang ${findDayOfWeek()}`)
  currentDate.setDate(currentDate.getDate() - 7);
  dateInput.value = currentDate.toISOString().split('T')[0];
}

function nextWeek() {
  const currentDate = new Date(dateInput.value);
  currentDate.setDate(currentDate.getDate() + 7);
  dateInput.value = currentDate.toISOString().split('T')[0];
}

function findDayOfWeek() {
  // Get the value of the input element
  const dateInput = document.getElementById("dateInput").value;

  // Create a JavaScript Date object using the input value
  const date = new Date(dateInput);

  // An array to map the day of the week
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
  const dayIndex = date.getDay();

  // Get the name of the day of the week
  const dayName = daysOfWeek[dayIndex];
  //console.log(dayIndex)

  // Display the day of the week
  //console.log(`The selected date is a ${dayName}.`);
  return dayName
}





OLD COLUMN HTML




  <div class="column">
                <button class="studentButton" id="btn1-1">Brayden</button>
                <button class="studentButton" id="btn2-1">Tristan</button>
                </div>
                 <div class="column">
                <button class="studentButton" id="btn3-1">Poppy</button>
                <button class="studentButton" id="btn4-1">Levi</button>
                 </div>
                <div class="column">
                <button class="studentButton" id="btn5-1">Aspen</button>
                <button class="studentButton" id="btn6-1">Hunter</button>
                </div>
                <div class="column">
                <button class="studentButton" id="btn7-1">Thomas</button>
                <button class="studentButton" id="btn8-1">Miles</button>
                </div>
                <div class="column">
                <button class="saveButton" id="btn-save">Save This Week</button>
                <button class="saveButton" onclick="thisMonth()">This Month</button>
                </div>
*/