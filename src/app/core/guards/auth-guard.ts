import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isTokenExpired()) {
    return true;
  } else {
    // 如果当前请求的是 login 页面，则不再重复带 returnUrl 参数
    if (state.url === '/login') {
      router.navigate(['/login']);
    } else {
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
    return false;
  }
};
