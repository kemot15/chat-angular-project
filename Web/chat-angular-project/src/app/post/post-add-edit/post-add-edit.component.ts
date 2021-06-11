import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Post } from "src/app/model/post.model";
import { DatabaseService } from "../services/database.service";

@Component({
  selector: "app-add-edit-post",
  templateUrl: "./post-add-edit.component.html",
  styleUrls: ["./post-add-edit.component.scss"],
})
export class AddEditPostComponent implements OnInit, OnChanges {
  @Input() display: boolean;
  @Input() post?: Post;

  @Output() refresh:  EventEmitter<Post>;

  title: string = "";
  text: string = "";
  

  constructor(private databaseService: DatabaseService, private route: ActivatedRoute) {
    this.initRefresh();    
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

  setupPost(): void {
    if (this.post){
      this.post.title = this.title;
      this.post.text = this.text;
    }
    else {
      this.post = {
        id: 0,
        title: this.title,
        text: this.text
      }
    }
  }

  saveNewPost (): void {
    this.databaseService.savePost(this.post).subscribe(
      (result: Post) => {
        this.pushToPostList(null);
        this.display = false;
        this.title = "";
        this.text = "";
      },
      (err: any) => console.log(err)
    );
  }

  saveEditetPost(): void {
    this.databaseService.updatePost(this.post).subscribe(
      () => {
        this.pushToPostList(this.post);
        this.display = false;
      },
      (err: any) => console.log(err)
    )
  }

  initRefresh(): void {
    this.refresh = new EventEmitter<Post>();
  }

  pushToPostList(post: Post): void {
    this.refresh.emit(post);
  }

  initPost(): void {
    if (this.post){
      this.title = this.post.title,
      this.text = this.post.text      
    }  
  }

  cancel(): void {
    this.display = false;
  }
}
