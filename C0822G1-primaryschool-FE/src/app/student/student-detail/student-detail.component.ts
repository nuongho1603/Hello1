
import {Component, OnInit} from '@angular/core';
import {Student} from '../../entity/student/student';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../../service/student/student.service';


@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  student: Student = {};
  studentId: any;
  year: any;
  clazzId: any;
  page: any;


  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute,
  ) {
  }

  /**
   * Created by: NuongHT
   * Date created: 01/03/2023
   * Function: get student by studentId
   *
   * @param studentId
   * @return object: student
   */

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params => {
    //   debugger
    //   this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
    //   console.log(this.studentId);
    //   this.studentService.findById(this.studentId).subscribe(next => {
    //     this.student = next;
    //     console.log(next);
    //   });
    // });

    this.activatedRoute.paramMap.subscribe(data => {
      debugger
      if (data != null) {
        this.studentId = data.get('id');
        this.year = data.get('year');
        this.clazzId = data.get('clazzId');
        this.page = data.get('page');
        console.log(this.studentId,this.year,this.clazzId,this.page);
      }
    });
    console.log(this.studentId);
    this.studentService.findById(this.studentId).subscribe(next => {
      this.student = next;
      console.log(next);
    });
  }

}
