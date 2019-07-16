import { Component, OnInit } from '@angular/core';
import { Events, Platform } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

import { DatePipe } from '@angular/common';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { LoadingController } from '@ionic/angular';
import { ConnectService } from '../connect.service';
import { WcfService } from '../wcf.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable, of, timer, observable } from 'rxjs';
@Component({
  selector: 'app-fuelper',
  templateUrl: './fuelper.page.html',
  styleUrls: ['./fuelper.page.scss'],
})
export class FuelperPage implements OnInit {
  theDataSource: Observable<any>;
  //theDatatimer:  timer<any>;
  public dbname: String ="S11";
  orders: string = "activities";
  pointerVisible: boolean = false;
  pointerVisible2: boolean = true;
  pointerVisible3: boolean = true;
  pointerVisible33: boolean = true;
  pointerVisible4: boolean = true;

  Contents='';
  selectedItem: any;
  icons: string[];
  subscription; 
  subscription2; 
  items: Array<{Path:string, title: string, note: string,status:string,alert:string,Path2:string}>;
  items_pnl: Array<{title: string, income: string, expenses: string, path: string,bal:string,siku:string}>;
  items_mile: Array<{title: string, note: string,Dist:number,Kms:string,siku:string}>;
  Msg_date : Array<{date: string}>;

  filters: Array<{vehicles: string, dates: string, Amo: string}>;
  ThisMessage = [''];
  ThisMessage2 = [''];
 
  Msgdates = [''];
  loading;
  constructor(
    public loadingController: LoadingController,
    private router: Router,
    public events: Events,
     public mydb:AuthService,
     public actionSheetController: ActionSheetController,
     private Wcf:WcfService,
     private platform:Platform,
     private Conn: ConnectService,
     private datepipe:DatePipe,
     
     private sqlite: SQLite

  ) { 
    this.items = [];
    this.items_pnl = [];
    this.items_mile = [];
    this.pointerVisible = true;

    events.subscribe('dash:flashplay', () => {     
      this.flash_show();
     });


  }



  flash_show(){
    this.router.navigate(['/play-back-flash']);
  }

  
  clear_subs(){
      
    try {
      this.T_subscription.unsubscribe();         
    } catch (error) {
     // console.log(error);
    }

    try {
      this.R_subscription.unsubscribe();         
    } catch (error) {
     // console.log(error);
    }

    try {
       this.subscription.unsubscribe();         
     } catch (error) {
      // console.log(error);
     }

     try {
      this.subscription2.unsubscribe();
    } catch (error) {
     // console.log(error);
    }
         
    
  }



  async Reload(){

    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 6000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');



   }


  ngOnInit() {
  
    this.Refresh_data();

  }

  isnew = 0;
  ionViewDidLoad() {
   this.ThisMessage[0] = 'Loading...'; 
  
  }

  

  Addnew(){
   this.router.navigate(['/fuel']);
  
  }
  Addnew_fin(){
   this.router.navigate(['/activities']);
  
  }


     
  Ecount = 0;
  net_iko = 1;

