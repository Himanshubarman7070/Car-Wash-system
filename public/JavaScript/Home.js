let order2 = document.querySelector('#order2');
let orginal_order2=document.querySelector('#order2');
let book = document.querySelector("#book");
let homy=document.querySelector('#homy');
let odd=order2.innerHTML;
let newdiv= document.createElement('button');
let userName=username;
let servicer;
let bookingType='car';

function RestartWindow(){
   location.reload();
  
  } 

function bookingTypeCar(){
  bookingType='car';
  document.getElementById('Car').style.backgroundColor='#3BE477';
  document.getElementById('Scooty').style.backgroundColor='#121212';
  document.getElementById('Motorcycle').style.backgroundColor='#121212';
}
function bookingTypeScooty(){
  bookingType='scooty';
  document.getElementById('Scooty').style.backgroundColor='#3BE477';
  document.getElementById('Car').style.backgroundColor='#121212';
  document.getElementById('Motorcycle').style.backgroundColor='#121212';
}
function bookingTypeMotorcycle(){
  bookingType='motorcycle';
  document.getElementById('Motorcycle').style.backgroundColor='#3BE477';
  document.getElementById('Car').style.backgroundColor='#121212';
  document.getElementById('Scooty').style.backgroundColor='#121212';
  
}
function booking(){ 
  clearInterval(interval)
  order2.innerHTML='<h1 id="od2"> Searching for car washing </h1>';
  change=0;
  newdiv.innerHTML='Cancle';
  newdiv.style.backgroundColor='#3BE477';
  newdiv.style.height='60px';
  newdiv.style.paddingTop='14px';
  newdiv.style.paddingBottom='14px';
  newdiv.style.paddingLeft='45px';
  newdiv.style.paddingRight='45px';
  newdiv.style.color='white';
  newdiv.style.width='190px';
  newdiv.style.fontSize='30px';
     
   
   document.querySelector('#dyna').appendChild(newdiv);
     let od2= document.querySelector('#od2');
     let count=1;
     let old_text=od2.innerText;
     clearInterval(interval)
     setInterval(()=>{
        if(count<4){
       od2.innerText=od2.innerText+' .';
       count=count+1;
        }
        else{
            od2.innerText=old_text;
            count=1;
        }
     },400);
     fetch(`/bookingReq?UserName=${userName}&bookingType=${bookingType}`,{method:'GET'}).catch(error =>
      console.error('Error:',error));
      interval=setInterval(BookingCNF,300)   
     newdiv.onclick=Cancle;
     
     }
     function Cancle(){
      order2.innerHTML=odd;
      fetch(`/cancleReq?UserName=${userName}`,{method:'GET'}).catch(error=>
        console.error('Error:',error));
      newdiv.remove();
      RestartWindow();
     }
     window.onunload = function () {
      fetch(`/refresh?username=${username}`,{method:'GET'}).catch(error=>{
        console.error("Error:",error);
      })
     }
   
     function cancle_booking(){
      let cancle = confirm("You want to cancle your booking")
      if(cancle){
         fetch(`/CancleBooking?username=${username}&servicer=${servicer}`,{method:"GET"}).catch(error=>{
          console.log("Error:",error);       
         })
         alert("Your booking successfully cancled")
         order2.innerHTML=`<div class="your-loc">
              <pre class="ff"><i class="fa-solid fa-location-dot"></i> Location</pre></div>
                <div ><button class="book" id="book" onclick="booking()">Book</button></div>`;
         document.getElementById('navy2').innerHTML=`No any vehicle order to wash`;
         RestartWindow();
      }
      
     }
     function NoVehicle(){
      document.getElementById('navy2').innerHTML=`No any vehicle order to wash`; 
     }
    async function BookingCNF(){
      let response  = await fetch(`http://localhost:2121/BookingCNF?username=${username}`);
      let CNF = await response.json();
      
      if(CNF.washing_status=='washing'){
        newdiv.remove()
        servicer=CNF.shop_id;
        document.getElementById('order2').innerHTML=`<div class="cnf"><div>Your Booking is confirmed by</div>
                                                      <div class="cnf2"> ${CNF.shop_name}</div>
                                                      <div class="cnf2"> shop_id:${CNF.shop_id}</div>
                                                      <div class="cnf2> OTP ${CNF.OTP}</div>
                                                      <div class="cnf-md"> 
                                                     <div class="cnf5" onclick="cancle_booking()"> Cancle Booking </div></div>
                                                      </div>`;
        document.getElementById('navy2').innerHTML=`<div class="navy2">Your Booking</div> 
        <div id="opt">OTP : ${CNF.OTP}</div>
        <div class="cnf6">+91 ${CNF.shop_mobile_no}</div>`
      clearInterval(interval);
      setTimeout(starting,4000)
      }
      if(CNF=="completed"){
        clearInterval(interval); 
        fetch(`DoneBooking?username=${username}`,{method:"GET"}).catch(error=>{
          console.log("Error:",error);
        })
        alert("Your Booking succefully completed..!! ");
        document.getElementById('navy2').innerHTML=`<div style='color:#3BE477;
                                 font-family:'arial',sans-sarif;font-weight:bolder;'>Washing Completed ✔</div>
                                  <div class='dn1'><button class='dn' onclick="NoVehicle()">Done</button>`;

         order2.innerHTML=`<div style='color:#3BE477;font-size:27px;text-align:centre;
                                 font-family:'arial',sans-sarif;font-weight:bolder;'>Your Washing Completed ✔</div>
                                  <div class='dn1'><button class='DN' onclick="RestartWindow()">Done</button>`;
                                               
     }
    }
    function starting(){
      setInterval(BookingCNF,2000);
    }
     let interval  = setInterval(BookingCNF,2000);
     let interval2 = setInterval(RestartWindow,180000)
     
     
 


  

   
  




  

