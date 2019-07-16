import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { LoadingController } from '@ionic/angular';
import { Events, Platform, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { WcfService } from '../wcf.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-mileages',
  templateUrl: './mileages.page.html',
  styleUrls: ['./mileages.page.scss'],
})
export class MileagesPage implements OnInit {
  orders: string = "mileage";
  ThisMessage = [''];
  ThisMessage2 = [''];
  thisreg = [''];
  Totalamo = [''];
  loading;
  Contents='';
  subscription2;
  initreg = "All";

  pointerVisible: boolean = false;
   pointerVisible2: boolean = false;

  items: Array<{title: string, note: string,Dist:number,Kms:string}>;
  items2: Array<{title: string, note: string,Dist:number,Kms:string,rsiku:string}>;
  usage={
    date:'',
    txtuser:'',
    txtphone:'',
    reg:this.Wcf.Reg,
    amo:'',
    des:'None'
  }
  constructor(public events:Events,public platform:Platform,
    public alertController: AlertController,public modalCtrl: ModalController,
    public Wcf:WcfService,public mydb:AuthService,private selector: WheelSelector,
    public datepipe:DatePipe,private router: Router,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController
    ) {
      this.items = [];
      this.items2=[];

     }
     public localDate: Date = new Date();
     public init_MDate: Date = new Date();
     public initDate: Date = new Date();
     public initDateL: Date = new Date();
     public initDate2: Date = new Date(2015, 1, 1);
     public disabledDates: Date[] = [new Date(2017, 7, 14)];
   
   

     MyJson : Array<object>;
     openPicker() {
       this.MyJson = [];
       this.mydb.Get_vehicles().then((result) =>{
        
         this.MyJson = <Array<Object>>result;
             
         this.selector.show({
         title: 'Select Vehicle',
         items: [this.MyJson      
         ],
         wrapWheelText: true,
         theme: "dark",
         positiveButtonText: 'Select',
         negativeButtonText: 'Close',
         defaultItems: [ 
    
         // { index: 0, value: result[0].description}
          ]
       }).then(
         result => {
           let msg = `${result[0].description}`;
           this.reg = msg;
           this.initreg = msg;
    
         },
         err => console.log('Error: ', err)
         );
       })
         
      
     }
    
    
      edit(){
    console.log('ninafika hapa kwa edit this is hit by clicking on the span')
        this.pointerVisible = true;
      }
    
    
      setDate(date: Date) {
        console.log(date);
        this.init_MDate = date;
        console.log("SELECTED 2");
      }
    
      ionViewDidEnter() {
        this.proceed();
          }
    
       
    ionViewDidLeave(){
      this.events.publish('set:reload');
      console.log("left");  
    }
    
    
    
    get_mileage(){
      this.proceed();
    }


    get_services(){
      this.pointerVisible2 = true;
      this.ThisMessage2[0] = "";
    
      console.log(this.reg);
       
     
      this.Contents = this.Wcf.Username + ";" + this.Wcf.Password + ";" + this.Wcf.User_id;
    
          this.Wcf.get_services(this.Contents)
          .then((data)=>{
            this.wait_async_service(data);
          },
          (error) => {
            console.log('error iko: ' + error.error);
            alert(this.Wcf.Error_message);       
          }
        );
    }
    
    
    wait_async_service(feedback){
      this.items2 = [];  
     
    
      if (feedback.length<13){  
        this.loading.dismiss(); 
        alert("NO SERVICE DATA YET")
        return  
      }
          
           var zote = feedback.split("!");        
                for(let i=0; i<zote.length; i++){               
                  var Desc = zote[i].split(";");  
                 
                  if (Desc.length>2) { 
                      var reg = Desc[0].trim();
                      var totaldist = +Desc[1].trim();
                      var Maxmile = +Desc[2].trim();
                      var Rsiku = Desc[3].trim();
                      var diff = Maxmile - totaldist ;
    
                      var nowd = totaldist;
                      var showd;
                      var TotalMax = Maxmile + 50;
                      showd = (( nowd * 100) / TotalMax);
                      var tosho =parseInt(showd);
                     
                      this.items2.push({
                        title:  reg,
                        note: 'Remaining: ' + diff + 'km', 
                        Dist:  tosho,
                        Kms:   nowd + ' Km',
                        rsiku: 'Last service: ' + Rsiku
                      });
    
                     
                  }
                
                }
    
                this.loading.dismiss(); 
       
     
       
      }
    
    
      reg = 'All';
      sdate;
      sdate2;
      async    proceed(){  
      
        var siku  = this.init_MDate;
        let latest_date = this.datepipe.transform(siku, 'yyyy-MM-') + '1' ;
        this.sdate = this.datepipe.transform(latest_date, 'dd-MMM');
        this.initDate =this.init_MDate;
      
        var siku2  = this.initDateL;
        let latest_date2 =this.datepipe.transform(siku2, 'yyyy-MM-dd');
        this.sdate2 = this.datepipe.transform(siku2, 'dd-MMM');
      
        if (this.reg.length<1){    
          this.ThisMessage[0] = "Please select a vehicle";
          return;
        }
      
        this.ThisMessage[0] ='';
        console.log(this.reg);
         
        const loading = await this.loadingController.create({
          message: 'Loading...',
          duration: 6000
        });
        await loading.present();
    
        const { role, data } = await loading.onDidDismiss();
    
        console.log('Loading dismissed!');
    
        // this.loading = this.loadingCtrl.create({
        //   content: 'Loading...',
        //   duration:6000
        // })
        // this.loading.present();
      
        var desc =  latest_date + ";" + latest_date2 + ";" + this.reg + ";" + this.Wcf.User_id 
        this.Contents = this.Wcf.Username + ";" + this.Wcf.Password + ";" + desc;
      
            this.Wcf.get_mileages(this.Contents)
            .then((data)=>{
              this.wait_async_feedback(data);
            },
            (error) => {
              console.log('error iko: ' + error.error);
              alert(this.Wcf.Error_message);       
            }
          );
      
      
      }
      
