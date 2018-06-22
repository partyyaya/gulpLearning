var gulp = require('gulp'),
    compass   = require('gulp-compass');

gulp.task('compass',function(){
    return gulp.src('./style/scss/*.scss')//抓取資料夾內所有scss檔案
        .pipe(compass({
            sourcemap: true,//產生 sourcemap 的 json 檔案 ( css.map )，就可以從編譯出的 css，反查回原本的 scss
            time: true,//顯示轉換經過的時間
      css: './style/css/',//存放處理完css檔案路徑
      sass: './style/scss/',//存放scss檔案路徑
      style: 'compact' //nested, expanded, compact, compressed //轉換出來的 CSS 長相
        }))
        .pipe(gulp.dest('./style/css/'));
}); 

gulp.task('watch',function(){
    gulp.watch('./style//scss/*.scss',['compass']);
});

gulp.task('default',['compass','watch']);