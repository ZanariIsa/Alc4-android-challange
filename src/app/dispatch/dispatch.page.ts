import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.page.html',
  styleUrls: ['./dispatch.page.scss'],
})
export class DispatchPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  back(){
    this.router.navigate(['/dashboard']);
  }


}
