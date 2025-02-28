import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string = '';
  in_out:string = 'out';
  
  constructor(private router: Router) {

  }
  ngOnInit() {  
    const user = localStorage.getItem('userData') || '';   
    this.username = user && JSON.parse(user).username || ''; 
    if(this.username=='')alert("You must be logged in");
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.router.navigateByUrl('/login');
  }
  login(){
    this.router.navigateByUrl('/login');
  }
}
