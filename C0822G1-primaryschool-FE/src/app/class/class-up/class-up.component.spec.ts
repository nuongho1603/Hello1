import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassUpComponent } from './class-up.component';

describe('ClassUpComponent', () => {
  let component: ClassUpComponent;
  let fixture: ComponentFixture<ClassUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
