
// /*
// Build list of map types.
// You can also use var mapTypeIds = ["roadmap", "satellite", "hybrid", "terrain", "OSM"]
// but static lists sucks when google updates the default list of map types.
// */

// var data = "data", name = "name", tag = "tag";
// var lat,long;
// var onClickMarker = "";
// var mymap;
// var photoLayer;

/*All the images, are present in this array*/
var allPhotos = [];

/*All the images, are present in this array*/
var myImages = [];


// Function triggered when location search is selected in search type
function onLocationSearchSelect(){
  var tags = document.getElementById('searchTags');
  tags.style.display = 'none'
}

// Function triggered when image search is selected in search type
function onImageSearchSelect(){
  var tags = document.getElementById('searchTags');
  tags.style.display = 'block'
}


function locationInRange (x, y, x1, y1) {
    if ((x>x1-5)&&(x<x1+5)&&(y>y1-5)&&(y<y1+5)){
      return true;
    }
    else {
      return false;
    }
}

function containingSearchedTags(img_tags, searched_tags){
  var img_array = img_tags.split(",").sort();
  var tags_array = searched_tags.sort();

  for (var i=0; i<img_array.length; i++){
    for (j=0;j<tags_array.length;j++){
      if($.trim(img_array[i])==$.trim(tags_array[j])){
        return true;
      }
    }
  } 

  return false; 
}

//Function to search images => gets tag, lat, lng and opens image slider
function ImageSearch(lat, long_, tags){
  var photos = allPhotos;
  var img_sources = []
  for (var i=0; i<photos.length; i++){
    if (locationInRange(photos[i].lat, photos[i].lng, lat, long_) && containingSearchedTags(photos[i].caption, tags)){
      img_sources.push([photos[i].url,photos[i].caption]);
    }
  }
  
  $('#photo_stripe').html("");
  $('#photoViewer .card-content').html("<p>Please select any on the images below to start exploring!</p>");
  
  if (img_sources.length == 0){
    $('#photoViewer .card-content').html("<p>Sorry no images found.. Try with different tags or location.</p>");
    $('#photoViewer a').css('display','none');
    $('#viewer').attr('src', '');
  }
  else{
    for (i=0; i<img_sources.length; i++){
      $('#photo_stripe').append('<img class="photo_box" src="'+img_sources[i][0]+'" caption="'+img_sources[i][1]+'">')
    }
  }
  trigger_stripe();
}

$(document).ready(function () {

    //Function to detect change in search type
    $('#searchTypeSelect').change(function () {

      if(this.value == '1'){
        //Perform Location Search
        onLocationSearchSelect();
      }
      if(this.value == '2'){
        //Perform Image Search
        onImageSearchSelect();
      } 

    });

});

// if (window.File && window.FileReader && window.FileList && window.Blob) {
//   console.log('Great success! All the File APIs are supported.');
// } else {
//   alert('The File APIs are not fully supported in this browser.');
// }

// // function loadMap(lat,long){
// //   mymap.panTo(new L.LatLng(lat, long), 12);
// // }
// $(document).ready(function () {
//     function initGeolocation(){
//       if( navigator.geolocation ){
//          // Call getCurrentPosition with success and failure callbacks
//          navigator.geolocation.getCurrentPosition( success, fail );
//       }
//       else{
//          alert("Sorry, your browser does not support geolocation services.");
//       }
//     }

//     function change_location(lat, long){
//       // initGeolocation();
//       mymap.setView(new L.LatLng(lat, long), 9);
//     }

//     function add_image(){
//       var photo = [];
//       // document.getElementById("tagdiv").setAttribute('style', 'display:none');
//       // document.getElementById("add_image").setAttribute('style', 'display:none');
//       tag = document.getElementById("tag").value;
//       if(tag == ""){
//         alert("Please, add tag");
//         return;
//       }
//       // console.log(lat);
//       // console.log(long);
//       // console.log(data);
//       // console.log(tag);

//       photo.push({
//         lat: lat,
//         lng: long,
//         url: data,
//         caption: tag,
//         thumbnail: data,
//       });            
//       data = "data";  tag = "tag";
//       photoLayer.add(photo).addTo(mymap);
//       mymap.fitBounds(photoLayer.getBounds());
//       $("#loc_info").css('display', 'none');
//       document.getElementById("upload").value = "";
//       document.getElementById("upload_text").value = "";
//       document.getElementById("tag").value = "";
//       console.log(document.getElementById("tag").value);


