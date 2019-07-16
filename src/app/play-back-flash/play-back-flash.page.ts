import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Events, Platform } from '@ionic/angular'
import { Router } from '@angular/router';
import { WcfService } from '../wcf.service';
import { AuthService } from '../auth.service';
import { ConnectService } from '../connect.service';
declare var google;
@Component({
  selector: 'app-play-back-flash',
  templateUrl: './play-back-flash.page.html',
  styleUrls: ['./play-back-flash.page.scss'],
})
export class PlayBackFlashPage implements OnInit {
  map;

  markers = [];  
  subscription2;
  loading: any;
  SelMethod = [''];  
  ThisMessage = [''];
  ThisMessage2 = [''];
  Contents='';
  infoWindow;
   
  public initDate: Date = new Date();
  
   
  
  subscription;
  loaded=0;
  count=0;
  marker;
  prelat;
  prelon;
  
  Static_mins=10;
    constructor(private datepipe:DatePipe,
      public events:Events,
      public platform:Platform,
      private mydb:AuthService,
      private wcf:WcfService,
      public Conn:ConnectService,
     
      private router: Router
  
      ) { }
    @ViewChild('mapElement') mapElement;
  
  
  ngOnInit() : void {

  }



ngAfterContentInit(): void {

this.map = new google.maps.Map(
  this.mapElement.nativeElement,
  {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

}

ionViewDidEnter() {
  this.platform.ready().then(() => {
   this.initMap();     
   this.Playback();
  });
}


lauch_filter(){

  // this.navCtrl.push(TripsFilterPage);

     let profileModal =   this.router.navigate(['/trips-filter']);
     
    //  profileModal.present();

 }

  
 initMap() {
console.log('Niko kwa initMap')
  var lat1=-1.2680238;
  var lon1 = 36.8281785;

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      
      zoom: 15,
       center: {lat: lat1, lng: lon1},
       disableDefaultUI: true
    });
     console.log('Nimepika kwa disabledefaultUi:true')
     this.ThisMessage[0] = "Static =: " + this.Static_mins + " mins ";
     console.log('Ndio hii info'+  this.ThisMessage[0] + "Ndio natoka kwa InitInfo")
}

   
StopPlay(){
  //this.flightPlanCoordinates  = [];
  console.log("tuko kwa stop play sasa")
  this.count=0;
  try {
   // this.subscription.unsubscribe ();
  } catch (error) {}
  this.ThisMessage[0] = this.wcf.siku + ":  Stopped";
  console.log("tuna toka stop play sasa" +   this.ThisMessage[0] )
}


pausePlay(){
  
  try {
    console.log("Tuko kwa Pause play")
 //   this.subscription.unsubscribe ();
  } catch (error) {}
  this.ThisMessage[0] = this.wcf.siku + ":  Paused";

  console.log("Tuko kwa Pause play"  + this.ThisMessage[0] )
}


Playback(){ 
  this.ThisMessage[0] = "Static : " + this.Static_mins + " mins : ";
  try {
    this.subscription.unsubscribe ();
  } catch (error) {}
  
  this.wait_async();
  console.log("Niko kwa wait_asynch")
  //this.subscription = Observable.interval(2000).subscribe(x => {
   // this.wait_async();
  //});

}


Playback2(){
  console.log("Nimefika kwa playback2")
  this.ThisMessage[0] = "Static =: " + this.Static_mins + " mins " + " : X1";  
  try {
    this.subscription.unsubscribe ();
  } catch (error) {}
 // this.subscription = Observable.interval(1000).subscribe(x => 
 console.log('Ndio naenda kwa wait_async')
    this.wait_async();
   
  //});

}


Playback3(){
console.log("Niko kwa Playback3")
  this.ThisMessage[0] = "Static =: " + this.Static_mins + " mins " + " : X2"; 
  try {
    this.subscription.unsubscribe ();
  } catch (error) {} 
  console.log("Ndio naenda kwa wait_async")
 //  this.subscription = Observable.interval(500).subscribe(x => {
    this.wait_async();
  //});

}

Set_static_mins_five(){
  console.log("Niko kwa set_static_mins_five")
  this.Static_mins =5;
  this.ThisMessage[0] = "Static =: " + this.Static_mins + " mins "; 
  console.log("Niko kwa set_static_mins_five" +  this.ThisMessage[0])
  }



