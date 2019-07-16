import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { AuthService } from './auth.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class WcfService {

  public Count : number =0;
  public dbname: String ="S11";
  public Fetched_phone: string;
  public Fetched_user: string;
  public User_id: string;
  Mcode ="";
  Username ="";
  Password = "";
  Prompt_Msg ="Wait..";
  feedback_Msg ="Wait..";
  tracking_Msg ="Wait..";
  activity_Msg ="Wait..";
  Startbit = "7878";
  Stopbit = "7979";
  Reg = "";
  Wherestatus='';
  Onlinestatus='';
  lat=null;
  lon=null;
  nowReg = "";  
  ActDate1 = "";
  Actdate2= "";
  ActAmo = "0";
  Acttype = "";
  Stype = "";
  Seldate1=null;
  Seldate2=null;
  nowlat=null;
  nowlon=null;
  public WcfUser;
  public Wcfemail = 'None';  
  siku;
  Tid;
  flightPlanCoordinates;
  flightmarkers;



  constructor(
    private mydb:AuthService,
    private sqlite: SQLite,
    private http: HTTP,

  ) { }


  Error_message ="Sorry, we have encoutered an error while processing the request";

  update_activities(Cont,url){
    console.log('Hello nimefika kwa update activities at Wcf this is the into info ' + Cont,url  )
    return new Promise((resolve, reject) =>{  
      console.log('Nimepita kwa intro ya return promise ')
      var Protocal = "02";

      var Content = this.stringToHex(Cont);
      console.log('Nimepita kwa intro ya return promise ' + Content  )
      var MsgLens = Content.length;
      console.log('Nacollect info sasa  am on var MsgLens ' +  Content.length )
      var MsgLength = ('000' + MsgLens).slice(-4); 
      console.log('Nacollect info sasa  am on var MsgLength ' +  MsgLength  )
      var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      console.log('Nacollect info sasa am at var  Message2' +  this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit  )
      var Searchurl = url+ Message2;
     // console.log("link " + Searchurl);
     console.log('Nacollect info sasa am at var  Searchurl' +  url+ Message2 )
     this.http.get(Searchurl,{},{})
  
     .then((data) => { 
      console.log("then " + data);    
       Response = data.data;       
       console.log('Niko kwa likely error' + Response  )
       var returned = data.data;
       console.log('Niko kwa likely error' + returned  )
       var Result = returned.replace("\"","");
       console.log('Ndio na split sasa am at  result ' + Result )
       var rt = Result.replace("\"", "");
       console.log('Ndio na split sasa am at rt ' + rt  )
       var rt2 = rt.replace('"', "");
       console.log('Ndio na split sasa am at rt2 ' + rt2 )
       console.log('returned ' + rt2);

       if (rt2.length >1){   
         console.log("Niko kwa if statement meanwhile" + rt2.length ) 
     //   console.log('return ' + rt2);    
        if (rt2 =="Error in Password") {
          console.log("Error in Password" + rt2 ) 
          this.Error_message = 'Error ';     
          console.log("Error in Password" + this.Error_message )   
          reject(this.Error_message);   

        }else if ( rt2 =="Error in length" ){

          this.Error_message = 'Error';       
          reject(this.Error_message);   


        }else if ( rt2 =="exists" ){
          this.Error_message = 'record exists';       
          reject(this.Error_message);   

        }else if ( rt2 =="ok" ){
          resolve("Success");          
        }else{
          this.Error_message = rt2;       
          reject(this.Error_message);    
         
        }


      }

     return this.Prompt_Msg
    
      })
      .catch((error) => {
        this.Prompt_Msg = "Error";
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
        reject(err);
      })

    })

  }



  get_last_activities(Cont){
    this.activity_Msg =""

      var Protocal = "02";
      var Content = this.stringToHex(Cont);
      var MsgLens = Content.length;
      var MsgLength = ('000' + MsgLens).slice(-4); 
      var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      var MainURL = "http://mat2.logistics.co.ke/Service.svc/Activity_get?Contents=";
      var Searchurl = MainURL+ Message2;
     // console.log("link " + Searchurl);

     this.http.get(Searchurl,{},{})
     .then((data) => {     
       Response = data.data;       
       
       var returned = data.data;
       var Result = returned.replace("\"","");
       var rt = Result.replace("\"", "");
       var rt2 = rt.replace('"', "");
       //console.log('returned ' + rt2);

       if (rt2.length >1){    
        console.log('return ' + rt2);    
        if (rt2 =="Error") {
         this.activity_Msg = "username not found";
        }else{
          this.activity_Msg = rt2;
         // console.log('return is ' + rt2);
        }


      }

     return this.activity_Msg
    
      })
      .catch((error) => {
        this.Prompt_Msg = "Error";
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
      })
  }


  get_trips_asynch(Cont){
    console.log('Nimefika kwa get_trips_asynch')
    return new Promise((resolve, reject) =>{        
          var Message2 =  Cont;
          var MainURL = "http://mat2.logistics.co.ke/Service.svc/Trucks?User_id=";
          var Searchurl = MainURL+ Message2;   
          console.log('Nimefika kwa get_trips_asynch' + Searchurl )
          console.log(Searchurl);
        this.http.get(Searchurl,{},{})
        .then((data) => {     
          Response = data.data; 
          var returned = data.data;
          var Result = returned.replace("\"","");
          var rt = Result.replace("\"", "");
          var rt2 = rt.replace('"', "");
         
              if (rt2.length >1){                   
                if (rt2 =="Error") {
                     reject("username not found");
                 }else{
                        resolve(rt2);                   
                }
              }        
          })
          .catch((error) => {           
            console.log('host 1 error: ' + error.error);
            var err = error.error;   
            if (err ==="The host could not be resolved"){
              console.log("hatupati host"); 
            }
             reject(err);
          })             
        })


}



trips_day_summary(Cont){

return new Promise((resolve, reject) =>{  
   
      var Message2 =  Cont;
      var MainURL = "http://mat2.logistics.co.ke/Service.svc/Day_sum?User_id=";
      var Searchurl = MainURL+ Message2;
      console.log("link " + Searchurl);

    this.http.get(Searchurl,{},{})
    .then((data) => {     
      Response = data.data;       
      
      var returned = data.data;
      var Result = returned.replace("\"","");
      var rt = Result.replace("\"", "");
      var rt2 = rt.replace('"', "");
      // console.log('returned ' + rt2);

          if (rt2.length >1){    
            //console.log('return ' + rt2);    
            if (rt2 =="Error") {
                 reject("username not found");
             }else{
                    resolve(rt2); 
                    //console.log('returned asynch is ' + rt2);
            }

          }

         
   
    
      })

      .catch((error) => {           
       // this.Trips_message = "Error";
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }

         reject(err);
      })
         
    })


}


