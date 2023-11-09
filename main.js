var show = document.getElementById('home');
show.style.display='block';
var user =JSON.parse(localStorage.getItem('user'));


const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

//  CONTROL MAIN BUTTONS ON LEFT SIDE OF SCREEN - HOME/ADD TEACHER


function Show(id) {

    document.getElementById('home').style.display='none';
    document.getElementById('schedule').style.display='none';
    // document.getElementById('feedback').style.display='none';
    document.getElementById('add-teacher').style.display='none';
    document.getElementById('DivProfile').style.display='flex'
    document.getElementById('DivProfile').style.display='flex'
    document.getElementById('DivProfile').style.display='flex'

    document.getElementById(id).style.display='block';

   if(id=="home"){
    document.getElementById('teacher-student-parent-info').innerHTML = ""
    fillTeacherRoster()
    document.getElementById('left-column-header').textContent = 'Teacher Roster'
    document.getElementById('right-column-header').textContent = 'Find Parent'
    document.getElementById('main-right-column').style.display = 'flex'
    document.getElementById('new-student-entry').style.display = 'none'
    document.getElementById('new-student-review').style.display = 'none'
    document.getElementById('current-teacher-roster').style.display = 'none'
    document.getElementById('parent-payment-history').style.display = 'none'
    

    document.getElementById('fas1').style.color='red';
    document.getElementById('fas2').style.color='#0622bc';
    // document.getElementById('fas3').style.color='#0622bc';
    document.getElementById('fas4').style.color='#0622bc';
    teacherDropdownMenu('dropdown');
    
}
   else if(id=="schedule"){
    document.getElementById('fas1').style.color='#0622bc';
    document.getElementById('fas2').style.color='red';
    // document.getElementById('fas3').style.color='#0622bc';
    document.getElementById('fas4').style.color='#0622bc';
}
else if(id=="feedback"){
    document.getElementById('fas1').style.color='#0622bc';
    document.getElementById('fas2').style.color='#0622bc';
    document.getElementById('fas3').style.color='red';
    document.getElementById('fas4').style.color='#0622bc';
}
else if(id=="add-teacher"){
    document.getElementById('fas1').style.color='#0622bc';
    document.getElementById('fas2').style.color='#0622bc';
    // document.getElementById('fas3').style.color='#0622bc';
    document.getElementById('fas4').style.color='red';
}
}
// // _____________________________________________________









function logout() {
    localStorage.clear();
    window.location.replace("index.html");

}









const myStudents = jordanTeacher.students
const jomoSchoolTeachers =jomoSchool.teachers




//---------POPULATE THE TEACHER DROPDOWN MENU WITH CURRENT TEACHER ROSTER

function teacherDropdownMenu(dropdownId){
//Select the <ul> element by its ID
const teacherRoster = document.getElementById(dropdownId);

teacherRoster.innerHTML = "";
const selectTeacher = document.createElement('option')
selectTeacher.textContent = 'Select Teacher'
teacherRoster.appendChild(selectTeacher)

for (const teacher in jomoSchoolTeachers) {
  const teacherName = jomoSchoolTeachers[teacher].firstName


  // Create a new <li> element
  const newTeacher = document.createElement("option");
  newTeacher.textContent = teacherName;

  // Append the new <li> element to the <ul> element
  teacherRoster.appendChild(newTeacher);
}
const selectedTeacher = document.getElementById("left-column-header");


}

teacherDropdownMenu('dropdown');






//--------------FILL THE RIGHT COLUMN WITH THE STUDENTS OF THE CHOSEN TEACHER

