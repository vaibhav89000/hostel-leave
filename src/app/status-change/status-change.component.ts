import { SelectorListContext } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-status-change',
  templateUrl: './status-change.component.html',
  styleUrls: ['./status-change.component.scss'],
})
export class StatusChangeComponent implements OnInit {

  @Input() selectedApplication: any;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  statusChange(status){
    if(status === 0){
      this.selectedApplication.status = 1;
    }
    else if(status === 1){
      this.selectedApplication.status = 2;
    }
    else if(status === 2){
      this.selectedApplication.status = 0;
    }
  }

  Submit(){
    this.modalCtrl.dismiss(this.selectedApplication,'confirm');
  }

  onCancel(){
    this.modalCtrl.dismiss(null,'cancel');
  }



}