trips_day_counter(Cont){
console.log('nimefika kwa trips-day_counter from gettrips_online '  + Cont)
return new Promise((resolve, reject) =>{  
  console.log('nimefika kwa trips-day_counter from gettrips_online meanwhile nimepita kwa promise ')
      var Message2 =  Cont;
      var MainURL = "http://mat2.logistics.co.ke/Service.svc/Trucks_fetch_trips?Contents=";
      var Searchurl = MainURL+ Message2;
      console.log('nimefika kwa trips-day_counter from gettrips_online meanwhile  Searchurl' + Searchurl)
      console.log("link " + Searchurl);

    this.http.get(Searchurl,{},{})
    .then((data) => {     
      Response = data.data;       
      
      var returned = data.data;
      console.log('nimefika kwa trips-day_counter from gettrips_online meanwhile  returned' + returned)
      var Result = returned.replace("\"","");
      console.log('nimefika kwa trips-day_counter from gettrips_online meanwhile  Result' + Result)
      var rt = Result.replace("\"", "");
      console.log('nimefika kwa trips-day_counter from gettrips_online meanwhile  rt' + rt)
      var rt2 = rt.replace('"', "");
      console.log('nimefika kwa trips-day_counter from gettrips_online meanwhile  rt2' + rt2)
      // console.log('returned ' + rt2);

          if (rt2.length >1){    
            console.log('return ' + rt2);    
            if (rt2 =="Error") {
                 reject("username not found");
             }else{
                    resolve(rt2); 
                    //console.log('returned asynch is ' + rt2);
            }

          }else{
            reject("Sorry, data not found");
          }

         
   
    
      })

      .catch((error) => {           
       // this.Trips_message = "Error";
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }

         reject(err);
      })
         
    })








}



trips_day_payback(Cont){

  return new Promise((resolve, reject) =>{  
     
        var Message2 =  Cont;
        var MainURL = "http://mat2.logistics.co.ke/Service.svc/Get_day_playback?Contents=";
        var Searchurl = MainURL+ Message2;
        console.log("link " + Searchurl);

      this.http.get(Searchurl,{},{})
      .then((data) => {     
        Response = data.data;       
        
        var returned = data.data;
        var Result = returned.replace("\"","");
        var rt = Result.replace("\"", "");
        var rt2 = rt.replace('"', "");
         console.log('returned ' + rt2);

            if (rt2.length >1){    
              //console.log('return ' + rt2);    
              if (rt2 =="Error") {
                   reject("username not found");
               }else{
                   resolve(rt2); 
                   //console.log('returned asynch is ' + rt2);
              }

            }else{
              reject("Sorry, data not found");
            }

           
     
      
        })

        .catch((error) => {           
         // this.Trips_message = "Error";
          console.log('host 1 error: ' + error.error);
          var err = error.error;   
          if (err ==="The host could not be resolved"){
            console.log("hatupati host"); 
          }

           reject(err);
        })
           
      })


}



trips_payback_single(Cont){

  return new Promise((resolve, reject) =>{  
     
        var Message2 =  Cont;
        var MainURL = "http://mat2.logistics.co.ke/Service.svc/Get_playback_single?Contents=";
        var Searchurl = MainURL+ Message2;
        console.log("link " + Searchurl);

      this.http.get(Searchurl,{},{})
      .then((data) => {     
        Response = data.data;       
        
        var returned = data.data;
        var Result = returned.replace("\"","");
        var rt = Result.replace("\"", "");
        var rt2 = rt.replace('"', "");
         console.log('returned ' + rt2);

            if (rt2.length >1){    
              //console.log('return ' + rt2);    
              if (rt2 =="Error") {
                   reject("username not found");
               }else{
                   resolve(rt2); 
                   //console.log('returned asynch is ' + rt2);
              }

            }else{
              reject("Sorry, data not found");
            }

           
     
      
        })

        .catch((error) => {           
         // this.Trips_message = "Error";
          console.log('host 1 error: ' + error.error);
          var err = error.error;   
          if (err ==="The host could not be resolved"){
            console.log("hatupati host"); 
          }

           reject(err);
        })
           
      })


}




get_last_all(Cont){
  this.feedback_Msg =""
   
    var Message2 = Cont;
    var MainURL = "http://mat2.logistics.co.ke/Service.svc/Cash_sum?User_id=";
    var Searchurl = MainURL+ Message2;
   // console.log("link " + Searchurl);

   this.http.get(Searchurl,{},{})
   .then((data) => {     
     Response = data.data;       
     
     var returned = data.data;
     var Result = returned.replace("\"","");
     var rt = Result.replace("\"", "");
     var rt2 = rt.replace('"', "");
     //console.log('returned ' + rt2);

     if (rt2.length >1){    
      console.log('return ' + rt2);   
      if (rt2.indexOf('Error') >= 0){        
       this.feedback_Msg = "Error";
      }else{
        this.feedback_Msg = rt2;
       // console.log('return is ' + rt2);
      }


    }

   return this.feedback_Msg
  
    })
    .catch((error) => {
      this.Prompt_Msg = "Error";
      console.log('host 1 error: ' + error.error);
      var err = error.error;   
      if (err ==="The host could not be resolved"){
        console.log("hatupati host"); 
      }
    })
}



