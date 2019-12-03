class Post {
    constructor(){
        this.post = `
        <div class="post">
      <div class="post-image">
        <img src="%image%" alt="image">
      </div>
      <div class="post-info">
        <div class="post-caption">
          <i class="material-icons post-icon">
            format_align_left
          </i>
          <span>%caption%</span>
        </div>
        <div class="post-location">
          <i class="material-icons post-icon">
            my_location
          </i>
          %location%</div>
      </div>
      <div class="post-panel">
        <div class="post-time">
          <i class="material-icons post-action">
            access_time
          </i>
          <span>%date%</span>
        </div>
        <div class="post-likes">
          <i class="material-icons post-action">
            favorite
          </i>
          <span>%likes%</span>
        </div>
        <div class="post-comments">
          <i class="material-icons post-action">
            comment
          </i>
          <span>%comments%</span>
        </div>

      </div>
    </div>`
    }
    setImage(image){
        this.post = this.post.replace('%image%', image)
    }
    setLocation(location){
        this.post = this.post.replace('%location%', location)
    }
    setLikes(likes){
        this.post = this.post.replace('%likes%', likes)
    }
    setComments(comments){
        this.post = this.post.replace('%comments%', comments)
    }
    setCaption(caption){
        this.post = this.post.replace('%caption%', caption)
    }
    setDate(date){
      this.post = this.post.replace('%date%', date)
    }
    get(){
        return this.post
    }
}
