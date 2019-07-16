import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vehicle-performance',
  templateUrl: './vehicle-performance.page.html',
  styleUrls: ['./vehicle-performance.page.scss'],
})
export class VehiclePerformancePage implements OnInit {

  constructor(private router: Router) { }

  navigateToHome(){
    this.router.navigate(['/account-summary']);
  }

  Fuelv(){
    this.router.navigate(['/expenses-enterance']);
  }
  schFuel(){
    this.router.navigate(['/fuelper']);
  }
  vehFuel(){
    this.router.navigate(['/view-expenses']);
  }
back(){
  this.router.navigate(['/dashboard']);
}

  ngOnInit() {
  }

}
