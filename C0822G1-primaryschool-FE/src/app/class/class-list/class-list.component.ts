import {Component, OnInit} from '@angular/core';
import {Clazz} from '../../entity/student/clazz';
import {Block} from '../../entity/student/block';
import {Teacher} from '../../entity/teacher/teacher';
import {ClazzService} from '../../service/clazz.service';
import {BlockService} from '../../service/block.service';
import {TeacherService} from '../../service/teacher.service';
import {FormControl, FormGroup} from '@angular/forms';
import {StudentService} from '../../service/student.service';
import {ClazzStudentDto} from "../../dto/clazz-student-dto";
import {TokenStorageService} from "../../service/authentication/token-storage.service";

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  clazzStudentDtoList: ClazzStudentDto [] = [];
  clazzList: Clazz[] = [];
  blockList: Block[] = [];
  teacherList: Teacher[] = [];
  totalPage: number = 0;
  size: number = 0;
  search: string = '';
  p: number = 0;
  clazzIdUpClazz: number = 0;
  nameClazzUpClazz?: string = '';
  formGroup: FormGroup;
  pages: number[] = [];
  role: string = '';

// Hàm để tạo danh sách các trang
  private createPageList() {
    this.pages = [];
    const start = Math.max(this.p - 2, 0);
    const end = Math.min(start + 4, this.totalPage - 1);

    for (let i = start; i <= end; i++) {
      this.pages.push(i);
    }
  }

  // Hàm để lấy dữ liệu khi chuyển sang trang mới
  private goToPageInternal(page: number) {
    this.p = page;
    this.getAll(this.p);
    this.createPageList();
  }

  constructor(private clazzService: ClazzService,
              private blockService: BlockService,
              private teacherService: TeacherService,
              private studentService: StudentService,
              private tokenStorageService: TokenStorageService) {
    this.formGroup = new FormGroup({
      search: new FormControl('')
    });

    if (tokenStorageService.getRole()) {
      this.role = tokenStorageService.getRole()[0];
      console.log(this.role);
    }
  }

  ngOnInit(): void {
    this.getAll(this.p);
    this.createPageList();
  }

  getAll(page: number) {
    this.clazzService.getAllClazzStudentDto(page, this.search.trim()).subscribe(data => {
      // @ts-ignore
      this.clazzStudentDtoList = data['content'];
      // @ts-ignore
      this.totalPage = data['totalPages'];
      // @ts-ignore
      this.p = data['number'];
      // @ts-ignore
      this.size = data['size'];
      console.log(data);
    });
    this.teacherService.getAllTeacher().subscribe(data => {
      this.teacherList = data;
    });
    this.blockService.getAllBlock().subscribe(data => {
      this.blockList = data;
    });
    this.createPageList();
  }

  getDataUpClass(clazz: Clazz) {
    if (clazz.clazzId != undefined) {
      this.clazzIdUpClazz = clazz.clazzId;
      this.nameClazzUpClazz = clazz.clazzName;
    }
  }

  previousPage() {
    if (this.p > 0) {
      this.goToPageInternal(this.p - 1);
    }
  }

  nextPage() {
    if (this.p < this.totalPage - 1) {
      this.goToPageInternal(this.p + 1);
    }
  }



  searchNameCLass() {
    // this.p = 0;
    // this.ngOnInit();
    this.clazzService.getAllClazzStudentDto(0, this.formGroup.value.search.trim()).subscribe(data => {
      // @ts-ignore
      this.clazzStudentDtoList = data['content'];
      // @ts-ignore
      this.totalPage = data['totalPages'];
      // @ts-ignore
      this.p = data['number'];
      // @ts-ignore
      this.size = data['size'];
      console.log(data);
    });
    this.teacherService.getAllTeacher().subscribe(data => {
      this.teacherList = data;
    });
    this.blockService.getAllBlock().subscribe(data => {
      this.blockList = data;
    });
    this.createPageList();
    console.log('abc' + this.formGroup.value.search);
  }

  upclasss() {
    this.studentService.upClass().subscribe((data: any) => {
      console.log(data);
    });
    console.log('okok');
    this.ngOnInit()
  }

  goToPage(page: number) {
    this.p = page;
    this.goToPageInternal(page);
    // Do something to load data for the new page
  }
}
