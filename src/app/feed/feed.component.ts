import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { FeedService } from './feed.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $ : any;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts = [];
  comments :any = [];
  notEmptyPost = true;
  notScrolly = true;
  isLoading = true;
  username : String = null;
  postForm : FormGroup;
  postTypes = ["Story", "Confession", "Experience", "Review", "Question", "Horror", "Plan", "Interviews"];
  userAbout : String;
  totalPosts : number;
  prevBtn : Boolean = false;
  postType : String;
  userid : String;
  isMobile : Boolean;
  commentForm : FormGroup;
  postid : String;
  progressBar : Boolean = false;
  constructor(private fb : FormBuilder, private cdr : ChangeDetectorRef, private spinner : NgxSpinnerService,private authService : AuthService, private matBottomSheet : MatBottomSheet, private service : FeedService) { 
    this.username = this.authService.getUsername();
    this.userid = this.authService.getUserId();
    this.postForm = this.fb.group({
      userid : [''],
      username : ['', [Validators.required]],
      userAbout : [''],
      postType : [''],
      post : ['', [Validators.required]]
    });
    this.commentForm = this.fb.group({
      userid : [''],
      username : [''],
      userAbout : [''],
      commentDesc : ['', [Validators.required]]
      });
  }

  ngOnInit() {
    $('.commentBox').on('click', function(){
      console.log("hii");
    })
    this.loadInitialData();
    if(screen.width > 610){
      this.isMobile = false;
    }else{
      this.isMobile = true;
    }

   
    
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(screen.width <= 610){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }
  }
 

  loadInitialData(){
      this.spinner.show();
      this.service.getPosts()
      .then((res)=>{
        if(res.success){
          this.posts = res.posts;
        }
      }).then(()=>{
        
        this.loadUserData();
      })

  }
  loadUserData(){
    this.service.getUserData(this.authService.getUserId())
    .then((res)=>{
      if(res.success){
        this.userAbout = res.user.about;
        this.totalPosts = res.user.posts.length;
        this.isLoading = false;
        
        this.spinner.hide();
      }
    })
  }

  loadNextPost(){
    this.service.getNextPosts(this.posts[this.posts.length -1]._id)
    .then((res)=>{
      if(res.success){
        this.posts = this.posts.concat(res.posts);
      }
      if(res.posts.length == 0){
        this.notEmptyPost = false;
      }
    }).then(()=>{
      this.spinner.hide();
      this.notScrolly = true;
    })

  }
  onScroll(){
    this.isLoading = false;
    if(this.notEmptyPost && this.notScrolly){
      this.spinner.show();
      this.notScrolly = false;
      this.loadNextPost();
     
      
    }
  }

  showComments(index, postid){
    this.postid = postid;
    $('.othersComment').scrollTop(-3000);
    $('.showCommentDiv').animate({height : '85vh'}, 500);

    this.comments = [];
    this.progressBar = true;
    this.posts.forEach(post=>{
     if(post._id == postid){

       this.comments = post.comments;
     }
    });
    this.progressBar = false;
  }
  addComment(){
    this.progressBar = true;
    $('writeCommentDiv textArea').prop('readonly', true);
    this.commentForm.value.userid = this.userid;
    this.commentForm.value.username = this.username;
    this.commentForm.value.userAbout = this.userAbout;
    console.log(this.userAbout);
    this.service.addComment(this.userid, this.postid, this.commentForm.value)
    .then((res)=>{
      if(res.success){
        this.comments = this.comments.concat([res.comment]);
        this.posts.forEach(post=>{
          if(post._id == this.postid){
            post.comments = this.comments;
            this.cdr.detectChanges();
          }
        })
      }
    }).then(()=>{
      this.commentForm.reset();
      this.cdr.detectChanges();
      this.progressBar = false;
      $('writeCommentDiv textArea').prop('readonly', false);
    })
    
    
  }

  closeCommentBox(){
    $('.showCommentDiv').animate({height : 0}, 500);
  }

  //open post modal
  openCreatePostModal(){
    this.prevBtn = false;
    //$('.modal-body').scrollTop(-1000);    
    //this.postForm.reset();
    $('form select').get(0).selectedIndex = 0;
    $('.modal-footer button').html('Next');
    $('#myModal').modal('show');
  }
  seclectedPostType(postType){
    $('table tr td div').on('click', function(){
      $('table tr td div').css({backgroundColor : 'transparent', borderColor : 'grey'})
      $(this).css({backgroundColor : 'slategray', borderColor : 'white'});
    })
    this.postType = postType;
    
  }
  prevent(event){
    this.postForm.value.postType = this.postType;
    var btnVal = $('.modal-footer button').text();
    if(btnVal === 'Next'){
      $('.modal-body').scrollTop(1000);
    $('.modal-footer button').html('Post');
    this.prevBtn  = true;
    }else{
      if(this.postForm.value.postType == null){
        this.previous();
      }else{
        
        this.postForm.value.userid = this.authService.getUserId();
       // this.postForm.value.username = this.username;
        this.postForm.value.userAbout = this.userAbout;
        //this.postForm.value.postType = this.postType;
        this.post(this.postForm.value);
      }
      
    }

    
    
   
  }
  post(post){
    this.service.addPost(post, this.authService.getUserId())
    .then((res)=>{
      if(res.success){
        this.posts = [res.post].concat(this.posts); 
        this.totalPosts = this.totalPosts + 1;
        this.cdr.detectChanges();
      }
    }).then(()=>{
      $('.modal-body').scrollTop(-3000);    
      this.postForm.reset();
      $('table tr td div').css({backgroundColor : 'transparent', borderColor : 'grey'});
      setTimeout(()=>  $('#myModal').modal('hide'), 190);
     
    });
  }

  previous(){
    $('.modal-body').scrollTop(-1000);
    $('.modal-footer button:nth-child(2)').html('Next');
    this.prevBtn = false;
  }

 
}


@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet-overview-example.html',
  
  styleUrls: ['./bottom-sheet.css']
})
export class BottomSheetCommentBox {

  postid;
  comments = [];
  userid : String = null;
  username : String = null;
  commentForm : FormGroup;

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetCommentBox>, private service : FeedService,
    private authService : AuthService, private fb : FormBuilder, private cdr : ChangeDetectorRef) {
      this.postid = this.service.getComments().postid;
    this.comments = this.service.getComments().comments;
    this.userid = this.authService.getUserId();
    this.username = this.authService.getUsername();
    this.commentForm = this.fb.group({
      userid : [''],
      username : [''],
      commentDesc : ['', [Validators.required]]
      });
  }

  addComment(){
    this.commentForm.value.userid = this.userid;
    this.commentForm.value.username = this.username;
    this.service.addComment(this.userid, this.postid, this.commentForm.value)
    .then((res)=>{
      if(res.success){
        this.comments = this.comments.concat([res.comment]);
        
        
      }
    })
    .then(()=>{
      this.commentForm.reset();
      this.cdr.detectChanges();
    })
  }

  
}
