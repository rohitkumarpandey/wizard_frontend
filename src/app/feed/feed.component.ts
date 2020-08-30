import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
  totalPosts : number = 0;
  prevBtn : Boolean = false;
  postType : String;
  userid : String;
  isMobile : Boolean;
  commentForm : FormGroup;
  postid : String;
  progressBar : Boolean = false;
  profilePicture : String = null;
  isPostOverflow : Boolean = true;
  previewUrl : any = null;
  fileData : File = null;
  constructor(private fb : FormBuilder, private cdr : ChangeDetectorRef, private spinner : NgxSpinnerService,private authService : AuthService, private service : FeedService) { 
    this.username = this.authService.getUsername();
    this.userid = this.authService.getUserId();
    this.postForm = this.fb.group({
      userid : [''],
      username : ['', [Validators.required]],
      userAbout : [''],
      postType : [''],
      post : ['', [Validators.required]],
      postPhoto : ['']
    });
    this.commentForm = this.fb.group({
      userid : [''],
      username : [''],
      userAbout : [''],
      commentDesc : ['', [Validators.required]]
      });
  }

  ngOnInit() {
   
    $(document).ready(function(){
      $('table tr td div').on('click', function(){
        $('table tr td div').css({backgroundColor : 'darkslategray', borderColor : 'grey'})
        $(this).css({backgroundColor : 'slategray', borderColor : 'white'});
      });

         
 

  $(document).on('click', '.postDescription span', function(){
   
    $(this).hide(); 
    $('.postDescription p').eq($(this).index('.postDescription span')).css('height', 'auto');
  })
    
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
        this.profilePicture = res.user.profilePic;
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
  
    
  //  $('#scrollCommentDiv').scrollTop($('#scrollCommentDiv').height());
  

    this.comments = [];
    this.progressBar = true;
    this.posts.forEach(post=>{
     if(post._id == postid){

       this.comments = post.comments;
       
     }
    });
    $('.showCommentDiv').animate({height : '90%', bottom:0}, 500);
    $("#scrollCommentDiv").animate({ scrollTop: 100000}, 2000);
    
    this.progressBar = false;
  }
  addComment(){
    this.progressBar = true;
    $('writeCommentDiv textArea').prop('readonly', true);
    this.commentForm.value.userid = this.userid;
    this.commentForm.value.username = this.username;
    this.commentForm.value.userAbout = this.userAbout;
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
    $('.showCommentDiv').animate({height : '0vh', bottom : '-10vh'}, 500);
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
        
      this.postForm.value.postPhoto = this.previewUrl;
        this.post(this.postForm.value);
      }
      
    }

    
    
   
  }
  post(post){
    this.isLoading = true;
    this.spinner.show();
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
      $('table tr td div').css({backgroundColor : 'darkslategray', borderColor : 'rgb(89, 102, 114)'});
      setTimeout(()=>{
        $('#myModal').modal('hide');
        this.isLoading = false;
        this.spinner.hide();
      }
        , 500);
     
    });
  }

  previous(){
    $('.modal-body').scrollTop(-1000);
    $('.modal-footer button:nth-child(2)').html('Next');
    this.prevBtn = false;
  }

  //upload photo in post

  openFileFolder(){
    $('#postPhotoInput').click();
  }
  fileProgress(fileInput : any){
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview(){
    var mimetype = this.fileData.type;
    if(mimetype.match(/image\/*/) == null){
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event)=>{
      this.previewUrl = reader.result;
    }
  }


  //delete post
  deletePost(postid, postindex){
    this.isLoading = true;
    this.spinner.show();
    this.service.deletePost(this.userid, postid)
    .then((res)=>{
      if(res.success){
        this.posts.splice(postindex, 1);
        this.cdr.detectChanges();
        this.totalPosts--;

      }
    })
    .then(()=>{
      this.spinner.hide();
      this.isLoading = false;
    })
  }

  checkOverflow(postContent){
    if(postContent.trim().split(" ").length > 10){
      return true;
    }
    return false;
}




 
}

