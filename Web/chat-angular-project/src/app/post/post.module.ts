import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostRoutingModule } from './post.routing';


import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [PostListComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    TableModule,
    SliderModule
  ]
})
export class PostModule { }