function getTeacherRoster(teacher){
    document.getElementById('current-teacher-roster').style.display = 'flex'
    document.getElementById('main-right-column').style.display = 'none'
    document.getElementById('new-student-entry').style.display = 'none'

       //Select the <ul> element by its ID
       const studentRoster = document.getElementById("teacher-roster-container");
       // Clear existing content
       studentRoster.innerHTML = "";

        for (const teacherId in jomoSchoolTeachers){
            if (teacher === jomoSchoolTeachers[teacherId].firstName)
        { const teacherStudents = jomoSchoolTeachers[teacherId].students


        const thisTeacherId = jomoSchoolTeachers[teacherId].id
      
        const selectedTeacher = document.getElementById("right-column-header");
        selectedTeacher.textContent = `${teacher}'s Roster`;
        

        for (const student in teacherStudents){
            const studentName = teacherStudents[student].name
            const studentId = teacherStudents[student].id

            // Create a new <li> element
            const newStudent = document.createElement("button");
            newStudent.textContent = studentName;
            newStudent.id = teacherStudents[student].id
            newStudent.classList.add('add-student-button')

            newStudent.addEventListener('click', function(){
               
                showStudentStats(studentName)
             })
            

            // Append the new <li> element to the <ul> element
            studentRoster.appendChild(newStudent);
            }
        }
    }

    const addButton = document.createElement('button')
    addButton.textContent = 'Add Student'
    addButton.classList.add('add-new-student')
    studentRoster.appendChild(addButton)
    addButton.addEventListener('click', backToAdd)

}


//---------------FUNCTION OF BACK BUTTON AT END OF STUDENT LIST THAT GOES TO ADD STUDENT PAGE


function backToAdd(){
    document.getElementById('current-teacher-roster').style.display = 'none'
    document.getElementById('new-student-entry').style.display = 'flex'
}





//---------------ADD STUDENT TO TEACHER ROSTER/ GOTO CONFIRM STUDENT PAGE/ OPTION ADD SIBLING


function addStudentToRoster(){
    
   
    const dropdownTeacher = document.getElementById("dropdown").value
    const studentFirst = document.getElementById('studentFirst').value
    const studentLast = document.getElementById('studentLast').value
    const dropdownDay = document.getElementById("dropdown-day")
    const selectedHour = document.getElementById("dropdown-hour").value
    const selectedMinute = document.getElementById("dropdown-minute").value
    const selectedPm = document.getElementById("dropdown-pm").value
    const classTime = `${selectedHour}:${selectedMinute} ${selectedPm}`
    const classLength = document.getElementById('class-length').value
    const parentName = document.getElementById('parent-name').value
    const phoneNumber = document.getElementById('phoneNumber').value
    const parentEmail = document.getElementById('parent-email').value

    if(isValidEmail(parentEmail)){
    } else {
        alert('Invalid email format')
    }

    const classTimeNumber = Number(removeTextFromTime(classLength))
    const endTime = addMinutesToTime(classTime, classTimeNumber);

    const dayIndex = daysOfWeek.indexOf(dropdownDay.value)
    // const studentLabel = input + 'Student';
    const studentId = studentFirst + 'Id';
    
    const newStudent = new Student(studentFirst, studentId, dayIndex, 0, studentLast,);
    newStudent.parentInfo = {
        Parent: parentName, 
        Phone: phoneNumber, 
        Email: parentEmail
    };
    newStudent.lessonTime = {
        Start: classTime,
        End: endTime
    }

    

    for (const teacher in jomoSchoolTeachers){
        const firstName = jomoSchoolTeachers[teacher].firstName 

        if (dropdownTeacher === firstName){
           
            const lastName = jomoSchoolTeachers[teacher].lastName 
            const teacherId = firstName.toLowerCase() + lastName

            jomoSchoolTeachers[teacherId].addStudent(newStudent)
            

            //getTeacherRoster(firstName)
        }
    }
    document.getElementById('new-student-entry').style.display = 'none'
    document.getElementById('new-student-review').style.display = 'flex'
    document.getElementById('right-column-header').textContent = 'Student Info'
    // document.getElementById('parent-name1').textContent = parentName
    document.getElementById('student-name').textContent = `${studentFirst} ${studentLast}`
    document.getElementById('lesson-time1').textContent = `${dropdownDay.value}: ${classTime} - ${endTime}`
    document.getElementById('teacher-name1').textContent = dropdownTeacher
    // document.getElementById('rate-name1').textContent = `$${classRate}`
    // document.getElementById('phone-number1').textContent = phoneNumber
    // document.getElementById('email-name1').textContent = parentEmail

    parentInfo.push(parentName, phoneNumber, parentEmail)

    document.getElementById('teacher-student-parent-info').innerHTML = ""
    document.getElementById('left-column-header').textContent = 'Parent Info'
    document.getElementById('teacher-student-parent-info').innerHTML = `<p><strong>Parent Name: </strong> <span id="student-name2">${parentName}</span></p>
    <p><strong>Phone Number: </strong> <span id="lesson-time2">${phoneNumber}</span></p>
    <p><strong>E-mail: </strong> <span id="teacher-name2">${parentEmail}</span></p>
    <p><input type="text" placeholder="Rate $">`;

    }


