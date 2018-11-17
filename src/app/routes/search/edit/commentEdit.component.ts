import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './commentEdit.component.html',
})
export class CommentEditComponent  {
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  record: any = {};
  schema: SFSchema = {
    properties: {
      comment: { type: 'string', title: 'comment', maxLength: 50 }
    },
    required: ['comment'],
    ui: {
      spanLabelFixed: 150,
      grid: { span: 24 },
    },
  };

  constructor(private modal: NzModalRef) {}

  save(value: any) {
    // this.msgSrv.success('保存成功');
    this.modal.close(value);
  }

  close() {
    this.modal.destroy();
  }



}
