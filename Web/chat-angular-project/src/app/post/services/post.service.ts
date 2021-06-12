import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostService {
  constructor() {}

  display: Boolean = false;
}