trip_tracking(content) {
  console.log("hello we just got to trip_tracking")
    
    this.Prompt_Msg = "";  
    var Protocal = "02";
    var Content = this.stringToHex(content);
    var MsgLens = Content.length;
    var MsgLength = ('000' + MsgLens).slice(-4); 
    var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
    var getApiUrl = "http://mat2.logistics.co.ke/Service.svc/Tracking_Link?Contents=" + Message2;
    console.log("Going to the Url")
   // console.log('link ' +getApiUrl);
    try {
  
            this.http.get(getApiUrl,{},{})
            .then((data) => {     
              Response = data.data;       
              var returned = data.data;
              var Result = returned.replace("\"","");
              var rt = Result.replace("\"", "");
              var Line = rt.replace('"', "");
              
                  var Desc = Line.split(";");                   
                  this.nowReg = Desc[0].trim();
                  this.nowlat = Desc[1].trim();
                  this.nowlon = Desc[2].trim();
                  var ost =  Desc[3].trim();  
                  this.Onlinestatus =  ost.replace("/", "");
                  this.Prompt_Msg = "ok";
                  console.log("Prompt msg")
            })
  
    
      
    } catch (error) {
             this.Prompt_Msg = "Error"
                console.log('host 1 error: ' + error.error);
                var err = error.error;   
                if (err ==="The host could not be resolved"){
                  console.log("hatupati host"); 
                }
    }
    
        
       
  }
  
  
  
  add_schedule(Cont){
    this.Prompt_Msg ="Wait.."
  
      var Protocal = "02";
      var Content = this.stringToHex(Cont);
      var MsgLens = Content.length;
      var MsgLength = ('000' + MsgLens).slice(-4); 
      var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      var MainURL = "http://mat2.logistics.co.ke/Service.svc/Schedule_enter?Contents=";
      var Searchurl = MainURL+ Message2;
     // console.log("link " + Searchurl);
  
     this.http.get(Searchurl,{},{})
     .then((data) => {     
       Response = data.data;       
       
       var returned = data.data;
       var Result = returned.replace("\"","");
       var rt = Result.replace("\"", "");
       var rt2 = rt.replace('"', "");
       console.log('returned ' + rt2);
  
       if (rt2.length >1){    
        console.log('return ' + rt2);    
        if (rt2 =="Error in Password") {
         this.Prompt_Msg = "username not found";
  
        }else if ( rt2 =="Error in length" ){
         this.Prompt_Msg = "com length wrong";
        }else if ( rt2 =="exists" ){
          this.Prompt_Msg = "record exists";
        }else if ( rt2 =="ok" ){
          this.Prompt_Msg = "Success";
        }else{
          this.Prompt_Msg = "Error";
          console.log('Error ' + rt2);
        }
  
  
      }
  
     return this.Prompt_Msg
    
      })
      .catch((error) => {
        this.Prompt_Msg = "Error";
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
      })
  
  
  
  }
  
  
  
  get_shedules(Cont){
  console.log('nimefika kwa get_schedules from ShowList meanwhile' +  Cont )
    return new Promise((resolve, reject) =>{  
      console.log('nimefika kwa get_schedules from ShowList meanwhile nimepita promise' )
      var Protocal = "02";
      var Content = this.stringToHex(Cont);
      console.log('nimefika kwa get_schedules from ShowList meanwhile Content' + Content  )
      var MsgLens = Content.length;
      console.log('nimefika kwa get_schedules from ShowList meanwhile MsgLens' + MsgLens  )
      var MsgLength = ('000' + MsgLens).slice(-4); 
      console.log('nimefika kwa get_schedules from ShowList meanwhile MsgLength' + MsgLength  )
      var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      console.log('nimefika kwa get_schedules from ShowList meanwhile Message2' + Message2  )
      var MainURL = "http://mat2.logistics.co.ke/Service.svc/Schedule_all?Contents=";
      console.log('nimefika kwa get_schedules from ShowList meanwhile MainURL' + MainURL  )
      var Searchurl = MainURL+ Message2;
      console.log('nimefika kwa get_schedules from ShowList meanwhile Searchurl' + Searchurl  )
     // console.log("link " + Searchurl);
  
     this.http.get(Searchurl,{},{})
     .then((data) => {     
       Response = data.data;       
       
       var returned = data.data;
       console.log('nimefika kwa get_schedules from ShowList meanwhile returned' + returned  )
       var Result = returned.replace("\"","");
       console.log('nimefika kwa get_schedules from ShowList meanwhile Result' + Result  )
       var rt = Result.replace("\"", "");
       console.log('nimefika kwa get_schedules from ShowList meanwhile rt' + rt  )
       var rt2 = rt.replace('"', "");
       console.log('nimefika kwa get_schedules from ShowList meanwhile rt2' + rt2  )
       console.log('return ' + rt2);        
        if (rt2 =="Error") {
          reject("username not found");
        }else{
          resolve(rt2);     
        }
    
      })
      .catch((error) => {
       
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
        reject(err);
      })
    })
  
  }



  get_mileages(Cont){
    return new Promise((resolve, reject) =>{  
  
      var Protocal = "02";
      var Content = this.stringToHex(Cont);
      var MsgLens = Content.length;
      var MsgLength = ('000' + MsgLens).slice(-4); 
      var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      var MainURL = "http://mat2.logistics.co.ke/Service.svc/Day_report?Contents=";
      var Searchurl = MainURL+ Message2;
      console.log("link " + Searchurl);
  
     this.http.get(Searchurl,{},{})
     .then((data) => {     
       Response = data.data;       
       
       var returned = data.data;
       var Result = returned.replace("\"","");
       var rt = Result.replace("\"", "");
       var rt2 = rt.replace('"', "");
       console.log('returned ' + rt2);
  
       if (rt2.length >1){    
        console.log('return ' + rt2);    
        if (rt2 =="Error") {
          reject("username not found");
        }else{
          resolve(rt2);     
        }
  
  
      }
  
     return this.feedback_Msg
    
      })
      .catch((error) => {    
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
        reject(err);
      })
  
    })
  
  }
  
  
  
  get_mileages_latest(Cont){
    return new Promise((resolve, reject) =>{  
   
      var Protocal = "02";
      var Content = this.stringToHex(Cont);
      var MsgLens = Content.length;
      var MsgLength = ('000' + MsgLens).slice(-4); 
      var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      var MainURL = "http://mat2.logistics.co.ke/Service.svc/get_mile_latest?Contents=";
      var Searchurl = MainURL+ Message2;
      console.log("link " + Searchurl);
  
     this.http.get(Searchurl,{},{})
     .then((data) => {     
       Response = data.data;       
       
       var returned = data.data;
       var Result = returned.replace("\"","");
       var rt = Result.replace("\"", "");
       var rt2 = rt.replace('"', "");
       console.log('returned ' + rt2);
  
       if (rt2.length >1){    
        console.log('return ' + rt2);    
        if (rt2 =="Error") {
          reject("username not found");
        }else{
          resolve(rt2);        
           console.log('return is ' + rt2);
  
        }
  
  
      }
  
    
    
      })
      .catch((error) => {
        this.Prompt_Msg = "Error";
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
        reject(err);
      })
  
    })
  
  }
  
  
  
  add_schedule_link(Cont){
    console.log("Nimefika kwa add_schedule_link from proceed" + Cont)
    this.Prompt_Msg ="Wait.."
  
      var Protocal = "02";
      var Content = this.stringToHex(Cont);
      console.log("Nimefika kwa add_schedule_link from proceed" + this.stringToHex(Cont))
      var MsgLens = Content.length;
      console.log("Nimefika kwa add_schedule_link from proceed content.length is" + Content.length)
      var MsgLength = ('000' + MsgLens).slice(-4); 
      console.log("Nimefika kwa add_schedule_link from proceed MsgLength is" + MsgLength)
      var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      console.log("Nimefika kwa add_schedule_link from proceed Message2  is" + this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit)
      var MainURL = "http://mat2.logistics.co.ke/Service.svc/Link_schedule?Contents=";
      var Searchurl = MainURL+ Message2;
      console.log("Nimefika kwa add_schedule_link from proceed Searchurl is" + MainURL+ Message2)
  
      console.log("link " + Searchurl);
  
     this.http.get(Searchurl,{},{})
     .then((data) => {     
       Response = data.data;       
       console.log("Niko likely kwa kashida" + Response)
  
       var returned = data.data;
       console.log("variable Returned is" + returned)
       var Result = returned.replace("\"","");
       console.log("variable Result is" + Result)
       var rt = Result.replace("\"", "");
       console.log("variable rt is" + rt)
       var rt2 = rt.replace('"', "");
       console.log("variable rt2 is" + rt2)
      // console.log('returned ' + rt2);
  
       if (rt2.length >1){    
        console.log('return ' + rt2);    
        if (rt2 =="Error in Password") {
         this.Prompt_Msg = "username not found";
  
        }else if ( rt2 =="Error in length" ){
         this.Prompt_Msg = "com length wrong";
        }else if ( rt2 =="exists" ){
          this.Prompt_Msg = "record exists";
        }else if ( rt2 =="ok" ){
          this.Prompt_Msg = "Success";
        }else{
          this.Prompt_Msg = "Error";
          console.log('Error ' + rt2);
        }
  
  
      }
  
     return this.Prompt_Msg
    
      })
      .catch((error) => {
        this.Prompt_Msg = "Error";
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
      })
  
  
  
  }
  
  

  get_shedules_linked(Cont){
    console.log('Nimefika kwa get_schedules_linked from showlist')
    return new Promise((resolve, reject) =>{  
      console.log('Nimepita kwa promise ')
      var Protocal = "02";
      console.log('Nimepita kwa promise ' + Protocal  )
  
      var Content = this.stringToHex(Cont);
      console.log('Nimepita kwa promise ' + Content )
      var MsgLens = Content.length;
      console.log('Nimepita kwa promise ' + MsgLens )
      var MsgLength = ('000' + MsgLens).slice(-4); 
      console.log('Nimepita kwa promise ' + MsgLength )
      var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      console.log('Nimepita kwa promise ' + this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit )
      var MainURL = "http://mat2.logistics.co.ke/Service.svc/Link_schedule_show?Contents=";
      var Searchurl = MainURL+ Message2;
      console.log('Nimepita kwa promise ' + Searchurl )
     // console.log("link " + Searchurl);
  
     this.http.get(Searchurl,{},{})
     .then((data) => {     
       Response = data.data;       
       
       var returned = data.data;
       var Result = returned.replace("\"","");
       console.log('Nimepita kwa promise ' + Result )
       var rt = Result.replace("\"", "");
       console.log('Nimepita kwa promise ' + rt )
       var rt2 = rt.replace('"', "");
       //console.log('returned ' + rt2);
       console.log('Nimepita kwa promise ' + rt2 )
       if (rt2.length >1){    
       // console.log('return ' + rt2);    
        if (rt2 =="Error") {
          reject("username not found");
        }else{
          resolve(rt2); 
        }
  
  
      }
  
    
    
      })
      .catch((error) => {
        this.Prompt_Msg = "Error";
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
        reject(err);
      })
  
    })
  
  }
  
  
  
  get_shedules_alert(Cont){
    console.log('i am at get_schedules_alert' + Cont )
    this.feedback_Msg =""
   
      var Protocal = "02";
      var Content = this.stringToHex(Cont);
      console.log('i am at get_schedules_alert' + Content )
      var MsgLens = Content.length;
      console.log('i am at get_schedules_alert' + Content.length )
  
      var MsgLength = ('000' + MsgLens).slice(-4); 
      console.log('i am at get_schedules_alert' + MsgLength  )
      var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      console.log('i am at get_schedules_alert' + this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit  )
      var MainURL = "http://mat2.logistics.co.ke/Service.svc/schedule_alert?Contents=";
      var Searchurl = MainURL+ Message2;
      console.log('i am at get_schedules_alert' + Searchurl )
      //console.log("link " + Searchurl);
  
     this.http.get(Searchurl,{},{})
     .then((data) => {     
       Response = data.data;       
       
       var returned = data.data;
       console.log('i am at get_schedules_alert meanwhile returned' + returned )
       var Result = returned.replace("\"","");
       console.log('i am at get_schedules_alert meanwhile Result' + Result )
       var rt = Result.replace("\"", "");
       console.log('i am at get_schedules_alert meanwhile rt' + rt )
       var rt2 = rt.replace('"', "");
       console.log('i am at get_schedules_alert meanwhile rt2' + rt2 )
       //console.log('returned ' + rt2);
  
       if (rt2.length >1){    
       // console.log('return ' + rt2);    
        if (rt2 =="Error") {
         this.feedback_Msg = "username not found";
        }else{
          this.feedback_Msg = rt2;
          // console.log('return is ' + rt2);
        }
  
  
      }
  
     return this.feedback_Msg
    
      })
      .catch((error) => {
        this.Prompt_Msg = "Error";
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
      })
  }
  
  
  
  
  
  get_day_summary(Cont){
   
    return new Promise((resolve, reject) =>{  
   
      var Protocal = "02";
      var Content = this.stringToHex(Cont);
      var MsgLens = Content.length;
      var MsgLength = ('000' + MsgLens).slice(-4); 
      var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      var MainURL = "http://mat2.logistics.co.ke/Service.svc/get_day_summary_advace?Contents=";
      var Searchurl = MainURL+ Message2;
      console.log("link " + Searchurl);
  
     this.http.get(Searchurl,{},{})
     .then((data) => {     
       Response = data.data;       
       
       var returned = data.data;
       var Result = returned.replace("\"","");
       var rt = Result.replace("\"", "");
       var rt2 = rt.replace('"', "");
       //console.log('returned ' + rt2);
  
       if (rt2.length >1){    
       // console.log('return ' + rt2);    
        if (rt2 =="Error") {
          reject("username not found");
        }else{
          resolve(rt2); 
        }
  
  
      }
  
    
    
      })
      .catch((error) => {
       
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
        reject(err);
      })
  
    })
  
  }
  
  
  get_day_latest(Cont){
   console.log('nimefika kwa get-day-latest')
    return new Promise((resolve, reject) =>{  
      console.log('nimefika kwa get-day-latest -but at promise')
      var Protocal = "02";
      var Content = this.stringToHex(Cont);
      console.log('nimefika kwa get-day-latest -but at promise' + Cont )
      var MsgLens = Content.length;
      console.log('nimefika kwa get-day-latest -but at promise' + Content.length )
      var MsgLength = ('000' + MsgLens).slice(-4); 
      
      var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      console.log('nimefika kwa get-day-latest -but at promise' + this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit )
      var MainURL = "http://mat2.logistics.co.ke/Service.svc/get_all_latest?Contents=";
      var Searchurl = MainURL+ Message2;
      console.log('nimefika kwa get-day-latest -but at promise' + Searchurl )
     // console.log("link " + Searchurl);
  
     this.http.get(Searchurl,{},{})
     
     .then((data) => {     
       Response = data.data;       
       
       var returned = data.data;
       console.log('nimefika kwa get-day-latest -but at promise' + returned )
       var Result = returned.replace("\"","");
       console.log('nimefika kwa get-day-latest -but at promise' + Result )
       var rt = Result.replace("\"", "");
       console.log('nimefika kwa get-day-latest -but at promise' + rt  )
       var rt2 = rt.replace('"', "");
       console.log('nimefika kwa get-day-latest -but at promise' + rt2  )
  
       if (rt2.length >1){    
       // console.log('return ' + rt2);    
        if (rt2 === "Error") {
          reject("username not found");
        
        }else{
         
           console.log('return is ' + rt2);
           resolve(rt2); 
        }
  
  
      }
   
    
      })
      .catch((error) => {
       
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
  
        reject(err);
      })
  
    });
  
  
  
  }
  
  
  
  
  
  get_all_summary(Cont){
   console.log('Nimepita kwa get_all_summary at Wcf' + Cont )
    return new Promise((resolve, reject) =>{  
      console.log('Nimepita kwa new promise')
      var Protocal = "02";
      console.log('Nimepita kwa new promise meanwhile Protocal' + Protocal)
      var Content = this.stringToHex(Cont);
      console.log('Nimepita kwa new promise meanwhile Content ' + Content)
      var MsgLens = Content.length;
      console.log('Nimepita kwa new promise meanwhile MsgLens' + MsgLens)
      var MsgLength = ('000' + MsgLens).slice(-4); 
      console.log('Nimepita kwa new promise meanwhile MsgLength' + MsgLength)
      var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      console.log('Nimepita kwa new promise meanwhile Message2' + this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit)
      var MainURL = "http://mat2.logistics.co.ke/Service.svc/get_all_summary?Contents=";
      var Searchurl = MainURL+ Message2;
      console.log("link " + Searchurl);
  
     this.http.get(Searchurl,{},{})
     .then((data) => {     
       Response = data.data;       
       console.log('Nimepita kwa new promise meanwhile Response' + Response)
       var returned = data.data;
       console.log('Nimepita kwa new promise meanwhile returned' + returned)
       var Result = returned.replace("\"","");
       console.log('Nimepita kwa new promise meanwhile Result' + Result)
       var rt = Result.replace("\"", "");
       console.log('Nimepita kwa new promise meanwhile rt' + rt)
       var rt2 = rt.replace('"', "");
       //console.log('returned ' + rt2);
  
       if (rt2.length >1){    
       // console.log('return ' + rt2);    
        if (rt2 =="Error") {      
         reject( "username not found");
        }else{
          resolve(rt2); 
        }
  
  
      }
  
    
    
      })
      .catch((error) => {
        this.Prompt_Msg = "Error";
        console.log('host 1 error: ' + error.error);
        var err = error.error;   
        if (err ==="The host could not be resolved"){
          console.log("hatupati host"); 
        }
        reject(err);
      })
  
    })
  }
  
  
  
     //get user account  
     data = { coluser: "", colpass:"", uref: "0" };
      thisuser: any;
      thisphone: any;
      thispass: any;
      thisemail: any;



  
      public getUsers(Contents,url) {  
        //  var Contents= username + ";" + phone + ";" + pass
        var zote =Contents.split(";");
        this.thisuser=zote[0];
        this.thisphone=zote[1]; 
        this.thispass=zote[2];
      
         var Protocal = "01";  //sign in request
         var Content = this.stringToHex(Contents);  
         var MsgLens = Content.length;   
         var MsgLength = ('000' + MsgLens).slice(-4); //String.format("%04d",MsgLens);   
         var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
         //var MainURL = "http://qwcf.logistics.co.ke/Jujus.svc/Client_Connection?Content=" + Message2;
      
         var Searchurl = url+ Message2;
         var Response = "";
         console.log(Searchurl);
      
      
           this.http.get(Searchurl,{},{})
           .then((data) => {     
             Response = data.data;       
             
             var returned = data.data;
             var Result = returned.replace("\"","");
             var rt = Result.replace("\"", "");
             var rt2 = rt.replace('"', "");
             console.log('returned ' + rt2);
      
              //this.Authenticate_status_old(rt2);
              this.Count = 1
              this.Prompt_Msg = rt2
      
      
      
             })
             .catch((error) => {
               this.Count = 1; 
               this.Prompt_Msg = "Error"
               console.log('host 1 error: ' + error.error);
               var err = error.error;   
               if (err ==="The host could not be resolved"){
                 console.log("hatupati host"); 
               }
             }
              
            )
        
         return Response;
       }
      
      
       get_fuel(Cont){
       
        return new Promise((resolve, reject) =>{  
       
          var Protocal = "02";
          var Content = this.stringToHex(Cont);
          var MsgLens = Content.length;
          var MsgLength = ('000' + MsgLens).slice(-4); 
          var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
          var MainURL = "http://mat2.logistics.co.ke/Service.svc/Get_Fuel?Contents=";
          var Searchurl = MainURL+ Message2;
          console.log("link " + Searchurl);
      
         this.http.get(Searchurl,{},{})
         .then((data) => {     
           Response = data.data;       
           
           var returned = data.data;
           var Result = returned.replace("\"","");
           var rt = Result.replace("\"", "");
           var rt2 = rt.replace('"', "");
           //console.log('returned ' + rt2);
      
           if (rt2.length >1){    
           // console.log('return ' + rt2);    
            if (rt2 =="Error") {
              reject( "username not found");
            }else{
              resolve(rt2); 
            }
      
      
          }
      
         return this.feedback_Msg
        
          })
          .catch((error) => {
           
            console.log('host 1 error: ' + error.error);
            var err = error.error;   
            if (err ==="The host could not be resolved"){
              console.log("hatupati host"); 
            }
            reject(err);
          })
      
        })
      
      }
      
      
      
      
      get_services(Cont){
        return new Promise((resolve, reject) =>{  
      
          var Protocal = "02";
          var Content = this.stringToHex(Cont);
          var MsgLens = Content.length;
          var MsgLength = ('000' + MsgLens).slice(-4); 
          var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
          var MainURL = "http://mat2.logistics.co.ke/Service.svc/mileage_checker?Contents=";
          var Searchurl = MainURL+ Message2;
          console.log("link " + Searchurl);
      
         this.http.get(Searchurl,{},{})
         .then((data) => {     
           Response = data.data;       
           
           var returned = data.data;
           var Result = returned.replace("\"","");
           var rt = Result.replace("\"", "");
           var rt2 = rt.replace('"', "");
           console.log('returned ' + rt2);
      
           if (rt2.length >1){    
            console.log('return ' + rt2);    
            if (rt2 =="Error") {
              reject("username not found");
            }else{
              resolve(rt2);     
            }
      
      
          }
      
         return this.feedback_Msg
        
          })
          .catch((error) => {    
            console.log('host 1 error: ' + error.error);
            var err = error.error;   
            if (err ==="The host could not be resolved"){
              console.log("hatupati host"); 
            }
            reject(err);
          })
      
        })
      
      }
      
      
      
      
      reset_service(Cont,url){
      
        return new Promise((resolve, reject) =>{  
      
          var Protocal = "02";
          var Content = this.stringToHex(Cont);
          var MsgLens = Content.length;
          var MsgLength = ('000' + MsgLens).slice(-4); 
          var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
      
          var Searchurl = url+ Message2;
         // console.log("link " + Searchurl);
      
         this.http.get(Searchurl,{},{})
         .then((data) => {     
           Response = data.data;       
           
           var returned = data.data;
           var Result = returned.replace("\"","");
           var rt = Result.replace("\"", "");
           var rt2 = rt.replace('"', "");
           console.log('returned ' + rt2);
      
           if (rt2.length >1){    
            console.log('return ' + rt2);    
            if (rt2 =="Error in Password") {
              this.Error_message = 'Error ';       
              reject(this.Error_message);   
      
            }else if ( rt2 =="Error in length" ){
      
              this.Error_message = 'Error';       
              reject(this.Error_message);   
      
      
            }else if ( rt2 =="exists" ){
              this.Error_message = 'record exists';       
              reject(this.Error_message);   
      
            }else if ( rt2 =="ok" ){
              resolve("Success");          
            }else{
              this.Error_message = rt2;       
              reject(this.Error_message);    
             
            }
      
      
          }
      
         return this.Prompt_Msg
        
          })
          .catch((error) => {
            this.Prompt_Msg = "Error";
            console.log('host 1 error: ' + error.error);
            var err = error.error;   
            if (err ==="The host could not be resolved"){
              console.log("hatupati host"); 
            }
            reject(err);
          })
      
        })
      
      }
      
      
      

