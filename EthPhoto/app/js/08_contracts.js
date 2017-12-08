/*globals $, SimpleStorage, document*/

var addToLog = function(id, txt) {
  $(id + " .logs").append("<br>" + txt);
};


// ===========================
// Blockchain example
// ===========================
$(document).ready(function() {

  $("#blockchain button.set").click(function() {
    var value = parseInt($("#blockchain input.text").val(), 10);
    SimpleStorage.set(value);
    addToLog("#blockchain", "SimpleStorage.set(" + value + ")");
  });

  $("#blockchain button.get").click(function() {
    SimpleStorage.get().then(function(value) {
      $("#blockchain .value").html(value.toNumber());
    });
    addToLog("#blockchain", "SimpleStorage.get()");
  });

});

// ===========================
// Storage (IPFS) example
// ===========================
$(document).ready(function() {
  // automatic set if config/storage.json has "enabled": true and "provider": "ipfs"
  //EmbarkJS.Storage.setProvider('ipfs',{server: 'localhost', port: '5001'});
  var val1="";
  var val2="";
  var val3="";
  var val4="";
  var hash4="";
  $("#storage .error").hide();
  EmbarkJS.Storage.ipfsConnection.ping()
    .then(function(){
      console.log("IPFS Online");
    })
    .catch(function(err) {
      if(err){
        console.log("IPFS Connection Error => " + err.message);
      }
  });

  // $(".setIpfsLat").click(function() {
  //   var value = $("#ipfsLat").val();
  //   val1 = value;
  //   //var value = $("#storage input.ipfsLat").val();
  //   EmbarkJS.Storage.saveText(value).then(function(hash) {
  //     //hash1=hash;
  //     $("span.latHash").html(val1);
  //     $("input.latHash").val(val1);
  //   });
  //   addToLog("#storage", "EmbarkJS.Storage.saveText('" + value + "').then(function(hash) { })");
  // });

  // $(".setIpfsLong").click(function() {
  //   var value = $("#ipfsLong").val();
  //   val2 = value;
  //   EmbarkJS.Storage.saveText(value).then(function(hash) {
  //     //hash2=hash;
  //     $("span.longHash").html(val2);
  //     $("input.longHash").val(val2);
  //   });
  //   addToLog("#storage", "EmbarkJS.Storage.saveText('" + value + "').then(function(hash) { })");
  // });

  // $(".setIpfsTag").click(function() {
  //   var value = $("#ipfsTag").val();
  //   val3 = value;
  //   EmbarkJS.Storage.saveText(value).then(function(hash) {
  //     //hash3=hash;
  //     $("span.tagHash").html(val3);
  //     $("input.tagHash").val(val3);
  //   });
  //   addToLog("#storage", "EmbarkJS.Storage.saveText('" + value + "').then(function(hash) { })");
  // });

  /*$("#storage button.loadIpfsHash").click(function() {
    var value = $("#storage input.textHash").val();
    EmbarkJS.Storage.get(value).then(function(content) {
      $("span.ipfsText").html(content);
    });
    addToLog("#storage", "EmbarkJS.Storage.get('" + value + "').then(function(content) { })");
  });*/

  // $("#add_image").click(function() {
  //   var input = $("#upload");
  //   val1 = $('#longinfo').text();
  //   val2 = $('#latinfo').text();
  //   val3 =  $('#tag').val();

  //   EmbarkJS.Storage.uploadFile(input).then(function(hash) {
  //     hash4=hash; 
  //     myImages.push({ImageUrl:EmbarkJS.Storage.getUrl(hash), Latitude:val1, Longitude:val2, Tags:val3});
  //     SimpleStorage.upload(hash4,String(val1),String(val2),String(val3)).then(function () {
  //       console.log(hash4); 
  //       var str = SimpleStorage.GetImages();
  //       // console.log(str);
  //       str.then(function(result) {
  //       var arr = result.toString().split("\n");
  //       Images = [];
  //       for (i = 0; i < arr.length; i++){
  //              var temp = arr[i].split(";");
  //              Images[i] = {ImageUrl:EmbarkJS.Storage.getUrl(temp[0]), Latitude:temp[1], Longitude:temp[2], Tags:temp[3]};
  //          }
  //       console.log(Images); 
  //       });
  //     });
  //     // $("span.fileIpfsuHash").html(hash4);
  //     // $("input.fileIpfsuHash").val(hash4); 
  //   });
  //   // addToLog("#storage", "EmbarkJS.Storage.uploadFile($('input[type=file]')).then(function(hash) { })");

  //   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //   // Refresh the Photos layer here.
  //   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // });

  // $(".marker-delete-button").click(function() {
  //   var hashToDelete = this.attr("hash");
  //   console.log("Deleting... "+hashToDelete);

  //   SimpleStorage.deleteImage(hashToDelete).then(function () {
  //     // REMOVE THIS FROM myImages 
  //     for (i = 0; i < myImages.length; i++){
  //         if(myImages[i].ImageUrl.contains(hashToDelete))
  //           break;
  //     }
  //     if(i < myImages.length){
  //       myImages.splice(i, 1);
  //     }
  //   });

  //   // Refresh Image DB
  //   Images = [];

  //   var str = SimpleStorage.GetImages();
  //   // console.log(str);
  //   str.then(function(result) {
  //   var arr = result.toString().split("\n");
  //   Images = [];
  //   for (i = 0; i < arr.length; i++){
  //          var temp = arr[i].split(";");
  //          Images[i] = {ImageUrl:EmbarkJS.Storage.getUrl(temp[0]), Latitude:temp[1], Longitude:temp[2], Tags:temp[3]};
  //      }
  //   console.log(Images); 
  //   });
  //   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //   // Refresh the Photos layer here.
  //   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  // });


  // $("#trigger_stripe").click(function() {

  //   if(myImages.length == 0){
  //         var str = SimpleStorage.GetUserImages();
  //         // console.log(str);
  //         str.then(function(result) {
  //         var arr = result.toString().split("\n");
  //           myImages = [];
  //           for (i = 0; i < arr.length; i++){
  //                var temp = arr[i].split(";");
  //                myImages[i] = {ImageUrl:EmbarkJS.Storage.getUrl(temp[0]), Latitude:temp[1], Longitude:temp[2], Tags:temp[3]};
  //            }
  //           console.log(myImages); 
  //         });
  //   }
    
  //   $("#photo_strip").html('');
  //   for (i = 0; i < myImages.length; i++){
  //     $("#photo_strip").append('<img class="photo_box" src="'+myImages[i].ImageUrl+'">');
  //   }
    
  //   trigger_stripe();
  // });

 //  $("#storage button.deleteFile").click(function() {
 //    var input = $("#storage .ipfsdel").val();
 //   // val4 = input;
 //    SimpleStorage.deleteImage(input);
 //    addToLog("#storage", "EmbarkJS.Storage.uploadFile($('input[type=file]')).then(function(hash) { })");
 //  });

 //  $("#storage button.loadIpfsFile").click(function() {
 //    var hash = $("#storage input.fileIpfsHash").val();
 //    var url = EmbarkJS.Storage.getUrl(hash);
 //    var link = '<a href="' + url + '" target="_blank">' + url + '</a>';
 //    $("span.ipfsFileUrl").html(link);
 //    $(".ipfsImage").attr('src', url);
 //    addToLog("#storage", "EmbarkJS.Storage.getUrl('" + hash + "')");
 //  });





 // $("#storage button.GetUsrFile").click(function() {
 //    var str = SimpleStorage.GetUserImages();
 //    str.then(function(result) {
	// var arr = result.toString().split("\n");
	// var Images = [];
	// for (i = 0; i < arr.length; i++){
 //      		var temp = arr[i].split(";");
 //      		Images[i] = {ImageUrl:EmbarkJS.Storage.getUrl(temp[0]), Latitude:temp[1], Longitude:temp[2], Tags:temp[3]};
 //    	}
	// console.log(Images);
 //    }); 
 //  });


 // $("#storage button.GetAllFile").click(function() {
 //    var str = SimpleStorage.GetImages();
 //    str.then(function(result) {
	// var arr = result.toString().split("\n");
	// var Images = [];
	// for (i = 0; i < arr.length; i++){
 //      		var temp = arr[i].split(";");
 //      		Images[i] = {ImageUrl:EmbarkJS.Storage.getUrl(temp[0]), Latitude:temp[1], Longitude:temp[2], Tags:temp[3]};
 //    	}
	// console.log(Images);
 //    });
 //  });

});