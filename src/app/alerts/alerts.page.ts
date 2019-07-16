import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ConnectService } from '../connect.service';
import { WcfService } from '../wcf.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {
  Contents='';
  subscription2;
  subscription;
  items: Array<{title: string,note: string}>;
  loading;
  ThisMessage = [''];

  constructor(private Wcf:WcfService,
    public Conn:ConnectService,
 
    public loadingCtrl:LoadingController,
    private router: Router
    ) { }

  
    ShowList(){
      console.log('nimefika kwa showlist on ngOnInit')
      this.Contents = this.Wcf.Username + ";" + this.Wcf.Password + ";" + this.Wcf.Reg;
      console.log('nimefika kwa showlist meanwhile  this.Contents' +  this.Contents)
      this.Wcf.get_shedules_alert(this.Contents);  
      console.log('nimeenda kwa get_schedules_alert meanwhile' + this.Contents )
        this.wait_async_feedback();
   
  
    }


    wait_async_feedback(){
      console.log("nimefika kwa wait_async_feedback from showlist")
      this.items = [];  
      console.log("nimefika kwa wait_async_feedback from showlist meanwhile this.items"  + this.items)
      if (this.Wcf.feedback_Msg == ""){ 
        console.log("nimefika kwa wait_async_feedback from showlist meanwhile this.Wcf.feedback_Msg"  + this.Wcf.feedback_Msg)
        setTimeout(() => {
          console.log('nimefika kwa setTimeOut')
          if (this.Wcf.feedback_Msg === "Wait.."){
           // this.subscription2.unsubscribe ();
          }
          console.log('nimefika kwa settimeout na nimetoka huko')
        }, //30000
        );       
      
        
      }else{ 
        console.log('nimefika kwa settimeout niko kwa subscription2')
        //  this.subscription2.unsubscribe ();
    
    
              if (this.Wcf.feedback_Msg.indexOf('No Data') >= 0){
                
        console.log("nimefika kwa wait_async_feedback from showlist meanwhile  this.ThisMessage[0] "  +  this.ThisMessage[0] )
     
                this.ThisMessage[0] = "No Alert for "+ this.Wcf.Reg;
    
                  this. dismissthis();
          
    
                return;
              }
    
              var zote = this.Wcf.feedback_Msg.split("|");
               console.log('sheduled zote ' +zote );
    
                for(let i=0; i<zote.length; i++){               
                  var Desc = zote[i].split(";");  
                 console.log('Desc ' +Desc );
    
                  if (Desc.length>1) { 
                      var stype = Desc[3].trim();
                      var nextd = Desc[1].trim();
                                        
                      this.items.push({
                        title:  stype + ':',
                        note:  'Due on ' + nextd               
                      });
    
                     // console.log('sheduled return 2' +zote );
    
                  }
                
                }
    
                  
        }
     
       
      }
    
    
    
      
      dismissthis(){  
       
        this.router.navigate(['/tracking']);
       
      }
    


  ngOnInit() {
    console.log('Niko kwa ngOnInit')
    this.ThisMessage[0] = "Alerts for "+ this.Wcf.Reg;
    console.log('Niko kwa ngOnInit meanwhile this.ThisMessage[0] ' + this.ThisMessage[0] )
    this.ShowList();
    console.log('Ndio naenda kwa showlist '  )
  }

}
