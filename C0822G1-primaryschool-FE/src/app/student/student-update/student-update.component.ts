import {Component, Inject, OnInit} from '@angular/core';
import {Student} from "../../entity/student/student";
import {Clazz} from "../../entity/student/clazz";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {StudentService} from "../../service/student/student.service";
import {ClazzService} from "../../service/clazz/clazz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {

  student: Student = {};
  studentId: any;
  year: any;
  clazzIdParam: any;
  page: any;
  clazz: Clazz = {};
  formUpdateStudent: FormGroup = new FormGroup({});
  selectedImage: any;
  src: string | undefined;
  fb: string | undefined;
  downloadURL: Observable<string> | undefined;

  constructor(private studentService: StudentService,
              private clazzService: ClazzService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toast: ToastrService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.formUpdateStudent = new FormGroup({
      studentId: new FormControl(),
      img: new FormControl('', [Validators.required]),
      studentName: new FormControl('', [Validators.required, Validators.pattern('[a-z 0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      fatherName: new FormControl('', [Validators.required, Validators.pattern('[a-z 0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      phoneNumberFather: new FormControl('', [Validators.required, Validators.pattern('^(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$')]),
      fatherJob: new FormControl('', [Validators.required, Validators.pattern('[a-z 0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      motherName: new FormControl('', [Validators.required, Validators.pattern('[a-z 0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      phoneNumberMother: new FormControl('', [Validators.required, Validators.pattern('^(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$')]),
      motherJob: new FormControl('', [Validators.required, Validators.pattern('[a-z 0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      religion: new FormControl('', [Validators.required, Validators.pattern('[a-z 0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      address: new FormControl('', [Validators.required]),
      clazzDto: new FormGroup({
        clazzId:new FormControl(),
        clazzName:new FormControl()
      })
    });

    this.activatedRoute.paramMap.subscribe(data => {
      if (data != null) {
        this.studentId = data.get('id');
        this.year = data.get('year');
        this.clazzIdParam = data.get('clazzId');
        this.page = data.get('page');

        this.clazzService.findByIdStudent(this.studentId).subscribe(data=>{
          this.clazz= data;
          console.log('Đây là calzz')
          console.log(this.clazz);
          if (data!=null){
            this.student={clazz:this.clazz};
          }
        })
      }
      if (this.studentId != null) {
        this.studentService.findById(this.studentId).subscribe(data => {
          if (data!=null){
            this.student = data;
            this.student.clazz = this.clazz;
            this.formUpdateStudent.patchValue(this.student);
            this.formUpdateStudent.patchValue({clazzDto: this.clazz});
          }
        });
      }

    });
  }

  ngOnInit(): void {
    // this.getAllClazz();
  }
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    var n = Date.now();
    // Nơi lưu
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, this.selectedImage);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              // lấy lại url
              this.student.img = url;
            }
            this.src = url;
            console.log('link', this.student.img);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          // in url ra
          console.log('url :', url);
        }
      });
  }

  // tslint:disable-next-line:typedef
  updateStudent() {
    this.formUpdateStudent.patchValue({clazzDto: this.clazz});
    if (this.selectedImage == null){
      this.student=this.formUpdateStudent.value
      this.student.clazz=this.clazz;
      this.studentService.updateStudent(this.student).subscribe(() => {
        this.toast.success('Chỉnh sửa thành công', 'Thông báo', {positionClass: 'toast-top-center'});
        this.router.navigateByUrl(`student/${this.year}/${this.clazzIdParam}/${this.page}`);
      });
    }else {
      const nameImg = this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.formUpdateStudent.patchValue({img: url});
            // Call API to create vaccine
            this.student=this.formUpdateStudent.value
            this.student.clazz=this.clazz;
            console.log(this.student);
            this.studentService.updateStudent(this.student).subscribe(() => {
              this.toast.success('Chỉnh sửa thành công', 'Thông báo', {positionClass: 'toast-top-center'});
              this.router.navigateByUrl(`student/${this.year}/${this.clazzIdParam}/${this.page}`);
            });
          });
        })
      ).subscribe();
    }
  }

// tslint:disable-next-line:typedef
  compareFun(item1: { id: any; }, item2: { id: any; } ) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }
}
