var peers = {devices: undefined};
Dropzone.autoDiscover = false;

$( document ).ready(function() {
  console.log("getting peers");
  $.get( "/peers", function( data ) {
    peers.devices = data;
    for (var i = 0; i < peers.devices.length; i++) {
      var dev = $('<div id="' + peers.devices[i].name + '" class="device dropzone">' +
      '<h3>' + peers.devices[i].name + '</h3>' +
      '<p>' + peers.devices[i].ip  + '</p>' +
      '</div>');
      dev.dropzone({ url: 'http://' + peers.devices[i].ip + ':' + peers.devices[i].port + '/upload' });
      $("#device-list").append(dev);
    }
  });
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
