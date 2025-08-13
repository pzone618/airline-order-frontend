import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AUTH_TOKEN';

// 后端统一响应格式
interface BaseResponse<T> {
  status: number;
  message: string;
  data: T;
}

interface LoginResponse {
  token: string;
  username: string;
  role: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  password: string;
}

// 表示这是一个 Angular 可注入服务，并且在整个应用范围内单例（root injector），不需要在 providers 里手动注册。
@Injectable({
  providedIn: 'root',
})
// 管理 登录状态 和 JWT Token 的全局服务
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  token$ = this.tokenSubject.asObservable();

  // 一个 BehaviorSubject（RxJS 特殊的 Observable），用来保存并广播 当前是否登录 的状态。
  // 初始化时会调用 hasValidToken() 检查本地 token 是否有效。
  private loggedIn$ = new BehaviorSubject<boolean>(!this.isTokenExpired());

  constructor(private http: HttpClient, private router: Router) {}

  login(request: LoginRequest): Observable<BaseResponse<LoginResponse>> {
    return this.http
      .post<BaseResponse<LoginResponse>>('/api/auth/login', request)
      .pipe(
        tap((res) => {
          const token = res.data?.token;
          if (token) {
            this.setToken(token, true);
            this.tokenSubject.next(token);
          }
        })
      );
  }

  register(request: RegisterRequest): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>('/api/auth/register', request);
  }

  logout(): void {
    this.clearToken();
    this.tokenSubject.next(null);
    this.loggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  // 返回 loggedIn$ 的 只读 Observable 版本，防止外部直接调用 .next() 修改状态。
  get isLoggedIn$() {
    return this.loggedIn$.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  }

  /**
   * 设置 token，默认存 localStorage，支持传 false 存 sessionStorage（用于记住我功能）
   */
  setToken(token: string, remember: boolean = true): void {
    if (remember) {
      localStorage.setItem(TOKEN_KEY, token);
      sessionStorage.removeItem(TOKEN_KEY);
    } else {
      sessionStorage.setItem(TOKEN_KEY, token);
      localStorage.removeItem(TOKEN_KEY);
    }
    this.loggedIn$.next(true);
  }

  private clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      if (!expiry) return false;
      return Math.floor(Date.now() / 1000) >= expiry;
    } catch {
      return true;
    }
  }
}
