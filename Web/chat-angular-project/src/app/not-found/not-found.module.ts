import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found.routing';



@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    NotFoundRoutingModule
  ]
})
export class NotFoundModule { }
