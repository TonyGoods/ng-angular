import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STComponent, STColumn, STData } from '@delon/abc';
import { SearchEditKeywordComponent } from '../search/edit/edit.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    

  title = '名单管理';
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
  ) { }

  ngOnInit() {
  }

  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'Keywords', index: 'keyWords' },
    { title: 'Sector', index: 'sector' },
    { title: 'Filter', index: 'filter' },
    {
      title: '更新时间',
      index: 'dataTime',
      type: 'date',
      sort: {
        compare: (a: any, b: any) => a.dataTime - b.dataTime,
      },
    },
    {
      title: 'Action',
      buttons: [
        {
          text: 'Edit',
          type:'modal',
          modal:{
            component:SearchEditKeywordComponent,
          },
          click: (record: any, modal: any) =>{

          }
        },
        {
          text: 'Delete',
          // click: (item: any) => this.msg.success(`订阅警报${item.no}`),
        },
      ],
    },
  ];
  selectedRows: STData[] = [];

  openEdit(record: any ) {
    console.log("新建")
    this.modal
      .create(SearchEditKeywordComponent, { record }, { size: 'md' })
      .subscribe(res => {
        console.log(res);
        // if (record.id) {
        //   // record = Object.assign(record, { id: 'mock_id', percent: 0 }, res);
        // } else {
        //   this.data.splice(0, 0, res);
        //   this.data = [...this.data];
        // }
      });
  }

}
