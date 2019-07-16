import { Component, OnInit, AfterContentInit, ViewChild  } from '@angular/core';
import { Events, LoadingController , Platform, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

import { DatePipe } from '@angular/common';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { Observable } from 'rxjs';
import { ConnectService } from '../connect.service';
import { AuthService } from '../auth.service';
import { WcfService } from '../wcf.service';
import { Router } from '@angular/router';
declare var google;
@Component({
  selector: 'app-live-tracking',
  templateUrl: './live-tracking.page.html',
  styleUrls: ['./live-tracking.page.scss'],
})
export class LiveTrackingPage implements OnInit, AfterContentInit {
  map;
markers = [];  
  subscription2;
  Loading: any;
  SelMethod = ['']; 
  flightPlanCoordinates;
  flightmarkers;
 
  @ViewChild('mapElement') mapElement; 
  theDataSource: Observable<any>;

  constructor(
    private router: Router,
    public events: Events,
    public loadingController: LoadingController,
     public mydb:AuthService,
     public actionSheetController: ActionSheetController,
     private wcf:WcfService,
     private platform:Platform,
     private Conn: ConnectService,
     private datepipe:DatePipe,
     private modalCtrl:ModalController,
     private sqlite: SQLite


  ) { 

  }
 
  ngOnInit() : void {
  }

ngAfterContentInit() : void {

  this.map = new google.maps.Map(
    this.mapElement.nativeElement,
    {

      center : {lat: -34.397, lng: 150.644},
      zoom: 8
    });


}
ionViewDidEnter() {
  this.platform.ready().then(() => {
    this.initMap();
  });
}



loaded=0;

initMap() {
 var lat1=-1.2680238;
 var lon1 = 36.8281785;
 this.flightPlanCoordinates  = [];
 this.count=0;

 
 this.map = new google.maps.Map(this.mapElement.nativeElement, {
   zoom: 15,
      center: {lat: lat1, lng: lon1}
 });

    this.get_local_trips();
    this.refresh();

}


refreshsubscription;
prelatlon=null;
prelat;
prelon;
prestatus="";
infoWindow;
Contents;
items: Array<{Path:string, title: string, note: string,status:string,alert:string,Path2:string,updated:string}>;

refresh(){

  //this.refreshsubscription = Observable.interval(2000).subscribe(x => { 

    this.prelatlon = new google.maps.LatLng(this.wcf.nowlat,this.wcf.nowlon); 
    this.prelat=this.wcf.nowlat;
    this.prelon=this.wcf.nowlon; 

    this.gettrips_online();
    this.get_local_trips();
  // });

}

  
gettrips_online(){
   
  console.log('getting online');
      this.wcf.tracking_Msg = "";      

      this.Contents = this.wcf.Username + ";" + this.wcf.Password + ";" + this.wcf.User_id;
      this.wcf.get_trips_asynch(this.Contents)
      .then((data)=>{
          this.wait_async_feedback(data);
        },
        (error) => {
          console.log('error iko: ' + error.error);
          //this.ThisMessage[0] = 'Off synch. Reconnecting….'; 
        }
      );
     


 

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
                    this.wcf.lat=L;
                    this.wcf.lon=Lo;           
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
                     + Ddist + ';'     + Ostatus + ';' + Alert + ';' + Ps_status + ';' + latest_date + ";" +  this.wcf.lat + ';'  + this.wcf.lon; 
                                                     
                    this.wcf.Update_reg_status(Contents);
                     
              
              }
                            
    
              }

                          
                 

   
    }

    



ionViewCanLeave() {
// console.log("leaving tracking now...");
 try {
   this.refreshsubscription.unsubscribe();
 } catch (error) {
   
 }

}



address: any = {
  place: '',
  set: false,
  latlng: google.maps.LatLng
};


dblat;
dblon;
Onlinestatus;
count=0;
marker;

get_local_trips(){
  
         
  this.mydb.db.executeSql("SELECT O_status,lat,lon FROM cars where Alias='" + this.wcf.Reg + "'" , {})
      .then(res => {

       this.items = [];
       if (res.rows.length > 0){
                                  
            this.Onlinestatus= res.rows.item(0).O_status;
            this.dblat = res.rows.item(0).lat;
            this.dblon= res.rows.item(0).lon;
                       
            console.log("local is: " + this.wcf.Reg + ','+ this.dblat + ',' + this.dblon);

            let updatelocation = new google.maps.LatLng(this.dblat,this.dblon);
            this.map.setCenter(updatelocation);

            var infoWindowContent; 
            var paths;
            var Online_status = this.Onlinestatus;
                              
                              if (Online_status.indexOf('Offline') >= 0){
                                paths ="assets/mat_offline.png"
                              }else if (Online_status.indexOf('Static') >= 0){
                                paths ="assets/mat_grey.png"                     
                              }else if (Online_status.indexOf('Moving') >= 0){
                                paths ="assets/mov_right.png"                     
                              }else{
                                paths ="assets/mat_grey.png"                     
                              }


                if  (this.count <1){
                  console.log("hapa 1 ");
                this.map.setCenter(updatelocation);  
                this.marker = new google.maps.Marker({
                      position: updatelocation,
                      map: this.map,
                      icon: paths, 
                      title:this.wcf.Reg,       
                    });

                    infoWindowContent =  this.wcf.Reg + "<br\> " + Online_status; 
                    this.infoWindow = new google.maps.InfoWindow({
                      content: infoWindowContent
                    }); 
                    this.infoWindow.open(this.map, this.marker); 

              }else{
                  infoWindowContent =  this.wcf.Reg + "<br\> " + Online_status;  
                  this.marker.setPosition(updatelocation);
                  this.infoWindow.setContent(infoWindowContent);  
                
              }

             
             
              this.flightPlanCoordinates.push({lat:  +this.dblat, lng: +this.dblon })

              var flightPath = new google.maps.Polyline({
                path: this.flightPlanCoordinates,
                geodesic: true,
                strokeColor: '#0000FF',
                strokeOpacity: 1.0,
                strokeWeight: 3
              });
      
              this.prelat = +this.dblat;
              this.prelon = +this.dblon;
           
              flightPath.setMap(this.map);

              this.count +=1

                      
            }

            }) 
            .catch(e => {
              console.log('error 2 is: ' + e);         
        }); 
            
           

  
}



ionViewDidLeave(){
  this.events.publish('set:reload');
  console.log("left");
  this.modalCtrl.dismiss();

}


}
