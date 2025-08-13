// standalone layout component
import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { SharedImports } from '../shared/shared-imports';
import { AuthService } from '../services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [...SharedImports],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  collapsed = false;
  selectedKey = '';

  constructor(private auth: AuthService, private router: Router) {
    // 订阅路由事件，获取当前激活路径的最后一段作为菜单key
    this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        // 这里 event 类型已经被断言为 NavigationEnd
        const urlSegments = event.urlAfterRedirects.split('/');
        this.selectedKey = urlSegments[urlSegments.length - 1] || 'dashboard';
      });
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  logout(): void {
    this.auth.logout();
  }

  goHome(): void {
    this.router.navigate(['/orders']);
  }

  get username(): string {
    // 如果 AuthService 暴露用户名信息，可以替换这里的实现
    // 暂以 tokenSubject 为例，或改为另一个 user$ Observable
    return 'Admin';
  }
}
