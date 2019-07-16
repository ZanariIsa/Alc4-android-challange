import { Component, OnInit } from '@angular/core';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { DatePipe } from '@angular/common';
import { Events, Platform } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ConnectService } from '../connect.service';
import { AuthService } from '../auth.service';
import { WcfService } from '../wcf.service';
@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.page.html',
  styleUrls: ['./account-summary.page.scss'],
})
export class AccountSummaryPage implements OnInit {
  pointerVisible: boolean = false;
  pointerVisible2: boolean = false;
  ThisMessage2 = [''];
  ThisMessage3 = [''];
  items: Array<{title: string, note: string}>;
  Contents='';
  selectedItem: any;
  icons: string[];   
  loading;
  constructor(

    public mydb:AuthService,public Wcf:WcfService,
    public Conn:ConnectService,private selector: WheelSelector,
    public datepipe: DatePipe,public events:Events,
    public platform:Platform,
    public actionSheetController: ActionSheetController,
    private router: Router,

  ) { }

  public localDate: Date = new Date();
  public initDate: Date = new Date();
  ps_only = true;
  latest_date;
  show_date;
  initreg = "";
  AllMonths;
  mwaka; 

  ngOnInit() {
 
    this.ThisMessage2[0] = 'PSV ONLY'; 
    this.change_months();


  }


  Get_Months(){  
    console.log('Nimefika kwa Get months sasa tunaokota months')
        this.AllMonths =[];
        console.log('Nimefika kwa Get months sasa tunaokota months meanwhile ' )
        var initDate: Date = new Date();
      
         var siku  = initDate;
         console.log('Nimefika kwa Get months sasa tunaokota months meanwhile  siku' + siku)
         //var show_date  =this.datepipe.transform(siku, 'MMM-yy');
        
     
       
     
           return new Promise(( resolve,reject) =>{    
            console.log('Nimefika kwa Get months sasa tunaokota months meanwhile nifika kwa promise')                
                 this.AllMonths.push({description: "Jan-" +this.mwaka}); 
                 this.AllMonths.push({description: "Feb-" + this.mwaka});    
                 this.AllMonths.push({description: "March-" + this.mwaka}); 
                 this.AllMonths.push({description: "April-" + this.mwaka}); 
                 this.AllMonths.push({description: "May-" + this.mwaka}); 
                 this.AllMonths.push({description: "June-" + this.mwaka}); 
                 this.AllMonths.push({description: "July-" + this.mwaka}); 
                 this.AllMonths.push({description: "Aug-" + this.mwaka}); 
                 this.AllMonths.push({description: "Sept-"+ this.mwaka}); 
                 this.AllMonths.push({description: "Oct-"+ this.mwaka}); 
                 this.AllMonths.push({description: "Nov-"+ this.mwaka}); 
                 this.AllMonths.push({description: "Dec-"+ this.mwaka});        
                 resolve(this.AllMonths);    
                 console.log('Nimefika kwa Get months sasa tunaokota months meanwhile nifika kwa promise na ndio natoka')   
             })
        
                   
       
          }
     
    
          MyJson : Array<object>;
          openPicker() {
            console.log("Nimefika kwa OpenPicker")
            this.MyJson = [];
            console.log("Nimefika kwa OpenPicker" +   this.MyJson)
            this.Get_Months().then((result) =>{
         
             var siku  = this.initDate;
             let count  =this.datepipe.transform(siku, 'MM');
             let x = parseInt(count);
         
             console.log('count is' + x);
             
              this.MyJson = <Array<Object>>result;
                  
              this.selector.show({
              title: 'Select Month',
              items: [this.MyJson      
              ],
              wrapWheelText: true,
              theme: "dark",
              positiveButtonText: 'Select',
              negativeButtonText: 'Close',
              defaultItems: [ 
               { index: 0, value: result[x-1].description}
               ]
            }).then(
              result => {
                let msg = `${result[0].description}`;
                   
                this.show_date  = msg;
             
         
                if (msg.includes('Jan')){
                 this.latest_date =this.mwaka + '-01';
                }else if (msg.includes('Feb')){
                 this.latest_date =this.mwaka + '-02';
               }else if (msg.includes('March')){
                 this.latest_date =this.mwaka + '-03';
               }else if (msg.includes('April')){
                 this.latest_date =this.mwaka + '-04';
               }else if (msg.includes('May')){
                 this.latest_date =this.mwaka + '-05';
               }else if (msg.includes('June')){
                 this.latest_date =this.mwaka + '-06';
               }else if (msg.includes('July')){
                 this.latest_date =this.mwaka + '-07';
               }else if (msg.includes('Aug')){
                 this.latest_date =this.mwaka + '-08';
               }else if (msg.includes('Sept')){
                 this.latest_date =this.mwaka + '-09';
               }else if (msg.includes('Oct')){
                 this.latest_date =this.mwaka + '-10';
               }else if (msg.includes('Nov')){
                 this.latest_date =this.mwaka + '-11';
               }else if (msg.includes('Dec')){
                 this.latest_date =this.mwaka + '-12';
                }
         
               // console.log(msg +' ' + this.latest_date);
                this.initreg = msg;
                this.onChange()
         
              },
              err => console.log('Error: ', err)
              );
            })
              
           
          }
         
         
    
    
          change_months(){
      console.log("Ninafika huku kwa change_months")
            this.items = [];
            var siku  = this.initDate;
            console.log("Ninafika huku kwa change_months meanwhile siku " + siku)
            this.show_date  =this.datepipe.transform(siku, 'MMM-yy');
            console.log("Ninafika huku kwa change_months meanwhile this.show_date " + this.show_date)
            this.latest_date = this.datepipe.transform(siku, 'yyyy-MM');
            console.log("Ninafika huku kwa change_months meanwhile   this.latest_date " +   this.latest_date)
            this.initreg = this.show_date;
            console.log("Ninafika huku kwa change_months meanwhile    this.initreg " +     this.initreg)
            this.mwaka  =this.datepipe.transform(siku, 'yyyy');
            console.log("Ninafika huku kwa change_months meanwhile  this.mwaka  " +    this.mwaka  )
            this.onChange();
          }
        
        
        
