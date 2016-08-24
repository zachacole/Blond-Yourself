var imgLoad = document.getElementById('imgLoad');
    imgLoad.addEventListener('change', handleImage, false);

var downloadButton = document.getElementById('download');
var downloadStyle = document.getElementById('download-style');

var album = new Image();
    album.src = "blond@1x.jpg";

function loadFrank() {
  var canvas = document.getElementById('blond-canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    album.onload = function() {
      ctx.drawImage(album,0,0);
    }

  }
}

loadFrank();

function handleImage(e) {
  var canvas = document.getElementById('blond-canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    downloadStyle.classList.add('active');

    var reader = new FileReader();
    reader.onload = function(event){
      var img = new Image();
      img.onload = function() {
        var width = img.width;
        var height = img.height;
        var cropWidth = ((img.width/2) - (img.height/3));
        var cropHeight = ((img.height/2) - (img.width*0.75));
        canvas.width = 650;
        canvas.height = 650;
        if (height > width*1.5) { //tall photos
          var newHeight = width*1.5;
          ctx.drawImage(album,0,0);
          ctx.drawImage(img,0,cropHeight,width,newHeight,170,100,310,465);
        } else { //wide or square photos
          var newWidth = height/1.5;
          ctx.drawImage(album,0,0);
          ctx.drawImage(img,cropWidth,0,newWidth,height,170,100,310,465);
        }
      }
      img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  }
}

// Download canvas as image
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

downloadButton.addEventListener('click', function() {
    console.log('button clicked');
    downloadCanvas(this, 'blond-canvas', 'blond.png');
}, false);
