var sImgLoad = document.getElementById('s-imgLoad');
    sImgLoad.addEventListener('change', sHandleImage, false);

var sDownloadButton = document.getElementById('s-download');
var sDownloadStyle = document.getElementById('s-download-style');

var sAlbum = new Image();
    sAlbum.src = "blond_sm.jpg";

function sLoadFrank() {
  var sCanvas = document.getElementById('s-blond-canvas');
  if (sCanvas.getContext) {
    var sctx = sCanvas.getContext('2d');

    sAlbum.onload = function() {
      sctx.drawImage(sAlbum,0,0,300,300,0,0,300,300);
    }

  } else {
    console.log('no way');
  }
}

sLoadFrank();

function sHandleImage(e) {
  var sCanvas = document.getElementById('s-blond-canvas');
  if (sCanvas.getContext) {
    var sctx = sCanvas.getContext('2d');

    sDownloadStyle.classList.add('active');

    var reader = new FileReader();
    reader.onload = function(event){
      var img = new Image();
      img.onload = function() {
        var width = img.width;
        var height = img.height;
        var cropWidth = ((img.width/2) - (img.height/3));
        var cropHeight = ((img.height/2) - (img.width*0.75));
        sCanvas.width = 300;
        sCanvas.height = 300;
        if (height > width*1.5) { //tall photos
          var newHeight = width*1.5;
          sctx.drawImage(sAlbum,0,0);
          sctx.drawImage(img,0,cropHeight,width,newHeight,80,50,140,210);
        } else { //wide or square photos
          var newWidth = height/1.5;
          sctx.drawImage(sAlbum,0,0);
          sctx.drawImage(img,cropWidth,0,newWidth,height,80,50,140,210);
        }
      }
      img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  }
}

// Download canvas as image
function sDownloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

sDownloadButton.addEventListener('click', function() {
    console.log('button clicked');
    sDownloadCanvas(this, 's-blond-canvas', 'blond.png');
}, false);
