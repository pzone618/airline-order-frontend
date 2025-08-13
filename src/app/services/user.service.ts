import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  role: string;
}

interface BaseResponse<T> {
  status: number;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<BaseResponse<User[]>> {
    return this.http.get<BaseResponse<User[]>>(this.apiUrl);
  }
}
