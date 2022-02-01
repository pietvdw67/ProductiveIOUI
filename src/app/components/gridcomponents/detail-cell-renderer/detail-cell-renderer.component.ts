import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-detail-cell-renderer',
  templateUrl: './detail-cell-renderer.component.html',
  styleUrls: ['./detail-cell-renderer.component.scss']
})
export class DetailCellRendererComponent implements ICellRendererAngularComp, OnDestroy {

  private params: any;
  private router: Router;

  constructor(router: Router) { 
    if (router){
      this.router =router;
    }
  }

  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {    
  }

  ngOnInit(): void {
  }

  btnDetailClickedHandler(something:any) {
    this.params.clicked(this.params.value);

    // 0 = countDate
    // 1 = manchineId
    var commaParms = String(this.params.value).split(',');    
    this.router.navigate(['/detail',commaParms[0],commaParms[1]]);
  }

}
