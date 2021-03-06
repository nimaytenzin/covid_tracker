import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  todayDate:any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
 



  constructor(
    private dataService: DataService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.todayDate = Date.now()
    
  }



}
