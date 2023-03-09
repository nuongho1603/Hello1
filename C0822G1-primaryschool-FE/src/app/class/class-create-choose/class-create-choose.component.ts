import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassService} from '../../service/class.service';
import {TeacherService} from '../../service/teacher.service';
import {Teacher} from '../../entity/teacher/teacher';
import {Router} from '@angular/router';
import {Clazz} from '../../entity/student/clazz';
import {Title} from '@angular/platform-browser';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-class-create-choose',
  templateUrl: './class-create-choose.component.html',
  styleUrls: ['./class-create-choose.component.css']
})
export class ClassCreateChooseComponent implements OnInit {
  a:number=0 ;
  teacherList: Teacher[]=[];
  teacherName: (Teacher | undefined)[] = [];
  classCreate: FormGroup = new FormGroup(
    {
      clazzName: new FormControl("",[Validators.required,this.validateClazzName.bind(this) ,Validators.maxLength(5),Validators.pattern('^[1-5][A-Z]{1,4}$')]),
      teacherDto: new FormControl("",[Validators.required, this.validateTeacherName.bind(this)]),
      schoolYear: new FormControl("",[Validators.required,Validators.pattern("^[0-9]{4}-[0-9]{4}$"),this.validateSchoolYear]),
    }
  );
  clazzNameValidate: (string | undefined)[]= [];

  constructor(private router: Router,private classService:ClassService,private teacherService:TeacherService,private title: Title,private toast: ToastrService) {
    this.title.setTitle('thêm mới chọn lớp')
    this.teacherService.getAllTeacherList().subscribe(data=>{

        this.teacherList =data;
      },
      error => {},()=>{}
    )
  }

  ngOnInit(): void {
    this.classService.getListClass().subscribe(data=>{
        if (data!=null){
          this.a = Number(data[data.length-1].clazzId)+1;
        }
        this.clazzNameValidate=data.map((iteam)=> iteam.clazzName);
        console.log(this.clazzNameValidate);
        // @ts-ignore
        this.teacherName = data.map((item) => item['teacherName']);
        console.log("tEACHER n name: " + this.teacherName);
      },
      error => {},
      ()=>{});
  }

  saveClass(): void {
    if (this.classCreate.valid) {
      const c = this.classCreate.value;
      console.log(c);
      this.classService.saveClass(c).subscribe(data=>{
          this.toast.success("Thêm mới thành công",'Thông báo:',{
            timeOut:2000, positionClass: 'toast-top-center'
          });
          this.router.navigateByUrl('class/create/info/'+this.a);
        },error => {
          this.toast.error("Thêm mới thất bại",'Thông báo:',{
            timeOut:2000, positionClass: 'toast-top-center'
          });
        },
        ()=>{}
      )
    }
  }

  validateClazzName(control: AbstractControl){
    let check = control.value;
    if (!check) return null;
    const isDuplicate = this.clazzNameValidate.includes(check)

    return isDuplicate?{sai:true}:null;
  }

  validateSchoolYear(control: AbstractControl){
    const schoolYear = control.value;
    if (schoolYear){
      const yearRange = schoolYear.split('-');
      const startYear = parseInt(yearRange[0]);
      const endYear = parseInt(yearRange[1]);
      if (endYear - startYear !=5 ) {
        return {'invalidSchoolYear': true};
      }
    }
    return null;
  }

  validateTeacherName(control: AbstractControl) {
    let check = control.value.teacherName;
    if (!check) return null;
    const isDuplicate = this.teacherName.includes(check);
    return isDuplicate ? {false: true} : null;
  }
}
