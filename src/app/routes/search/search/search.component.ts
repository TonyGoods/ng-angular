import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STData } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { CommentEditComponent } from '../edit/commentEdit.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-search',
  templateUrl: './search.component.html',
})
export class SearchSearchComponent implements OnInit {
  data = [];
  useData = []
  searchItem = {}
  form: FormGroup
  title = '搜索结果';
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private formBuild: FormBuilder
  ) { }

  ngOnInit() {
    for (var i = 0; i < 23; i++) {
      var addOne = {}
      addOne['avatar'] = 'https://randomuser.me/api/portraits/thumb/men/' + Math.ceil(Math.random() * 100 - 1) + '.jpg'
      addOne['wechatId'] = i.toString()
      addOne['officialName'] = i.toString()
      addOne['comment'] = 'hello'
      addOne['dataTime'] = new Date()
      this.data.push(addOne)
    }
    this.useData = this.data
    this.form = this.formBuild.group({
      wechatId: [null],
      officialName: [null]
    })
  }

  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'Avatar', index: 'avatar', type: "img", width: '150px', },
    { title: 'WechatId', index: 'wechatId' },
    { title: 'OfficialName', index: 'officialName' },
    {
      title: '更新时间',
      index: 'dataTime',
      type: 'date',
      sort: {
        compare: (a: any, b: any) => a.dataTime - b.dataTime,
      },
    },
    {
      title: 'Comment',
      buttons: [
        {
          text: '编辑查看',
          index: 'comment',
          click: (record: any, modal: any) => {
            this.modal
              .create(CommentEditComponent, { record }, { size: 'md' })
              .subscribe(res => {
                var index = this.data.indexOf(record)
                this.data[index]['comment'] = res.comment
                this.useData = this.data
              })
          }
        },
      ],
    }
  ];
  selectedRows = []

  getData() {
    for (const key in this.form.value) {
      this.searchItem[key] = this.form.value[key]
    }
    this.search()
  }

  search(): void {
    var tempData = this.data
    for (const key in this.searchItem) {
      if (this.searchItem[key] === null) {
        continue;
      }
      if (tempData.length <= 0) {
        return
      }
      tempData = tempData.map((item) => {
        if (!item) return null
        return item[key].indexOf(this.searchItem[key]) > -1 ? item : null
      })
      for (var i = 0; i < tempData.length; i++) {
        if (tempData[i] === null) {
          tempData.splice(i, 1)
          i--
        }
      }
    }
    this.useData = tempData
  }
}
