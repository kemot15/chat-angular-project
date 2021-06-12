import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from "@angular/core";
import { Form, FormBuilder, FormGroup, RequiredValidator, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Post } from "src/app/model/post.model";
import { DatabaseService } from "../services/database.service";
import { PostService } from "../services/post.service";

@Component({
  selector: "app-add-edit-post",
  templateUrl: "./post-add-edit.component.html",
  styleUrls: ["./post-add-edit.component.scss"],
})
export class AddEditPostComponent implements OnInit, OnChanges {
  @Input() display: boolean;
  @Input() post?: Post;
  @Input() header: string;

  @Output() refresh:  EventEmitter<Post | Boolean>;

  postFormGroup: FormGroup;

  title: string = "";
  text: string = "";
  

  constructor(private databaseService: DatabaseService, private route: ActivatedRoute, private formBuilder: FormBuilder,) {
    this.initRefresh(); 
    this.initPostFormGroup(); 
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.initPost();
  }

  ngOnInit(): void {   
    this.initPost();     
  }

  save(): void {
    this.setupPost();
    if (this.post.id === 0){
      this.saveNewPost();
    }
    else {
      this.saveEditetPost();
    }
  }
  
  cancel(): void {
    this.pushToPostList(false);
  }

  setupPost(): void {
    if (this.post){
      this.post.text = this.postFormGroup.get('text').value;
      this.post.title = this.postFormGroup.get('title').value;
    }
    else {
      this.post = {
        id: 0,
        title: this.postFormGroup.get('title').value,
        text: this.postFormGroup.get('text').value
      }
    }
  }

  saveNewPost (): void {
    this.databaseService.savePost(this.post)
    .subscribe(
      (result: Post) => {
        this.title = "";
        this.text = "";
        this.pushToPostList(result);
      },
      (err: any) => console.log(err),
      () => this.post = null
    )

  }

  saveEditetPost(): void {
    this.databaseService.updatePost(this.post)
    .subscribe(
      () => {
        this.pushToPostList(this.post);
      },
      (err: any) => console.log(err)
    )
  }

  initRefresh(): void {
    this.refresh = new EventEmitter<Post>();
  }

  pushToPostList(post: Post | Boolean): void {
    this.refresh.emit(post);
  }

  initPost(): void {
    if (this.post){
      const post = {
        title: this.post.title,
        text: this.post.text
      }  
      this.postFormGroup.patchValue(post);  
    }
    else {
      const post = {
        title: "",
        text: ""
      }
      this.postFormGroup.patchValue(post);       
    }
  } 

  private initPostFormGroup(): void {
    this.postFormGroup = this.formBuilder.group({
      id: 0,
      title: [undefined, [Validators.required, Validators.min(3)]],
      text: [undefined, Validators.required]
    })
  }

}
