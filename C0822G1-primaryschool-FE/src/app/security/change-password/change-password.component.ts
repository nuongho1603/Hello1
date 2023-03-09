import {Component, OnInit} from '@angular/core';
import {ChangePassService} from '../../service/change-pass/change-pass.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountDto} from '../../entity/account-dto/account-dto';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from "../../service/authentication/token-storage.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassForm: FormGroup = new FormGroup({
    newPass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20),Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()-_=+{}[\\]|;:'\",.<>/?]).{4,}$")]),
    confirmPass: new FormControl('', Validators.required)
  }, {});


  constructor(private changePassService: ChangePassService, private router: Router, private activatedRoute: ActivatedRoute, private tokenService: TokenStorageService) {

  }

  ngOnInit(): void {
  }
  /**
   * Created by: NuongHT
   * Date created: 01/03/2023
   * Content: check password equal confirm password, function 'changePassword()' send value accountId -> spring boot : change pass database
   *
   */

  get contactFormValue() {
    return this.changePassForm.controls;
  }

  onPasswordChange() {
    if (this.contactFormValue.confirmPass.value == this.contactFormValue.newPass.value) {
      this.contactFormValue.confirmPass.setErrors(null);
    } else {
      this.contactFormValue.confirmPass.setErrors({'mismatch': true});
    }
  }

}
