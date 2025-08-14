import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, TokenData } from '../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: {
    username: string;
    password: string;
  }): Observable<string> {
    // return this.http.post<{ token: string }>(`/api/auth/login`, credentials).pipe(
    return this.http
      .post<ApiResponse<TokenData>>(`/api/auth/login`, credentials)
      .pipe(
        map((response) => {
          // 检查响应状态
          if (!response.data?.token) {
            throw new Error(response.message || '登录失败');
          }
          // 存储 token 到本地存储
          localStorage.setItem(this.TOKEN_KEY, response.data.token);
          // 返回token字符串
          return response.data.token;
          // localStorage.setItem(this.TOKEN_KEY, response.token);
        })
      );
  }

  register(credentials: {
    username: string;
    password: string;
    role: string;
  }): Observable<void> {
    return this.http
      .post<ApiResponse<any>>(`/api/auth/register`, credentials)
      .pipe(
        map((response) => {
          // 检查响应状态
          if (response.code !== 200) {
            throw new Error(response.message || '注册失败');
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
