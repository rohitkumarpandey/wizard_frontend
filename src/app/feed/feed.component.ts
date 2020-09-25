import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FeedService } from './feed.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';

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
  userLists  = [];
  constructor(private fb : FormBuilder, private cdr : ChangeDetectorRef,
     private spinner : NgxSpinnerService,private authService : AuthService, private service : FeedService,
     private imageCompress : NgxImageCompressService) { 
   // this.username = this.authService.getUsername();
    this.userid = this.authService.getUserId();
    this.postForm = this.fb.group({
      userid : [''],
      username : [''],
      userAbout : [''],
      postType : ['', [Validators.required]],
      post : ['', [Validators.required]],
      image : ['']
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

      $('#userListInput').on('keyup', function(){
        var value = $(this).val().toLowerCase();
        $('#userTable tr').filter(function(){
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
      })
      $('table tr td div').on('click', function(){
        $('table tr td div').css({backgroundColor : 'darkslategray', borderColor : 'grey'})
        $(this).css({backgroundColor : 'slategray', borderColor : 'white'});
      });

         
 

  $(document).on('click', '.postDescription span', function(){
   
   
    $('.postDescription p').eq($(this).index('.postDescription span')).css('height', 'auto');
    console.log($('.postDescription p').eq($(this).index('.postDescription span')).val());
    $(this).hide(); 
  })
    
    })
    
  
   
   
    this.loadInitialData();
   
    if(screen.width > 610){
      this.isMobile = false;
      this.getuserLists();
      this.loadUserData();
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
      this.getuserLists();
      this.loadUserData();
    }
  }
 
  getuserLists(){
    this.service.getUserLists(this.authService.getUserId())
    .then((res)=>{
      if(res.success){
        this.userLists = res.userLists;
      }
    })
  }

  loadInitialData(){
      this.spinner.show();
      this.service.getPosts()
      .then((res)=>{
        if(res.success){
          this.posts = res.posts;
        }
      }).then(()=>this.spinner.hide());

  }
  loadUserData(){
    this.service.getUserData(this.authService.getUserId())
    .then((res)=>{
      if(res.success){
        this.username = res.user.username;
        this.profilePicture = res.user.image;
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
    $('form select').get(0).selectedIndex = 0;
    $('#myModal').modal('show');
  }
 


    
    
   
  
  post(){
    this.isLoading = true;
    this.spinner.show();
    this.postForm.value.userid = this.authService.getUserId();
     this.postForm.value.username = this.username;
     this.postForm.value.userAbout = this.userAbout;
     
   this.postForm.value.image = this.previewUrl;
    
    this.service.addPost(this.postForm.value, this.authService.getUserId())
    .then((res)=>{
      if(res.success){
        this.posts = [res.post].concat(this.posts); 
        this.totalPosts = this.totalPosts + 1;
        this.cdr.detectChanges();
      }
    }).then(()=>{
        
      this.postForm.reset();
      $('#myModal').modal('hide');
    });
  }

  
  //upload photo in post

  openFileFolder(){
    //$('#postPhotoInput').click();
    this.imageCompress.uploadFile().then(({image, orientation})=>{
     
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
       result => {
         this.previewUrl = result;
       }
     );
    });
  }
  // fileProgress(fileInput : any){
  //   this.fileData = <File>fileInput.target.files[0];
  //   this.preview();
  // }

  // preview(){
  //   var mimetype = this.fileData.type;
  //   if(mimetype.match(/image\/*/) == null){
  //     return;
  //   }

  //   var reader = new FileReader();
  //   reader.readAsDataURL(this.fileData);
  //   reader.onload = (_event)=>{
  //     this.previewUrl = reader.result;
  //   }
  // }


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

