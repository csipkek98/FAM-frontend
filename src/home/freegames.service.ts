import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Freegame } from './freegame.model';

@Injectable({
  providedIn: 'root'
})
export class FreegameService {

  base_url = "http://localhost:8080/api/free_games"
  
  constructor(private httpClient: HttpClient) { }
  getFreegames(): Observable<Freegame[]> {
    const result = this.httpClient.get<Freegame[]>(this.base_url)
    return result;
    }
  getFreegamesWithFilter(...queryParameters:Array<string>): Observable<Freegame[]>{
    let url = ""
    if(queryParameters.join('').length == 0){
      return this.getFreegames()
    }else{
      url = this.base_url+"/filter?"+queryParameters.join("&")
    }
    console.log(url)
    const result = this.httpClient.get<Freegame[]>(url)
    return result;
  }
}