  wait_async_feedback(feedback){
    this.net_iko = 1;
    var zote = feedback.split(";");              

          for(let i=0; i<zote.length; i++){               
            var Desc = zote[i].split(",");  
           
            if (Desc.length>2) { 
           
                var Reg =Desc[0];
                var L =Desc[1];
                var Lo =Desc[2];   
                this.Wcf.lat=L;
                this.Wcf.lon=Lo;           
                var Online_status = Desc[4];
                var Where_status = Desc[5];
                var Trips =Desc[10];
                var Aliase =Desc[11];
                var SAlerts = Desc[13];
                var Ddist = Desc[14];
                var Ps_status = Desc[15];

               
               
                var Alert ="";
                if (SAlerts.indexOf('0') >= 0){
                  Alert = '';   
                }else{
                  var al =0;
                  al = +SAlerts;
                  if (al>1){
                    Alert = SAlerts ;  
                  }else{
                    Alert = SAlerts ;  
                  }                       
                }

                var saahii = new Date();
                let latest_date =this.datepipe.transform(saahii, 'yyyy-MM-dd HH:mm:ss');
            
                                  
                var Ostatus = Online_status.replace(/\\/g, "");              
                var Contents = Reg + ';' + Aliase + ';' + Where_status + ';' + Trips + ';' 
                 + Ddist + ';'     + Ostatus + ';' + Alert + ';' + Ps_status + ';' + latest_date + ";" +  this.Wcf.lat + ';'  + this.Wcf.lon; 
                                                 
                this.Wcf.Update_reg_status(Contents);
                 
          
          }
                        

          }

                      
                try {
                  this.loading.dismiss();
                } catch (error) {            
                }


}

update_last_fetched(){

  var saahii = new Date();
  let latest_date =this.datepipe.transform(saahii, 'yyyy-MM-dd HH:mm:ss');
 
  this.mydb.db.executeSql("SELECT coltime FROM tblupdated" , {})
  .then(res => {                
      if (res.rows.length > 0){                        
        this.mydb.db.executeSql("update tblupdated set coltime='" + latest_date + "'", {})  
           
      }else{               
        this.mydb.db.executeSql('INSERT INTO tblupdated VALUES(NULL,?)',[latest_date]);    
      
      }
    })
    .catch(e => {
      console.log('error tblupdated is: ' + e);         
    });




}



isconnected=false;



tafutanet(){
   this.isconnected =  this.Conn.try_connect();
    if (this.isconnected == true){  
      console.log('tafuta');      
   
    }else{
      this.isconnected = false;
      this.ThisMessage[0] = 'NO INTERNET ACCESS'; 
      this.net_iko =0;
      try {
 
      } catch (error) {          
      }
    
    }


}



R_subscription;
Refresh_data(){

    console.log('fetching '  );
 


}



T_subscription;
StartTime: any =null; 



Vehicle;
 
async get_latest_pnl(){
  

  this.Contents = this.Wcf.Username + ";" + this.Wcf.Password;
  const loading = await this.loadingController.create({
    message: 'Loading finances...',
    duration: 6000
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();

  console.log('Loading dismissed!');


  this.Wcf.get_day_latest(this.Contents) 
  .then((data)=>{
     
   
     this.wait_async_PNL(data);
   },
   (error) => {
     console.log('error iko: ' + error.error);
     alert("Sorry, we have encoutered an error while processing the request");
   
   }
   );

}



  
wait_async_PNL(feedback){
  this.items_pnl = []; 
  this.Msg_date = []; 
  this.filters = [];  
 
      try {
        this.loading.dismiss();
      } catch (error) {            
      }

      console.log('feedback: ' + feedback + ' length ' + feedback.length);
      if (feedback.length>3){
        this.pointerVisible2 =false;
      }else{
        return
      }

          var Msg = feedback.split("*");
          var total = Msg[0].trim();
          var others = Msg[1].trim();
          var zote = others.split("|");

         var Tosho = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.ThisMessage2[0] = "Ksh. " + Tosho;
          var paths;
            console.log("zote is: " + zote);

              for(let x=0; x<zote.length; x++){   
                var Desc = zote[x].split("!"); 
                   if (Desc.length>1) { 
                      var inc = Desc[0].trim();
                      var Exp;
                      if (Desc.length>1) { 
                        Exp = Desc[1].trim();
                      }else{
                        Exp = "";
                      }
                     

                      var income = inc.split(";");                     

                      var Daycash = +income[1].trim();
                      var header = income[0].trim();                       
                      var offload = income[2].trim();

                     // Reg & " : " & dates
                     var hd = header.split(":");
                     var sk = hd[1];
                     

                     var lastupdated: any = new Date(sk);        
                     var millis = Date.now() - lastupdated;
                     var githa = Math.floor(millis/1000);
                     var githa2 = Math.floor(githa/3600);
                     var gtoshow;

                     if (githa2<24){
                       gtoshow = "LATEST UPDATE: Today";
                     }else if  (githa2<48){
                      gtoshow = "LATEST UPDATE: yesterday";
                     }else{
                      gtoshow = "LATEST UPDATE: More than 2 days ago";
                     
                     }
                                      

                      if (Daycash<=0){
                        paths ="assets/red.png"; 
                      }else{
                        paths ="assets/green.png"; 
                      }
                                          
                   
                      var Tosho = offload.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      var Tosho2 = Exp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      var Tosho3 = Daycash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      this.items_pnl.push({
                        title: header,
                        income: Tosho,
                        expenses: Tosho2,
                        path: paths,
                        bal:  Tosho3,
                        siku: gtoshow            
                      });

                      if (x<1){
                         this.Msg_date.push({date:gtoshow});
                      }
                                  
              
              
            }
            
    }
   
  }

  
  
  ThisMessage3 = [''];
   
 
     
    count=0;
    

      ionViewDidLeave() {
        console.log("left home...");
         this.clear_subs();
        clearTimeout(this.T_subscription);
        clearTimeout(this.R_subscription);
      }
    



      back(){
        this.router.navigate(['/vehicle-performance']);
      }


  
}
