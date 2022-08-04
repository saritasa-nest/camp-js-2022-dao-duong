import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { UserService } from '../../../../core/services/';

@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(private readonly userService: UserService) {}

  public ngOnInit(): void {
    this.userService.login({
      email: 'psg9615@gmail.com',
      password: 'Dao0358937727',
    }).subscribe();
  }
}
