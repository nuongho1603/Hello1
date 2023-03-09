import {SecurityService} from './service/authentication/security.service';
import {TokenStorageService} from './service/authentication/token-storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Primary-School';
  isLoggedIn = false;
  user: any;

  constructor(private tokenStorageService: TokenStorageService,
              private securityService: SecurityService) {
  }

  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   *
   */
  ngOnInit(): void {
    this.securityService.getIsLoggedIn().subscribe(next => {
      this.isLoggedIn = next;
    });
    this.securityService.getUserLoggedIn().subscribe(next => {
      this.user = next;
    });
    if (this.tokenStorageService.getToken() != null) {
      this.user = this.tokenStorageService.getUser();
      this.securityService.setIsLoggedIn(this.user, true);
    }
  }
}
