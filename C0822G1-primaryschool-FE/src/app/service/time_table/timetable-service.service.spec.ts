import { TestBed } from '@angular/core/testing';

<<<<<<< HEAD
class TimetableServiceService {
}
=======
import { TimetableService } from './timetable-service.service';
>>>>>>> origin/dev

describe('TimetableServiceService', () => {
  let service: TimetableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimetableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
