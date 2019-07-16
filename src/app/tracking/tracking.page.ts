import { Component, OnInit } from '@angular/core';
import { Events, LoadingController , Platform, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

import { DatePipe } from '@angular/common';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { WcfService } from '../wcf.service';
import { AuthService } from '../auth.service';
import { ConnectService } from '../connect.service';
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {
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


  theDataSource: Observable<any>;

  constructor(private router: Router,
    public events: Events,
    public loadingController: LoadingController,
     public mydb:AuthService,
     public actionSheetController: ActionSheetController,
     private Wcf:WcfService,
     private platform:Platform,
     private Conn: ConnectService,
     private datepipe:DatePipe,
     private modalCtrl:ModalController,
     private sqlite: SQLite
    ) { 

      this.items = [];
     
      this.pointerVisible = true;

      events.subscribe('dash:flashplay', () => {     
       this.flash_show();
       });

      

    }

    T_subscription;
    R_subscription;
    flash_show(){
      this.router.navigate(['/play-back-flash']);
     
    }

    
    clear_subs(){
      
      try {
        this.T_subscription.unsubscribe();         
      } catch (error) {
      }

      try {
        this.R_subscription.unsubscribe();         
      } catch (error) {
      }

      try {
         this.subscription.unsubscribe();         
       } catch (error) {
       }

       try {
        this.subscription2.unsubscribe();
      } catch (error) {
      }
           
      
    }

  

    async Reload(){
      const loading = await this.loadingController.create({
        message: 'Loading',
        duration: 6000
      });
      await loading.present();

      const { role, data } = await loading.onDidDismiss();

      console.log('Loading dismissed!');
    }
  
   


     ionViewWillEnter() {
       this.gettrips_online(); 
      this.get_local_trips();
       this.ShowRefreshed();
       this.Refresh_data();
      this.ThisMessage[0] = 'Loading......'; 
    
      
    
   }

   isnew = 0;

   Addnew(){
    this.router.navigate(['/fuel']);
   
   }
   Addnew_fin(){
    this.router.navigate(['/activities']);
   
   }

   Ecount = 0;
   net_iko = 1;
   StartTime: any =null; 
   get_local_trips(){
     console.log("nimefika huko came here through show")
     this.items = [];
     console.log('going to select from car  '  );
    var dbnow : String = this.dbname;
    this.sqlite.create({
      name: "" + dbnow,
      location: 'default'
      
    })
      .then((db: SQLiteObject) => {
    
    console.log('Nikokaribu ku create table')
        db.executeSql('CREATE TABLE IF NOT EXISTS cars(KEY_ID INTEGER PRIMARY KEY, Alias VARCHAR(32), O_status VARCHAR(12),w_status VARCHAR(22)),Trips VARCHAR(22),alerts VARCHAR(22),Distance VARCHAR(22),ps_status VARCHAR(22),refreshed VARCHAR(22))', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
console.log("nimeexecute storo")
     
     
this.mydb.db.executeSql("SELECT Alias,O_status,w_status,Trips,alerts,Distance,ps_status,refreshed FROM cars order by ps_status desc, alias asc" , [])

         .then(res => {
 
         
           for ( var i =0;i< res.rows.length; i++){     
          
               var Reg = res.rows.item(i).Alias;         
               console.log("niko kwa get_local_trips meanwhile Reg" + Reg )          
               var Online_status = res.rows.item(i).O_status;
               console.log("niko kwa get_local_trips meanwhile Online_status" + Online_status ) 
               var Where_status =res.rows.item(i).w_status;
               console.log("niko kwa get_local_trips meanwhile Where_status" + Where_status ) 
               var Trips = res.rows.item(i).Trips;  
               console.log("niko kwa get_local_trips meanwhile Trips" + Trips )            
               var SAlerts = res.rows.item(i).alerts;;
               console.log("niko kwa get_local_trips meanwhile SAlerts" + SAlerts ) 
               var Ddist = res.rows.item(i).Distance;
               console.log("niko kwa get_local_trips meanwhile Ddist" + Ddist ) 
               var Ps_status = res.rows.item(i).ps_status;
               console.log("niko kwa get_local_trips meanwhile Ps_status" + Ps_status ) 
               var lastupdate = res.rows.item(i).refreshed;
               console.log("niko kwa get_local_trips meanwhile lastupdate" + lastupdate ) 
               console.log('picked items in tbl cars  '  );
              // console.log('last updated db ' +  lastupdate );
 
               var Alert ="";
               console.log("niko kwa get_local_trips meanwhile Alert" + Alert ) 
           
               if (SAlerts.indexOf('0') >= 0){
                 Alert = '';   
               }else{
                 var al =0;
                 al = +SAlerts;
                 if (al<1){
                   Alert = '';  
                  }else if (al>1){
                   Alert = SAlerts + ' alerts..';  
                 }else{
                   Alert = SAlerts + ' alert...';  
                 }  
                 console.log("nimepita huko na nimepick item kwa tbl cars")                     
               }
                       
              
               
               var paths;
               if (Online_status.indexOf('Offline') >= 0){
                 paths ="assets/mat_offline.png"
               }else if (Online_status.indexOf('Static') >= 0){
                 paths ="assets/mat_grey.png"                     
               }else if (Online_status.indexOf('Moving') >= 0){
                 paths ="assets/mov_right.png"                     
               }else{
                 paths ="assets/mat_grey.png" 
                 Online_status="Static"                    
               }
               console.log('picking paths ');
               
                 
               var description;
               if (Ps_status.indexOf('no') >= 0){
              
                 description =  ',  ' + Ddist +'kms' ;
                   console.log("niko kwa get_local_trips meanwhile description" + description ) 
               }else{
                  description = ',  ' + Where_status + ',  ' + Trips + ' trips, ' + Ddist +'kms' ;
                  console.log("niko kwa get_local_trips meanwhile description" + description ) 
               }
 
               var Ostatus = Online_status.replace(/\\/g, "");
               console.log("na update online Ostatus" + Ostatus )
               var last_updated = "...";
 
              // console.log('time was ' + this.StartTime  );
 
               var lastupdated: any = new Date(lastupdate); 
               console.log("niko kwa get_local_trips meanwhile lastupdated" + lastupdated ) 
              // console.log('time is ' + lastupdated  );
 
               var millis = Date.now() - lastupdated;
               var githa =Math.floor(millis/1000);
               if (Math.floor(millis/1000) < 10){
                 last_updated = 'Live Update'; 
                 var paths2 ="assets/green.png"                     
               }else{
                 var min;
                // console.log("last updated " +  githa);
                 if (githa>120){
                   var paths2 ="assets/red.png" 
 
                   if (githa > 1000){
                     min=githa/3600  ;
                     last_updated = "Last updated in " + min.toFixed(2) + ' mins ago' ;
                    
                   }else{
                       min =githa/60  ;
                       last_updated = "Last updated in " + min.toFixed(1) + ' mins ago' ; 
                      
                   }            
                 }else{
                   last_updated = "Last updated in " + githa + 'S' ; 
                   var paths2 ="assets/green.png"           
                 }            
                 console.log('picking picking up last updates ');
                 }
 
                // console.log(Reg + ',' + last_updated);
 
                 if ( this.net_iko <1){
                   var paths2 ="assets/red.png" 
                   description = "No internet:  " + last_updated;
                   Ostatus="";
                   paths ="assets/mat_offline.png"
                   console.log('hakuna net cant update ');
                 }else{
                   last_updated = "";
                   console.log('kuna net na update');
                 }
               
 
                try {
                 this.items.push({
                 Path: paths,
                 
                 title: Reg,
                 note: description,
                 status: Ostatus,
                 alert: Alert,
                 Path2: paths2,                 
               });
               } catch (error) {
                 console.log('error ' + error);  
               }
                         
             }
           
  })
           })
             .catch(e => {
               console.log('error 2 is: ' + e);         
             });
            
                this.pointerVisible = false;           

                var dbnow : String = this.dbname;
                this.sqlite.create({
                  name: "" + dbnow,
                  location: 'default'
                  
                })
                  .then((db: SQLiteObject) => {
             console.log("ndio niko karibu kuselect coltime from tblupdated")
             this.mydb.db.executeSql("SELECT coltime FROM tblupdated" , []) 
             .then(res => {                
                 if (res.rows.length > 0){  
                   var githaa = res.rows.item(0).coltime;
                   console.log("ndio niko karibu kuselect coltime from tblupdated meanwhile githaa " + githaa )
                   this.StartTime = githaa;
                   console.log("ndio niko karibu kuselect coltime from tblupdated meanwhile   this.StartTime" +   this.StartTime )
                  // console.log('time was ' + this.StartTime  );
                 
                 }else{
                   console.log('I have not been able to connect and update so niko kwa else')
                  this. update_last_fetched();
                 }
               
               })
                 .catch(e => {
                   console.log('computing coltime error: ' + e);         
                 });
                });
    }
 
    ngOnInit() {
      this.ThisMessage[0] = 'Loading...'; 
      this.gettrips_online(); 
      this.get_local_trips();
      this.ShowRefreshed();
      this.Refresh_data();
    }



    async   gettrips_online(){
   
      // console.log('getting online');
         var isconnected =  this.Conn.try_connect();
         if (isconnected == true){            
           this.Wcf.tracking_Msg = "";
           if (this.isnew < 1){
             this.isnew=1;
             this.Contents = this.Wcf.Username + ";" + this.Wcf.Password;
             const loading = await this.loadingController.create({
              message: 'Loading latest ....',
              duration: 2000
            });
            await loading.present();
             
          
    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

     
           console.log("Going to pick pass,username and ...");
      
           //this.Contents = this.Wcf.Username + ";" + this.Wcf.Password + ";" + this.Wcf.User_id;
           this.Contents = "sconix" + ";" +   "Nicole"  + ";" + "C002";
           this.Wcf.get_trips_asynch(this.Contents)
           .then((data)=>{
            console.log("going to wait_asynch_feedback...");
      
               this.wait_async_feedback(data);
             },
             (error) => {
               console.log('error iko: ' + error.error);
               this.ThisMessage[0] = 'Off synch. Reconnecting….'; 
               console.log("Off synch...");
             }
           );
          
     
     
       }else{          
         this.ThisMessage[0] = 'NO INTERNET ACCESS';
          this.tafutanet();
          this.net_iko =0;
          console.log("Hakuna net so can't access...");
       }
     
     }
     
     wait_async_feedback(feedback){
      console.log("Hello welcome to wait_async_feedback... " + feedback);
      this.net_iko = 1;
      var zote = feedback.split(";");              

            for(let i=0; i<zote.length; i++){               
              var Desc = zote[i].split(",");  
              console.log("Napick from wait_async feedback... " + Desc);

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
                  console.log("nimepita niko kwa var...");
                 
                 
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
                  console.log("Tunaselect time...");
                  var saahii = new Date();
                  let latest_date =this.datepipe.transform(saahii, 'yyyy-MM-dd HH:mm:ss');
              
                                    
                  var Ostatus = Online_status.replace(/\\/g, "");              
                  var Contents = Reg + ';' + Aliase + ';' + Where_status + ';' + Trips + ';' 
                   + Ddist + ';'     + Ostatus + ';' + Alert + ';' + Ps_status + ';' + latest_date + ";" +  this.Wcf.lat + ';'  + this.Wcf.lon; 
                   console.log("Going to update_reg_status...");                   
                 this.Wcf.Update_reg_status(Contents);
                   
            
            }
                          
  
            }

                        
                  try {
                    this.loading.dismiss();
                  } catch (error) {            
                  }

 
  }

  update_last_fetched(){
    console.log("Hello welcome to Update_last_fetched...");
    //updating time updated
    var saahii = new Date();
    let latest_date =this.datepipe.transform(saahii, 'yyyy-MM-dd HH:mm:ss');
    var dbnow : String = this.dbname;
    this.sqlite.create({
      name: "" + dbnow,
      location: 'default'
      
    })
      .then((db: SQLiteObject) => {
    
    console.log('Nikokaribu ku create table')
        db.executeSql('CREATE TABLE IF NOT EXISTS tblupdated(KEY_ID INTEGER PRIMARY KEY, coltime BLOB', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
console.log("nimeexecute storo")



   console.log('ninafika hapa kwa update_last_fetched meanwhile ' +  latest_date)
    this.mydb.db.executeSql("SELECT coltime FROM tblupdated" , {})
    
    .then(res => {                
        if (res.rows.length > 0){                        
          this.mydb.db.executeSql("update tblupdated set coltime='" + latest_date + "'", {})  
          console.log("updating tblupdated...");
        // console.log('updated new date ' + latest_date );            
        }else{               
          this.mydb.db.executeSql('INSERT INTO tblupdated VALUES(NULL,?)',[latest_date]);  
          console.log("inserting into tblupdated...");  
         // console.log('inserted new date ' + latest_date );          
        }
      })
      .catch(e => {
        console.log('error tblupdated is: ' + e);         
      });
    });



}


 
isconnected=false;
  
tafutanet(){

  
  console.log("hakuna net at natafutanet...");
 // let timer = Observable.timer(5000, 9000);
  //var sub = timer.subscribe(t => {
   this.isconnected =  this.Conn.try_connect();
    if (this.isconnected == true){  
      console.log('tafuta');      
     // sub.unsubscribe();
      this.gettrips_online();
    }else{
      this.isconnected = false;
      this.ThisMessage[0] = 'NO INTERNET ACCESS'; 
      this.net_iko =0;
      console.log("No net access at Natafuata net access...");
      try {
        clearTimeout(this.R_subscription);
      } catch (error) {          
      }
    
    }
  }
  //});

  Refresh_data(){

  //  let timer = Observable.timer(5000, 9000);
    //this.R_subscription = timer.subscribe(t => {
      this.gettrips_online();
      this.get_local_trips();
      console.log('fetching '  );
  //  })


  }


  ShowRefreshed(){

   console.log('haya nimefika kwa show refreshed ')
    this.T_subscription = setTimeout(x => 
      {
        console.log('haya nimefika kwa show refreshed na niko ndani ')
         //this.ShowRefreshed();
         this.get_local_trips();
         console.log('haya nimetoka kwa get_local_trips i am back at show refreshed ')
         var lastupdated: any = new Date(this.StartTime);   
         console.log('niko bado kwa showrefreshed meanwhile lastupdated '   + lastupdated )     
         var millis = Date.now() - lastupdated;
         console.log('niko bado kwa showrefreshed meanwhile millis'  + millis )     
         var githa =Math.floor(millis/1000);
         console.log('niko bado kwa showrefreshed meanwhile githa'  + githa )    
         if (Math.floor(millis/1000) < 10){
           this.ThisMessage[0] = 'Live Update';                     
         }else{
          console.log('niko bado kwa showrefreshed meanwhile i am not giving a live update so niko kwa else ya if'  + githa ) 
           var min;
           if (githa>60){
            if (githa > 1000){
              min=githa/3600  ;
              this.ThisMessage[0] = min.toFixed(2) + ' mins Ago' ;
            }else{
                min =githa/60  ;
               this.ThisMessage[0] = min.toFixed(2) + ' mins ago' ; 
            }            
           }else{
             this.ThisMessage[0] =  githa + ' seconds' ;           
           }
       
          }
     
         
      }, 10000); 
  }



  Vehicle;
 
  

    ThisMessage3 = [''];
   
    
      count=0;
    


    
        itemTapped(event, item) {
   
   
          this.presentActionSheet(item.title,item.status);
          console.log('Nimeenda kwa presentActionSheet' +  item.status + item.title )
        }
      
      

        async presentActionSheet(Reg,status) {

          this.Wcf.Reg = Reg;
          this.Wcf.Wherestatus=status;
    

          const actionSheet = await this.actionSheetController.create({
        
            cssClass: 'action-sheets-basic-page',
            header: Reg,
            buttons: [{
              text: 'LIVE TRACK',
              role: 'destructive',
              icon: !this.platform.is('ios') ? 'information-circle' : null,
              handler: () => {
                console.log('Tracking ' +this.Wcf.Reg );
                this.router.navigate(['/live-tracking']);
              }
            }, {
              text: 'FLASH PLAYBACK',
              role: 'destructive',
              icon: !this.platform.is('ios') ? 'information-circle' : null,
              handler: () => {
                let profileModal = this.router.navigate(['/flash-play-back']);
              }
            }, {
              text: 'SHOW ALERT',
                      role: 'destructive',
                      icon: !this.platform.is('ios') ? 'information-circle' : null,
                     handler: () => {
                      let profileModal = this.router.navigate(['/alerts']);
            }
            }, {
               text: 'Close',
                role: 'cancel',
               icon: !this.platform.is('ios') ? 'close-circle' : null,
               handler: () => {
            }
            
            }]
          });
          await actionSheet.present();
        }
      

      

        ionViewCanLeave() {
          console.log("leaving home now...");
      
          try {
           // this.subscription.unsubscribe ();
          } catch (error) {
           // console.log(error);
          }
         
      
        }
      


        ionViewDidLeave() {
          console.log("left home...");
           this.clear_subs();
          clearTimeout(this.T_subscription);
          clearTimeout(this.R_subscription);
         // console.log("destroyed");
      
         
      
        }

 


        back(){
          this.router.navigate(['/dashboard']);
        }

      }
