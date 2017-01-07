var peers = {devices: undefined};
setName();
setReceiveDir();
Dropzone.autoDiscover = false;

$( document ).ready(function() {
  getPeers();
  setInterval(function() {
    getPeers();
  }, 50000);
});

function getPeers() {
  console.log("updating peers");
  $.get( "/peers", function( data ) {
    peers.devices = data;

    $(".dropzone").remove();
    if (peers.devices.length === 0) {
       var dev = $('<div class="device dropzone">' +
       '<h3>' + 'No other devices on this network' + '</h3>' +
       '<p>' + 'Make sure you are on the same network and Paperplane is running.'  + '</p>' +
       '</div>');
        $("#device-list").append(dev);
    }
    else {
      for (var i = 0; i < peers.devices.length; i++) {
        var dev = $('<div id="' + peers.devices[i].name + '" class="device dropzone">' +
        '<h3>' + peers.devices[i].name + '</h3>' +
        '<p>' + peers.devices[i].ip  + '</p>' +
        '</div>');
        dev.dropzone({ url: 'http://' + peers.devices[i].ip + ':' + peers.devices[i].port + '/upload' });
        $("#device-list").append(dev);
      }
    }
  });
}

function setName() {
  $.get( "/setName", function( data ) {
    $('#deviceName').val(data.name);
  });
}

function setReceiveDir() {
  $.get( "/setDir", function( data ) {
    $('#receiveDir').val(data.dir);
  });
}


$('#showdevice').change(function() {
  if($(this).is(':checked')){
    console.log("START showing device on network");
    $.get("/enable");
  }
  else {
    console.log("STOP showing device on network");
    $.get("/disable");
  }
});

// Dropzone.options[id] = {
//   paramName: 'file',
//   maxFilesize: 20, // MB
//   maxFiles: 1,
//   dictDefaultMessage: 'Drag an image here to upload, or click to select one',
//   headers: {
//     'x-csrf-token': document.querySelectorAll('meta[name=csrf-token]')[0].getAttributeNode('content').value,
//   },
//   acceptedFiles: '',
//   init: function() {
//     this.on('success', function( file, resp ){
//       console.log( file );
//       console.log( resp );
//     });
//     this.on('thumbnail', function(file) {
//       if ( file.width < 640 || file.height < 480 ) {
//         file.rejectDimensions();
//       } else {
//         file.acceptDimensions();
//       }
//     });
//   },
//   accept: function(file, done) {
//     file.acceptDimensions = done;
//     file.rejectDimensions = function() {
//       done('The image must be at least 640 x 480px');
//     };
//   }
// };


// $(".device").on("dragover", function(e) {
//   e.preventDefault();
//   console.log("over");
// });
// $(".device").on("drop", function(e) {
//   e.preventDefault();
//   console.log(e.originalEvent.dataTransfer);
//   console.log(e.originalEvent.dataTransfer.files[0].name);
//   var data = e.originalEvent.dataTransfer.getData("application/x-moz-file");
//   console.log("here comes data");
//   console.log(data);
//   // e.target.textContent = data;
//
//   console.log("drop");
// });

// $("#desktop").dropzone({ url: "http://192.168.1.124:3000/upload" });