get_Month_summary(Cont){
  console.log('Nimefika huku kwa get_month_summary from proceed meanwhile' + Cont )
   return new Promise((resolve, reject) =>{  
     console.log('Nimefika huku kwa get_month_summary from proceed meanwhile nimepita promise'  )
     var Protocal = "02";
     var Content = this.stringToHex(Cont);
     console.log('Nimefika huku kwa get_month_summary from proceed meanwhile Content' + Content )
     var MsgLens = Content.length;
     console.log('Nimefika huku kwa get_month_summary from proceed meanwhile MsgLens' + MsgLens )
     var MsgLength = ('000' + MsgLens).slice(-4); 
     console.log('Nimefika huku kwa get_month_summary from proceed meanwhile MsgLength' + MsgLength )
     var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
     console.log('Nimefika huku kwa get_month_summary from proceed meanwhile Message2' + Message2 )
     var MainURL = "http://mat2.logistics.co.ke/Service.svc/Month_summary_advace?Contents=";
     console.log('Nimefika huku kwa get_month_summary from proceed meanwhile MainURL' + MainURL )
     var Searchurl = MainURL+ Message2;
     console.log('Nimefika huku kwa get_month_summary from proceed meanwhile Searchurl' + Searchurl )
     console.log("link " + Searchurl);
 
    this.http.get(Searchurl,{},{})
    .then((data) => {     
      Response = data.data;       
      
      var returned = data.data;
      console.log('Nimefika huku kwa get_month_summary from proceed meanwhile returned' + returned )
      var Result = returned.replace("\"","");
      console.log('Nimefika huku kwa get_month_summary from proceed meanwhile Result' + Result )
      var rt = Result.replace("\"", "");
      console.log('Nimefika huku kwa get_month_summary from proceed meanwhile rt' + rt )
      var rt2 = rt.replace('"', "");
      console.log('Nimefika huku kwa get_month_summary from proceed meanwhile rt2' + rt2 )
       if (rt2 =="Error") {
         reject("username not found");
       }else{
         resolve(rt2); 
       }
  
   
     })
     .catch((error) => {
      
       console.log('host 1 error: ' + error.error);
       var err = error.error;   
       if (err ==="The host could not be resolved"){
         console.log("hatupati host"); 
       }
       reject(err);
     })
 
   })
 
 }
 
 
 
 get_Month_details(Cont){
  console.log('Ndio niko kwa get_month_details' + Cont)
   return new Promise((resolve, reject) =>{  
     console.log('Nimepita kwa promise' )
     var Protocal = "02";
     console.log('Nimepita kwa promise meanwhile  Protocal'  + Protocal)
     var Content = this.stringToHex(Cont);
     console.log('Nimepita kwa promise meanwhile  Content'  + Content)
     var MsgLens = Content.length;
     console.log('Nimepita kwa promise meanwhile  MsgLens'  + MsgLens)
     var MsgLength = ('000' + MsgLens).slice(-4);
     console.log('Nimepita kwa promise meanwhile  MsgLength '  + MsgLength )
     var Message2 = this.Startbit  + Protocal   + MsgLength  + Content  + this.Stopbit;
     console.log('Nimepita kwa promise meanwhile  Message2 '  + Message2 )
     var MainURL = "http://mat2.logistics.co.ke/Service.svc/Month_details_advace?Contents=";
     console.log('Nimepita kwa promise meanwhile MainURL '  + MainURL )
     var Searchurl = MainURL+ Message2;
     console.log('Nimepita kwa promise meanwhile Searchurl '  + Searchurl )
     console.log("link " + Searchurl);
 
    this.http.get(Searchurl,{},{})
    .then((data) => {     
      Response = data.data;       
      console.log('Nimepita kwa promise meanwhile  Response '  +  Response  )
      var returned = data.data;
      console.log('Nimepita kwa promise meanwhile returned'  +  returned )
      var Result = returned.replace("\"","");
      console.log('Nimepita kwa promise meanwhile Result '  + Result  )
      var rt = Result.replace("\"", "");
      console.log('Nimepita kwa promise meanwhile  rt  '  + rt  )
      var rt2 = rt.replace('"', "");
      console.log('Nimepita kwa promise meanwhile  rt2  '  + rt2   )
      //console.log('returned ' + rt2);
 
      if (rt2.length >1){    
      // console.log('return ' + rt2);    
       if (rt2 =="Error") {
         reject("username not found");
       }else{
         resolve(rt2); 
       }
 
 
     }
 
   
   
     })
     .catch((error) => {
      
       console.log('host 1 error: ' + error.error);
       var err = error.error;   
       if (err ==="The host could not be resolved"){
         console.log("hatupati host"); 
       }
       reject(err);
     })
 
   })
 
 }
 
 
 
 
 flash_day_payback(Cont){
 console.log("Nimefika kwa flash_day_payback" + Cont)
   return new Promise((resolve, reject) =>{  
      console.log('am at promise')
         var Message2 =  Cont;
         console.log('am at promise' + Cont)
         var MainURL = "http://mat2.logistics.co.ke/Service.svc/Flash_playback?Contents=";
         var Searchurl = MainURL+ Message2;
         console.log("link " + Searchurl);
 
       this.http.get(Searchurl,{},{})
       .then((data) => {     
         Response = data.data;       
         console.log('niko kwa response' + data.data)
         var returned = data.data;
         var Result = returned.replace("\"","");
         var rt = Result.replace("\"", "");
         var rt2 = rt.replace('"', "");
          console.log('returned  niko kwa replace' + rt2 );
 
             if (rt2.length >1){    
               console.log('return ' + rt2);    
               if (rt2 =="Error") {
                    reject("username not found");
                }else{
                    resolve(rt2); 
                    console.log('returned asynch is ' + rt2);
               }
 
             }else{
               console.log('niko kwa reject')
               reject("Sorry, data not found");
             }
 
            
      
       
         })
 
         .catch((error) => {           
          // this.Trips_message = "Error";
           console.log('host 1 error: ' + error.error);
           var err = error.error;   
           if (err ==="The host could not be resolved"){
             console.log("hatupati host"); 
           }
 
            reject(err);
         })
            
       })
 
 
 }
 
 
 
 
 delete_shedule(Cont){
   return new Promise((resolve, reject) =>{  
  
     
     var Message2 = Cont;
     var MainURL = "http://mat2.logistics.co.ke/Service.svc/Edit_schedule?Contents=";
     var Searchurl = MainURL+ Message2;
     console.log("link " + Searchurl);
 
    this.http.get(Searchurl,{},{})
    .then((data) => {     
      Response = data.data;       
      
      var returned = data.data;
      var Result = returned.replace("\"","");
      var rt = Result.replace("\"", "");
      var rt2 = rt.replace('"', "");
      //console.log('returned ' + rt2);
 
      if (rt2.length >1){    
      // console.log('return ' + rt2);    
       if (rt2 =="Error") {
         reject("username not found");
       }else{
         resolve(rt2); 
       }
 
 
     }
 
   
   
     })
     .catch((error) => {
       this.Prompt_Msg = "Error";
       console.log('host 1 error: ' + error.error);
       var err = error.error;   
       if (err ==="The host could not be resolved"){
         console.log("hatupati host"); 
       }
       reject(err);
     })
 
   })
 
 }
 


 save_user_Data() {
  this.Count = 0;
  var dbnow : String = this.dbname;
  this.sqlite.create({
    name: "" + dbnow,
    location: 'default'
  })
    .then((db: SQLiteObject) => {
  
  
      db.executeSql('create table users(rowid INTEGER PRIMARY KEY, coluser VARCHAR(32), colpass VARCHAR(32)),uref VARCHAR(32))',  [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
  



  console.log('imefika kwa save user ' + this.Fetched_user + "" + this.Password + " " + this.User_id)
    //console.log('saving data now ' + this.Fetched_user + ',' + this.Password + ',' + this.User_id );
    db.executeSql('INSERT INTO users VALUES(NULL,?,?,?)',[this.Fetched_user,this.Password,this.User_id ])
     

       
console.log("Inserting info")
      })
      .catch(e => {
        console.log('error 1 is: ' + e);         
      });

 
      console.log("Nimeendaback to login")
  
}



save_tracking_datas(Contents) {
  this.Count = 0;
 
  this.mydb.db.executeSql('INSERT INTO users VALUES(NULL,?,?,?)',[this.Fetched_user,this.Password,this.User_id ])
      .then(res => {
       // console.log('saved data now ' + this.data.coluser);    
        this.Count=1;  
      })
      .catch(e => {
        console.log('error 1 is: ' + e);         
      });

 
  
  
}



Sqlsts;
public Update_reg_status(Cont) {
  console.log('nimefika update_reg_status'  + Cont)
   //  console.log('updating 1 ' + Cont );
  // var Contents = Reg + ';' + Aliase + ';' + Where_status + ';' + Trips + ';'  + Ddist + ';'     + Ostatus + ';' + Alert + ';' + Ps_status
    var zote = Cont.split(";");
    var reg = zote[0];
    console.log('hii ndio iko kwa var reg'  + zote)
    var aliace  = zote[1]; 
    console.log('hii ndio iko kwa var aliace'  + zote)
    var Where_status =zote[2];
    console.log('hii ndio iko kwa var Where_status'  + zote)
    var Trips =zote[3];
    console.log('hii ndio iko kwa var Trips'  + zote)
    var Distance =zote[4];
    console.log('hii ndio iko kwa var Distance'  + zote)
    var Ostatus =zote[5];
    console.log('hii ndio iko kwa var Ostatus'  + zote)
    var Alert = zote[6];
    console.log('hii ndio iko kwa var Alert'  + zote)
    var Ps_status = zote[7];
    console.log('hii ndio iko kwa var Ps_status'  + zote)
    var Siku = zote[8];
    console.log('hii ndio iko kwa var Siku'  + zote)
    var lat = zote[9];
    console.log('hii ndio iko kwa var lat'  + zote)
    var lon = zote[10];
    console.log('hii ndio iko kwa var lon'  + zote)
  
    // this.mydb.db.executeSql.executeSql('create table cars(reg VARCHAR(32),Alias VARCHAR(32),w_status VARCHAR(32),Trips VARCHAR(32),Distance VARCHAR(32),O_status VARCHAR(32),alerts VARCHAR(32),ps_status VARCHAR(32),refreshed VARCHAR(32),lat VARCHAR(32),lon VARCHAR(32))', [])
    // .then(() => console.log('Executed SQL'))
    // .catch(e => console.log(e));

  //  let query = "SELECT reg,Alias FROM  cars where reg='" 
  //  console.log('Nimeselect from cars')
    // return this.mydb.db.executeSql(query, []). then(data =>{
    //   if (data.rows.length > 0){
      
    //   }
    // })
      //  console.log('selecting ' + reg );
      console.log('Nimeselect from cars part 2')
      var dbnow : String = this.dbname;
      this.sqlite.create({
        name: "" + dbnow,
        location: 'default'
      })

          .then((db: SQLiteObject) =>{
            db.executeSql('CREATE TABLE IF NOT EXISTS cars(KEY_ID INTEGER PRIMARY KEY, Alias VARCHAR(32), O_status VARCHAR(12),w_status VARCHAR(12)),Trips VARCHAR(22),alerts VARCHAR(22),Distance VARCHAR(22),ps_status VARCHAR(22),refreshed VARCHAR(22))', [])
            console.log('Nimecreate  reg from cars')
      this.mydb.db.executeSql("SELECT reg,Alias FROM cars where reg='" + reg + "'" , [])
    
        .then(res => {
          console.log('Nimeselect from cars part 2' + reg)
            if (res.rows.length > 0){
            // console.log('updating cars '  );
             this.Sqlsts = "update cars set  w_status='" + Where_status + "', Trips='" + Trips + "', Distance='" +
                                             Distance + "', O_status='" + Ostatus + "', alerts ='" + Alert +
                                             "', ps_status ='" + Ps_status + "', refreshed='" + Siku + 
                                              "', lat='" + lat + "', lon='" + lon + "'   where reg='" + reg + "'";
                                              console.log("About to update table cars" + reg )           
                 this.mydb. db.executeSql(this.Sqlsts, {})
                 console.log("Updated table cars")

                 db.executeSql('CREATE TABLE IF NOT EXISTS tblupdated(rowid INTEGER PRIMARY KEY, coltime VARCHAR(32))', [])
                 //.then(res => console.log('Created db updated'))      
                 .catch(e => console.log(e));
             console.log('Nimecreate tblupdated hiyo storo tumemaliza')

             this.Sqlsts = "update tblupdated set coltime='" + Siku + "'";
             this.mydb.db.executeSql(this.Sqlsts, {})
            // console.log('updated coltime ' + Siku  );
            console.log("Updating table tblupdated ")
            }else{              
            //  console.log('inserting cars '  );
           // db.executeSql('create table cars(name VARCHAR(32))', [])

           
         
            db.executeSql('CREATE TABLE IF NOT EXISTS cars(KEY_ID INTEGER PRIMARY KEY, reg VARCHAR(32), aliace VARCHAR(12),Ostatus VARCHAR(12)),Alert VARCHAR(22),Ps_status VARCHAR(22),Where_status VARCHAR(22),Trips VARCHAR(22),Distance VARCHAR(22))', [])
            console.log('Nimecreate  reg from cars')

          this.mydb.db.executeSql('INSERT INTO cars VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?)',[reg,aliace,"none",Ostatus,Alert,Ps_status,"none",Where_status,Trips,Distance,"0",lat,lon ])
            console.log("Inserting into table cars")
             // this.Sqlsts = "update tblupdated set coltime='" + Siku + "'";
             this.mydb.db.executeSql(this.Sqlsts, {})
             console.log('Sqlsts' + this.Sqlsts )
            //   console.log('inserted '  );
            }})
            .catch(e => {
              console.log('error 2 is: ' + e);         
            });

            console.log("Info inserted into tbl cars ")
   
    return this.Fetched_user;
  }) 
}





  public stringToHex(str) {
    //console.log('hexing');  
    
    try {
         var hex,i;
         var results = '';         
        for (i=0 ; i<str.length;i++){
          hex = str.charCodeAt(i).toString(16);
          results += ('000' + hex).slice(-2);
        }
       // console.log('hex is'  + hex);  
        return results;
      
    } catch (error) {
      console.log('error '  + error);  
    }
   
    }



    public HextoString(str) {
      // console.log('hexing back');  
       
       try {
            var j;
            var hexes = str.match(/.{1,4}/g) || [];
            var back = '';
 
           for (j=0 ; j<hexes.length;j++){
             back += String.fromCharCode(parseInt(hexes[j],16));
           }
          // console.log('hex back'  +back);       
           return back;
         
       } catch (error) {
         console.log('error '  + error);  
       }
      
       }
 


}

