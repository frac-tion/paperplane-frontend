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

$("#librem").dropzone({ url: "192.168.1.124:3000/upload" });
