import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-view-application',
  templateUrl: './student-view-application.page.html',
  styleUrls: ['./student-view-application.page.scss'],
})
export class StudentViewApplicationPage implements OnInit {

  constructor() { }

  ngOnInit() {

    console.log('student view application');
  }

}
