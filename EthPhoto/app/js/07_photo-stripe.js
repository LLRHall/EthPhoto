var stripe_shown = false;

$(document).ready(function(){

  $('.tooltipped').tooltip({delay: 10,tooltip: "Show My Photos",position: 'bottom'});

});

function trigger_stripe() {
  var speed = 300;
  // $('#map').toggle(speed);
  // $('#searchBox').toggle(speed);
  $('#photoViewer').toggle(speed);
  $('.fixed-action-btn').toggle(speed);
  if (stripe_shown) {
    stripe_shown = false;
    hide_stripe();
  } else {
    stripe_shown = true;
    show_stripe();
  }
}

function show_stripe() {
  var speed = 300;
  $('.tooltipped').tooltip('remove');
  //$('.tooltipped').tooltip({delay: 10,tooltip: "Close",position: 'bottom'});
  $('#photo_stripe').slideDown(500);
  $('#trigger_stripe i').text('close');
  $('#trigger_stripe').css("background", "transparent");
  $('#trigger_stripe').css('box-shadow', '0px 0px 0px #888');

}

function hide_stripe() {
  var speed = 300;
  //$('.tooltipped').tooltip('remove');
  $('.tooltipped').tooltip({delay: 10,tooltip: "Show My Photos",position: 'bottom'});
  $('#photo_stripe').slideUp(500);
  $('#trigger_stripe i').text('perm_media');
  $('#trigger_stripe').css("background", "#207ac9");
  $('#trigger_stripe').css('box-shadow', '0px 1px 2px #888');

//   $('#photoViewer .card-title').css('display', 'none');
//   $('#photoViewer a').css('display', 'none');
}

var oldborderinfo;
$(document).on("mouseover",'.photo_box', function() {
    oldborderinfo = $(this).css("border");
    $(this).css("border", "4px solid #ffffff");
  }
);

$(document).on("mouseout",'.photo_box', function() {
    $(this).css("border", oldborderinfo);
  }
);

$(document).on('click','#photoViewer',function(){
  $('#viewer').attr('src', '');
  $('#photoViewer a').css('display','none');
  $('#photoViewer .card-title').css('display', 'none');
  console.log("6785765");
   trigger_stripe(); 
});

$(document).on('click','#photoViewer .card-image',function(e){
   e.stopImmediatePropagation();
});

$(document).on('click','#photoViewer .card-content',function(e){
   e.stopImmediatePropagation();
});

var oldobj = null;
$(document).on("click",'.photo_box',function(){
  if(oldobj)
    oldobj.css("border", "4px solid");
  oldobj = $(this);
  $(this).css("border", "4px solid gray");
  oldborderinfo = "4px solid gray";
  var src_of_img = $(this).attr('src');
  var caption = $(this).attr('caption');
   $('#photoViewer .card-content').html(caption);
  $('#viewer').attr('src', src_of_img);

  console.log('++++++++++++++++='+src_of_img);
  $('#photoViewer .card-title').css('display', 'block');
  for (var i=0; i<myImages.length; i++){
    if (myImages[i].url == src_of_img){
      console.log('---------------'+myImages[i].url);
      $('#photoViewer a').css('display', 'block');
      return;    
    }
  }
  $('#photoViewer a').css('display', 'none');
});


//$('#contents').hide(speed);
