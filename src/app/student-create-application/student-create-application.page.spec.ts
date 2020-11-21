import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentCreateApplicationPage } from './student-create-application.page';

describe('StudentCreateApplicationPage', () => {
  let component: StudentCreateApplicationPage;
  let fixture: ComponentFixture<StudentCreateApplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCreateApplicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCreateApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
