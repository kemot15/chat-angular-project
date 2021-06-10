import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit, OnChanges {

  @Input() post: Post;
  @Output() refresh:  EventEmitter<boolean>;
  postFormGroup: FormGroup;
  display: Boolean = false;

  constructor(private formBuilder: FormBuilder) {
   }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    // this.initPostFormGroup();
  }

  private initPostFormGroup(): void {
    this.postFormGroup = this.formBuilder.group({
      id: this.post.id,
      title: this.post.title,
      text: this.post.text
    })
  } 

  showDialog(): void {
    this.display = true;
  }

  // initRefresh(): void {
  //   this.refresh = new EventEmitter<boolean>();
  // }

  // pushToParent(): void {
  //   this.refresh.emit(true);
  // }

  postRefresh(refreshed: Post){
    if (refreshed){
      this.display = false;
      console.log(this.display);     
      this.post.text = refreshed.text;
      this.post.title = refreshed.title;
      this.post.id = refreshed.id;
    }
  }

}
