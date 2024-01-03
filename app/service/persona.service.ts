import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../interface/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private baseURL= "http://localhost:8086/api/v1/contactos";

  constructor( private httpClient: HttpClient) { }

   //obtener
   obtenerListaDeContactos():Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(`${this.baseURL}`);
  }

    // para registrar 
  registrarContacto(persona: Persona) : Observable<object>{
    return this.httpClient.post(`${this.baseURL}`,persona);
  }

  //actualizar
   actualizarContacto(id: number,persona: Persona): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,persona);
  }

  //este metodo sirve para obtener o buscar un contacto
  obtenerContactoPorId(id:number):Observable<Persona>{
    return this.httpClient.get<Persona>(`${this.baseURL}/${id}`);
  }

  //eliminar contacto
  eliminarContacto(id:number):Observable<object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
}
}
