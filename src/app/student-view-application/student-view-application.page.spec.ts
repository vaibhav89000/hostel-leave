import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentViewApplicationPage } from './student-view-application.page';

describe('StudentViewApplicationPage', () => {
  let component: StudentViewApplicationPage;
  let fixture: ComponentFixture<StudentViewApplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentViewApplicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentViewApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
