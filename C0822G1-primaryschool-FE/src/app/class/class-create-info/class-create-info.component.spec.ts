import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCreateInfoComponent } from './class-create-info.component';

describe('ClassCreateInfoComponent', () => {
  let component: ClassCreateInfoComponent;
  let fixture: ComponentFixture<ClassCreateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassCreateInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassCreateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
