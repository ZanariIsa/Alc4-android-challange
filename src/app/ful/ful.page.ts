import { Component, OnInit } from '@angular/core';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import {  Events } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { WcfService } from '../wcf.service';
import { ConnectService } from '../connect.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ful',
  templateUrl: './ful.page.html',
  styleUrls: ['./ful.page.scss'],
})
export class FulPage implements OnInit {

  thisreg = [''];
  ThisVehicle = [''];
  Thisdates = [''];
  ThisAmo =[''];
  initreg = "All";

  items: Array<{title: string, fuel: string, amount:string}>;
  filters: Array<{vehicles: string, dates: string, Amo: string}>;
 
  pointerSearch: boolean = true;
  pointersearchBtn: boolean = false;
  pointerclosesearch: boolean = false;
  pointerlist: boolean = false;

  usage={
    date:'',
    txtuser:'',
    txtphone:'',
    reg:'',
    amo:'',
    des:'None'
  }
  Contents='';
  selectedItem: any;
  icons: string[]; 
  loading;

 public localDate: Date = new Date();
public initDate: Date = new Date();
public initDateL: Date = new Date();
public initDate2: Date = new Date(2015, 1, 1);
public disabledDates: Date[] = [new Date(2017, 7, 14)];

  constructor(private selector: WheelSelector,
    public Wcf:WcfService,public Conn:ConnectService,
    public mydb:AuthService,
    public events:Events,public datepipe:DatePipe,
    public router:Router
    
    ) { 
      this.items = [];
      this.filters = [];
      this.usage['reg'] = 'All';
    }

    ionViewDidLoad() {
      if (this.Wcf.Seldate1 !=null){
        this.initDate =this.Wcf.Seldate1;    
       // this.proceed();
      }
      if (this.Wcf.Seldate2 !=null){
       this.initDateL =this.Wcf.Seldate2; 
      // this.proceed();       
      }
      }
        
      
      
        
      edit(){
      
       
        this.pointerSearch = true;
        this.pointersearchBtn = false;
        this.pointerclosesearch = true;
        this.pointerlist = false;
      }
      
      edit2(){
      
        this.pointerSearch = false;
        this.pointersearchBtn = true;
        this.pointerlist = true;
      }
      
  
      ionViewDidLeave(){
        this.events.publish('set:reload');
        //console.log("left");
      }
    
       
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
          { index: 0, value: result[0].description}
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
    
       reg = 'All';
      Vehicle;     
    
    
      proceed(){
        
      
        var siku  = this.initDate;
        let latest_date =this.datepipe.transform(siku, 'yyyy-MM-dd');
        let latest_date_show =this.datepipe.transform(siku, 'dd-MMM');
    
        var siku2  = this.initDateL;
        let latest_date2 =this.datepipe.transform(siku2, 'yyyy-MM-dd');
        let latest_date_show2 =this.datepipe.transform(siku2, 'dd-MMM');
    
        if (this.reg.length<1){    
            alert('Please select a vehicle');
          return;
        }
    
        
    
        this.Wcf.nowReg = this.reg;
        this.Wcf.ActDate1 = latest_date;
        this.Wcf.Actdate2 = latest_date2;
    
        this.Wcf.Seldate1 = latest_date;
        this.Wcf.Seldate2 = latest_date2;
    
      
        // this.loading = this.loadingCtrl.create({
        //   content: 'Loading...',
        //   duration:6000
        // })
      // this.loading.present(); 
       
          this.ThisVehicle[0] =  this.Wcf.nowReg
          this.usage.reg =this.Wcf.nowReg;
          this.usage.date = latest_date_show + "  to  " + latest_date_show2; 
          //console.log("get sum " + this.Wcf.ActDate1 + ' ' + this.Wcf.Actdate2);
    
         
    
    
       var Etype = this.Wcf.User_id
       var Desc =this.Wcf.ActDate1 + ';' + this.Wcf.Actdate2 + ';' + this.Wcf.nowReg + ';' + Etype;
       this.Contents = this.Wcf.Username + ";" + this.Wcf.Password + ";" + Desc;
       
       console.log(this.Contents);
    
       this.Wcf.ActAmo = "";
       
      
       if ( this.Wcf.nowReg.indexOf('All')  >= 0){
         this.Vehicle = 'All Vehicles';
       }else{
         this.Vehicle = this.Wcf.nowReg;
       }
     
    
    
      this.Wcf.get_fuel(this.Contents)
          .then((data)=>{
            this.wait_async_feedback(data);
          },
          (error) => {
            console.log('error iko: ' + error.error);
            alert(this.Wcf.Error_message);  
            this.Wcf.Error_message ="Sorry, we have encoutered an error while processing the request";     
          }
        );
    
    
    
      }
    
    
      
      wait_async_feedback(feedback){
        this.items = []; 
        this.filters = [];  
       
              console.log('feedback: ' + feedback + ' length ' + feedback.length);
              if (feedback.length<8){
              //  this.loading.dismiss(); 
                alert("DATA NOT FOUND")
                return
              }
          
                var Msg = feedback.split("*");
                 var mwanzo = Msg[0].trim();
                 var mw =mwanzo.split(";"); 
                 var Fuel = mw[0]; 
                 var total = mw[1]; 
    
                var others = Msg[1].trim();
                var zote = others.split("|");    
                
                var Tosho = Fuel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var Tosho2 = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var Disp =  Tosho + ' Lts : Ksh. ' + Tosho2 + ' /='
    
                this.filters.push({vehicles: this.Vehicle, dates: this.usage.date + '  ',  Amo: Disp });
                                    
                    for(let x=0; x<zote.length; x++){   
                      var Desc = zote[x].split(";"); 
                         if (Desc.length>1) {      
    
                           var siku =  Desc[0].trim(); 
                            var header = Desc[1].trim();                                           
                            var flts = Desc[2].trim();
                            var amo = Desc[3].trim();
                        
                        this.items.push({
                            title: header + ': ' + siku + '  : ',
                            fuel: flts + ' Ltrs',
                            amount: 'Ksh.' + amo + '/='                        
                          });
    
                    }
                    
                  }
              
    
                
        //  this.loading.dismiss();
    
          this.pointerSearch = false;
          this.pointersearchBtn = true;
          this.pointerlist = true;
        }
    

        back(){
          this.router.navigate(['/fuel-dashboard']);
        }



      ngOnInit() {
      }
}
