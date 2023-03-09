import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../service/authentication/token-storage.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {
  constructor(private router: Router,
              private toast: ToastrService,
              private tokenStorageService:TokenStorageService) {
  }

  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenStorageService.getToken()) {
      const roles = this.tokenStorageService.getRole();
      if (roles.indexOf('ROLE_TEACHER') > - 1) {
        return true;
      }else if (roles.indexOf('ROLE_ADMIN') > - 1) {
        return true;
      } else {
        this.toast.error('Bạn không đủ quyền. Vui lòng đăng nhập để tiếp tục.', 'Thất bại', {positionClass: 'toast-top-center'});
        this.router.navigateByUrl('/error');
        return false;
      }
    } else {
      this.toast.error('Bạn phải đăng nhập để tiếp tục. Vui lòng đăng nhập!', 'Thất bại', {positionClass: 'toast-top-center'});
      this.router.navigateByUrl('/error');
      return false;
    }
  }

}
