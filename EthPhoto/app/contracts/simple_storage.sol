pragma solidity ^0.4.7;



contract SimpleStorage {
  
  struct Image {
    string ihash;
    string lat;
    string long;
    string tags;
  }

  mapping(address => Image []) public images;
 // mapping(uint => address) public accIndex;
  uint accCount;
 // address[] public UserIndex;
  Image[] public allImages;


  function strConcat(string _a, string _b, string _c, string _d, string _e) internal returns (string){
    bytes memory _ba = bytes(_a);
    bytes memory _bb = bytes(_b);
    bytes memory _bc = bytes(_c);
    bytes memory _bd = bytes(_d);
    bytes memory _be = bytes(_e);
    string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
    bytes memory babcde = bytes(abcde);
    uint k = 0;
    for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
    for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
    for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
    for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
    for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
    return string(babcde);
  }

  function strConcat(string _a, string _b, string _c, string _d) internal returns (string) {
      return strConcat(_a, _b, _c, _d, "");
  }

  function strConcat(string _a, string _b, string _c) internal returns (string) {
      return strConcat(_a, _b, _c, "", "");
  }

  function strConcat(string _a, string _b) internal returns (string) {
      return strConcat(_a, _b, "", "", "");
  }


  function SimpleStorage(){
    accCount = 0;
  }

  function GetImages() constant returns(string s) {
    for(uint i = 0; i < allImages.length ; ++i) {
        s = strConcat(s, allImages[i].ihash);
        s = strConcat(s, ";");
        s = strConcat(s, allImages[i].lat);
        s = strConcat(s, ";");
        s = strConcat(s, allImages[i].long);
        s = strConcat(s, ";");
        s = strConcat(s, allImages[i].tags);
        s = strConcat(s, "\n");
    }
  }


  function GetUserImages() constant returns(string s) {
   
    for(uint j=0; j < images[msg.sender].length ; ++j) {
        s = strConcat(s, images[msg.sender][j].ihash);
        s = strConcat(s, ";");
        s = strConcat(s, images[msg.sender][j].lat);
        s = strConcat(s, ";");
        s = strConcat(s, images[msg.sender][j].long);
        s = strConcat(s, ";");
        s = strConcat(s, images[msg.sender][j].tags);
        s = strConcat(s, "\n");
    } 
	//test = 0;
//return test;
  }

  function upload(string hashing, string lat, string long, string tags){
    images[msg.sender].push(Image({ihash: hashing, lat:lat, long:long, tags:tags}));
    allImages.push(Image({ihash: hashing, lat:lat, long:long, tags:tags}));
  }


  function stringsEqual(string storage _a, string memory _b) internal returns (bool) {
    bytes storage a = bytes(_a);
    bytes memory b = bytes(_b);
    if (a.length != b.length)
      return false;
    // @todo unroll this loop
    for (uint i = 0; i < a.length; i ++)
      if (a[i] != b[i])
        return false;
    return true;
  }


  function deleteImage(string hash){
    
    for(uint i = 0; i < images[msg.sender].length ; ++i){
      if(stringsEqual(images[msg.sender][i].ihash, hash))
        break;
    }

   if(i == images[msg.sender].length)
      throw;
   else{
      for(uint j=i; j<images[msg.sender].length - 1; j++){
        images[msg.sender][j] = images[msg.sender][j+1];
      }
      delete images[msg.sender][images[msg.sender].length-1];
      images[msg.sender].length -- ;
    }

    //-----------------------------------------------------

    for(uint k = 0; k < allImages.length ; ++k){
      if(stringsEqual(allImages[k].ihash, hash))
        break;
    }

   if(k == allImages.length)
      throw;
   else{
      for(uint l=k; l<allImages.length - 1; l++){
        allImages[l] = allImages[l+1];
      }
      delete allImages[allImages.length-1];
      allImages.length -- ;
    }

  }
}
