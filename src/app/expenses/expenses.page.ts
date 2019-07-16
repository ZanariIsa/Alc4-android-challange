import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {

  constructor( public router:Router) { }

  ngOnInit() {
  }

  back(){
    this.router.navigate(['/dashboard']);
  }
  
}
