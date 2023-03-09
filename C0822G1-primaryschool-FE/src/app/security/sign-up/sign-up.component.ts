import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {SecurityService} from '../../service/authentication/security.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isSubmited = false;
  formValid = false;

  constructor(private formBuild: FormBuilder,
              private securityService: SecurityService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
        username: new FormControl('',[Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
        email: new FormControl('',[Validators.required]),
        name: new FormControl('',[Validators.required]),
      }
    );

  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.toastr.warning('Form phải được điền đúng định dạng', 'Warning:', {
        positionClass: 'toast-top-center',
        timeOut: 1500,
        extendedTimeOut: 1500
      });
    } else {
      this.isSubmited = true;
      this.securityService.register(this.formGroup.value).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.toastr.success(data.message, 'Hoàn tất: ', {
            positionClass: 'toast-top-center',
            timeOut: 2500,
            extendedTimeOut: 1500
          });
          this.router.navigateByUrl('/security/login');

        },
        err => {
          this.toastr.error(err.error.message, 'Lỗi: ', {
            positionClass: 'toast-top-center',
            timeOut: 1500,
            extendedTimeOut: 1500
          });
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          this.isSubmited = false;
        }
      );
    }

  }

}