          ionViewDidLoad() {
            this.ThisMessage2[0] = 'PSV ONLY'; 
            this.change_months();
        
        
          }
        
        
          onChange(){
            console.log('Nimefika huku kwa Onchange from Change_months')
            if(this.ps_only){
              console.log('Nimefika huku kwa Onchange from Change_months but ni psv naenda kwa Get_psv')
              this.get_psv();
            }
            else{
              console.log('Nimefika huku kwa Onchange from Change_months but sijaspecify naenda kwa get_all')
             this.get_all();
            }
          }
        
          
    
          Etype;
          get_all(){
            console.log('Ndio nafika huku kwa get_psv from Onchange')
            this.items = [];
            //this.ThisMessage2[0] ="All Categories";
             this.Etype = "all" 
             console.log('Ndio naenda kwa proceed')
            this.proceed()
          }


          get_psv(){
            console.log('Ndio nafika huku kwa get_psv from Onchange')
            this.items = [];
           
            this.Etype = "ps" 
            console.log('Ndio naenda kwa proceed')
            this.proceed()
          }
        
        
        
          proceed(){
        console.log("Nimefika kwa proceed from get_psv")
        
        
            var isconnected =  this.Conn.try_connect();
            if (isconnected == true){ 
              console.log("Nimefika kwa proceed from get_psv meanwhile nimepata kuna net")
         
                  this.Contents = this.Wcf.Username + ";" + this.Wcf.Password + ";" + this.latest_date + ';' + this.Etype;
                  console.log("Nimefika kwa proceed from get_psv meanwhile this.Contents" + this.Contents)
                  this.Wcf.get_Month_summary(this.Contents)
                  .then((data)=>{
                    this.wait_async_feedback(data);
                  },
                  (error) => {
                    console.log('error iko: ' + error.error);
                    alert(this.Wcf.Error_message);       
                  }
                );
        
                
            }else{          
             alert('NO INTERNET ACCESS');
            }
        
        
        
        }
        
        
        
        wait_async_feedback(feedback){
          console.log('feedback ' +feedback);
        
        
          //console.log('feedback: ' + feedback + ' length ' + feedback.length);
                  if (feedback.length<8){
                    this.pointerVisible =true;
                    console.log('niko kwa feedback meanwhile feedbaxk is less than 8 is   ' +  this.pointerVisible );
                    this.pointerVisible2 =false;
    
                    return
                  }else{
                    this.pointerVisible =false;
                    console.log('niko kwa feedback meanwhile nimepita kwa pointerVisible where it more than 8 '  );
                    this.pointerVisible2 =true;
                    
                  }
                  console.log('niko kwa feedback meanwhile nimepita kwa pointerVisible  '  );
          var zote = feedback.split("|");    
          console.log('niko kwa feedback meanwhile zote   ' + zote  );        
          var Total=0;
           for(let i=0; i<zote.length; i++){               
                var Desc = zote[i].split(";"); 
        
                //console.log('Desc ' + Desc[0]);
               
                if (Desc.length>1) { 
        
                  //console.log('Desc legth ' + Desc.length);
                 
               
                    var Reg =Desc[0];
                    var amount =Desc[1];
                    var amo = +Desc[1];
                    Total += amo;           
                    var Toshos = amo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    console.log('niko kwa feedback meanwhile Toshos   ' + Toshos  );        
                     try {
                      this.items.push({
                         title: Reg,
                         note: Toshos,                      
                    });
                    } catch (error) {
                      console.log('error ' + error);  
                    }
                 
              
              }
                            
        
              }
        
              var Tosho = Total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.ThisMessage3[0] ="TOTAL PNL: ksh. " + Tosho;
                          
                    try {
                      this.loading.dismiss();
                    } catch (error) {            
                    }
        
        
        }
        
        
        
       
        itemTapped(event, item) { 
      
          this.Wcf.Reg = item.title;
          this.Wcf.siku = this.latest_date;
        
          let profileModal =  this.router.navigate(['/account-details']);
        
        }
        
        
        async presentActionSheet(Reg,siku) {
          this.Wcf.Reg = Reg;
          this.Wcf.siku = siku;
      
    
          const actionSheet = await this.actionSheetController.create({
        
            cssClass: 'action-sheets-basic-page',
            header: Reg,
            buttons: [{
              text: 'VIEW MORE DETAILS',
              role: 'destructive',
              icon: !this.platform.is('ios') ? 'information-circle' : null,
              handler: () => {
                let profileModal =  this.router.navigate(['/account-details']);;
              //  profileModal.present();
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
  this.router.navigate(['/vehicle-performance']);
}




}