      count=0;
      wait_async_feedback(feedback){
        this.items = [];  
       
               console.log('feedback: ' + feedback + ' length ' + feedback.length);
              if (feedback.length<8){
                this.loading.dismiss(); 
                alert("NO MILEAGE DATA YET")
                return
              }
            
             var mwanzo = feedback.split("!");
             var disc = mwanzo[0];
             var max = +mwanzo[1];
             this.pointerVisible = false;
      
             if (this.reg.indexOf('All') >= 0){ 
              this.ThisMessage[0]  = 'All Vehicles: ' + this.sdate + '  to  ' + this.sdate2  ;
             }else{
              this.ThisMessage[0]  = this.reg + ' Mileage is '  + disc + 'Km';
             }
      
                
      
                var zote = mwanzo[2].split("|");
              
                  for(let i=0; i<zote.length; i++){               
                    var Desc = zote[i].split(";");  
                   
                    if (Desc.length>2) { 
                        var siku = Desc[0].trim();
                        var dist = Desc[1].trim();
                        var Max = Desc[2].trim();
                       // var Ave = Desc[3].trim();            
                        var reg = Desc[4].trim(); 
      
                        var nowd = +parseInt(dist);
                        var showd;
                        var TotalMax = max + 50;
                        showd = (( nowd * 100) / TotalMax);
                       
      
                        var tosho =parseInt(showd);
                       
                        this.items.push({
                          title:  reg  + '  ' + siku + ' ',
                          note: 'Max: ' + Max + 'km/h', 
                          Dist:  tosho,
                          Kms:   nowd + ' Km',
                        });
                        //console.log('max ' + TotalMax + ' now d:' + nowd + ' show d ' + tosho);
      
                       
                       
                    }
                  
                  }
      
          
         
       
         
        }
      
      
        
        itemTapped(event, items2) {
       
       
          this.presentActionSheet(items2.title);
          
        }
      
     
        async presentActionSheet(Reg) {
    
          this.Wcf.Reg = Reg;
         
    
    
          const actionSheet = await this.actionSheetController.create({
        
            cssClass: 'action-sheets-basic-page',
            header: Reg,
            buttons: [{
              text: 'LIVE TRACK',
              role: 'destructive',
            
              icon: !this.platform.is('ios') ? 'information-circle' : null,
              handler: () => {
                let profileModal =    this.router.navigate(['/reset-service']);
           // await profileModal.present();
    
             //   console.log('Tracking ' +this.Wcf.Reg );
             
              }
            },
            {
               text: 'Close',
                role: 'cancel',
               icon: !this.platform.is('ios') ? 'close-circle' : null,
               handler: () => {
    
            }
            
            }]
          });
          await actionSheet.present();
        }
      
    

        back(){
          this.router.navigate(['/fuel-dashboard']);
        }



  ngOnInit() {
  }

}
