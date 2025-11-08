//join()
let Total_user=30;
let homy=document.querySelector('#homy');
let homy_html=homy.innerHTML;
let nav=document.querySelector('#change-nav');
let nav_book=document.querySelector('#nav-book');
let odd=nav.innerHTML;
let stop=1;
let current_user = 0;
let New_customerID;
let New_customerName;
let New_bookingType;
               
function RestartWindow(){
    console.log("Rest")
    location.reload();
    
   } 
let bookHTML = `<div class="customer-name" id="name">Sohan Dubey</div>
             <div class="loc2"><i class="fa-solid fa-location-dot"></i>
                <div id="add">Gandhi nagar aireport
                 road bhopal madhya pradesh 462036</div></div>
                 <div class="type" id="bookingType">Car</div>
             <div class="done"><button class="dony"onclick="Accept()" id="dony" >Accept</button></div> `;
let c_name1 = document.getElementById('c_name1');
let bookingTime1 = document.getElementById('bookingTime1');
let u_id1= document.getElementById('u_id1');
let c_bookingType1=document.getElementById('c_bookingType1');
let homyHTML = document.getElementById('homy').innerHTML;

let current_washing3=`<div class="customer-name" id="c_name3">mohit Rai</div>
                <div class="type" id="c_bookingType3">Car</div>
                <div class="model" id="u_id3">u id</div>
                 <div class="date" id="bookingTime3">01-01-2025 8:40 PM</div>
                <div class="done"><button class="dony"  id="dony3">Done</button></div> `;


        function Done(id,mobile_no,servicer,otp){
                document.getElementById('homy').innerHTML=`               
                <div class='tx1'>If vahicle is cleaned</div>
                <div class='tx2'>Enter OTP that is sent in ${id} </div>
                <div class='tx3'>+91 ${mobile_no}</div>
                <form action='/Complet' method='POST' >
                <div class="otp-container">
                <input type="text" placeholder='' maxlength='1' min='0' max='9' class='num1' id='otp1' name='otp1' required>                
                <input type="text" placeholder='' maxlength='1' min='0' max='9' class='num1' id='otp2' name='otp2' required>
                <input type="text" placeholder='' maxlength='1' min='0' max='9' class='num1' id='otp3' name='otp3' required>
                <input type="text" placeholder='' maxlength='1' min='0' max='9' class='num1' id='otp4' name='otp4' required>
                <input type="text" placeholder='' maxlength='1' min='0' max='9' class='num1' id='otp5' name='otp5' required>
                <input type="text" placeholder='' maxlength='1' min='0' max='9' class='num1' id='otp6' name='otp6' required>
                <input type='hidden' name='username' value='${id}'>
                <input type='hidden' name='servicer' value='${servicer}'>
                </div>
                <div class='confirm'><button class='con2'
                 onclick="OTPcnf('${otp}','${id}','${servicer}')" type='submit'>Submit</button></div>
                </form>
                `;
                
            }
            function OTPcnf(otp,id,servicer){
                let input_otp =[document.getElementById('otp1').value,document.getElementById('otp2').value,
                    document.getElementById('otp3').value,document.getElementById('otp4').value,
                    document.getElementById('otp5').value,document.getElementById('otp6').value];
                if(input_otp.join('')==otp)  {  

                document.getElementById('homy').innerHTML=`
                     <div>
                     <div class='tx6'>Your car wash succefully completed</div>
                    <div class='tx2'> Customer id:${id}</div>
                     <div class='confirm'><button class='con2' onclick="home()">Ok</button></div>
                     </div>`;
                     fetch(`Complet?username=${id}&servicer=${servicer}`,{method:'GET'}).catch(error=>{
                        console.error("Error:",error);
                     })
                
                }
                else{
                    document.getElementById('homy').innerHTML=`
                     <div>
                     <div class='tx5'>Wrong OTP</div>
                     <div class='confirm'><button class='con2' onclick="home()">Back</button></div>
                     </div>`;
                }
                
            }
            
            async function washing_status() {
                let response = await fetch(`http://localhost:2121/current_washings?username=${username}`)
        let content = await response.json();
             if(content){
                if(content[0].washing_status=='cancled'){
                   document.getElementById('cancled1').innerHTML=`<div class="cancled">Cancled</div>`;
                }
                if(content[1].washing_status=='cancled'){
                    document.getElementById('cancled2').innerHTML=`<div class="cancled">Cancled</div>`;
                 }
                 if(content[2].washing_status=='cancled'){
                    document.getElementById('cancled3').innerHTML=`<div class="cancled">Cancled</div>`;
                 }
             }
                
            }
