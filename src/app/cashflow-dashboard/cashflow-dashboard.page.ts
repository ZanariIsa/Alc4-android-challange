import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashflow-dashboard',
  templateUrl: './cashflow-dashboard.page.html',
  styleUrls: ['./cashflow-dashboard.page.scss'],
})
export class CashflowDashboardPage implements OnInit {

  constructor( private router:Router
    ) { }



  back(){
    this.router.navigate(['/dashboard']);
  }
  

  ngOnInit() {
  }

}
