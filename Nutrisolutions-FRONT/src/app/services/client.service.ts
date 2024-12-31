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

  apiUrl = APP_API.base_url + '/users';

  constructor() {}
  http = inject(HttpClient);

  getAllclients(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(this.apiUrl);
  }
  getclientById(id: string): Observable<ClientModel> {
    return this.http.get<ClientModel>(`${this.apiUrl}/${id}`);
  }
  deleteclient(id: string): Observable<{ count: number }> {
    return this.http.delete<{ count: number }>(`${this.apiUrl}/${id}`);
  }
  addClient(
    client: ClientModel
  ): Observable<ClientModel> {
    return this.http.post<ClientModel>(this.apiUrl, client);
  }
  updateclient(
    id: string,
    nutritionnist: ClientModel
  ): Observable<ClientModel> {
    return this.http.patch<ClientModel>(
      `${this.apiUrl}/${id}`,
      nutritionnist
    );
  }
}