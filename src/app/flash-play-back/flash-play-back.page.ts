import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Events} from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { ConnectService } from '../connect.service';
import { WcfService } from '../wcf.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-flash-play-back',
  templateUrl: './flash-play-back.page.html',
  styleUrls: ['./flash-play-back.page.scss'],
})
export class FlashPlayBackPage implements OnInit {
  public initDate: Date = new Date();
  ThisMessage = [''];
  theDataSource: Observable<any>;
  constructor(private datepipe:DatePipe,public wcf:WcfService,
    public Conn:ConnectService,public loadingController: LoadingController,
    private events:Events,private router: Router
    ) { }

    ngOnInit() {
      this.ThisMessage[0] = "Playback for "+ this.wcf.Reg;
    }
  
    latest_date;
    Contents='';
    loading: any;
    
  
    onehours(){
  console.log('nimefika at onehour')
      var siku  = this.initDate;
      this.latest_date = new Date(siku.getTime() - (1000 * 60 * 60 * 1));
      console.log('going to proceed')
     this.Proceed();
     console.log('proceed')
    }
    
    twohours(){
    
      var siku  = this.initDate;
      this.latest_date = new Date(siku.getTime() - (1000 * 60 * 60 * 2));
    
     this.Proceed();
    
    }
    
    
    sixhours(){
    
      var siku  = this.initDate;
      this.latest_date = new Date(siku.getTime() - (1000 * 60 * 60 * 6));
    
      this.Proceed();
    
    }
    
    
    twelvehours(){
    
      var siku  = this.initDate;
      this.latest_date = new Date(siku.getTime() - (1000 * 60 * 60 * 12));
     
      this.Proceed();
    
    }
    
    async  Proceed(){
    
      console.log('Im at proceed ')
        var siku  = this.initDate;
        console.log('Niko kwa proceed' + siku)
        let pday = this.datepipe.transform(this.latest_date, 'yyyy-MM-dd HH:mm:ss');  
        console.log('pday ' + this.latest_date);
        this.wcf.siku = pday;
        console.log('siku ' + pday);
        
       
         var isconnected =  this.Conn.try_connect();
         if (isconnected == true){            
           this.wcf.tracking_Msg = "";
           console.log('siku ' + this.wcf.tracking_Msg );
        console.log('Ninacheck net')
  
        const loading = await this.loadingController.create({
          message: 'Fetching data ...',
          duration: 90000  
        });
        await loading.present();
    
        const { role, data } = await loading.onDidDismiss();
    
        console.log('Loading dismissed!');
  
         
           console.log('Nimepita kwa net')
           this.Contents = this.wcf.Username + ";" + this.wcf.Password + ";" + this.wcf.Reg + ";" + this.wcf.siku;       
           console.log('Username is' + this.wcf.Username + this.wcf.Password + this.wcf.Reg + this.wcf.siku )
           this.wcf.flash_day_payback(this.Contents)
           .then((data)=>{
               this.wait_async_feedback(data);
    
             },
             (error) => {
               console.log('error iko: ' + error);
               this.ThisMessage[0] = error;
               alert(error);
                  try {
                    this.loading.dismiss();
                } catch (error) {            
                } 
             }
             
           );
         
    
    
       }else{          
         this.ThisMessage[0] = 'NO INTERNET ACCESS'; 
       }
    
    
    
        
    
      }
    
    
         
        
    wait_async_feedback(feedback){
      this.wcf.flightPlanCoordinates  = [];
      this.wcf.flightmarkers = [];
    
            try {
                this.loading.dismiss();
            } catch (error) {            
            }
         
          var zote = feedback.split(";"); 
          var pretime;
           for(let i=0; i<zote.length; i++){               
                var Desc = zote[i].split(",");  
               
                if (Desc.length>2) { 
    
                 
    
                    var speed =Desc[0];
                    var shorttime =Desc[1];
                    var l = +Desc[2]; 
                    var lon = +Desc[3]; 
                    var longdate = Desc[4]; 
                    //console.log('long date: ' + longdate);
    
                    if (i ==0){
                      pretime = longdate;                
                    }
    
    
                   var markerdesc = speed + ";" + shorttime + ";" + l + ";"+ lon +  ";" + longdate + ";" +  pretime + "!" ; 
                   
                   if (i>0){
                       pretime = longdate;
                     }
                
                 
                   this.wcf.flightmarkers += markerdesc;
                  
                 //  this.navCtrl.push(PlaybackflashPage);
                  
              }
                            
    
              }
              this.router.navigate(['/play-back-flash']);
           //   this.modalCtrl.dismiss();

              //this.navCtrl.push(PlaybackflashPage);
              this.events.publish('dash:flashplay');
    
                           
    }
    
  
}
