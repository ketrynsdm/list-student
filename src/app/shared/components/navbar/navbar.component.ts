import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title: any = ''
  constructor() { }
  
  ngOnInit(): void {
    this.title = window.location.pathname.replace('/', '')
  }

}
