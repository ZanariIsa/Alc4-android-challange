import { Component, OnInit } from '@angular/core';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { DatePipe } from '@angular/common';
import { Events } from '@ionic/angular';
import { ConnectService } from '../connect.service';
import { AuthService } from '../auth.service';
import { WcfService } from '../wcf.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-expenses.page.html',
  styleUrls: ['./view-expenses.page.scss'],
})
export class ViewExpensesPage implements OnInit {

  thisreg = [''];
  ThisVehicle = [''];
  Thisdates = [''];
  ThisAmo =[''];
  initreg = "All";
  items: Array<{title: string, income: string, expenses: string, path: string,bal:string}>;
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
  subscription;
  subscription2;
  loading;

 public localDate: Date = new Date();
public initDate: Date = new Date();
public initDateL: Date = new Date();
public initDate2: Date = new Date(2015, 1, 1);
public disabledDates: Date[] = [new Date(2017, 7, 14)];

  constructor(private selector: WheelSelector, public mydb:AuthService,
    private datepipe:DatePipe,public Conn:ConnectService,public Wcf:WcfService,
    private events:Events,
    private router:Router
    ) { }


      
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
    
        var siku2  = this.initDateL;
        let latest_date2 =this.datepipe.transform(siku2, 'yyyy-MM-dd');
          
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
          this.usage.date = this.Wcf.ActDate1 + " - " + this.Wcf.Actdate2; 
          //console.log("get sum " + this.Wcf.ActDate1 + ' ' + this.Wcf.Actdate2);
    
         
    
    
       var Etype = "Expenses"
       var Desc =this.Wcf.ActDate1 + ';' + this.Wcf.Actdate2 + ';' + this.Wcf.nowReg + ';' + Etype;
       this.Contents = this.Wcf.Username + ";" + this.Wcf.Password + ";" + Desc;
       
       console.log(this.Contents);
    
       this.Wcf.ActAmo = "";
       
      
       if ( this.Wcf.nowReg.indexOf('All')  >= 0){
         this.Vehicle = 'All Vehicles';
       }else{
         this.Vehicle = this.Wcf.nowReg;
       }
        
    
      this.Wcf.get_day_summary(this.Contents)  
        .then((data)=>{
          this.wait_async_feedback(data);
        },
        (error) => {
          console.log('error iko: ' + error.error);
          alert(this.Wcf.Error_message);       
        }
      );
    
      }
    

      wait_async_feedback(feedback){
        this.items = []; 
        this.filters = [];  


            console.log('feedback: ' + feedback + ' length ' + feedback.length);
            if (feedback.length<8){
             // this.loading.dismiss(); 
              alert("DATA NOT FOUND")
              return
            }
       
          
                var Msg = feedback.split("*");
                var total = Msg[0].trim();
                var others = Msg[1].trim();
                var zote = others.split("|");    
                
                var Tosho = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.filters.push({vehicles: this.Vehicle, dates: this.usage.date + '  ',  Amo: Tosho });
                
                var paths;
                  console.log(zote);
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
                           
    
                            if (Daycash<=0){
                              paths ="assets/red.png"; 
                            }else{
                              paths ="assets/green.png"; 
                            }
                                                
                          var Tosho = offload.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          var Tosho2 = Exp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          var Tosho3 = Daycash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          this.items.push({
                            title: header,
                            income: Tosho,
                            expenses: Tosho2,
                            path: paths,
                            bal:  Tosho3              
                          });
                         
                    }
                    
                  }
              
    
          this.loading.dismiss();
  
          this.pointerSearch = false;
          this.pointersearchBtn = true;
          this.pointerlist = true;
        }
            



        
  ngOnInit() {
  }


  back(){
    this.router.navigate(['/vehicle-performance']);
  }
  
}