async function current_washings(){
         let response = await fetch(`http://localhost:2121/current_washings?username=${username}`)
        let content = await response.json();    
     if(content!=0){
            if(content[0]){
                
                document.getElementById('car1').innerHTML=`<div class="customer-name" id="c_name1">${content[0].name}</div>
                <div class="type" id="c_bookingType1">${content[0].bookingType}</div>
                <div class="model" id="u_id1">${content[0].id}</div>
                 <div class="date" id="bookingTime1">${content[0].timing}</div>
                <div class="done" id='cancled1'><button class="dony" onclick="Done('${content[0].id}','${content[0].mobile_no}',
                '${username}','${content[0].otp}')" id="dony1">Done</button></div> `;

                     if(content[0].washing_status=='cancled'){
                        document.getElementById('car1').innerHTML=`<div class="customer-name" id="c_name1">${content[0].name}</div>
                        <div class="type" id="c_bookingType1">${content[0].bookingType}</div>
                        <div class="model" id="u_id1">${content[0].id}</div>
                         <div class="date" id="bookingTime1">${content[0].timing}</div>
                        <div class="cancled">Cancled</div> `;
                     }
                     if(content[0].washing_status=='completed'){
                        document.getElementById('car1').innerHTML=`<div class="customer-name" id="c_name1">${content[0].name}</div>
                        <div class="type" id="c_bookingType1">${content[0].bookingType}</div>
                        <div class="model" id="u_id1">${content[0].id}</div>
                         <div class="date" id="bookingTime1">${content[0].timing}</div>
                        <div class="completed">Completed ✔</div> `;
                     }
                                                                
                        }
     if(content[1]){
        document.getElementById('car2').innerHTML=`<div class="customer-name" id="c_name2">${content[1].name}</div>
            <div class="type" id="c_bookingType2">${content[1].bookingType}</div>
            <div class="model" id="u_id2">${content[1].id}</div>
             <div class="date" id="bookingTime2">${content[1].timing}</div>
            <div class="done" id='cancled2'><button class="dony" onclick="Done('${content[1].id}','${content[1].mobile_no}',
            '${username}','${content[1].otp}')" id="dony2">Done</button></div> `;
        if(content[1].washing_status=='cancled'){
            document.getElementById('car2').innerHTML=`<div class="customer-name" id="c_name2">${content[1].name}</div>
            <div class="type" id="c_bookingType2">${content[1].bookingType}</div>
            <div class="model" id="u_id2">${content[1].id}</div>
             <div class="date" id="bookingTime2">${content[1].timing}</div>
            <div class="cancled">Cancled</div> `;
         }
         if(content[1].washing_status=='completed'){
            document.getElementById('car2').innerHTML=`<div class="customer-name" id="c_name2">${content[1].name}</div>
            <div class="type" id="c_bookingType2">${content[1].bookingType}</div>
            <div class="model" id="u_id2">${content[1].id}</div>
             <div class="date" id="bookingTime2">${content[1].timing}</div>
            <div class="completed">Completed ✔</div> `;
         }                       
                     }
       if(content[2]){
        document.getElementById('car3').innerHTML=`<div class="customer-name" id="c_name3">${content[2].name}</div>
            <div class="type" id="c_bookingType3">${content[2].bookingType}</div>
            <div class="model" id="u_id3">${content[2].id}</div>
             <div class="date" id="bookingTime3">${content[2].timing}</div>
            <div class="done" id='cancled3'><button class="dony" onclick="Done('${content[2].id}','${content[2].mobile_no}',
            '${username}','${content[2].otp}')" id="dony3">Done</button></div> `;
        if(content[2].washing_status=='cancled'){
            document.getElementById('car3').innerHTML=`<div class="customer-name" id="c_name3">${content[2].name}</div>
            <div class="type" id="c_bookingType3">${content[2].bookingType}</div>
            <div class="model" id="u_id3">${content[2].id}</div>
             <div class="date" id="bookingTime3">${content[2].timing}</div>
            <div class="cancled">Cancled</div> `;
         }
        if(content[2].washing_status=='completed'){
            document.getElementById('car3').innerHTML=`<div class="customer-name" id="c_name3">${content[2].name}</div>
            <div class="type" id="c_bookingType3">${content[2].bookingType}</div>
            <div class="model" id="u_id3">${content[2].id}</div>
             <div class="date" id="bookingTime3">${content[2].timing}</div>
            <div class="completed">Completed ✔</div> `;
         }                
                     }            
                           
                 }
                 
                }                              

  async function Accept(){  
    document.getElementById('cars').innerHTML='';
    let now = new Date();
    let Timing;
    Timing=now.toLocaleString();
    console.log(Timing)
    let  response  = await fetch(`http://localhost:2121/fetchData?username=${username}`);
    let booking_username = await response.json();
    if(booking_username!=0){
    fetch(`Accept?normal_username=${New_customerID}&servicer=${username}&Time=${Timing}`,{method:"GET"}).catch(error=>{
        console.log("ERROR:",error);
    })

    document.getElementById('c_name1').innerHTML=New_customerName;
    document.getElementById('c_bookingType1').innerHTML=New_bookingType;
    document.getElementById('u_id1').innerHTML=New_customerID;
    document.getElementById('bookingTime1').innerHTML=Timing;
    setTimeout(RestartWindow,1000);
   interval=setInterval(fetchData,2000);
}  else{
    alert("Booking denied..!!");
    setTimeout(RestartWindow,1000);
}
   
}

