import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-search-edit',
  templateUrl: './edit.component.html',
})
export class SearchEditKeywordComponent  {
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  record: any = {};
  schema: SFSchema = {
    properties: {
      keyWord: { type: 'string', title: 'Keyword', maxLength: 50 },
      sector: { type: 'string', title: 'Sector', maxLength: 50 },
      filter: { type: 'string', title: 'Filter', maxLength: 50 },
    },
    required: ['keyWord', 'sector', 'filter'],
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
