import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { WcfService } from '../wcf.service';
import { ConnectService } from '../connect.service';
@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.page.html',
  styleUrls: ['./new-schedule.page.scss'],
})
export class NewSchedulePage implements OnInit {
  Contents='';
  subscription;
  subscription2;
  constructor(

    public Wcf:WcfService,
    public Conn:ConnectService,
    public events:Events,
    private router: Router

  ) { }

  ngOnInit() {
  }

  usage={
    type:'',
    date:'',
    days:'',
    txtphone:'',
    reg:'',
    amo:'',
    des:'',
  }
  ThisMessage = [''];

   
 proceed(){
  var stype  = this.usage['type'];
  var Desc  = this.usage['des'];
  var Reccu = this.usage['days'];
 
  
 //console.log("dates: " + latest_date);

 this.ThisMessage[0] = "";

   if (stype.length<1){    
     this.ThisMessage[0] = "Please schedule type";
     return;
   }

   if (Desc.length<1){    
     this.ThisMessage[0] = "Please enter description";
     return;
   }
   
   if (Reccu.length<1){    
    this.ThisMessage[0] = "Please enter reccuring days";
    return;
  }



  this.ThisMessage[0] = "Please wait...";
  this.Contents = this.Wcf.Username + ";" + this.Wcf.Password + ";" + stype + ";" + Reccu + ";" + Desc + ";" + this.Wcf.User_id;


    var isconnected =  this.Conn.try_connect();
    if (isconnected == true){
       this.Wcf.add_schedule(this.Contents);      
    //   this.subscription = Observable.interval(2000).subscribe(x => {
         this.wait_async();
     //  });
  
      }else{
        this.ThisMessage[0] = "No internet connection.";
      }

  }


  wait_async(){
    console.log('awaiting..' + this.Wcf.Prompt_Msg);    
    if (this.Wcf.Prompt_Msg == "Wait.."){ 

      setTimeout(() => {
        if (this.Wcf.Prompt_Msg === "Wait.."){
      this.subscription.unsubscribe ();
          this.ThisMessage[0] = "Sorry, cannot contact our servers at the moment. Please try again later"; 
         this.subscription.unsubscribe ();
        }
      }, 30000);       

      
    }else if (this.Wcf.Prompt_Msg == "Success"){ 
       // this.subscription.unsubscribe ();
        this.ThisMessage[0] = "GREAT!!"; 
        this.usage['type'] = "";
        this.usage['des'] = "";
        this.usage['days'] = "";
                  
     }else if ( this.Wcf.Prompt_Msg === "Error"){
          this.ThisMessage[0] = "Sorry, unexpected error occurred. Please try again later."; 
          this.subscription.unsubscribe ();
       
        }else if (this.Wcf.Prompt_Msg == "record exists"){ 
          this.ThisMessage[0] = "Sorry, record exists"; 
          this.subscription.unsubscribe ();

      }
   
    }

    dismissthis(){  
      this.router.navigate(['/schedule']);
    
    }

back(){
  this.router.navigate(['/dashboard']);
}


}
