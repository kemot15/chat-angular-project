import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

  @Input() post: Post;
  postFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initPostFormGroup();
  }

  private initPostFormGroup(): void {
    this.postFormGroup = this.formBuilder.group({
      id: this.post.id,
      title: this.post.title,
      text: this.post.text
    })
  } 

}
