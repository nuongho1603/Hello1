import {Component, OnInit} from '@angular/core';
import {TeacherService} from '../../service/teacher.service';
import {Teacher} from '../../entity/teacher/teacher';
import {PageTeacher} from '../../dto/page-teacher';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-teacher-search',
  templateUrl: './teacher-search.component.html',
  styleUrls: ['./teacher-search.component.css']
})
export class TeacherSearchComponent implements OnInit {

  pageTeacher!: PageTeacher;

  nameTeacherSearch = '';
  statusTeacherSearch = '';
  pageNumber = 0;
  totalPage = 0;


  teachers: Teacher[] = [];
  rfSearch!: FormGroup;


  constructor(private teacherService: TeacherService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createSearchForm();
    this.searchTeacher(0);
  }

  /**
   * create by :VinhLD
   * date create : 02/03/2023
   * function: search teacher by name and status
   */
  searchTeacher(pageNumber: number): void {
    const teacherToSearch = this.rfSearch.value;
    teacherToSearch.nameTeacher = this.rfSearch.value.nameTeacher.trim();
    teacherToSearch.teachStatus = this.rfSearch.value.teachStatus;
    this.teacherService.getPageTeacher(teacherToSearch, pageNumber).subscribe(data => {
      console.log(data);
      this.pageTeacher = data;
    }, error => {
      }, () => {
    });
  }


  createSearchForm(): void {
    this.rfSearch = this.formBuilder.group({
      nameTeacher: [''],
      teachStatus: ['false']
    });
  }

  gotoPage(pageNumber: number): void {
    this.searchTeacher(pageNumber);
  }
}
