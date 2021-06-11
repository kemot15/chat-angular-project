import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from 'src/app/model/post.model';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

  @Input() post: Post;
  @Output() refresh:  EventEmitter<Post>;
  postFormGroup: FormGroup;
  display: Boolean = false;

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) { 
    this.initRefresh();
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

  postRefresh(refreshed: Post){
    if (refreshed){
      this.display = false;
      this.post.text = refreshed.text;
      this.post.title = refreshed.title;
      this.post.id = refreshed.id;
    }
  }

  deletePost(): void {
    if (this.post){
      this.databaseService.deletePost(this.post.id);
      this.pushToPostList(null);
    }
  }

  initRefresh(): void {
    this.refresh = new EventEmitter<Post>();
  }

  pushToPostList(post: Post): void {
    this.refresh.emit(post);
  }

}