  Set_static_mins_ten(){
    console.log("Ndio niko kea set_static_min_ten")
    this.Static_mins = 10;
    this.ThisMessage[0] = "Static =: " + this.Static_mins + " mins "; 
    }


    
wait_async(){
  console.log("Nimefika kwa wait async ndio nachambua"  )
  
  var zote = this.wcf.flightmarkers.split("!");  
  var imax =  zote.length;  

console.log("Nimepita the initial stage of wait async where " + this.wcf.flightmarkers.split("!") + zote.length )
try {

  if (zote[this.count].length>1){
console.log('Niko bado kwa wait async and my count lenght is more than 1 so na proceed')
 
      var Desc = zote[this.count].split(";"); 
    //  console.log("zote: " + Desc);
console.log("vat Des ni" + zote[this.count].split(";") )
      var speed = Desc[0];
      console.log("vat speed ni" + Desc[0] )
      var shorttime = Desc[1];
      console.log("vat shorttime ni" +  Desc[1] )
      var l = +Desc[2]; 
      console.log(" var l ni" +  Desc[2] )
      var lon = +Desc[3]; 
      console.log(" var lon  ni" +  Desc[3] )
      var ntime = Desc[4];
      console.log(" var ntime   ni" +  Desc[4] )
      var pretime = Desc[5];
      console.log(" var pretime   ni" +  Desc[5] )
     
       var paths ="assets/move.png" 
       let updatelocation = new google.maps.LatLng(l,lon);
      
       var infoWindowContent; 
     console.log('Var infowindowcontent' + infoWindowContent)
       if  (this.count <1){
           console.log("hapa 1 ");
          this.map.setCenter(updatelocation);  
             this.marker = new google.maps.Marker({
                position: updatelocation,
                map: this.map,
                icon: paths, 
                title:this.wcf.Reg,       
              });
             console.log("Nilikuwa kwa Marker niki update location" + updatelocation + "ndio location" )
             console.log("Nilikuwa kwa Marker niki update map" + this.map+ "ndio map location" )
             console.log("Nilikuwa kwa Marker niki update icons" + paths+ "ndio paths " )
             console.log("Nilikuwa kwa Marker niki update title" + this.wcf.Reg+ "ndio car reg from wcf " )
             infoWindowContent =  this.wcf.Reg + "<br\> Time: " + shorttime + "<br\> speed: " + speed + ' km/h'; 
             console.log('Infowindowcontent ikona ' +  this.wcf.Reg +  shorttime + speed )
             this.infoWindow = new google.maps.InfoWindow({
                content: infoWindowContent
              }); 
              this.infoWindow.open(this.map, this.marker); 
              
        }else{
          
            console.log("nimepata count is less that 1 so niko kwa else")
            var EntryTt: any = new Date(ntime);   
            console.log('var EntryTF is = to' + ntime )
            var ExitTt: any = new Date(pretime);       
            console.log('var ExitTt is = to' + pretime )
            var millis = EntryTt - ExitTt;
            console.log('nacaculate miles sasa which is  ' +  millis  )
            var githaSec = Math.floor(millis/1000);   
            console.log('var githasec is  ' +  githaSec  )
            var Githaamin = githaSec/60       
            console.log('var Githaamin is  ' +  Githaamin  )
            if (Githaamin > this.Static_mins){
              console.log("static: " + Githaamin.toFixed(2));
               var paths ="assets/add_marker.png" 
               let updatelocation = new google.maps.LatLng(l,lon);
               var StaticMarker = new google.maps.Marker({
                 position: updatelocation,
                 map: this.map,                   
                 title:'Static' + Githaamin.toFixed(2),       
               });
                 StaticMarker.setPosition(updatelocation);
                 var infoContents_static =  'Static: ' + Githaamin.toFixed(2); 
                  var infoWindow_static = new google.maps.InfoWindow({
                    content: infoContents_static
                  }); 
                  //infoWindow_static.open(this.map, StaticMarker); 
                  infoWindow_static.setContent(this.map, StaticMarker);
                  google.maps.event.addListener(StaticMarker, 'click', function () {
                    infoWindow_static.open(this.map, StaticMarker);
                 });

              }else{

                infoWindowContent =  this.wcf.Reg + "<br\> Time: " + shorttime + "<br\> speed: " + speed + ' km/h'; 
                this.marker.setPosition(updatelocation);
                this.infoWindow.setContent(infoWindowContent); 
                console.log('')
           }
          
        }
      
          this.wcf.flightPlanCoordinates.push({lat: l, lng: lon })

          var flightPath = new google.maps.Polyline({
            path: this.wcf.flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#0000FF',
            strokeOpacity: 1.0,
            strokeWeight: 3
          });
  
          this.prelat = l;
          this.prelon = lon;
         // console.log(" prelats " + this.prelat + ','+  this.prelon);
          flightPath.setMap(this.map);


          if (this.count + 1 > imax){
            this.subscription.unsubscribe ();
            console.log("sasa ni mwisho: " +  this.count );
          }



      this.count +=1
  

    }


} catch (error) {
console.log(error);
}



}


ionViewCanLeave() {
  // console.log("leaving tracking now...");
   try {
     this.subscription.unsubscribe();
   } catch (error) {
     
   }
 
 }


 
 dismissthis(){  

  //this.modalCtrl.dismiss();
  //this.navCtrl.push(HomePage);
}




}
