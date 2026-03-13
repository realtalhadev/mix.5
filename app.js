const draggable_list = document.getElementById("draggable-list"); 
const check = document.getElementById("check");

const richestPeople =[
  "Elon Musk",
  "Larry Page",
  "Sergey Brin",
  "Jeff Bezos",
  "Mark Zuckerberg",
  "Larry Ellison",
  "Jensen Huang",
  "Bernard Arnault",
  "Rob Walton",
  "Warren Buffett"
];

const listItems=[];
let dragStartIndex;

createList();   // create function best practice always create in begining
                                //.map is creating the array into object so we get a value=key
function createList(){        // ... is spread function // when we take single argument so ()are needed
    [...richestPeople]    //when we want to show something in html doc so we use DOM
    .map(a=>({ value:a, sort: Math.random()}))  // generates random order  
    .sort((a,b)=>a.sort -b.sort)     // to keep the random no on backend we use sort
    .map((a) => a.value)   // this .map gives value of object i.e is name
    .forEach((person,index)=>{   //arrow function & in the braces we can use any parameter but here we use person,index
  //console.log(person);

    const listItem = document.createElement("li"); //is gonna use for individual li item later we will use another var list-items in which we push it
    // listItem.classList.add("over")
    
    listItem.setAttribute("data-index", index);
    listItem.innerHTML=`
    <span class="number">${index+1}</span>
    <div class="draggable" draggable="true">  
    <p class="person-name">${person}</p>
    <i class="fa-solid fa-grip-lines"></i>       
    </div>`
    ;
    listItems.push(listItem);                         //will push list item in listitems array
    draggable_list.appendChild(listItem);    
    });    
  
    addEventListener();          // will create function call 1st inside the function so it will be directed  and then we will make it outside                                    
} 

function dragStart(){
  // console.log("Event","dragstart");
 dragStartIndex= +this.closest("li").getAttribute("data-index")
//  console.log(typeof(dragStartIndex));  // will tell me the typeof()
}
function dragEnter(){
  // console.log("Event","dragenter"); /// now when i want to add athe background color when i move a name from its area 
  this.classList.add('over')    // this back ground color is bcz of css class over so you can check in style.css
}
function dragOver(e){
  // console.log("Event","dragover");
  e.preventDefault();    // it prevents default properties on refresh
  
}
function dragLeave() {
  // console.log("Event","dragleave");
  this.classList.remove('over')    ///// here i will remove the background color when the moved name is placed 
}

// function dragDrop(){
//   // console.log("Event","dragdrop");
// const dragEndIndex = +this.getAttribute("data-index");
// swapItems(dragStartIndex, dragEndIndex);
// this.classList.remove("over");  // here it is use so thta the over class also gets remove eg the bg color
// }

// function swapItems(fromIndex, toIndex){
//   // console.log(123);
//  const itemOne =listItems[fromIndex].querySelector(".draggable");
//  const itemTwo = listItems[toIndex].querySelector(".draggable");
// //  console.log(itemOne, itemTwo);
// listItems[fromIndex].appendChild(itemTwo);
// listItems[toIndex].appendChild(itemOne);
// }

function dragDrop(){

 const dragEndIndex = +this.getAttribute("data-index");

 const draggedItem = listItems[dragStartIndex];
 const droppedItem = listItems[dragEndIndex];

 if(dragStartIndex < dragEndIndex){
   draggable_list.insertBefore(draggedItem, droppedItem.nextSibling);
 } else {
   draggable_list.insertBefore(draggedItem, droppedItem);
 }

 this.classList.remove("over");

}

function checkOrder(){
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if(personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    }else{
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListener(){
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems= document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable)=>{
    draggable.addEventListener("dragstart",dragStart);

  });
    dragListItems.forEach((item)=>{
    item.addEventListener('dragover',dragOver);
    item.addEventListener('drop',dragDrop);
    item.addEventListener('dragenter',dragEnter);
    item.addEventListener("dragleave",dragLeave);

  });
}
check.addEventListener("click",checkOrder);