let parentInfo = []



//-------------------ADD SIBLING PAGE --------

function addSibling(parentName, phoneNumber, parentEmail){
      //Select the <ul> element by its ID
      const studentRoster = document.getElementById("teacher-student-parent-info");
      // Clear existing content
      studentRoster.innerHTML = "";
    document.getElementById('sibling').style.display = 'flex'
    // document.getElementById('parent-name').textContent = parentName
    // document.getElementById('phone-number1').textContent = phoneNumber
    // document.getElementById('email-name1').textContent = parentEmail
    teacherDropdownMenu('dropdown2');

    document.getElementById('left-column-header').textContent = 'Add Sibling'
}

document.getElementById('add-sibling').addEventListener('click', function() {addSibling(parentInfo[0], parentInfo[1], parentInfo[2])})





//-------------ADD SIBLING TO STUDENT CONFIRMATION PAGE



function confirmSibling() {
    const studentContainer = document.getElementById('student-info');

    const dropdownTeacher = document.getElementById("dropdown2").value;
    const studentFirst = document.getElementById('studentFirst2').value;
    const dropdownDay = document.getElementById("dropdown-day2").value; // Make sure you have an ID for this element
    const selectedHour = document.getElementById("dropdown-hour2").value;
    const selectedMinute = document.getElementById("dropdown-minute2").value;
    const selectedPm = document.getElementById("dropdown-pm2").value;
    const classTime = `${selectedHour}:${selectedMinute} ${selectedPm}`;
    const classLength = document.getElementById('class-length2').value;

    const classTimeNumber = Number(removeTextFromTime(classLength))
    const endTime = addMinutesToTime(classTime, classTimeNumber);

    const dayIndex = daysOfWeek.indexOf(dropdownDay.value)

    const siblingInfo = document.createElement('div');
    siblingInfo.innerHTML =   `<hr class="default"><p><strong>Student Name: </strong> <span id="student-name2">${studentFirst}</span></p>
    <p><strong>Lesson Time: </strong> <span id="lesson-time2">${dropdownDay}: ${classTime} - ${endTime}</span></p>
    <p><strong>Teacher Name: </strong> <span id="teacher-name2">${dropdownTeacher}</span></p>`;

   
    studentContainer.appendChild(siblingInfo);

    

    document.getElementById('sibling').style.display = 'none'
    document.getElementById('teacher-student-parent-info').innerHTML = ""
    document.getElementById('left-column-header').textContent = 'Parent Info'
    document.getElementById('teacher-student-parent-info').innerHTML = `<p><strong>Parent Name: </strong> <span id="student-name2">${parentInfo[0]}</span></p>
    <p><strong>Phone Number: </strong> <span id="lesson-time2">${parentInfo[1]}</span></p>
    <p><strong>E-mail: </strong> <span id="teacher-name2">${parentInfo[2]}</span></p>
    <p><input type="text" placeholder="Rate $">`;
}

//----- FILL TEACHER ROSTER IN MAIN LEFT COLUMN IN HOME PAGE----

