import { environment } from '@env/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STData, STChange } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { SearchEditKeywordComponent } from '../edit/edit.component';
import { tap, map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-keyword-manager',
  templateUrl: './keyword-manager.component.html',
})
export class SearchKeywordManagerComponent implements OnInit {

  title = '名单管理';
  //data: any;
  loading = false;
  form: FormGroup;
  dataST: STData[] = []
  useDataST: STData[]
  addOne = new Array()
  searchItem = {};

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private formBuild: FormBuilder
  ) { }

  ngOnInit() {
    console.log('ngOnInit---');
    this.getInitData();
    /*for (var index = 0; index < 23; index++) {
      var addOne: STData = {};
      addOne['keyWords'] = "keyWords" + index
      addOne['sector'] = "sector" + index
      addOne['dataTime'] = new Date()
      addOne['filter'] = 'filter' + index
      this.dataST.push(addOne)
    }*/
    this.form = this.formBuild.group({
      sector: [null],
      filter: [null],
      keyWord: [null]
    })
  }

  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'Keywords', index: 'keyWord' },
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
          click: (record: any, modal: any, _t) => {
            this.modal
              .create(SearchEditKeywordComponent, { record }, { size: 'md' })
              .subscribe(res => {
                var index: number = this.dataST.indexOf(record)
                this.dataST[index]['keyWord'] = res.keyWord
                this.dataST[index]['sector'] = res.sector
                this.dataST[index]['filter'] = res.filter
                this.dataST[index]['dataTime'] = new Date()
                this.useDataST = this.dataST
                _t.reload()
              })
          }
        },
        {
          text: 'Delete',
          click: (ST: STColumn, modal, _t) => {
            this.dataST.splice(this.dataST.indexOf(ST), 1)
            _t.reload()
          }
        },
      ],
    },
  ];
  selectedRows: STData[] = [];

  openEdit(record: any, ) {
    this.modal
      .create(SearchEditKeywordComponent, { record }, { size: 'md' })
      .subscribe(res => {
        this.addOne['keyWord'] = res.keyWord
        this.addOne['sector'] = res.sector
        this.addOne['filter'] = res.filter
        this.addOne['dataTime'] = new Date()
        this.dataST.unshift(this.addOne)
        this.useDataST = this.dataST
        this.st.reload()
      });
  }

  change(ret: STChange) {
  }

  getData() {
    for (const key in this.form.value) {
      this.searchItem[key] = this.form.value[key]
    }
    this.search()
    console.log(this.searchItem)
  }

  search(): void {
    var tempData = this.dataST
    for (const key in this.searchItem) {
      if(this.searchItem[key]===null){
        continue;
      }
      if (tempData.length < 0) {
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
    this.useDataST = tempData
  }

  getInitData() {
    this.loading = true;
    console.log(environment.SERVER_URL + 'search/result');
    // this.http.get('https://41c0ede7-bac0-49e6-a786-ea1a8952d855.mock.pstmn.io/search/result')
    this.http.get('search/result')
      .pipe(
        tap(() => {
          console.log('tap');

          this.loading = false;
        })
      )
      .subscribe(res => {
        // this.loading = false;
        console.log("res.values");
        console.log(res);
        this.dataST = res['data'];
        this.useDataST=this.dataST
      }
      );
  }

}
