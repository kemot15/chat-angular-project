import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Self } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, NgControl, ValidationErrors, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Post } from "src/app/model/post.model";
import { DatabaseService } from "../services/database.service";
import { AddEditServiceValidator } from "../services/validators/add-edit-post.service";

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

  get showIsTextInvalid(): boolean {
    let text = this.postFormGroup.controls.text;
    return text.invalid && text.touched;
  }

  get titleError(): ValidationErrors {
    return this.postFormGroup.controls.title.errors;
  }
  get showIsTitleInvalid(): boolean {
    let title = this.postFormGroup.controls.title;
    return title.invalid && title.touched;
  }

  get textError(): ValidationErrors {
    return this.postFormGroup.controls.text.errors;
  }

  constructor(private databaseService: DatabaseService, private route: ActivatedRoute, private formBuilder: FormBuilder, private validatorService: AddEditServiceValidator) {
    this.initRefresh(); 
    this.initPostFormGroup();
    this.initFormValidator();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.initPost();
  }

  ngOnInit(): void {   
    this.initPost(); 
    this.initFormValidator();
  }

  save(): void {
    if (this.postFormGroup.valid){    
      this.setupPost();
      if (this.post.id === 0){
        this.saveNewPost();
      }
      else {
        this.saveEditetPost();
      }
    }
  }
  
  cancel(): void {
    this.cleareValidators();
    this.pushToPostList(false);
  }
  cleareValidators() {
    this.postFormGroup.reset();
    this.postFormGroup.updateValueAndValidity();
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

  private initFormValidator(): void {
    this.validatorService.setFormValidators(this.postFormGroup);
  }
}
