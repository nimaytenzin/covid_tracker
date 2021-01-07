import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { StateService } from "../service/stateService";

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.component.html',
  styleUrls: ['./generate-qr.component.scss']
})
export class GenerateQrComponent implements OnInit {
  elementType = NgxQrcodeElementTypes.URL;
  
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = "";
  sample_id = ""

  constructor(
    private route: ActivatedRoute,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.value = this.route.snapshot.params['hash'];
    this.sample_id = this.route.snapshot.params['id']
  }

  ShareQr(){
    alert('share on facebook')
  }

}
