<a id="top"></a>
## Gulp使用方法
### Gulp用途:方便管理任務流程與製作程式打包

- #### <a href="#s1">gulp 起手式</a> => 可參考 : gulpWebserver
- #### <a href="#s2">打包壓縮 CSS 與 JS</a> ----- => 可參考 : gulpPackage
- #### <a href="#s3">打包壓縮 HTML</a> ---------- => 可參考 : gulpPackage
### <a id="s1" href="#top">gulp 起手式</a>
---
- 安裝node 環境
- 安裝gulp 環境 : npm install gulp -g
- 新建專案資料夾並用cmd進入 打npm init初始化製作package.jason
- 安裝gulp 測試環境 : npm install gulp --save-dev
- 建立一個js檔案 : gulpfile.js 內容如下
- 建立一個index.html 放進 app資料夾裡
```javascript
//gulp.task 程式裡面有兩個任務，分別名為「webserver」和「default」
//gulp.task('default',['webserver'])又有一個很重要的涵義，就是 default 這個任務相依於 webserver 任務
//因此輸入gulp就可以執行 default，也可以輸入gulp.webserver就可以直接執行webserver這個任務
//gulp.src是指這個任務工作的目標資料夾，pipe則是這個任務的流程
//directoryListing:代表樹狀圖是否開啟,open:是否自動開啟index.html
var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('./app/')
    .pipe(webserver({
      port:1234,
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('default',['webserver']);
```

### <a id="s2" href="#top">打包壓縮 CSS 與 JS</a>
---
- 新建專案資料夾並用cmd進入 打npm init初始化製作package.jason
- 輸入指令安裝 gulp、gulp-minify-css、gulp-uglify、gulp-concat、gulp-rename
- npm install gulp gulp-minify-css gulp-uglify gulp-concat gulp-rename 
-save-dev
- gulp-concat：合併檔案
- gulp-minify-css：壓縮 CSS
- gulp-uglify：混淆並壓縮 JS
- gulp-rename：重新命名檔案
- 製作各項目錄 : ( _ : 代表資料夾)
- _app : _css , _js 
- _build : (會自動產生css,js資料夾)
- gulpfile.js 
- 在 gulpfile.js 寫下代碼 : 
- 執行 gulp 即可察看結果
```javascript
var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    minifyCSS  = require('gulp-minify-css'),
    uglify     = require('gulp-uglify'),
    rename     = require("gulp-rename");

/*
先把這三個合併起來，才進行壓縮，合併採用的套件為：gulp-concat，
它可以把目標資料夾內所有指定的檔案合併成為 all.css，然後放到 build 的資料夾內 
*/
    gulp.task('concat', function() {
        return gulp.src('./app/css/*.css')
            .pipe(concat('all.css'))
            .pipe(gulp.dest('./build/css/'));
    });

/*
壓縮 CSS 用到的是 gulp-minify-css 和 gulp-rename，
下面的寫法是建立一個名為 minify-css 的任務，裡頭先使用 minifyCSS 壓縮，
壓縮之後直接用 rename 對壓縮的檔案重新命名，命名時可以設定 basename 與 extname，完成後就把壓縮好的檔案，同樣放在 build 的資料夾裡頭。
keepBreaks:是否保留换行

minify-css 任務，必須要在 concat 任務完成之後才會進行
因為在 gulp 裏頭，所有任務並不會按照順序，因此很有可能當我們執行 minify-css 的時候， concat 尚未完成，
所以「在每個 task 任務裏頭加上 return，接著把 minify-css 的任務寫成這樣：
gulp.task('minify-css', ['concat'], function(){})」
，就可以保證 minify-css 會接在 concat 之後囉
*/
gulp.task('minify-css',['concat'], function() {
  return gulp.src('./build/css/all.css')
    .pipe(minifyCSS({
       keepBreaks: true,
    }))
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".css";
    }))
    .pipe(gulp.dest('./build/css/'));
});

//使用 uglify 混淆與壓縮 javascript
gulp.task('uglify', function() {
    return gulp.src('./app/js/*.js')
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('./build/js/'));
});

//寫上 default 將兩個任務放上 就可以執行 gulp 看看
gulp.task('default',['minify-css','uglify']);
```

### <a id="s3" href="#top">打包壓縮 HTML</a>
---
- 新建專案資料夾並用cmd進入 打npm init初始化製作 package.jason
- 打包壓縮 HTML 會用到的套件有：gulp-html-replace、gulp-minify-html,並會用到上篇的套件
- npm install gulp gulp-html-replace gulp-minify-html gulp-minify-css gulp-uglify gulp-concat gulp-rename -save-dev
- gulp-html-replace : 把原本的多個 CSS 置換為一個 min.css
- gulp-minify-html : 純粹壓縮 HTML
- gulp-concat：合併檔案
- gulp-minify-css：壓縮 CSS
- gulp-uglify：混淆並壓縮 JS
- gulp-rename：重新命名檔案
- 製作各項目錄 : ( _ : 代表資料夾=>_app=名稱為app的資料夾)
- _app : _css , _js , index.html(欲壓縮html文檔)
- _build : (會自動產生css,js資料夾)
- gulpfile.js 
- 設置 html 文本
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Compress</title>
    <!--要使用 gulp-html-replace，把載入的 CSS 和 JS 替換掉，換成我們壓縮過的 CSS 與 JS 檔案
   ，例如要把整段 css 替換掉，就用 build:css,endbuild 把要替換掉的地方包起來-->
    <!-- build:css -->
    <link rel="stylesheet" href="css/test1.css">
    <link rel="stylesheet" href="css/test2.css">
    <link rel="stylesheet" href="css/test3.css">
    <!-- endbuild -->
    <!-- build:js -->
    <script src="js/test.js"></script>
    <!-- endbuild -->
</head>
<body>
</body>
</html>
```
- 在 gulpfile.js 寫下代碼 : 
```javascript
//引入套件
var gulp      = require('gulp'),
  concat      = require('gulp-concat'),
  minifyCSS   = require('gulp-minify-css'),
  uglify      = require('gulp-uglify'),
  rename      = require("gulp-rename"),
  htmlreplace = require('gulp-html-replace'),
  minifyHTML  = require('gulp-minify-html');

gulp.task('concat', function() {
  return gulp.src('./app/css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('minify-css', ['concat'], function() {
  return gulp.src('./build/css/all.css')
    .pipe(minifyCSS({
      keepBreaks: true,
    }))
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".css";
    }))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('uglify', function() {
  return gulp.src('./app/js/*.js')
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".js";
    }))
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('html-replace',function() {
  var opts = {comments:false,spare:false,quotes:true};
  return gulp.src('./app/*.html')
    .pipe(htmlreplace({
        'css': 'css/all.min.css',
        'js': 'js/all.min.js'
    }))  
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./build/'));
});

//在 gulp 裏頭，所有任務並不會按照順序
gulp.task('default', ['html-replace','minify-css', 'uglify']);
```
- 執行 gulp 即可察看結果
- 壓縮後的 html(最後會擠在一起,但為了好看換行)
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Compress</title>
  <link rel="stylesheet" href="css/all.min.css">
  <script src="js/all.min.js"></script>
</head>
<body></body>
</html>
```
