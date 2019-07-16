import { Component, OnInit } from '@angular/core';
import { Events, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WcfService } from '../wcf.service';
import { ConnectService } from '../connect.service';
@Component({
  selector: 'app-schedule-linked',
  templateUrl: './schedule-linked.page.html',
  styleUrls: ['./schedule-linked.page.scss'],
})
export class ScheduleLinkedPage implements OnInit {

  Contents=''; 
  items: Array<{title: string,note: string,ids:string}>;
  loading;
  ThisMessage = [''];
  pointerVisible: boolean = false;
  pointerVisible2: boolean = false;

  constructor(
    public Wcf:WcfService,public Conn:ConnectService,
    public events:Events, public alertCtrl:AlertController,
  private router: Router


  ) {

    console.log('Niko hapa kwa constructor')
    events.subscribe('set:shedulelinked', () => {  
      console.log('Niko hapa kwa constructor nimepita events')
      this.ShowList();
      console.log('Niko hapa kwa constructor ndio navuka kwa showlist')
     });


   }


   addnew(){
    console.log('Nimefika kwa add new schedule ndio naenda kwa addnew')
    let profileModal =  this.router.navigate(['/new-linked']);
  //  this.modalCtrl.create(NewLinkedPage);
  //  profileModal.present();
      
  }


  ionViewWillEnter() {

    this.ThisMessage[0] = this.Wcf.Stype;
    //console.log('stye is ' + this.Wcf.Stype);
    // this.loading = this.loadingCtrl.create({
    //   content: 'Loading...',
    //   duration:6000
    // })
    // this.loading.present();
    
    this.ShowList();
   
     
    }



    ShowList(){
      console.log('Nimefika kwa showlist  from click event on constructor')
      this.Contents = this.Wcf.Username + ";" + this.Wcf.Password + ";" + this.Wcf.Stype + ";" + this.Wcf.User_id;
      console.log('Contents huko ni' + this.Wcf.Username + ";" + this.Wcf.Password + ";" + this.Wcf.Stype + ";" + this.Wcf.User_id )
      console.log('Ndio naenda kwa get_shedules_linked' )
      this.Wcf.get_shedules_linked(this.Contents)
    
        .then((data)=>{
          this.wait_async_feedback(data);
          console.log('Nimeenda kwa get_schedules_linked and wait_async_feedback at WCF' + this.Contents + data )
        },
        (error) => {
          console.log('error iko: ' + error.error);
          alert(this.Wcf.Error_message);  
          this.Wcf.Error_message ="Sorry, we have encoutered an error while processing the request";     
        
        }
      );
  
     
    }
  

    wait_async_feedback(feedback){
      console.log('niko kwa wait_async_feedback' + feedback )
      this.items = [];  
     
         // this.loading.dismiss();
    
          console.log('feedback: ' + feedback + ' length ' + feedback.length);
          if (feedback.length>7){
            this.pointerVisible =false;   
            this.pointerVisible2 =true;      
          }else{
            this.pointerVisible = true; 
            this.pointerVisible2 =false;         
            return
          }
    
    
              var zote = feedback.split("|");
                console.log('sheduled return ' +zote );
    
                for(let i=0; i<zote.length; i++){               
                  var Desc = zote[i].split(";");  
                  console.log('sheduled return 1' +zote );
    
                  if (Desc.length>1) { 
                      var reg = Desc[0].trim();
                      var nextd = Desc[1].trim();
                      var ids = Desc[2].trim();                          
                                        
                      this.items.push({
                        title:  reg + ':',
                        note:  'Due on ' + nextd,
                        ids: ids              
                      });
    
                       console.log('sheduled return 2' +zote );
    
                  }
                
                }
    
                  
       
     
       
      }
    

      view(item){
      
          
        console.log('view is ' + item.ids );
    
      }


      async presentAlert(item) {
       console.log('nimefika kwa presentConfirm' + item )

       const alert = await this.alertCtrl.create({
         
         header: 'CONFIRM DELETE',
         message: 'Do you want to this ' + item.title + ' schedule ?',
         buttons: [
           {
             text: 'Cancel',
             role: 'cancel',
             handler: () => {
               console.log('Cancel clicked');
             }
           },
           {
             text: 'Delete',
             handler: () => {
               console.log('Buy clicked');
               this.Proceed_delete(item.ids)
               console.log('Hello umeclick proceed Delete tunaenda huko sasa ' + item.ids )
             }
           }
         ]
       });
       console.log('nimefika kwa presentConfirm na na exit '  )
       alert.present();
     }
   
     Proceed_delete(ids){
      console.log("Nimefika kwa proceed delete activated by the actionsheet meanwhile" + ids )
       this.Contents = this.Wcf.Username + ";" + this.Wcf.Password + ";" + ids;
       console.log("Nimefika kwa proceed delete activated by the actionsheet meanwhile" + this.Wcf.Username + ";" + this.Wcf.Password + ";" + ids )
       this.Wcf.delete_shedule(this.Contents)
         .then((data)=>{
         
           this.wait_delete(data);
           console.log("Nimefika kwa proceed delete activated by the actionsheet na proceed to wait delete" + data )
         },
         (error) => {
           console.log('error iko: ' + error.error);
           alert(this.Wcf.Error_message);  
           this.Wcf.Error_message ="Sorry, we have encoutered an error while processing the request";     
         
         }
       );
   
   
     }
   


     wait_delete(feedback){
  
     //  this.loading.dismiss();
 
        console.log('feedback: ' + feedback + ' length ' + feedback.length);

        alert('Delete successful');
        this.ShowList();

     }



back(){
  this.router.navigate(['/schedule']);
}




  ngOnInit() {
  }

}
