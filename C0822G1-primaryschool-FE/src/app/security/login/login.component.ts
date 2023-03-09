
import {Component, HostListener, OnInit} from '@angular/core';
import {TokenStorageService} from '../../service/authentication/token-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SecurityService} from '../../service/authentication/security.service';
import {ShareService} from '../../service/authentication/share.service';
import {ToastrService} from 'ngx-toastr';
import {ViewportScroller} from "@angular/common";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  roles: string[] = [];
  returnUrl = '/';
  errors = {username: '', password: ''};
  pageYoffSet = 0;

  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    rememberMe: new FormControl(false)
  });

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              private route: ActivatedRoute,
              private securityService: SecurityService,
              private shareService: ShareService,
              private toast: ToastrService,
              private scroll: ViewportScroller
  ) {
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/body';

    if (this.tokenStorageService.getToken()) {
      this.securityService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getRole();
      const username = this.tokenStorageService.getUsername();
    }
  }

  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   * funtion: login
   *
   */
  login() {
    this.errors = {username: '', password: ''};
    this.errorMessage = '';
    if (this.formGroup.valid) {
      this.securityService.login(this.formGroup.value).subscribe(
        data => {
          console.log(data);
          if (this.formGroup.value.rememberMe) {
            this.tokenStorageService.saveTokenLocal(data.token);
            this.tokenStorageService.saveUserLocal(data, data.email, data.id, data.username, data.name, data.roles, data.avatar);
          } else {
            this.tokenStorageService.saveTokenSession(data.token);
            this.tokenStorageService.saveUserSession(data, data.email, data.id, data.username, data.name, data.roles, data.avatar);
          }
          const user = this.tokenStorageService.getUser();
          this.securityService.setIsLoggedIn(user, true);
          const username = this.tokenStorageService.getUsername();
          this.roles = this.tokenStorageService.getRole();
          if(this.roles.indexOf('ROLE_TEACHER') > - 1) {
            this.router.navigateByUrl('timetable/timetable-teacher');
          }
          if(this.roles.indexOf('ROLE_ADMIN') > - 1) {
            this.router.navigateByUrl('body');
          }
          this.formGroup.reset();
          this.toast.success('Đăng nhập thành công.', 'Thông báo', {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        }, error => {

          if(error.status == 406){
            this.errorMessage = error.error.message;
            this.toast.error(this.errorMessage, 'Thất bại'
              , {positionClass: 'toast-top-center'});
          }
          this.securityService.isLoggedIn = false;
          if(error.error.errors){
            for (let i = 0; i < error.error.errors.length ; i++) {
              if (error.error.errors && error.error.errors[i].field === 'username') {
                this.errors.username = error.error.errors[i].defaultMessage;
              }
              if (error.error.errors && error.error.errors[i].field === 'password') {
                this.errors.password = error.error.errors[i].defaultMessage;
              }
            }
          }
        }
      );
    }
  }

  }

