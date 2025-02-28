import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


const BACKEND_URL = environment.apiURL;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
        this.http.post(BACKEND_URL+'login', this.loginForm.value).subscribe((response: any) => {
          localStorage.setItem('token', response.token);  
          localStorage.setItem('userData', JSON.stringify(response.user));
          this.router.navigate(['/weather']);
        }, (error) => {
          this.errorMessage = error.error.message;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        })
    } else {
        this.errorMessage = 'Form is invalid';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
    } 
  }
}
