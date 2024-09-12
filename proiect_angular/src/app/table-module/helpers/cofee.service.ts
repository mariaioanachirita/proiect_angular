import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cofee } from './models/cofee';

@Injectable({
  providedIn: 'root'
})
export class CofeeService {


  private baseUrl = 'http://localhost:3000/coffees';

  constructor(private httpClient: HttpClient) {}


  getListOfCofees(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl);
  }


  UpdateCofee(cofee: Cofee): Observable<Cofee> {
    console.log("Update Cofee on service " + cofee.id);
    return this.httpClient.put<Cofee>(`${this.baseUrl}/${cofee.id}`, cofee);
  }


  DeleteCofee(id: number): Observable<void> {
    console.log("Delete Cofee on service " + id);
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  AddCofee(cofee: Cofee): Observable<Cofee> {
    console.log("Add Cofee on service " + cofee.name);
    return this.httpClient.post<Cofee>(this.baseUrl, cofee);
  }
}
