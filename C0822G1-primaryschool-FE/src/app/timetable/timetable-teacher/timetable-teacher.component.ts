
import {Component, OnInit} from '@angular/core';
import {TimeTableView} from '../../dto/time_table/time-table-view';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {TimetableService} from '../../service/time_table/timetable-service.service';
import {TokenStorageService} from '../../service/authentication/token-storage.service';
import {StudentService} from "../../service/student/student.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-timetable-teacher',
  templateUrl: './timetable-teacher.component.html',
  styleUrls: ['./timetable-teacher.component.css']
})
export class TimetableTeacherComponent implements OnInit {

  idTeacher = -1;
  timetables: TimeTableView[][] | undefined;
  time: any[] = [];

  constructor(private timetableService: TimetableService,
              private router: Router,
              private titleService: Title,
              private tokenService: TokenStorageService,
              private studentService: StudentService,
              private toast: ToastrService) {
    this.titleService.setTitle('Trang chủ giáo viên');
  }

  ngOnInit(): void {
    this.findTimetableById();
  }

  /**
   * Create by: VanNTC
   * Date created: 01/03/2023
   * Function: get timetable
   */

  findTimetableById() {
    const idAccount = this.tokenService.getIdAccount();
    console.log(idAccount)
    this.studentService.getIdTeacherByIdAccount(idAccount).subscribe(next => {
      this.idTeacher = next.teacherId;
      this.timetableService.getTimeTableByIdTeacher(this.idTeacher).subscribe(next => {
        this.timetables = next;
        let index = 0;

        while (index < this.timetables.length) {
          this.time.push(this.timetables.slice(index, index + 5).reduce((acc, curr) => acc.concat(curr), []));
          index += 5;
        }
      }, error => {
        this.toast.error('Không tìm thấy danh sách', 'Thông báo', {positionClass: 'toast-top-left'})

      });

    });

  }
}
