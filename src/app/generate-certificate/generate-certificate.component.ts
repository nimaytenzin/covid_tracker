import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-generate-certificate',
  templateUrl: './generate-certificate.component.html',
  styleUrls: ['./generate-certificate.component.scss']
})
export class GenerateCertificateComponent implements OnInit {

  certificates: any;
  showCertificates: boolean;
  value = "asdsadsadsadsadsadsa";
  todaysDate = new Date();
  //subject intro
  subjectName: string;
  subjectCid: number;
  subjectAge: number;
  subjectGender: string;
  subjectWorkingAgency: string;
  
  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    let cid = this.route.snapshot.params.cid;

    this.dataservice.getSubjects(cid).subscribe( res => {
      if(res.success === "true"){
        console.log(res.data);
        this.subjectName = res.data.name;
        this.subjectAge = res.data.age;
        this.subjectGender = res.data.sex;
        this.subjectWorkingAgency = res.data.work_agency + res.data.work_dzongkhag;
        this.subjectCid = res.data.cid;

        let id = res.data.id;
        this.dataservice.getCertificateBySubjectId(id).subscribe( res => {
          this.showCertificates = true;
          this.certificates = res.data

        })
      }
   }
   )


  }

  print(){
    const hiddenDiv = document.getElementById('hiddendiv')
    html2canvas(document.querySelector("#centerContainer")).then(canvas => {
      hiddenDiv.appendChild(canvas)
  });

  }

}