//     }

//     $("#add_image").click(function (){
//       // add_image();
//       console.log(SimpleStorage);
//     });

//     function upload_image(evt){
//       // var kgp = "kgp.jpg";
//       var files = evt.target.files; // FileList objec

//       // Loop through the FileList and render image files as thumbnails.
//       for (var i = 0, f; f = files[i]; i++) {

//         // Only process image files.
//         if (!f.type.match('image.*')) {
//           continue;
//         }

//         var reader = new FileReader();

//         // Closure to capture the file information.
//         reader.onload = (function(theFile) {
//           return function(e) {
//             // Render thumbnail.
//             // var span = document.createElement('span');
//             // console.log(e.target.result);
//             data = e.target.result;
//           }
//         })(f);
       
//         // Read in the image file as a data URL.
//         reader.readAsDataURL(f);

//         // console.log(data);
//         image = f;
//         EXIF.getData(image, function() {
//           // console.log(image.target.files[0]);
//           // image = evt.target.files[0];
//           name = image["name"];
//           var metaData = EXIF.getAllTags(this);
//           // console.log(metaData);
//           // console.log(Object.keys(metaData).length);
//           // var lat, long;
//           if(Object.keys(metaData).length != 0){
//             var r = confirm("The image is geotagged. Continue with this location?");
//             document.getElementById("add_image").addEventListener('click', add_image);
//             if(!r)
//               return;
//             lat = metaData.GPSLatitude; long = metaData.GPSLongitude;
//             if (lat.length == 0 || long.length == 0) return;
//             lat = lat[0]["numerator"]/lat[0]["denominator"] + lat[1]["numerator"]/(60.0*lat[1]["denominator"]) + lat[2]["numerator"]/(3600.0*lat[2]["denominator"]) ;
//             long = long[0]["numerator"]/long[0]["denominator"] + long[1]["numerator"]/(60.0*long[1]["denominator"]) + long[2]["numerator"]/(3600.0*long[2]["denominator"]) ;
//             if(metaData.GPSLatitudeRef == "S")lat = -lat;
//             if(metaData.GPSLongitudeRef == "W")long = -long;
//             onClickMarker = L.marker([lat, long]).addTo(mymap);
//             $("#latinfo").html(lat);
//             $("#longinfo").html(long);
//             // console.log(lat);
//             // console.log(long);
//             // document.getElementById("add_tag").setAttribute('style', 'display:block' );
//             // document.getElementById("add_image").setAttribute('style', 'display:block');
//             // document.getElementById("add_tag").addEventListener('click', add_tag);
//           }else{
//             // alert("Enter Geotagged Image");
//             return;
//           }

//           while(data == "data"){
//             console.log("Wait");
//           }
//         });
//       }
//     }

//     var search_handler_calls = 0;

//     //assign the search button and enter key to search location
//     function autoComplete(dataObj){
//         console.log("here");
//         console.log(dataObj);
//         $('input.autocomplete').autocomplete({
//             data: dataObj,
//             limit: 5
//         });
//             //
//         $('.searchBox').keyup();
//         $('.autocomplete-content li').bind("click",function(e){
//             searchQuery($(this).text());
//         });   
//         $(".preloader-wrapper").removeClass("active");
//         $(".searchBtn i").removeClass("hide");
//         $(".searchBtn").removeClass("disabled");
//         $(".preloader-wrapper").addClass("hide");
//     }

//     function searchQuery(finalLocationValue){
//         // var finalLocationValue = $(".searchBox").val();
//         if(finalLocationValue == ""){
//             alert("Enter a Location First");
//         } else{
//             $.ajax({
//                 //url:"http://nominatim.openstreetmap.org/search/"+ locationValue +"?format=json&addressdetails=1&limit=1&polygon_svg=1",
//                 url:"http://photon.komoot.de/api/?q="+finalLocationValue,
//                 type:"GET",
//                 cache: false,
//                 error: function() {
//                     alert("an error occured");
//                 },
//                 success: function(response){
//                     if(response!='error'){
//                         // console.log("hello");
//                         //var data = JSON.parse(response);
//                         //console.log(response);
//                         if (response["features"].length == 0) {
//                             alert("Location searched not found");
//                             return;
//                         }
//                         var long = response["features"][0]["geometry"]["coordinates"][0];
//                         var lat = response["features"][0]["geometry"]["coordinates"][1]; 
//                         // console.log(lat, long);
//                         // change_location(lat, long);
//                         mymap.setView(new L.LatLng(lat, long), 12);

