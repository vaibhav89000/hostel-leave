import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginStudentPage } from './login-student.page';

describe('LoginStudentPage', () => {
  let component: LoginStudentPage;
  let fixture: ComponentFixture<LoginStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginStudentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
