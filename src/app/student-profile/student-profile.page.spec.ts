import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentProfilePage } from './student-profile.page';

describe('StudentProfilePage', () => {
  let component: StudentProfilePage;
  let fixture: ComponentFixture<StudentProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
