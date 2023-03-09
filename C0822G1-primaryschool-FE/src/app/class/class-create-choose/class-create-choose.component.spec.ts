import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCreateChooseComponent } from './class-create-choose.component';

describe('ClassCreateChooseComponent', () => {
  let component: ClassCreateChooseComponent;
  let fixture: ComponentFixture<ClassCreateChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassCreateChooseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassCreateChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