function fillTeacherRoster() {
    const teacherList = document.getElementById('teacher-student-parent-info');
    document.getElementById('sibling').style.display = 'none'

    for (const teacherId in jomoSchoolTeachers) {
        const teacher = jomoSchoolTeachers[teacherId];
        const newList = document.createElement('button');
        newList.textContent = teacher.firstName;
        newList.classList.add('add-student-button');

        const divWrapper = document.createElement('div');
        divWrapper.appendChild(newList); // Append the button to the div
        teacherList.appendChild(divWrapper); // Append the div to the teacher list

        newList.addEventListener('click', function() {
            getTeacherRoster(teacher.firstName);
            
        });
    }
}



fillTeacherRoster();



    


    //-------------Format phone number during input

    const isNumericInput = (event) => {
        const key = event.keyCode;
        return ((key >= 48 && key <= 57) || // Allow number line
            (key >= 96 && key <= 105) // Allow number pad
        );
    };
    
    const isModifierKey = (event) => {
        const key = event.keyCode;
        return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
            (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
            (key > 36 && key < 41) || // Allow left, up, right, down
            (
                // Allow Ctrl/Command + A,C,V,X,Z
                (event.ctrlKey === true || event.metaKey === true) &&
                (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
            )
    };
    
    const enforceFormat = (event) => {
        // Input must be of a valid number format or a modifier key, and not longer than ten digits
        if(!isNumericInput(event) && !isModifierKey(event)){
            event.preventDefault();
        }
    };
    
    const formatToPhone = (event) => {
        if(isModifierKey(event)) {return;}
    
        const input = event.target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
        const areaCode = input.substring(0,3);
        const middle = input.substring(3,6);
        const last = input.substring(6,10);
    
        if(input.length > 6){event.target.value = `(${areaCode}) ${middle} - ${last}`;}
        else if(input.length > 3){event.target.value = `(${areaCode}) ${middle}`;}
        else if(input.length > 0){event.target.value = `(${areaCode}`;}
    };
    
    const inputElement = document.getElementById('phoneNumber');
    inputElement.addEventListener('keydown',enforceFormat);
    inputElement.addEventListener('keyup',formatToPhone);
    
//-------


//  Email format checker

function isValidEmail(email) {
    // Regular expression pattern for a basic email format validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailRegex.test(email);
}

//-------

//  Function to find end time of lesson

function addMinutesToTime(inputTime, minutesToAdd) {
    // Split the input time into hours, minutes, and period
    const [time, period] = inputTime.split(' ');
    const [hour, minute] = time.split(':');

    // Convert hours and minutes to integers
    const hours = parseInt(hour, 10);
    const minutes = parseInt(minute, 10);

    // Add the specified minutes
    const newMinutes = minutes + minutesToAdd;

    // Calculate the new time
    const newHours = hours + Math.floor(newMinutes / 60);
    const newMinutesRemainder = newMinutes % 60;

    // Handle AM/PM
    let newPeriod = period;
    if (newHours >= 12) {
        newPeriod = period === "AM" ? "PM" : "AM";
        newHours %= 12;
    }

    // Format the result
    const newTime = `${newHours}:${newMinutesRemainder.toString().padStart(2, "0")} ${newPeriod}`;

    return newTime;
}





function removeTextFromTime(timeString) {
    return timeString.replace(/\s*min$/, ''); // Remove "min" from the end of the string
}
//  --------

    function addTeacherButton(){
        const firstName = document.getElementById('Firstnamee').value
        const lastName = document.getElementById('Lastnamee').value
        const email = document.getElementById('Emaill').value
        const password = document.getElementById('Passwordd').value
        const teacherId = firstName.toLowerCase() + lastName
        

        const newTeacher = new Teacher(firstName, teacherId, lastName, email, password)

        jomoSchool.addTeacher(newTeacher)
        

        document.getElementById('pro11').textContent = firstName
        document.getElementById('pro22').textContent = lastName
        document.getElementById('pro33').textContent = email
        document.getElementById('pro44').textContent = password
    }











document.getElementById('home-test').addEventListener('click', showStudentStats)




//---------DISPLAY CHOSEN STUDENTS STATS IN LEFT COLUMN


function showStudentStats(studentName){
  const studentRoster = document.getElementById("teacher-student-parent-info");

  studentRoster.innerHTML = "";



    


   

    let childsParent = {}
    let parentIndex = 0
    let childIndex = 0

  
    
    document.getElementById('left-column-header').textContent = 'Student Info'

    

    jomoSchoolParentArray.forEach((parent, i) => {
        const childrenArray = parent.children
    
        childrenArray.forEach((child, index) => {
            if ( child.name === studentName){
                childsParent = parent
                parentIndex = i
                childIndex = index
            }
        })
    })
    

    studentRoster.innerHTML = `
    <div class="child-info">
    <p><strong>Parent Name: </strong> <span id="student-name2">${childsParent.name}</span></p>
    <p><strong>Phone Number: </strong> <span id="lesson-time2">${childsParent.phoneNumber}</span></p>
    <p><strong>E-mail: </strong> <a href="mailto:${childsParent.eMail}">${childsParent.eMail}</a></p>
    <p><strong>Rate: </strong> <span id="teacher-name2">${childsParent.rate}</span></p>
    </div>
    <button onclick="paymentHistory(${parentIndex})">Payment History</button>`



    childsParent.children.forEach((child, i) => {
        const dayOfClass = daysOfWeek[child.classDay]

        studentRoster.innerHTML +=  `
        <div class="child-info">
            <hr class="default">
            <p><strong>Student Name: </strong> <span id="teacher-name2">${child.name}</span></p>
            <p><strong>Class: </strong> <span id="teacher-name2">${dayOfClass} ${child.lessonTime.Start}</span></p>
            <p><strong>Class Length: </strong> <span id="teacher-name2">${child.lessonLength} min</span></p>
            
            <!-- Add dropdowns and "Go To Month" button -->
            <select class="month-dropdown" id="month-menu">
                <option value="Choose Month">Choose Month</option>
                <!-- Add options for months -->
            </select>
            <select class="year-dropdown" id="year-menu">
                <option value="Choose Year">Choose Year</option>
                <option value="2023">2023</option>
                <!-- Add options for years -->
            </select>
            <button class="go-to-month-button add-student-button" id="student${i}">Go To Month</button>
        </div>`;
    

       
    })


    const monthDropdowns = studentRoster.querySelectorAll('.month-dropdown');
    const yearDropdowns = studentRoster.querySelectorAll('.year-dropdown');
    const goToMonthButtons = studentRoster.querySelectorAll('.go-to-month-button');
    
    // Populate the month dropdowns with options
    selectedMonth.forEach((x) => {
        monthDropdowns.forEach((monthDropdown) => {
            const monthOption = document.createElement('option');
            monthOption.textContent = x;
            monthDropdown.appendChild(monthOption);
        });
    });
    
    goToMonthButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            
            const selectedMonth = monthDropdowns[index].value;
            const selectedYear = yearDropdowns[index].value;
    
            // Check if "Choose Month" or "Choose Year" is selected
            if (selectedMonth === 'Choose Month' || selectedYear === 'Choose Year') {
                alert('Please select both a month and a year.');
            } else {
                const thisChildIndex = button.id.replace("student", "")
                // Load attendance for the selected month
                loadAttendanceForMonth(selectedMonth, selectedYear, thisChildIndex);
            }
        });
    });
    
    // Function to load attendance for the selected month (implement this function)
    function loadAttendanceForMonth(selectedMonth, selectedYear, childIndex) {
        // Implement this function to load attendance data
        // You can use the selectedMonth and selectedYear to fetch attendance
        //const attendanceMonth = chosenMonth.value + chosenYear.value
        const studentDetails = childsParent.children[childIndex]
        const attendanceMonth = selectedMonth + selectedYear
        const fillAttendance = document.getElementById('current-teacher-roster')
        const rightColumn = document.getElementById('parent-payment-history')
        rightColumn.style.display = 'none'
        fillAttendance.style.display = 'block'
        const attendanceDiv = document.createElement('div')
        fillAttendance.innerHTML = ""
        fillAttendance.appendChild(attendanceDiv)
       
        if (!studentDetails.attendance[attendanceMonth]){
            alert('Student was not enrolled this month!')
        } else {

            document.getElementById('right-column-header').textContent = `Attendance of ${selectedMonth}`
            const studentHeader = document.createElement('h4')
            studentHeader.textContent = studentDetails.name
            attendanceDiv.appendChild(studentHeader)

            // Create a table element
            const table = document.createElement('table');
            table.className = 'attendance-table'; // Apply a CSS class to the table for styling

            // Loop through attendance data and create table rows
            for (const attendance in studentDetails.attendance[attendanceMonth]) {
                const classDate = attendance;
                const classPresence = studentDetails.attendance[attendanceMonth][attendance];
                const formattedString = classDate.slice(0, 3) + ' ' + classDate.slice(3, 6) + ' ' + classDate.slice(6, 8) + ' ' + classDate.slice(8);

                // Create a table row
                const row = document.createElement('tr');

                // Create a table cell for the date
                const dateCell = document.createElement('td');
                dateCell.textContent = formattedString;
                row.appendChild(dateCell);

                // Create a table cell for the presence
                const presenceCell = document.createElement('td');
                presenceCell.innerHTML = `<strong>${classPresence}</strong>`;
                row.appendChild(presenceCell);

                // Append the row to the table
                table.appendChild(row);
            }

            // Append the table to the parent div
            attendanceDiv.appendChild(table);
        }
    }
}







