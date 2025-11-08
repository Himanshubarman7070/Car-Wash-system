const ex = require('express');
const app = ex();
const path = require('path');
const DB = require('oracledb');
const cors = require('cors');
const port= 2121;
let Total_user=20;

app.use(ex.static(path.join(__dirname,'public')));
app.use(ex.json());
app.use(ex.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(cors());
//Oracle Database connection
const connection = {
    username:'system',
    password:'system',
    connectString:'localhost/XEXDB'
};
const db = DB.getConnection(connection);

//let us start code 
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'Login.html'));
});

app.post('/Login',async (req,res)=>{
    let username= req.body.username;
    let password= req.body.password;
    
    let sql_username= await (await db).execute('SELECT username from car_wash');
    let sql_passwrd = await (await db).execute('SElect password from car_wash');
    let uid;
    let shop_name,name;
    let obj;
    let valid=0;
            let  sql_userType = await (await db).execute(`select user_type from car_wash
                where username=:username`,{username});
               uid=sql_userType.rows[0]; 

         
        for(let i=0; i<Total_user; i++){
        
        if(sql_username.rows[i]==username){
                let sql_pass = await (await db).execute(`select password from car_wash where
                    username=:username`,{username});
             if(sql_pass.rows[0]==password) {      
            if(uid=='normal'){
                let sql_name = await (await db).execute(`select name from car_wash where
                    username=:username`,{username});
                    name=sql_name.rows[0].join(',');
                    let sql_area = await (await db).execute(`select area from location where username=:username`,
                        {username});
                    let sql_city = await (await db).execute(`select city from location where username=:username`,
                        {username});
                    let sql_state = await (await db).execute(`select state from location where username=:username`,
                        {username}); 
                    let sql_pincode = await (await db).execute(`select pincode from location where username=:username`,
                        {username});
                    let sql_mobile = await (await db).execute(`select mobile_no from car_wash where username=:username`,
                            {username});  
                    obj = {
                        area:sql_area.rows[0].join(','),
                        city:sql_city.rows[0].join(','),
                        state:sql_state.rows[0].join(','),
                        pincode:sql_pincode.rows[0].join(','),
                        mobile:sql_mobile.rows[0].join(',')
                    };        
            res.render('Home',{username,name,obj})
            valid=1;
            }
            else{
                let sql_shop_name = await (await db).execute(`select shop_name from car_wash where
                    username=:username`,{username});
                    let sql_name = await (await db).execute(`select name from car_wash where
                        username=:username`,{username});
                        name=sql_name.rows[0].join(',');
                        shop_name=sql_shop_name.rows[0].join(',');
                        let sql_area = await (await db).execute(`select area from location where username=:username`,
                            {username});
                        let sql_city = await (await db).execute(`select city from location where username=:username`,
                            {username});
                        let sql_state = await (await db).execute(`select state from location where username=:username`,
                            {username}); 
                        let sql_pincode = await (await db).execute(`select pincode from location where username=:username`,
                            {username});
                        let sql_mobile = await (await db).execute(`select mobile_no from car_wash where username=:username`,
                                {username});  
                        obj = {
                            area:sql_area.rows[0].join(','),
                            city:sql_city.rows[0].join(','),
                            state:sql_state.rows[0].join(','),
                            pincode:sql_pincode.rows[0].join(','),
                            mobile:sql_mobile.rows[0].join(',')
                        };
                res.render('Washer',{username,name,shop_name,obj});
                valid=1;
            }
        }
        }
    }
    if(valid==0){
        res.render('Wrong');
    }   
})

app.get('/CreateAccount',(req,res)=>{
    res.render(path.join('CreateAccount'));
})

