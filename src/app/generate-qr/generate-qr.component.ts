import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.component.html',
  styleUrls: ['./generate-qr.component.scss']
})
export class GenerateQrComponent implements OnInit {
  elementType = NgxQrcodeElementTypes.URL;
  
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = "10302000402, 07/01/2021, National Zoning Task Force, Lungtenphu RBA";

  constructor() { }

  ngOnInit() {
  
  }

}
