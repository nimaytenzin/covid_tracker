import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-generate-certificate',
  templateUrl: './generate-certificate.component.html',
  styleUrls: ['./generate-certificate.component.scss']
})
export class GenerateCertificateComponent implements OnInit {

    
  @ViewChild('screen',{static: true}) screen: ElementRef;
  @ViewChild('canvas',{static: true}) canvas: ElementRef;
  @ViewChild('downloadLink',{static: true}) downloadLink: ElementRef;

  certificates: any;
  showCertificates: boolean;
  value:any;
  todaysDate = new Date();
  subjectName: string;
  subjectCid: number;
  subjectAge: number;
  subjectGender: string;
  subjectWorkingAgency: string;
  subjectDzongkhag: string;

  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    let cid = this.route.snapshot.params.cid;
   

    this.dataservice.getSubjects(cid).subscribe( res => {
      if(res.success === "true"){
        console.log(res.data)
        this.subjectName = res.data.name;
        this.value = res.data.utid;
        this.subjectAge = res.data.age;
        this.subjectGender = res.data.sex;
        this.subjectWorkingAgency = res.data.Agency.name + ", "+ res.data.Dzongkhag.name;
        this.subjectCid = res.data.cid;
        this.subjectDzongkhag = res.data.work_dzongkhag;

        let id = res.data.id;
        this.dataservice.getCertificateBySubjectId(id).subscribe( res => {
          this.showCertificates = true;
          this.certificates = res.data

          })
        }
    }
    )

 
  }

  download(){
    const hiddenDiv = document.getElementById('hiddendiv')
    html2canvas(document.querySelector("#centerContainer")).then((canvas) => {
      hiddenDiv.appendChild(canvas)
      });   
  }

  downloadImage(){
    
    html2canvas(this.screen.nativeElement).then(canvas => {

      let cid = this.route.snapshot.params.cid;
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = `${cid}.png`;
      this.downloadLink.nativeElement.click();
      location.reload();
    });
  }
  
      

}
