import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TeacherService} from "../../service/teacher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-teacher-update',
  templateUrl: './teacher-update.component.html',
  styleUrls: ['./teacher-update.component.css']
})
export class TeacherUpdateComponent implements OnInit {

  infoTeacherForm: FormGroup = new FormGroup({
    teacherId: new FormControl(),
    teacherName: new FormControl(),
    dateOfBirth: new FormControl(),
    gender: new FormControl(),
    degreeName: new FormControl(),
    teacherType: new FormControl(),
    idCard: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.pattern('[\\w]+[@][\\w]+.[\\w]+')]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(((\\\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$')]),
    address: new FormControl('', [Validators.required])
  })
  ;
  messageEmail = '';
  messagePhoneNumber = '';
  messageAddress = '';
  messageEmailPattern = '';
  messagePhoneNumberPattern = '';

  constructor(private teacherService: TeacherService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private toast: ToastrService) {
    this.activatedRoute.paramMap.subscribe(next => {
      const idAccount = parseInt(this.tokenStorageService.getIdAccount());
      if (idAccount != null) {
        this.teacherService.findByTeacherId(idAccount).subscribe(next => {
          this.infoTeacherForm.patchValue(next);
        })
      }
    })
  }

  ngOnInit(): void {
    this.toast.info('Chỉ được sửa thông tin email, số điện thoại hoặc địa chỉ nhà',
      'Thông báo', {positionClass: 'toast-top-center'})
  }

  editInfoTeacher() {
    this.messageEmail = "";
    this.messagePhoneNumber = "";
    this.messageAddress = "";
    this.messageEmailPattern = "";
    const teacher = this.infoTeacherForm.value;
    if(this.infoTeacherForm.valid){
      this.teacherService.editInfoTeacher(teacher).subscribe(next => {
        this.toast.success('Cập nhật thông tin thành công', 'Thông báo', {positionClass: 'toast-top-center'})
        this.router.navigateByUrl("/timetable/timetable-teacher");
      }, error => {
        this.toast.error('Cập nhật thông tin thất bại', 'Thông báo', {positionClass: 'toast-top-center'})
        for (let i = 0; i < error.error.length; i++) {
          if (error.error[i].field === 'email') {
            if(error.error[i].code === 'NotBlank') {
              this.messageEmail = error.error[i].defaultMessage
            } else if (error.error[i].code === 'Pattern'){
              this.messageEmailPattern = error.error[i].defaultMessage
            }
          }
          if (error.error[i].field === 'phoneNumber') {
            if(error.error[i].code === 'NotBlank') {
              this.messagePhoneNumber = error.error[i].defaultMessage
            } else if (error.error[i].code === 'Pattern'){
              this.messagePhoneNumberPattern = error.error[i].defaultMessage
            }
          }
          if (error.error[i].field === 'address') {
            this.messageAddress = error.error[i].defaultMessage
          }
        }
      })
    }
  }
}