leviStudent.attendance.October2023 = {WedOct042023: 'Present', WedOct112023: 'Absent', WedOct182023: 'Present'}









// I'M NOT SURE IF I AM USING THIS FUNCTION -------------------------------
// function studentAttendanceDropdownMenu(studentId){
// //Select the <ul> element by its ID
// const teacherRoster = document.getElementById("dropdown");

// teacherRoster.innerHTML = "";
// const selectTeacher = document.createElement('option')
// selectTeacher.textContent = 'Select Teacher'
// teacherRoster.appendChild(selectTeacher)

// for (const teacher in jomoSchoolTeachers) {
//   const teacherName = jomoSchoolTeachers[teacher].firstName
//   console.log(teacher)

//   // Create a new <li> element
//   const newTeacher = document.createElement("option");
//   newTeacher.textContent = teacherName;

//   // Append the new <li> element to the <ul> element
//   teacherRoster.appendChild(newTeacher);
// }

// const dropdown = document.getElementById("dropdown");
// const selectedTeacher = document.getElementById("left-column-header");

// dropdown.addEventListener("change", function() {
//     getTeacherRoster(dropdown.value);
// });
// }

function teacherPage(){
    window.location.replace("teacher-page.html")
}







const dateObjects = [0, 1, 2, 3, 4, 5, 6];
// const currentDate = new Date(); // You can set the current date to a specific date if needed

