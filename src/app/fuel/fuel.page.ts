import { Component, OnInit } from '@angular/core';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { Events } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { WcfService } from '../wcf.service';
import { ConnectService } from '../connect.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.page.html',
  styleUrls: ['./fuel.page.scss'],
})
export class FuelPage implements OnInit {
  Contents='';
  selectedItem: any;
  icons: string[];
  subscription;
  subscription2;
  usage={
    type:'',
    date:'',
    txtuser:'',
    txtphone:'',
    reg:'',
    amo:'',
    des:'None'
  }
  ThisMessage = [''];
  initreg = "Select Vehicle";
  items: Array<{title: string, note: string}>;

  public localDate: Date = new Date();
  public initDate: Date = new Date();
  public initDate2: Date = new Date(2015, 1, 1);
  public disabledDates: Date[] = [new Date(2017, 7, 14)];

  public event(data: Date): void {
    this.localDate = data;
    console.log("SELECTED");
  }
  
  setDate(date: Date) {
    console.log(date);
    this.initDate = date;
    console.log("SELECTED 2");
  }

  constructor(
    private selector: WheelSelector,
    public Wcf:WcfService, public Conn:ConnectService,
    public events:Events, public mydb:AuthService,
    public datepipe:DatePipe,
    public router:Router

  ) {
    this.items = [];
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
  
    
    reg = '';
   

    
proceed(){
 
 var Amo  = +this.usage['amo'];
 var Fuel  = this.usage['ltrs'];
 var siku  = this.initDate;
 let latest_date =this.datepipe.transform(siku, 'yyyy-MM-dd');  
// var CashOut='0';
console.log("dates: " + latest_date);
this.ThisMessage[0] = "";

  if (this.reg.length<1){    
    this.ThisMessage[0] = "Please select a vehicle";
    return;
  }

  if (Amo<1){    
    this.ThisMessage[0] = "Please enter amount";
    return;
  }

  if (Fuel.length<1){    
    this.ThisMessage[0] = "Please enter ltrs";
    return;
  }

  var Atype  = "Income";

  if (Atype.length<1){    
    this.ThisMessage[0] = "Please select activity type";
    return;
  }
  this.Wcf.Acttype = Atype;
 
  
  this.ThisMessage[0] = "Please wait...";   
  this.Contents = this.Wcf.Username + ";" + this.Wcf.Password + ";" + latest_date + ";" + this.reg + ";" + Fuel + ";" + Amo + ";" + this.Wcf.User_id ;


  var isconnected =  this.Conn.try_connect();
  if (isconnected == true){
    var MainURL = "http://mat2.logistics.co.ke/Service.svc/Add_Fuel?Contents=";
    this.Wcf.update_activities(this.Contents,MainURL)
    .then((data)=>{
      this.wait_async_feedback(data);
    },
    (error) => {
      console.log('error iko: ' + error.error);
      alert(this.Wcf.Error_message);  
      this.Wcf.Error_message ="Sorry, we have encoutered an error while processing the request";     
      this.ThisMessage[0] = ""; 
    }
  );
    
  }

}
  


wait_async_feedback(feedback){
    
  this.ThisMessage[0] = "GREAT!!"; 
  this.usage['des'] = "None";
  this.usage['amo'] = "";


}
   
ionViewDidLeave(){
  this.events.publish('set:reload');
  console.log("left");
}
   

back(){
  this.router.navigate(['/fuel-dashboard']);
}



  ngOnInit() {
  }

}
