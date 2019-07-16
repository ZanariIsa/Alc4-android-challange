import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-fuel-dashboard',
  templateUrl: './fuel-dashboard.page.html',
  styleUrls: ['./fuel-dashboard.page.scss'],
})
export class FuelDashboardPage implements OnInit {

  constructor(private router: Router) { }

  navigate(){
    this.router.navigate(['/fuel']);
  }
  perform(){
    this.router.navigate(['/ful']);
  }
  report(){
    this.router.navigate(['/mileages']);
  }


  back(){
    this.router.navigate(['/dashboard']);
  }
  

  ngOnInit() {
  }

}