// const dateObjects = daysOfTheWeek.map((dayIndex) => {
//   const date = new Date(currentDate); // Create a copy of the current date
//   date.setDate(date.getDate() + dayIndex); // Set the day of the week
//   return date;
// });



//-----------------CREATE TEACHER SCHEDULE TABLE

function createTeacherSchedule(myStudents, dates) {
    const mainTable = document.createElement("table");
    // mainTable.id = 'schedule-table'
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
  
    const daysInSchedule = Array.from(new Set(dateObjects))
    
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
        const cell = document.createElement('td');
        const emptyCell = document.createElement('td')
        cell.textContent = studentName
        const rows = tbody.getElementsByTagName('tr');
  
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].querySelector('td').textContent === studentTime) {
            rows[i].appendChild(cell);
           
          } 
         
        }
    }
  
    // Add the table header and body to the table
    mainTable.appendChild(thead);
    mainTable.appendChild(tbody);
  
    
    
  
  
    // Optionally, you can add more styling or attributes to the table as needed.
    return mainTable;
  }


  //-------------APPEND SCHEDULE TO PAGE




//   const scheduleTable = createTeacherSchedule(myStudents, dateObjects)
//   const scheduleContainer = document.getElementById('schedule-table')

//   scheduleContainer.appendChild(scheduleTable)

 
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

 

