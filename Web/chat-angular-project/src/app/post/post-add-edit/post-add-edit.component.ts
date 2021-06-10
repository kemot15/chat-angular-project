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
  @Input() display: boolean;// = true;
  @Input() post?: Post;

  @Output() refresh:  EventEmitter<Post>;

  title: string = "";
  text: string = "";
  // post: Post;
  

  constructor(private databaseService: DatabaseService, private route: ActivatedRoute) {
    this.initRefresh();    
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.initPost();
  }

  ngOnInit(): void {   
    this.initPost();     
  }

  save(): void {
    // let newPost: Post = {
    //   id: 0,
    //   title: this.title,
    //   text: this.text,
    // };
    // this.databaseService.savePost(newPost).subscribe(
    //   (result: Post) => console.log(result),
    //   (err: any) => console.log(err),
    //   () => {
    //     this.pushToParent();
    //     this.display = false;
    //     this.title = "";
    //     this.text = "";
    //   }
    // );
    if (!this.post){
      this.saveNewPost();
    }
    else {
      this.saveEditetPost();
    }
  }

  saveNewPost (): void {
    let newPost: Post = {
      id: 0,
      title: this.title,
      text: this.text,
    };
    this.databaseService.savePost(newPost).subscribe(
      (result: Post) => console.log(result),
      (err: any) => console.log(err),
      () => {
        this.pushToPostList(null);
        this.display = false;
        this.title = "";
        this.text = "";
      }
    );
  }

  saveEditetPost(): void {
    let updatedPost: Post = {
      id: this.post.id,
      title: this.title,
      text: this.text
    }
    this.databaseService.updatePost(updatedPost).subscribe(
      () => console.log(updatedPost),
      (err: any) => console.log(err),
      () => {
        this.pushToPostList(updatedPost);
        this.display = false;
      }
    )
    this.display = false;
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
    // let ID = parseInt(this.postID);
    // console.log(this.postID);
    // if(this.postID){
    //   this.databaseService.getPost(this.postID).subscribe(
    //     (post: Post) => {
          
    //     }
    //   ); 
    // }
       
  }
}
