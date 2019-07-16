import { Component, OnInit } from '@angular/core';
import { AlertController,ModalController,Platform, Events,ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WcfService } from '../wcf.service';
import { ConnectService } from '../connect.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  Contents=''; 
  items: Array<{title: string, note: string,sname:string}>;
  loading;
  pointerVisible: boolean = false;
  pointerVisible2: boolean = false;

  constructor(public Wcf: WcfService,
    public events:Events,
    public Conn:ConnectService,
    public modalCtrl:ModalController,
    public platform:Platform,
    public actionSheetCtrl: ActionSheetController,
    private router: Router
    ) {

      this.items = [];

      events.subscribe('set:shedule', () => { 
        
         this.ShowList();
        });

     }
  

     addnew(){
       console.log('niko kwa addnew sasa ndio naenda kwa new-schedule page')
      let profileModal =  this.router.navigate(['/new-schedule']);;
    //  profileModal.present();
        
    }



    ShowList(){
      console.log('niko kwa showlist')
      this.Contents = this.Wcf.Username + ";" + this.Wcf.Password + ";" + this.Wcf.User_id;
      console.log('niko kwa showlist meanwhile' + this.Wcf.Username + ";" + this.Wcf.Password + ";" + this.Wcf.User_id )
      this.Wcf.get_shedules(this.Contents) 
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
      console.log('nimefika kwa wait_async_feedback from Showlist' + feedback )
      this.items = [];  
     
        //  this.loading.dismiss();
  
          console.log('feedback: ' + feedback + ' length ' + feedback.length);
          if (feedback.length>2){
            this.pointerVisible =false;
            console.log('nimefika kwa wait_async_feedback from Showlist meanwhile feedback is less than 2' +   this.pointerVisible)
            this.pointerVisible2 =true;
          }else{
            this.pointerVisible = true;
            console.log('nimefika kwa wait_async_feedback from Showlist meanwhile feedback is more than 2' +   this.pointerVisible)
            this.pointerVisible2 = false;
            return
          }
  
         
              var zote = feedback.split("|");
             // var paths;
                for(let i=0; i<zote.length; i++){               
                  var Desc = zote[i].split(";");  
                 
                  if (Desc.length>2) { 
                      var stype = Desc[0].trim();
                      console.log('nimefika kwa wait_async_feedback from Showlist meanwhile fstype' +   stype)
                      var Recc = Desc[1].trim();
                      console.log('nimefika kwa wait_async_feedback from Showlist meanwhile Recc' +   Recc)
                      var desc = Desc[2].trim();
                      console.log('nimefika kwa wait_async_feedback from Showlist meanwhile desc' +   desc)
                                        
                      this.items.push({
                        title:  stype +' (' + Recc + ' days)',
                        note: 'Description: ' + desc,   
                        sname: stype               
                      });
  
  
                  }
                
                }
       
      }

      view(item){
      
        this.Wcf.Stype = item.title;
        console.log('nimefika kwa view  meanwhile this.Wcf.Stype ' +   this.Wcf.Stype )
        this.router.navigate(['/schedule-linked']);
       console.log('view is ' + item.title );
  
      }

  
      ionViewDidLeave(){
        this.events.publish('set:reload');
        console.log("left");
      }

  ngOnInit() {
    this.ShowList();
  }

  back(){
    this.router.navigate(['/dashboard']);
  }

}
