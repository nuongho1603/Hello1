import {Component, Input, OnInit} from '@angular/core';
import {AccountDto} from '../../entity/account-dto/account-dto';
import {ChangePassService} from '../../service/change-pass/change-pass.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {StudentService} from '../../service/student/student.service';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  account: AccountDto = {};

  @Input()
  changePassForm?: FormGroup;


  constructor(private studentService: StudentService,
              private changePassService: ChangePassService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private tokenService: TokenStorageService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  changePass() {
    if (!this.changePassForm) return;
    const idAccount = this.tokenService.getIdAccount();
    // @ts-ignore
    this.account.accountId = idAccount;
    this.account.newPass = this.changePassForm.value.newPass;
    this.changePassService.changePass(this.account).subscribe(
      // @ts-ignore
      this.router.navigateByUrl('/'),
      // @ts-ignore
      this.toastr.success('Bạn đã đổi mật khẩu thành công. ', 'Thông báo!', {positionClass: 'toast-top-center'})
    )
    console.log(this.account);
  }
}
