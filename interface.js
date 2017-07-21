function runTest() {

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var fileInput = document.getElementById('fileInput');
  var startText = document.getElementById('start');
  var endText = document.getElementById('end');
  var textText = document.getElementById('text');
  var weightCheck = document.getElementById('check');
  var submitButton = document.getElementById('submit');
  var videoPlayer = document.getElementById('hyperplayer');

  submitButton.addEventListener('click', function(e) {
    var reader = new FileReader();
    reader.addEventListener('loadend', function() {
      var start = parseFloat(startText.value);
      var end = parseFloat(endText.value);
      var text = textText.value;
      var weight = weightCheck.checked;
      webAligner.align(audioCtx, reader.result, start, end, text, weight, function(times) {
        var html = "<article><section><p>";
        var words = text.split(" ");
        for (i=0; i<times.length-1; i++) {
          html += '<span data-m="'+Math.floor(times[i]*1000)+'" data-d="'+
            Math.floor((times[i+1]-times[i])*1000)+'">'+words[i]+'</span> ';
        }
        html += "</p></section></article>";
        console.log(times);
        console.log(html);
        document.getElementById('hypertranscript').innerHTML = html;
        hyperaudiolite.init("hypertranscript", "hyperplayer", true);
      });
    });
    reader.readAsArrayBuffer(fileInput.files[0]);
    var URL = window.URL || window.webkitURL;
    var fileURL = URL.createObjectURL(fileInput.files[0]);
    videoPlayer.src = fileURL;
  });

  //var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  //var request = new XMLHttpRequest();
  //request.addEventListener("load", function() { console.log(this); loadAudio(audioCtx, this.responseType, this.response); });
  //request.open("GET", "http://localhost:8080/testspeech.wav");
  //request.responseType = "arraybuffer";
  //request.send();
}

window.onload = runTest;
