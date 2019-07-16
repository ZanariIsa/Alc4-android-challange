import { Component, OnInit } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { WcfService } from '../wcf.service';
import { AuthService } from '../auth.service';
import { ConnectService } from '../connect.service';
@Component({
  selector: 'app-default',
  templateUrl: './default.page.html',
  styleUrls: ['./default.page.scss'],
})
export class DefaultPage implements OnInit {

  constructor(
    private sqlite: SQLite,
    public Wcf: WcfService,
    public mydb:AuthService,
    private platform: Platform,
    private diagnostic: Diagnostic,
    private router: Router,
    private Conn:ConnectService,

  ) { }


  subscription;
  subscription2;

  public db:any;
  public dbname: String ="S11";
  public isloged = 0;

  pointerVisible: boolean =false;
  wcfusers: any; 
  User: any = [];
  msg: String;
  Username: String;
  Count : number;
  Loading: any;
 

  ngOnInit() {
    this.back()
    console.log('Niko kwa ngOnInit')
    this.platform.ready().then(()=> {
      console.log('naenda kwa signin')
      this.New_signup();
     });
 
    

  }

  back(){
    this.router.navigate(['/dashboard']);
  }
  
  New_signup(){
console.log('Niko kwa new sign up')
    this.mydb.initializeDatabase();  
    console.log("nimepita initializeDatabase..");
  
       console.log("going to get_users..");
        this.Get_users();
        console.log("new signing..");
   // })
   }


   Get_users(){ 

    console.log("getting user..");
  
    try {           
      this.Count = 0;
      var dbnow : String = this.dbname;
      this.sqlite.create({
        name: "" + dbnow,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
      
      
       
    
    
     this.mydb.db.executeSql('SELECT coluser,colpass,uref FROM users ORDER BY rowid DESC', [])
      
       .then(res => {
          console.log("db rows " + res.rows.length); 
           if (res.rows.length > 0){          
                 this.Wcf.Fetched_user =   res.rows.item(0).coluser;
                 this.Wcf.Username = res.rows.item(0).coluser;
                 this.Wcf.Password = res.rows.item(0).colpass;
                 this.Wcf.User_id = res.rows.item(0).uref;
                 this.Wcf.Mcode = this.Wcf.User_id ;
  
              this.Count=1;
              console.log('user is ' + this.Wcf.Fetched_user ); 
              console.log("getting user details..");
           }else{   
            console.log('no data yet loading login selector page'); 
            this.Count = 0;
           
           }
  
            this.proceed_home();
          })
       })
       .catch(e => console.log('db error is: ' + e));
  
      
     
    
   } catch (error) {
     console.log('db error ' + error);
        
    }
   
  
  }
  
  
proceed_home(){
    console.log('Im  in proceed home')
 
console.log ('niko kwa proceed_name')
    
    console.log('going home'); 


    if (this.Count >0){      
      console.log("nafika hapa kwa dash")
    //  this.navCtrl.setRoot(DashboardPage);
      this.router.navigate(['/dashboard']);
       }else{      
        console.log("nafika hapa kwa intro")
        this.router.navigate(['/intro']);
      
    }
   

}


}
