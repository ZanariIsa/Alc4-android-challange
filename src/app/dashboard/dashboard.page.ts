import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(){
    this.router.navigate(['/tracking']);
  }

  fuel(){
    this.router.navigate(['/fuel-dashboard']);
  }
  cash(){
    this.router.navigate(['/cashflow-dashboard']);
  }

Dispatch(){
  this.router.navigate(['/dispatch']);
}

  OtherExpense(){
    this.router.navigate(['/expenses']);
   }

sch(){
  this.router.navigate(['/vehicle-performance']);
}

}
