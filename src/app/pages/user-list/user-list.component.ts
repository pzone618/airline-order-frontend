import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '../../services/user.service';
import { SharedImports } from '../../shared/shared-imports';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [...SharedImports],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;

  constructor(
    private userService: UserService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.status === 200) {
          this.users = res.data;
        } else {
          this.message.error(res.message || '加载用户列表失败');
        }
      },
      error: () => {
        this.loading = false;
        this.message.error('加载用户列表失败，请稍后重试');
      },
    });
  }

  viewUser(id: number): void {
    this.router.navigate(['/users', id]);
  }
}
