import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sample-id',
  templateUrl: './sample-id.component.html',
  styleUrls: ['./sample-id.component.scss']
})
export class SampleIdComponent implements OnInit {
  sample_id: number

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sample_id = this.route.snapshot.params.sampleid
  }

}
