import {Component, HostListener, OnInit} from '@angular/core';
import {BlogService} from '../../service/blog.service';
import {Blog} from '../../entity/blog/blog';
import {ActivatedRoute} from '@angular/router';
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})


/*
Created by: LinhPT,
Date created: 02-03/02/2023,
Describe: getAllBlog, findById and paging
 */

export class BodyComponent implements OnInit {
  pageBlog: Blog[] = [];
  numberPage: number = 0;
  blog: Blog = {};
  totalPages = 0;
  size: number = 3;
  pageYoffSet =0;
  constructor(private blogService: BlogService,
              private activatedRoute: ActivatedRoute,
              private scroll: ViewportScroller) {
    /*
    Use pramMap to find the id and get the corresponding object
     */

    this.activatedRoute.paramMap.subscribe(ok => {
      const id = ok.get('id');
      if (id != null) {
        this.blogService.findById(parseInt(id)).subscribe(data => {
          this.blog = data;
        });
      }
    });
  }
  @HostListener('window:scroll', ['$event']) onScroll() {
    this.pageYoffSet = window.pageYOffset;
  }

  // tslint:disable-next-line:typedef
  scrollToBlog() {
    this.scroll.scrollToPosition([0, 2200]);
  }

  ngOnInit(): void {
    this.getAllBlog(this.size);
  }

  /*
  Get list of Blogs and pagination:
   */
  last: any;
  first: any;

  getAllBlog(size: number) {
    this.blogService.getAllPage(size).subscribe(data => {
      if (data != null) {
        console.log(data);
        this.pageBlog = data.content;
        console.log(this.pageBlog);
        this.numberPage = data.number;
        this.size = data.size;
        console.log(this.numberPage);
        this.totalPages = data.totalPages;
        this.first = data.first;
        this.last = data.last;
      }

    });
  }

}