async function Bookings(){
    homy.innerHTML=odd;
    
    document.getElementById('nav-book').style.backgroundColor='#3BE477';
    document.getElementById('home').style.backgroundColor='#121212';
    document.getElementById('history').style.backgroundColor='#121212';
    document.getElementById('prices').style.backgroundColor='#121212';
    let response = await fetch(`/Bookings?username=${username}`)
    let content = await response.json();
    
    let data=`<div class="car" id="car5">
        
            </div>`;
        if(content!=0){
            for(let i=0; i<7; i++){
                if(content[i]){
                     data=`<div class="car" id="car${i}">
        
            </div>`;
                homy.innerHTML=homy.innerHTML+data;
                document.getElementById(`car${i}`).innerHTML=`<div class="customer-name" id="c_name3">${content[i].name}</div>
            <div class="type" id="c_bookingType3">${content[i].bookingType}</div>
            <div class="model" id="u_id3">${content[i].id}</div>
             <div class="date" id="bookingTime3">${content[i].timing}</div>
            <div class="done" id='cancled3'><button class="dony" onclick="Done('${content[i].id}','${content[i].mobile_no}',
            '${username}','${content[i].otp}')" id="dony3">Done</button></div> `;
                }
            
            }
        }              
}
async function history(){ //as completed
    homy.innerHTML=odd;
    document.getElementById('history').style.backgroundColor='#3BE477';
    document.getElementById('home').style.backgroundColor='#121212';
    document.getElementById('nav-book').style.backgroundColor='#121212';
    document.getElementById('prices').style.backgroundColor='#121212';
   
}
function home(){
    RestartWindow();
    homy.innerHTML=homy_html;
    document.getElementById('home').style.backgroundColor='#3BE477';
    document.getElementById('nav-book').style.backgroundColor='#121212';
    document.getElementById('history').style.backgroundColor='#121212';
    document.getElementById('prices').style.backgroundColor='#121212';
   if(current_user>0){
    console.log('hello')
    document.getElementById('c_name1').innerHTML=New_customerName;
    document.getElementById('u_id1').innerHTML=New_customerID;
    c_bookingType1.innerHTML=New_bookingType;
   }
   current_washings();
}
function prices(){ // as Cancled
    homy.innerHTML=odd;
    document.getElementById('prices').style.backgroundColor='#3BE477';
    document.getElementById('home').style.backgroundColor='#121212';
    document.getElementById('history').style.backgroundColor='#121212';
    document.getElementById('nav-book').style.backgroundColor='#121212';
}

async function fetchData() {
   let  response  = await fetch(`http://localhost:2121/fetchData?username=${username}`);
    let booking_username = await response.json();
    if(booking_username!=0){
        New_customerID=booking_username.username;
        New_customerName=booking_username.name;
        New_bookingType=booking_username.bookingType;
        document.getElementById('cars').innerHTML=bookHTML;
        document.getElementById('name').innerHTML=booking_username.name;
        document.getElementById('add').innerHTML=booking_username.area+" "+
        booking_username.city+" "+booking_username.state+" "+booking_username.pincode;
        document.getElementById('bookingType').innerHTML=booking_username.bookingType;
          clearInterval(interval);
        setTimeout(continueBook,4000)
}
}
setInterval(washing_status,2000)
function continueBook(){
    interval=setInterval(fetchData,2000);
}
current_washings();
let interval = setInterval(fetchData,2000);
