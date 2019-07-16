import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events, Platform } from '@ionic/angular';
import { ConnectService } from '../connect.service';
import { WcfService } from '../wcf.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  subscription;
  names;

  constructor(private router: Router,
    public events: Events,
   // private globalization: Globalization,
    public platform: Platform,
    private Conn:ConnectService,
    private Wcf:WcfService
    
    ) { }

  navigateToHome(){
    this.router.navigate(['/dashboard']);
  }



  ngOnInit() {
    // this.platform.ready().then(() => {

    //   var perm=0;
    //           try {
    //             this.sim.requestReadPermission().then(
    //                  () => console.log('Permission granted'),
    //                  () => console.log('Permission denied'));
    //           } catch (error) {
    //             console.log(error);
    //           }
              
      
    //           this.sim.getSimInfo().then(
    //             (info) => console.log('Sim info: ', info.value),
    //             (err) => console.log('Unable to get sim info: ', err)
    //           );
    //         });
  

  }

  ThisMessage = [''];
  
  
  usage={
    txtuser:'',
    txtphone:''
  }

    
  Startbit = "7878";
  Stopbit = "7979";
  Contents;

  private Fetch_account(){
    var username  = this.usage['txtuser'];
    var pass  = this.usage['password'];
    this.Wcf.Username = this.usage['txtuser'];
    this.Wcf.Password = this.usage['password'];

    this.ThisMessage[0] = "";

    if (username.length<1){    
      this.ThisMessage[0] = "Please enter a username";
      return;
    }
    if (username.length<3){
      this.ThisMessage[0] = "Please enter a valid username. Minimum length is 4";
      return;
    }
    
    var psw: string = this.usage['password'];
    console.log('pass is: ' + psw); 
    
    if (psw ==="undefined"){
      this.ThisMessage[0] = "Password cannot be blank";
      return;
    }  

    if (psw == null){
      console.log('eml null '); 
      this.ThisMessage[0] = "Email cannot be blank";
      return;
    }  

    var psdlens = psw.length;

    console.log('pass : ' + psdlens ); 
    if (psdlens<3){
      this.ThisMessage[0] = "Please enter a valid password. Minimum password length is 4";
      return;
    }

    if (psw === psw){
    }else{
      this.ThisMessage[0] = "Passwords do not match. please confirm";
      return;
    }

     
    this.Wcf.Fetched_user = this.usage['txtuser'];
    this.Wcf.Username = this.usage['txtuser'];
    this.Wcf.Password = pass;

   this.Contents = username + ";" + pass 
   console.log ('contents is ' + this.Contents);  
   this.ThisMessage[0] = "Please wait...";

   var isconnected =  this.Conn.try_connect();
   if (isconnected == true){

      //this.Wcf.Count = 0;
      var MainURL = "http://mat2.logistics.co.ke/Service.svc/Client_Connection?Content="
      this.Wcf.getUsers(this.Contents,MainURL); 
     // console.log ('contents is ' + MainURL);       
     // this.subscription = Observable.interval(1000).subscribe(x => {
        this.wait_async();
    //  });
 
   }


  }

  wait_async(){
      
   //

      console.log('loading  ' + this.Wcf.Prompt_Msg); 
      var zote = this.Wcf.Prompt_Msg.split(";");
      var msg = zote[0];
      this.Wcf.User_id = zote[1];
      this.Wcf.Mcode = zote[1];
  
      if  (msg.indexOf("0") >=0) {
        console.log("......")
        this.ThisMessage[0] = " Authenticating to our servers. Please wait.....";
        console.log("authenticating to our servers")
      }else if  (msg.indexOf("no") >=0) {
          this.ThisMessage[0] = " Sorry, wrong credentials used. Please try again";
          console.log("Sorry, wrong credentials used. Please try again")
          this.subscription.unsubscribe ();

      }else if  (msg.indexOf("yes") >=0) {
          this.ThisMessage[0] = " Working. Please wait.....";
          console.log("save user data 9999")

          try {
            this.subscription.unsubscribe ();
          } catch (error) {
            
          }
          console.log("nimepita")

          //console.log(this.Wcf.Fetched_user + ',' + this. Wcf.User_id );
        console.log("save user data")
          this.Wcf.save_user_Data();
    //      this.navCtrl.setRoot(DashboardPage);  
          this.router.navigate(['/dashboard']);
          console.log("already saved user data")

      }else if (msg.indexOf("12") >0) {
        this.ThisMessage[0] = " Wrong Password, Please try again.";
      }else if (msg.indexOf("2") >0) {
        this.ThisMessage[0] = " Wrong Password, Please try again.";
        console.log("wrong password try again")
      }else if (msg.indexOf("1") >0) {
        this.ThisMessage[0] = " Sorry, No internet connection available. Authentication can't proceed";
      }else if(this.Wcf.Prompt_Msg.indexOf("2") >0) {
          //Prompt_Msg=" Sorry, Password/username is not correct. Kindly enter the correct username/password for your tracking account";
          this.ThisMessage[0] = 'Error encoutered';
          console.log("Sorry no internet connection")
      }else if(msg.indexOf("3") >0) {
        this.ThisMessage[0] =  " Sorry, an error has occured on our servers while creating your account. Please try again later";
        console.log("Errror has occured on our servers")
      }else if(msg.indexOf("4") >0) {
        this.ThisMessage[0] = " Sorry, an error has occured on our servers while creating your account. Please try again later";
      }



  }

}
