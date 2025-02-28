import { Component, Host, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLinkWithHref } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiURL; 

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  bgPath:string='/assets/images/day/cloudy.jpg';
  btBg:string = "#fa6d1b";
  timeOfDay:string='day';
  code:any;
  icon:any;
  conditionOutput:any;
  cityOutput:any;
  tempOutput:any;
  dateOutput:any;
  timeOutput:any;
  cloudOutput:any = '--';
  humidityOutput:any ='--';
  windOutput:any = '--';
  cityInput: any;
  weatherData: any;
  citiesList: any = [];
  UniqueList:any = [];
  errorMessage: string = '';
  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.getUserSearches();
  }
  formatDate(dateString: string): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(dateString);
    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const monthName = months[date.getMonth()];
    return ` ${dayOfWeek}, ${dayOfMonth} ${monthName}`;
  }
  getTime(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
  getUniqueCities() {
    const uniqueCities = new Set(this.citiesList.map((city: { location: any; }) => city.location));
    this.UniqueList =  Array.from(uniqueCities).reverse().slice(0, 4);
  }
  capitalize(str:string) {
    return str.replace(/\b\w/g, function(char) {
      return char.toUpperCase();
    });
  }
  searchWeather() {
    if(this.cityInput) {
      const token: any = localStorage.getItem('token');
      
      if(!token) {
        this.errorMessage = 'You must be logged in';
        alert(this.errorMessage);
        return;
      }
      const options = {
        headers: new HttpHeaders({
          'Authorization': token
        })
      }
      this.http.get(BACKEND_URL+`weather?address=${this.capitalize(this.cityInput)}`, options)
        .subscribe((data: any) => {
          this.weatherData = data;
          console.log(this.weatherData);
          this.conditionOutput = data.weather.current.condition.text;
          
          if(data.weather.current.is_day=='0')this.timeOfDay = 'night';
          else this.timeOfDay = 'day';
          this.code = data.weather.current.condition.code;
          this.icon = `/assets/icons/${this.timeOfDay}/${data.weather.current.condition.icon.substr(`//cdn.weatherapi.com/weather/64x64/${this.timeOfDay}/`.length)}`;
          this.cityOutput = data.weather.location.name;
          this.tempOutput = data.weather.current.temp_c;
          this.dateOutput = this.formatDate(data.weather.location.localtime);
          this.timeOutput = this.getTime(data.weather.location.localtime);
          this.cloudOutput = data.weather.current.cloud +" %";
          this.humidityOutput = data.weather.current.humidity + " %" ;
          this.windOutput = data.weather.current.wind_kph +" km/h";
          if(this.code == 1000 || this.code == 1135){
            this.bgPath = `/assets/images/${this.timeOfDay}/clear.jpg`;
            this.btBg = "#e5ba92";
            if(this.timeOfDay=='night')
              this.btBg = "#181e27"
          }
          else if(this.code == 1003 || this.code == 1006 || this.code == 1009 || this.code == 1030 || this.code == 1063 || this.code == 1087 || this.code == 1114 || this.code == 117){
            this.bgPath = `/assets/images/${this.timeOfDay}/cloudy.jpg`;
            this.btBg = "#fa6d1b";
            if(this.timeOfDay=='night'){
              this.btBg = "#181e27";
            }    
          }
          else if(this.code==1150||this.code==1153||this.code==1168||this.code==1171||this.code==1180||this.code==1183||this.code==1186||this.code==1186||this.code==1189||this.code==1195||this.code==1198||this.code==1201||this.code==1240||this.code==1243||this.code==1246||this.code==1273||this.code==1276){
            this.bgPath = `/assets/images/${this.timeOfDay}/rainy.jpg`;
            this.btBg = "#647d75";
            if(this.timeOfDay=='night')
                this.btBg = "#325c80";
          }
          else{
            this.bgPath = `/assets/images/${this.timeOfDay}/snowy.jpg`;
            this.btBg = "#4d72aa";
            if(this.timeOfDay=='night')
                  this.btBg = "#1b1b1b";
          }
          this.getUserSearches();
        }, (error) => {
          this.errorMessage = error.message ? error.message : error.error;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000)
          console.error('Error fetching weather data:', error);
          alert("Please enter a valid place");
        });
      return;
    }
  }

  getUserSearches() {
    const token: any = localStorage.getItem('token');
    
    if(!token) {
      this.errorMessage = 'You must be logged in to view searches';
      return;
    }

    const options = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    }
    
    this.http.get(`${BACKEND_URL}weather/searches`, options)
      .subscribe((data: any) => {
        this.citiesList = data;
        this.getUniqueCities();
      }, (error) => {
        console.error('Error fetching user searches:', error.message);
      });
  }
  giveFeedback() {
    const token: any = localStorage.getItem('token');
    if(!token) {
      this.errorMessage = 'You must be logged in to give feedbacks';
      alert(this.errorMessage);
      return;
    }
    this.router.navigate(['/feedback']);
  }
}
