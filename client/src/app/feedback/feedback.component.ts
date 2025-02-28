import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiURL;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  errorMessage:any;  
  feedbackForm:any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder : FormBuilder
  ) { }
  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required)  
    });
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      console.log(this.feedbackForm.value);
      this.http.post(BACKEND_URL+'feedback', this.feedbackForm.value).subscribe((response: any) => {
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