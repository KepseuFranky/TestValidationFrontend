import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import { TypeAction } from './type-action';
import { HttpClient } from '@angular/common/http'
import { Technicien } from './technicien';
import { TagTechnique } from './tag-technique';


@Injectable({
  providedIn: 'root'
})
export class TestserviceService {

  private baseURL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }


  private _refreshNeeded$ = new Subject<void>();


  // TypeActionService

  getTypeAction(): Observable<TypeAction[]>{
    return this.httpClient.get<TypeAction[]>(`${this.baseURL+"/findAllTypeAction"}`);
  }

  getTypeActionById(id: string): Observable<TypeAction>{
    return this.httpClient.get<TypeAction>(`${this.baseURL+"/findAllTypeAction"}/${id}`);
  }

  createTypeAction(typeAction: TypeAction): Observable<Object>{
    return this.httpClient.post(`${this.baseURL+"/addTypeAction"}`, typeAction);
  }

  updateTypeAction(id: string, typeAction: TypeAction): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, typeAction);
  }


  deleteTypeAction(id: string): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL+"/deleteTypeAction"}/${id}`);
  }


  // TechnicienService

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getTechniciensList(): Observable<Technicien[]>{
    return this.httpClient.get<Technicien[]>(`${this.baseURL+"/findAllTechniciens"}`);
  }

  getTechnicienById(id: string): Observable<Technicien>{
    return this.httpClient.get<Technicien>(`${this.baseURL+"/findAllTechniciens"}/${id}`);
  }

  createTechnicien(technicien: Technicien): Observable<Object>{
    return this.httpClient.post(`${this.baseURL+"/addTechnicien"}`, technicien).pipe(tap(() =>  {
      this._refreshNeeded$.next();
    }));
  }

  deleteTechnicien(id: string): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL+"/deleteTechnicien"}/${id}`);
  }

  updateTechnicien(id: string, technicien: Technicien): Observable<Object>{
    return this.httpClient.put(`${this.baseURL+"/UpdateTechnicien"}/${id}`, technicien);
  }




  // TagTechniqueService


  getTagTechniquesList(): Observable<TagTechnique[]>{
    return this.httpClient.get<TagTechnique[]>(`${this.baseURL+"/findAllTagTechniques"}`);
  }

  getTagTechniqueById(id: string): Observable<TagTechnique>{
    return this.httpClient.get<TagTechnique>(`${this.baseURL+"/findAllTagTechniques"}/${id}`);
  }

  createTagTechnique(tagTechnique: TagTechnique): Observable<Object>{
    return this.httpClient.post(`${this.baseURL+"/addTagTechnique"}`, tagTechnique);
  }



}