//                     }
//                 }
//             });
//         }

//     }                                                                                                        

//     $(document).on("click", ".searchBtn", function(){
//         searchQuery($(".searchBox").val());
//     });
//     $('.searchBox').bind("enterKey",function(e){
//         searchQuery($(".searchBox").val());
//     });

//     $('.searchBox').keyup(function(e){
//         $("#loc_info").css('display', 'none');
//         search_handler_calls++;
//         if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){
//             return false;
//         }
//         else if(e.keyCode == 13 )
//         {
//             $(this).trigger("enterKey");
//         } else{
//             if (search_handler_calls >= 2) {
//                 console.log(search_handler_calls)
//                 search_handler_calls = 0;
//                 return false;
//             }
//             $(".preloader-wrapper").addClass("active");
//             $(".searchBtn i").addClass("hide");
//             $(".searchBtn").addClass("disabled");
//             $(".preloader-wrapper").removeClass("hide");
//             var locationValue = $(".searchBox").val();
//             $.ajax({
//                 //url:"http://nominatim.openstreetmap.org/search/"+ locationValue +"?format=json&addressdetails=1&limit=1&polygon_svg=1",
//                 url:"http://photon.komoot.de/api/?q="+locationValue+"&limit=10",
//                 type:"GET",
//                 cache: false,
//                 error: function() {
//                     alert("an error occured");
//                 },
//                 success: function(response){
//                     if(response!='error'){
//                         //console.log("hello");
//                         //var data = JSON.parse(response);
//                         // console.log(response);
//                         // console.log(locationValue)

//                         var dataObj = {};
//                         for(var i in response["features"]){
//                             var locationName = response["features"][i]["properties"]["name"];
//                             dataObj[locationName] = null;
//                         }

//                         autoComplete(dataObj)

//                     }
//                 }
//             });
//         }
//     });

//     function createNewMap()
//     {

//         mymap = L.map('map').setView([22.34309, 87.3012875], 9);
//         L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
//           id: 'mapbox.streets',
//           minZoom:3, 
//           maxZoom: 15,
//           subdomains:['mt0','mt1','mt2','mt3'],
//           noWrap: true,
//         }).addTo(mymap);
//         var southWest = L.latLng(-89.98155760646617, -180),
//         northEast = L.latLng(89.99346179538875, 180);
//         var bounds = L.latLngBounds(southWest, northEast);
//         mymap.setMaxBounds(bounds);
//         mymap.on('drag', function() {
//           mymap.panInsideBounds(bounds, { animate: false });
//         });
//     }

//     function getNewPhotoLayer()
//     {
//          delete photoLayer;
//          photoLayer = L.photo.cluster().on('click', function (evt) {
//             var photo = evt.layer.photo,
//               template = '<img src="{url}"/></a><p>{caption}</p><a class="waves-effect waves-light btn marker-delete-button">button</a>';

//             if (photo.video && (!!document.createElement('video').canPlayType('video/mp4; codecs=avc1.42E01E,mp4a.40.2'))) {
//               template = '<video autoplay controls poster="{url}"><source src="{video}" type="video/mp4"/></video>';
//             };

//             $(document).on('click','.marker-delete-button',function () 
//             {
//                 mymap.removeLayer(photoLayer);
//                 mymap.remove();
//                 createNewMap();
//                 getNewPhotoLayer();


//             });

//             evt.layer.bindPopup(L.Util.template(template, photo), {
//               className: 'leaflet-popup-photo',
//               minWidth: 400
//             }).openPopup();
//           });
//     // Photo Array To Be Obtained From Backend Here 
//         photoLayer.add(photo).addTo(mymap);
//         mymap.fitBounds(photoLayer.getBounds());
//     }

