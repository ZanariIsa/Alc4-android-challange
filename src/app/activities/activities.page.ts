import { Component, OnInit } from '@angular/core';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { Events } from '@ionic/angular';
import { WcfService } from '../wcf.service';
import { AuthService } from '../auth.service';
import { ConnectService } from '../connect.service';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {
  Contents='';
  selectedItem: any;
  icons: string[]; 
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
  items: Array<{title: string, note: string}>;


  initreg = "Select Vehicle";
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
    private Wcf:WcfService,private mydb:AuthService,
    private Conn:ConnectService,private events:Events
  ) {    this.items = [];
  }

  reg = '';
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
 

 
 proceed(){
   console.log('am at Proceed')
  var Amo  = +this.usage['amo'];
  console.log('am at Proceed' + Amo )
  var Desc  = this.usage['des'];
  console.log('am at Proceed' + Desc  )
  var siku  = this.initDate;
  console.log('am at Proceed' + siku  )
//  let latest_date =this.datepipe.transform(siku, 'yyyy-MM-dd');  
 // var CashOut='0';
// console.log("dates: " + latest_date);
 this.ThisMessage[0] = "";
 console.log('am at Proceed' + this.ThisMessage[0] )
   if (this.reg.length<1){    
     this.ThisMessage[0] = "Please select a vehicle";
     return;
   }

   if (Amo<1){    
     this.ThisMessage[0] = "Please enter amount";
     return;
   }

   if (Desc.length<1){    
     this.ThisMessage[0] = "Please enter description";
     return;
   }

   var Atype  = "Income";

   if (Atype.length<1){    
     this.ThisMessage[0] = "Please select activity type";
     return;
   }
   this.Wcf.Acttype = Atype;
  
   console.log('am at Proceed' + Atype )

   if (Atype.indexOf('Expenses') >= 0){   
     Amo = (Amo*-1)     
     console.log('am at Proceed' + Amo )
   } 

   this.ThisMessage[0] = "Please wait...";
  
     //  this.Contents = this.Wcf.Username + ";" + this.Wcf.Password + ";" + latest_date + ";" + reg + ";" + Desc + ";" +
     //  Amo + ";" + CashOut + ";" + Amo;
     var Etype  = "Income";
       this.Contents = this.Wcf.Username + ";" + this.Wcf.Password + ";" + Desc + ";" +
       Amo + ";" + this.Wcf.Acttype  + ";" + Etype ;
       console.log('Natry kuinsert info sasa meanwhile' + this.Wcf.Username + ";" + this.Wcf.Password + ";" + Desc + ";" +
       Amo + ";" + this.Wcf.Acttype  + ";" + Etype  )

   var isconnected =  this.Conn.try_connect();
   if (isconnected == true){
     var MainURL = "http://mat2.logistics.co.ke/Service.svc/Activity_Enter?Contents=";
    console.log('Nimepita kwa Url sasa lets proceed')
     this.Wcf.update_activities(this.Contents,MainURL) 
     
       .then((data)=>{
         this.wait_async_feedback(data);
         console.log('Naenda kwa wait_async-feedback ')
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
console.log('Nimefika kwa wait_sync_feedback ' + feedback )
      
  this.ThisMessage[0] = "GREAT!!"; 
  this.usage['des'] = "None";
  this.usage['amo'] = "";


}

    
ionViewDidLeave(){
  this.events.publish('set:reload');
  console.log("left");
}


  ngOnInit() {
  }

}
