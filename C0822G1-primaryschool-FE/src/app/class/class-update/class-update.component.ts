import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Block} from '../../entity/student/block';
import {Teacher} from '../../entity/teacher/teacher';
import {Clazz} from '../../entity/student/clazz';
import {ClazzService} from '../../service/clazz.service';
import {BlockService} from '../../service/block.service';
import {TeacherService} from '../../service/teacher.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {StudentService} from '../../service/student.service';
import {Student} from '../../entity/student/student';
import {ClazzStudentDto} from "../../dto/clazz-student-dto";
import {StudentClazzDto} from "../../entity/clazz/student-clazz-dto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-class-update',
  templateUrl: './class-update.component.html',
  styleUrls: ['./class-update.component.css']
})
export class ClassUpdateComponent implements OnInit {
  clazzForm: FormGroup = new FormGroup({
    clazzId: new FormControl(),
    timeTable: new FormControl(""),
    block: new FormControl(""),
    clazzName: new FormControl(""),
    year: new FormControl(""),
    teacher: new FormControl(""),
  })

  clazzStudentDtoForm : FormGroup = new FormGroup({
    clazzId: new FormControl(""),
    clazzName: new FormControl(""),
    studentId: new FormControl(""),
    studentName: new FormControl(""),
    teacherId: new FormControl(""),
    teacherName: new FormControl(""),
    dateOfBirth: new FormControl(""),
    gender: new FormControl(""),
    address: new FormControl(""),
    blockName: new FormControl(""),
  })

  studentClazzDtoForm : FormGroup = new FormGroup({
    clazzId: new FormControl(""),
    studentName: new FormControl(""),
    dateOfBirth: new FormControl(""),
    address: new FormControl(""),
    clazzName: new FormControl(""),
  })
  clazz:Clazz={clazzId:0, teacher: {teacherId:0,teacherName:''}};
  clazzList: Clazz[] =[];
  blockList: Block[] =[];
  teacherList: Teacher[] = [];
  studentList: Student[] = [];
  classStudentDtoList : ClazzStudentDto[] = [];
  studentClazzDtoList : StudentClazzDto[] = [];
  id: number = 0;


  constructor(private clazzService: ClazzService,
              private blockService: BlockService,
              private teacherService: TeacherService,
              private router: Router,
              private studentService : StudentService,
              private activatedRoute: ActivatedRoute,
              private toast: ToastrService) {
    this.activatedRoute.paramMap.subscribe((paramMap:ParamMap) => {
      this.id = parseInt(<string>paramMap.get('id'))
      if (this.id !=null) {
        this.getClazzStudentDto(this.id)
        this.studentService.getAllClazzz(this.id).subscribe(data=>{
          this.studentList = data;
        })
        this.studentService.getAllStudentClazzDto(this.id).subscribe(data=>{
          this.studentClazzDtoList = data;
        })
      }
    })
  }

  ngOnInit(): void {
    this.teacherService.getAllTeacher().subscribe(data =>{
      this.teacherList = data;
      // console.log(data)
    })
    this.blockService.getAllBlock().subscribe(data =>{
      this.blockList = data;
      // console.log(data)
    })
    this.clazzService.getAllClazzStudent().subscribe(data=>{
      this.clazzList =data;
      // console.log(data);
    })
    this.clazzService.getAllClazzStudentDtoNoPage().subscribe(data=>{
      this.classStudentDtoList =data;
      console.log("tuan"+data);
    })
  }

  private getClazzStudentDto(id: number) {
    return this.clazzService.findByIdClazzStudentDto(id).subscribe(clazz =>{
      this.clazzStudentDtoForm.patchValue(clazz);
      // console.log(clazz);
    })
  }


  update(id:number){
    // console.log("đây là id:"+id);
    if (this.clazzStudentDtoForm != undefined && id != null){
      const clazz = this.clazzStudentDtoForm.value;
      this.clazz.clazzId=clazz.clazzId;
      // @ts-ignore
      this.clazz.teacher?.teacherId= clazz.teacherId;
      // @ts-ignore
      this.clazz.teacher?.teacherName= clazz.teacherName;
      console.log('teacherID',this.clazz.teacher?.teacherId)
      console.log("clazz",this.clazz)
      this.clazzService.updateClazz(id, this.clazz).subscribe(()=>{
        if (this.clazzForm != undefined){
          this.clazzForm.reset();
          this.router.navigateByUrl("/class");
          this.toast.success('Sửa mới thành công', 'Thông báo', {positionClass: 'toast-top-center'})
        }
      }, error => {
        this.router.navigateByUrl("/class/update")
      })
    }
  }

  public getStudentClazzDtoCount(): number {
    return this.studentClazzDtoList.length;
  }

}