//     createNewMap();

//     function demo_delete() // Delete Function Once Testing Period is Over. Just meant to Initialize photo[]
//     {
        
//         var photo = [];
//         photo.push({
//         lat: 22,
//         lng: 87,
//         url: "http://localhost:8080/ipfs/QmXxC4ae22EbK5d8sycZC4q9BcWU4rz5W8UbBMYV3yjJuH",
//         caption: "Dedicated To The Service of The Nation",
//         thumbnail: "kgp_thumb.jpg",
//         // video: ""
//         });

//         photoLayer = L.photo.cluster().on('click', function (evt) {
//             var hash = "QmXxC4ae22EbK5d8sycZC4q9BcWU4rz5W8UbBMYV3yjJuH";
            
//             console.log(hash+'__________________');

//             var photo = evt.layer.photo,
//               template = '<img src="{url}"/></a><p>{caption}</p><i class="Medium material-icons marker-delete-button"  hash="'+hash+'">delete</i>';

//             if (photo.video && (!!document.createElement('video').canPlayType('video/mp4; codecs=avc1.42E01E,mp4a.40.2'))) {
//               template = '<video autoplay controls poster="{url}"><source src="{video}" type="video/mp4"/></video>';
//             };

//             $(document).on('click','.marker-delete-button',function () 
//             {
//                 mymap.removeLayer(photoLayer);
//                 mymap.remove();
//                 createNewMap();
//                 getNewPhotoLayer();

//             });

//             evt.layer.bindPopup(L.Util.template(template, photo), {
//               className: 'leaflet-popup-photo',
//               minWidth: 400
//             }).openPopup();
//           });

//         photoLayer.add(photo).addTo(mymap);
//         mymap.fitBounds(photoLayer.getBounds());

        

//     }
//     // getNewPhotoLayer(); --- Uncomment For Final Publish
//     demo_delete();




//     document.getElementById('upload').addEventListener('change', upload_image, false);

//     function onMapClick(e) {
//       if(onClickMarker != ""){
//           mymap.removeLayer(onClickMarker);
//       }
//       var latitude = e.latlng["lat"];
//       var longitude = e.latlng["lng"];
//       lat = latitude;
//       long = longitude;
//       $("#latinfo").html(latitude);
//       $("#longinfo").html(longitude);
//       $('#loc_info').css('display','block');
//       // var form = '<div class="row"><div class="col s12 file-field input-field"><div class="btn"><span>File</span><input type="file" id = "upload_marker"></div><div class="file-path-wrapper"><input class="file-path validate" type="text"></div><div class="chips chips-autocomplete"></div></div><div class="input-field col s12" id = "tagdiv_marker"><input id="tag_marker" type="text" class="validate"><label for="tag">Tag</label></div><div class="col s6"><a class="waves-effect waves-light btn-large" id = "add_image_marker">Done</a></div></div>';
//       onClickMarker = L.marker([latitude, longitude]).addTo(mymap);
//       // onClickMarker.bindPopup(form).openPopup();
//       // document.getElementById('upload_marker').addEventListener('change', get_datauri_marker, false);
//       // document.getElementById('add_image_marker').addEventListener('click', add_image_marker, false);
//     }

//     mymap.on('click', onMapClick);

//     $(document).on("click", ".openNavFromMarker", function(){
//         $(".button-collapse").trigger("click");
//     });
//     $('.tooltipped').tooltip({delay: 50});

//     $(".button-collapse").sideNav();

//     // $('input.autocomplete').autocomplete({
//     //     data: {
//     //         "Apple": null,
//     //         "amazon":null,
//     //         "kharagpur": null,
//     //         "Google": null
//     //     },
//     //     limit: 20
//     // });
//     var currentLat, currentLong;
//     // navigator.geolocation.getCurrentPosition(function(location) {
//     //   console.log(location.coords.latitude);
//     //   currentLat = location.coords.latitude
//     //   console.log(location.coords.longitude);
//     //   currentLong = location.coords.longitude
//     //   //console.log(location.coords.accuracy);
//     //   mymap.setView(new L.LatLng(currentLat, currentLong), 9);
//     // });
//     mymap.setView(new L.LatLng(22.3218441, 87.30292759999999), 9);
// });


