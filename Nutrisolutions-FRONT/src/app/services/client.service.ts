import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_API } from '../core/constants/constants.config';
import { ClientModel } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clients: ClientModel[] = [];

  #clients: ClientModel[] = [];

  apiUrl = APP_API.base_url + '/clients';

  constructor() {}
  http = inject(HttpClient);

  getAllClients(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(this.apiUrl);
  }
  getClientById(id: string): Observable<ClientModel> {
    return this.http.get<ClientModel>(`${this.apiUrl}/${id}`);
  }
  deleteClient(id: string): Observable<{ count: number }> {
    return this.http.delete<{ count: number }>(`${this.apiUrl}/${id}`);
  }

  updateClient(
    id: string,
    nutritionnist: ClientModel
  ): Observable<ClientModel> {
    return this.http.patch<ClientModel>(`${this.apiUrl}/${id}`, nutritionnist);
  }
}