let currentSchedule = []

function fillSchedule(){

    const buttonContainer = document.getElementById("get-teacher-schedule")

    while (buttonContainer.firstChild) {
        buttonContainer.removeChild(buttonContainer.firstChild);
      }
      
    jomoSchoolTeacherArray.forEach((x) => {
            const studentGroup = x.students

            for(const studentId in studentGroup){
              
                const lessonDay = studentGroup[studentId].classDay
                const lessonStart = studentGroup[studentId].lessonTime.Start
                const lessonEnd = studentGroup[studentId].lessonTime.End
                const studentName = studentGroup[studentId].name
                const lessonLength = studentGroup[studentId].lessonLength

                const startFormat = convertTimeFormat(lessonStart)

                const startId = getDayId(lessonDay, startFormat)

               

                document.getElementById(startId).innerHTML += `<strong>${studentName}:</strong> ${x.firstName}<br>`
                document.getElementById(startId).style.border = '2px solid black'

                if (lessonLength === 60){
                    document.getElementById(startId).rowSpan = 2
                } else if (lessonLength === 90){
                    document.getElementById(startId).rowSpan = 3
                } else if (lessonLength === 120){
                    document.getElementById(startId).rowSpan = 4
                } 

                currentSchedule.push(startId)

            }


            const teacherButton = document.createElement('button')

            teacherButton.textContent = x.firstName
            teacherButton.classList.add('schedule-buttons')
            buttonContainer.appendChild(teacherButton)
            teacherButton.addEventListener('click', function() {
                getTeacherSchedule(x.firstName)
            })
    })

            const fullScheduleButton = document.createElement('button')
            fullScheduleButton.textContent = 'Full Schedule'
            fullScheduleButton.classList.add('add-new-student')
            buttonContainer.appendChild(fullScheduleButton)
            fullScheduleButton.addEventListener('click', function() {
                currentSchedule.forEach((x) => {
                  document.getElementById(x).innerHTML = '';
                  document.getElementById(x).style.border = '';
                  document.getElementById(x).rowSpan = 1;
                });
                currentSchedule = [];
                fillSchedule(); // Call the function by adding parentheses
              });  
}



function getTeacherSchedule(teacherName) {
    currentSchedule.forEach((x) => {
        document.getElementById(x).innerHTML = ''
        document.getElementById(x).style.border = ''
        document.getElementById(x).rowSpan = 1
    })

    currentSchedule = []

    jomoSchoolTeacherArray.forEach((x) => {
        if(x.firstName === teacherName){

            const studentGroup = x.students

            for(const studentId in studentGroup){
               
                const lessonDay = studentGroup[studentId].classDay
                const lessonStart = studentGroup[studentId].lessonTime.Start
                const lessonEnd = studentGroup[studentId].lessonTime.End
                const studentName = studentGroup[studentId].name
                const lessonLength = studentGroup[studentId].lessonLength

                const startFormat = convertTimeFormat(lessonStart)

                const startId = getDayId(lessonDay, startFormat)

                

                document.getElementById(startId).innerHTML += `<strong>${studentName}:</strong> ${x.firstName}<br>`
                document.getElementById(startId).style.border = '2px solid black'

                if (lessonLength === 60){
                    document.getElementById(startId).rowSpan = 2
                } else if (lessonLength === 90){
                    document.getElementById(startId).rowSpan = 3
                } else if (lessonLength === 120){
                    document.getElementById(startId).rowSpan = 4
                } 

                
                currentSchedule.push(startId)

            }

        }
    })
}




