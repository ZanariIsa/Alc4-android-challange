import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public db:any;
  public dbname: String ="S11";
  public isloged = 0;


  constructor(
    private sqlite: SQLite,
    private platform: Platform,
  ) { }


  ngOnInit() {
    this.platform.ready().then(()=> {
      this.initializeDatabase();
     });
  }


  initializeDatabase(){

    console.log("db initializing....");

    var TABLE_Cars= "cars";
    console.log("db initializing meanwhile TABLE_Cars " + TABLE_Cars);
    var KEY_des = "des";
    var KEY_lat = "lat";
    var KEY_lon = "lon";
    var KEY_refreshed = "refreshed";
    var KEY_Online = "O_status";
    var KEY_where = "w_status";
    var KEY_Course = "Course";
    var KEY_Alias = "Alias";
    var KEY_reg = "reg";
    var KEY_Trips ="Trips";
    var KEY_DIST ="Distance";
    var  KEY_alert = "alerts";
   var  KEY_psstatus = "ps_status";
   var KEY_reg = "reg";
  var KEY_ID = "id";

  // this.Sqlsts = "update cars set des=" + description + ", O_status=" + Ostatus + ", Alert =" + Alert + ", Ps_status =" + Ps_status + "  where reg='" + reg + "'";

    var CREATE_cars = " CREATE TABLE IF NOT EXISTS " + TABLE_Cars + "("
            + KEY_ID + " INTEGER PRIMARY KEY,"
            + KEY_reg + " TEXT,"
            + KEY_Alias + " TEXT,"
            + KEY_des + " TEXT,"
            + KEY_Online + " TEXT,"
            + KEY_alert + " TEXT,"
            + KEY_psstatus + " TEXT,"
            + KEY_refreshed + " TEXT,"
            + KEY_where + " TEXT,"
            + KEY_Trips + " TEXT DEFAULT '0',"
            + KEY_DIST + " TEXT DEFAULT '0',"
            + KEY_lat + " TEXT DEFAULT '0',"
            + KEY_lon + " TEXT DEFAULT '0',"
            + KEY_Course + " REAL" + ")";


   try {
      var dbnow : String = this.dbname;
      this.sqlite.create({
        name: "" + dbnow,
        location: 'default'
      })

          .then((db: SQLiteObject) =>{
            this.db = db;
            db.executeSql('CREATE TABLE IF NOT EXISTS users(rowid INTEGER PRIMARY KEY, coluser VARCHAR(32), colpass VARCHAR(12),uref VARCHAR(12))', [])
       // .then(res => console.log('Created db USERS'))      
        .catch(e => console.log(e));

        db.executeSql(CREATE_cars, [])  
        //.then(res => console.log('Created db cars'))        
        .catch(e => console.log(e));

        db.executeSql('CREATE TABLE IF NOT EXISTS tblupdated(rowid INTEGER PRIMARY KEY, coltime VARCHAR(32))', [])
        //.then(res => console.log('Created db updated'))      
        .catch(e => console.log(e));
        console.log('open db is ' + this.db);

        // db.executeSql('CREATE TABLE IF NOT EXISTS CREATE_cars(KEY_ID INTEGER PRIMARY KEY, Alias VARCHAR(32), O_status VARCHAR(12),w_status VARCHAR(12)),Trips VARCHAR(22),alerts VARCHAR(22),Distance VARCHAR(22),ps_status VARCHAR(22),refreshed VARCHAR(22)', [])
        // console.log('open db is CREATE_cars');

      //   db.executeSql('create table CREATE_cars(Alias VARCHAR(32),O_status VARCHAR(32),w_status VARCHAR(32),Trips VARCHAR(32),alerts VARCHAR(32),Distance VARCHAR(32),ps_status VARCHAR(32),refreshed VARCHAR(32))', [])
      //   .then(() => console.log('Executed SQL'))
      //   .catch(e => console.log(e));
  

       })

     

   } catch (error) {
     console.log('db error2 ' + error);
   }
 

  

  }



  AllRegs; 

  Get_vehicles(){  
console.log('Nimefika kwa Get_vehicles')
    this.AllRegs =[];

    return new Promise(( resolve,reject) =>{             
      var dbnow : String = this.dbname;
      this.sqlite.create({
        name: "" + dbnow,
        location: 'default'
        
      })
      
      .then((db: SQLiteObject) =>{
        this.db = db;
        console.log('Nimefika kwa Get_vehicles' + dbnow )
            this.db.executeSql('SELECT Alias FROM cars order by ps_status desc, alias asc', {})      
              .then(res => {    
                   for ( var i =0;i< res.rows.length; i++){
                    this.AllRegs.push({description: res.rows.item(i).Alias            
                    });
              }     
              resolve(this.AllRegs); 
              console.log('Nimefika kwa Get_vehicles na nikaselect gari' )           
          })

        })
      })
   
              
  
     }







}