app.post('/submit',async(req,res)=>{
    let name=req.body.Name; 
    let mobile_no=req.body.mobile_no;
    let user_type=req.body.shop;//shop as user_type
    let shop_name=req.body.shop_name;
    let state=req.body.state;
    let city=req.body.city;
    let area=req.body.area;
    let building_name=req.body.building_name;
    let house_no=req.body.house_no;
    let pincode=req.body.pincode;
    let age=req.body.age;
    let password=req.body.password;
    Total_user=Math.floor(Math.random()*1000);
    let identity=Total_user;
    let username = name.split(" ")[0]+`${identity}`;
    
    let sql_carWash = await (await db).execute(`insert into car_wash 
        (username,password,user_type,name,age,mobile_no,shop_name)
         values (:username,:password,:user_type,:name,:age,:mobile_no
         ,:shop_name)`,{username,password,user_type,name,age,mobile_no,shop_name},{autoCommit:true});
    let sql_location = await (await db).execute(`insert into location 
        (username,state,city,area,building_name,house_no,pincode)
        values (:username,:state,:city,:area,:building_name,:house_no,:pincode)`,
    {username,state,city,area,building_name,house_no,pincode},{autoCommit:true});
    if(user_type=='normal'){
    let sql_normal_user  = await (await db).execute(`insert into normal_username (username,
        washing_status,OTP) values (:username,'not',345423)`,{username},{autoCommit:true}); 
    }
    if(user_type=='normal'){
        let sql_name = await (await db).execute(`select name from car_wash where
            username=:username`,{username});
           let name=sql_name.rows[0].join(',');
            let sql_area = await (await db).execute(`select area from location where username=:username`,
                {username});
            let sql_city = await (await db).execute(`select city from location where username=:username`,
                {username});
            let sql_state = await (await db).execute(`select state from location where username=:username`,
                {username}); 
            let sql_pincode = await (await db).execute(`select pincode from location where username=:username`,
                {username});
            let sql_mobile = await (await db).execute(`select mobile_no from car_wash where username=:username`,
                    {username});  
            obj = {
                area:sql_area.rows[0].join(','),
                city:sql_city.rows[0].join(','),
                state:sql_state.rows[0].join(','),
                pincode:sql_pincode.rows[0].join(','),
                mobile:sql_mobile.rows[0].join(',')
            };        
    res.render('Home',{username,name,obj})
    }
    else{
        let sql_shop_name = await (await db).execute(`select shop_name from car_wash where
            username=:username`,{username});
            let sql_name = await (await db).execute(`select name from car_wash where
                username=:username`,{username});
            let    name=sql_name.rows[0].join(',');
            let    shop_name=sql_shop_name.rows[0].join(',');
                let sql_area = await (await db).execute(`select area from location where username=:username`,
                    {username});
                let sql_city = await (await db).execute(`select city from location where username=:username`,
                    {username});
                let sql_state = await (await db).execute(`select state from location where username=:username`,
                    {username}); 
                let sql_pincode = await (await db).execute(`select pincode from location where username=:username`,
                    {username});
                let sql_mobile = await (await db).execute(`select mobile_no from car_wash where username=:username`,
                        {username});  
                obj = {
                    area:sql_area.rows[0].join(','),
                    city:sql_city.rows[0].join(','),
                    state:sql_state.rows[0].join(','),
                    pincode:sql_pincode.rows[0].join(','),
                    mobile:sql_mobile.rows[0].join(',')
                };
        res.render('Washer',{username,name,shop_name,obj}); 
    }
    
})
app.get('/Accept',async(req,res)=>{
    let normalUsername=req.query.normal_username;
    let Timing = req.query.Time;
    let servicer=req.query.servicer;
    let sql  = await (await db).execute(`update car_wash set booking_req='no' where username
        =:normalUsername`,{normalUsername},{autoCommit:true});
    let sql2 = await (await db).execute(`update normal_username set washing_status='washing'
        where username=:normalUsername`,{normalUsername},{autoCommit:true});
    let OTP = Math.floor(Math.random()*1000000);
    let sql3= await (await db).execute(`update normal_username set OTP=:OTP where 
        username=:normalUsername`,{OTP,normalUsername},{autoCommit:true});
    let sql4= await (await db).execute(`update normal_username set Timing=:Timing where 
            username=:normalUsername`,{Timing,normalUsername},{autoCommit:true});
    let  sql5 = await (await db).execute(`update normal_username set shop_id=:servicer
        where username=:normalUsername`,{servicer,normalUsername},{autoCommit:true});
    let customer_name= await (await db).execute(`select name from car_wash where username
        =:normalUsername`,{normalUsername})
     
    let c_name= customer_name.rows[0].join(','); 
    let bookingtype=await (await db).execute(`select bookingType from normal_username where username
        =:normalUsername`,{normalUsername})
    let BokType=bookingtype.rows[0].join(',');            
    let sql6 = await (await db).execute(`insert into servicer_history (username,customer_name,
        customer_id,bookingType,washing_status,Timing) values (:servicer,:c_name,:normalUsername,
        :BokType,'washing',:Timing)`,{servicer,c_name,normalUsername,BokType,Timing},{autoCommit:true});         

})
app.get('/refresh',async(req,res)=>{
    let username= req.query.username;
    
  let sql= await (await db).execute(`Update car_wash set booking_req='no' where username=:username`,
    {username},{autoCommit:true}); 
    let sql2= await (await db).execute(`Update normal_username set bookingType='car' where username=:username`,
        {username},{autoCommit:true});  
})
app.get('/bookingReq',async (req,res)=>{
    let userName=req.query.UserName;
    let bookingType = req.query.bookingType;
let sql= await (await db).execute(`Update car_wash set booking_req='yes' where username=:userName`,
    {userName},{autoCommit:true});
    let sql2 = await (await db).execute(`update normal_username set bookingType=:bookingType 
        where username=:userName`,{bookingType,userName},{autoCommit:true});
})
app.get("/CancleBooking",async(req,res)=>{
    let username = req.query.username;
    let servicer = req.query.servicer;
    let sql = await (await db).execute(`update normal_username set washing_status='not' 
        where username=:username`,{username},{autoCommit:true});
    let sql2 = await (await db).execute(`update car_wash set booking_req='no' where
        username=:username`,{username},{autoCommit:true});
    let Time= await (await db).execute(`select timing from normal_username where
        username=:username`,{username});
    let Timing  = Time.rows[0].join(',');         
    let sql3= await (await db).execute(`update servicer_history set washing_status='cancled' where
         customer_id=:username AND Timing=:Timing`,{username,Timing},{autoCommit:true});        
})
app.get('/cancleReq',async (req,res)=>{
    let username = req.query.UserName;
   
    let sql_update = await (await db).execute(`
        update car_wash set booking_req='no' where username=:username`,{username},
    {autoCommit:true});
})
app.get('/Complet',async(req,res)=>{
    let username=req.query.username;
    let servicer=req.query.servicer;
    let sql1 = await (await db).execute(`update normal_username set washing_status='completed'
        where username=:username`,{username},{autoCommit:true});
    let timing=await (await db).execute(`select timing from normal_username where username=:username`,{username});
    let Timing = timing.rows[0].join(',');    
    let sql2  = await (await db).execute(`update servicer_history set washing_status='completed'
        where username=:servicer AND customer_id=:username AND timing=:Timing`,{servicer,username,Timing},{autoCommit:true});    
})
app.get('/BookingCNF',async(req,res)=>{
    let username  = req.query.username;
    let sql = await (await db).execute(`Select washing_status from normal_username 
        where username=:username`,{username});
     
     let obj;          
        if(sql.rows[0]=="washing"){
            let sql_shop_id = await (await db).execute(`select shop_id from normal_username 
                where username=:username`,{username});
            let  shop_id = sql_shop_id.rows[0].join(',');
            let sql_shop_name = await (await db).execute(`select shop_name from car_wash
                where username=:shop_id`,{shop_id});
            let sql_OTP = await (await db).execute(`select OTP from normal_username 
                where username=:username`,{username});
            let sql_mobile = await (await db).execute(`select mobile_no from car_wash 
                where username=:shop_id`,{shop_id});    
               
            obj = {
              shop_id:sql_shop_id.rows[0].join(','),
              shop_name:sql_shop_name.rows[0].join(','),
              OTP:sql_OTP.rows[0].join(','),
              shop_mobile_no:sql_mobile.rows[0].join(','),
              washing_status:"washing"
            }
            res.json(obj);
        }
        else if(sql.rows[0]=='completed'){
            res.json("completed");
        }
        else{
            res.json(0);
        }
})
app.get('/Bookings',async(req,res)=>{
    let username = req.query.username;
    let sql = await (await db).execute(`select customer_name,customer_id,timing,bookingtype,washing_status 
        from servicer_history where washing_status='washing' AND username=:username order by timing desc`,{username});
    let id,mobile,otp ;     
    let obj = new Array(25);
    let i=0;
    while(sql.rows[i]){
    if(sql.rows[i]){
        if(sql.rows[i][4]=='washing'){
        id=sql.rows[i][1];
         mobile = await (await db).execute(`select mobile_no from car_wash where
            username=:id`,{id}); 
        otp=await (await db).execute(`select otp from normal_username where username=:id`,
            {id});
            
    obj[i]={
        name:sql.rows[i][0],
        id:sql.rows[i][1],
        timing:sql.rows[i][2],
        bookingType:sql.rows[i][3],
        washing_status:sql.rows[i][4],
        mobile_no:mobile.rows[0].join(','),
        otp:otp.rows[0].join(',')       
    };
}
    }
    i++;
    }
    if(obj){
        res.json(obj)
    }
    else{
        res.json(0)
    }

});
async function fetchData(username){
    
    let pincode = await (await db).execute(`select pincode from location where username=:username`,{username});
    let pinData = parseInt(pincode.rows[0].join(','));
    
    
    
    
    let sql_bookingReq=await (await db).execute(`select car_wash.username from
         car_wash,location 
        where location.pincode=:pinData AND
         car_wash.username=location.username AND
          car_wash.booking_req='yes' AND
           car_wash.username!=:username`,{pinData,username}); 
           
        if(sql_bookingReq.rows[0]){      
            return sql_bookingReq.rows[0].join(',');
              
        }
        else{
            return 0;
        }
}
app.get('/DoneBooking',async(req,res)=>{
    let username=req.query.username;
    let sql  = await (await db).execute(`update normal_username set washing_status='not'
        where username=:username`,{username},{autoCommit:true});
})
app.get('/current_washings',async(req,res)=>{
    let username= req.query.username;
    let sql = await (await db).execute(`select customer_name,customer_id,timing,bookingtype,washing_status 
        from servicer_history where username=:username order by timing desc`,{username});
    let id,mobile,otp ;     
    let obj = new Array(3);
    if(sql.rows[0]){
        id=sql.rows[0][1];
         mobile = await (await db).execute(`select mobile_no from car_wash where
            username=:id`,{id}); 
        otp=await (await db).execute(`select otp from normal_username where username=:id`,
            {id});
            
    obj[0]={
        name:sql.rows[0][0],
        id:sql.rows[0][1],
        timing:sql.rows[0][2],
        bookingType:sql.rows[0][3],
        washing_status:sql.rows[0][4],
        mobile_no:mobile.rows[0].join(','),
        otp:otp.rows[0].join(',')       
    };
}
    if(sql.rows[1]){
        id=sql.rows[1][1];
         mobile = await (await db).execute(`select mobile_no from car_wash where
            username=:id`,{id});
            otp=await (await db).execute(`select otp from normal_username where username=:id`,
                {id});     
        obj[1]={
            name:sql.rows[1][0],
            id:sql.rows[1][1],
            timing:sql.rows[1][2],
            bookingType:sql.rows[1][3],
            washing_status:sql.rows[1][4],
            mobile_no:mobile.rows[0].join(','),
            otp:otp.rows[0].join(',') 
            
        };
    }
    if(sql.rows[2]){
        id=sql.rows[2][1];
         mobile = await (await db).execute(`select mobile_no from car_wash where
            username=:id`,{id}); 
            otp=await (await db).execute(`select otp from normal_username where username=:id`,
                {id});   
        obj[2]={
            name:sql.rows[2][0],
            id:sql.rows[2][1],
            timing:sql.rows[2][2],
            bookingType:sql.rows[2][3],
            washing_status:sql.rows[2][4],
            mobile_no:mobile.rows[0].join(','),
            otp:otp.rows[0].join(',') 
            
        };
    }
    if(obj[0]){
    res.json(obj)
    }
    else{
        res.json(0)
    }
})
app.get('/fetchData',async (req,res)=>{
    let username=req.query.username;
    let Booking_user=await fetchData(username);
    if(Booking_user==0){
        res.json(0);
    }
    else{
   
    let sql_area = await (await db).execute(`select area from location where username=:Booking_user`,
        {Booking_user});
    let sql_city = await (await db).execute(`select city from location where username=:Booking_user`,
        {Booking_user});
    let sql_state = await (await db).execute(`select state from location where username=:Booking_user`,
        {Booking_user}); 
    let sql_pincode = await (await db).execute(`select pincode from location where username=:Booking_user`,
        {Booking_user});
    let sql_name = await (await db).execute(`select name from car_wash where username=:Booking_user`,
         {Booking_user}); 
     let sql_mobile = await (await db).execute(`select mobile_no from car_wash where username=:Booking_user`,
            {Booking_user});
            let sql_bookingType = await (await db).execute(`select bookingType from normal_username where username=:Booking_user`,
                {Booking_user});      
    
            let obj = {
                username:Booking_user,
                area:sql_area.rows[0].join(','),
                city:sql_city.rows[0].join(','),
                state:sql_state.rows[0].join(','),
                pincode:sql_pincode.rows[0].join(','),
                name:sql_name.rows[0].join(','),
                mobile:sql_mobile.rows[0].join(','),
                bookingType:sql_bookingType.rows[0].join(',')
            };
    res.json(obj);
     }
     
})

app.listen(2121,'0.0.0.0');