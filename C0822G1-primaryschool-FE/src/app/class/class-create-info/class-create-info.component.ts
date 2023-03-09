import { Component, OnInit } from '@angular/core';
import {ClassService} from '../../service/class.service';
import {TeacherService} from '../../service/teacher.service';
import {Teacher} from '../../entity/teacher/teacher';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ClazzStudentDto} from '../../dto/clazz-student-dto';

@Component({
  selector: 'app-class-create-info',
  templateUrl: './class-create-info.component.html',
  styleUrls: ['./class-create-info.component.css']
})
export class ClassCreateInfoComponent implements OnInit {
  teacherList: Teacher[]=[];
  clazzStudentDtoList:ClazzStudentDto[]=[];
  teacher:any;
  clazzName: any;
  teacherName: any;
  id = 0;
  sum: number = 0;
  student: any ;
  clazzStudent: any;
  constructor(private classService:ClassService,private teacherService:TeacherService,private router: Router,private activatedRoute: ActivatedRoute,
              private title: Title) {
    this.title.setTitle('thêm mới nhập thông tin học sinh')
    this.teacherService.getAllTeacherList().subscribe(data=>{
        this.teacherList =data;
      },
      error => {},()=>{}
    );
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = parseInt(paramMap.get('id') as string);
    });
  }
  ngOnInit(): void {
    this.getInfo(this.activatedRoute.snapshot.params.id);
  }

  private getInfo(id: number): any {
    return this.classService.findByID(id).subscribe(data=>{
        this.clazzStudentDtoList= data;
        console.log(data);
        this.clazzName=data[0].clazzName;
        this.clazzStudent = data[0].clazzId;
        this.teacherName=data[0].teacherName;
        for (let i = 0; i <data.length; i++) {
            if (data[i].studentId!=null){
              console.log(data[i].studentId);
              this.sum+=1;
            }
        }
      },
        error => {
      this.router.navigateByUrl('/error')
        },
      ()=>{})
  }
}
