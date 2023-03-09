import {Component, OnInit} from '@angular/core';
import {PageStudentDto} from '../../dto/page-student-dto';
import {StudentService} from '../../service/student.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StudentDto} from '../../dto/student-dto';


@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css']
})
export class StudentSearchComponent implements OnInit {
  pageNumber = 0;
  totalPage = 0;
  studentDto: StudentDto[] = [];
  pageStudent!: PageStudentDto;
  rfSearch!: FormGroup;

  constructor(private studentService: StudentService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createSearchForm();
    this.searchStudent(0);
  }

  /**
   * create by : VinhLD
   * date create : 02/03/2023
   * function : search student by name and status
   */
  searchStudent(pageNumber: number): void {
    const studentToSearch = this.rfSearch.value;
    studentToSearch.nameStudent = this.rfSearch.value.nameStudent.trim();
    studentToSearch.studyStatus = this.rfSearch.value.studyStatus;
    this.studentService.getPageStudent(studentToSearch, pageNumber).subscribe(data => {
      this.pageStudent = data;
    }, error => {
    }, () => {
    });
  }

  createSearchForm(): void {
    this.rfSearch = this.formBuilder.group({
      nameStudent: [''],
      studyStatus: ['false']
    });
  }

  gotoPage(pageNumber: number): void {
    this.searchStudent(pageNumber);
  }
}
