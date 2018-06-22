var gulp = require('gulp');
var livereload = require('gulp-livereload'); //網頁自動更新（服务器控制客户端同步刷新）
var webserver = require('gulp-webserver');

//註冊任務
gulp.task('webserver', function() {
  gulp.src('./app/')//開啟的開始目錄
    .pipe(webserver({
      port:1234,//選擇port號
      livereload: true,// 啟用LiveReload
      directoryListing: false,//是否顯示來源樹狀圖
      open: true,//是否處理完自動開啟網頁
      fallback: 'index.html'
    }));
});

//監聽任務
gulp.task('watch',function(){
	gulp.watch( '*.html', ['html']) // 監聽根目錄下所有.html文件
});

gulp.task('default',['webserver','watch']);
