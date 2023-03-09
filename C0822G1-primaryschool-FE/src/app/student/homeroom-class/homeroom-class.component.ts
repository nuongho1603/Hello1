import {Component, OnInit} from '@angular/core';
import {StudentInfo} from '../../dto/student/student-info';
import {StudentInfoJson} from '../../dto/student/student-info-json';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {TokenStorageService} from '../../service/authentication/token-storage.service';
import {StudentService} from "../../service/student/student.service";

@Component({
  selector: 'app-homeroom-class',
  templateUrl: './homeroom-class.component.html',
  styleUrls: ['./homeroom-class.component.css']
})
export class HomeroomClassComponent implements OnInit {
  studentInfo: StudentInfo[] = [];
  studentList!: StudentInfoJson;
  request = {page: 0, size: 10};
  pageNumber = 0;
  totalPages = 0;
  idTeacher = -1;
  clazz: any;

  constructor(private studentService: StudentService,
              private router: Router,
              private titleService: Title,
              private tokenService: TokenStorageService) {
    this.titleService.setTitle('Danh sách học sinh');
  }

  ngOnInit(): void {
    this.getAllStudent(this.request);
  }

  /**
   * Create by: VanNTC
   * Date created: 01/03/2023
   * Function: get list student
   */

  getAllStudent(request: { page?: any; size?: any; } | undefined): void {
    const idAccount = this.tokenService.getIdAccount();
    this.studentService.getIdTeacherByIdAccount(idAccount).subscribe(data => {
      this.idTeacher = data.teacherId;
      this.studentService.getAllStudentByIdTeacher(request, this.idTeacher).subscribe(data => {
        this.studentList = data;
        this.studentInfo = data.content;
        console.log(this.studentInfo)
        this.clazz = this.studentInfo[0].nameClazz;
        this.totalPages = data.totalPages;
        this.pageNumber = data.pageable.pageNumber;
      }, error => {
      }, () => {
      });
    });
  }

  /**
   * Create by: VanNTC
   * Date created: 01/03/2023
   * Function: change page pagination
   * @param pageNumber: number
   */
  changePage(pageNumber: number): void {
    this.request.page = pageNumber;
    this.ngOnInit();
  }
}
