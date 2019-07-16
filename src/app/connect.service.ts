import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  isconnecting: boolean;
  nowisconnected: boolean;
  

  constructor(private network: Network,
    private platform: Platform
    ) { 

      
    platform.ready().then(() => {
      // if no internet, notice is a string
      if (this.network.type == 'none' ) { 
        // stuff if disconnected
        this.isconnecting=false;
        console.log("hakuna net")
      } else {
        //stuff if connected
        this.isconnecting=true;       
      }
    });

    }



    try_connect(){
 
      // if no internet, notice is a string
      if (this.network.type == 'none' ) { 
        // stuff if disconnected
        this.nowisconnected = false;
        console.log("hakuna net")
      } else {
        //stuff if connected
        this.nowisconnected = true;        
      }
    
    return this.nowisconnected
  
  }
  


}
