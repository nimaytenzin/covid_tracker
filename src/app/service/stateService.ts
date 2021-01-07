import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})

export class StateService{
    hash = new Subject()
    sampleId = new Subject()
}