// function clearSchedule() {
//     // Select the elements you want to clear by their IDs
//     const elementsToClear = document.querySelectorAll('.time-slot'); // Replace with the appropriate class name
  
//     // Loop through the selected elements and set their innerHTML to an empty string
//     elementsToClear.forEach((element) => {
//       element.innerHTML = '';
//     });
//   }
  
  // Usage example:
  // Call this function when you want to clear the schedule
 
  



fillSchedule()


function convertTimeFormat(timeString) {
    // Split the input string at the space character to separate the time and AM/PM
    const parts = timeString.split(' ');
  
    // If the input string doesn't have two parts, return it as is
    if (parts.length !== 2) {
      return timeString;
    }
  
    // Extract the time part (e.g., '10:00')
    const timePart = parts[0];
  
    return timePart;
  }


function getDayId(lessonDay, lessonTime){
    const weekDay = ['sun','mon','tue','wed','thur','fri','sat']

    const dayId = weekDay[lessonDay] + lessonTime
    
    return dayId
}



  
function paymentHistory(parentIndex){
    document.getElementById('current-teacher-roster').style.display = 'none'
    document.getElementById('parent-payment-history').style.display = 'block'
   
    const parentName = jomoSchoolParentArray[parentIndex].name
    document.getElementById('right-column-header').textContent = parentName

}






function findParent() {
    const inputParent = document.getElementById('parent-search').value;
    let found = false; // Variable to track if a parent is found

    jomoSchoolParentArray.forEach((parent, i) => {
        if (parent.name === inputParent || parent.name.toLowerCase() === inputParent) {
            found = true;
            document.getElementById('main-right-column').style.display = 'none';
            paymentHistory(i);

            // Assuming you want to show stats for the first child of the found parent
            const childName = parent.children[0].name;
            showStudentStats(childName);
        }
    });

    if (!found) {
        alert('Parent Name Not In Database');
    }
}




function showAddStudentPage(){
    document.getElementById('main-right-column').style.display = 'none'
    document.getElementById('new-student-entry').style.display = 'flex'
    document.getElementById('right-column-header').textContent = 'Add Student'
}



function confirmPayment() {
    const payMonth = document.getElementById('payment-month').value;
    const payYear = document.getElementById('payment-year').value;
    const monthYearId = payMonth
    const paymentContainer = document.getElementById('payment-confirmation');


    if (document.getElementById(monthYearId)){
        return
    } else {
    // Create a new <p> element and add a "p-list" class to it
    const newP = document.createElement('p');
    newP.id = monthYearId
    // const presentString = `${monthYearId}: Paid`
    newP.textContent = `${monthYearId}: Paid`
    newP.classList.add('p-list');

    // Append the new <p> element to the payment container
    paymentContainer.insertBefore(newP, paymentContainer.firstChild);

    // Add a click event listener to the new <p> element
    newP.addEventListener('click', function () {
        // Show the popup when the <p> element is clicked
        document.getElementById('popup').classList.remove('hidden');

        // Add event listener to the "Delete" button in the popup
        document.getElementById('deleteItem').addEventListener('click', function () {
            // Remove the <p> element when "Delete" is clicked
            newP.remove();
            // Hide the popup
            document.getElementById('popup').classList.add('hidden');
        });

        // Add event listener to the "Close" button in the popup
        document.getElementById('closeItem').addEventListener('click', function () {
            // Hide the popup when "Close" is clicked
            document.getElementById('popup').classList.add('hidden');
        });
    });
  }
}


function getCurrentMonthAndYear() {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();

    const monthPresent = `${currentMonth} ${currentYear}`

    return monthPresent
}



// NEXT STEPS

//  ORGANIZE CSS STUDENT ATTENDANCE COLUMN INFO DISPLAY
//  FINALIZE PARENT/STUDENT/TEACHER DATA
//  LOG INFO TO LOCAL STORAGE
//  










