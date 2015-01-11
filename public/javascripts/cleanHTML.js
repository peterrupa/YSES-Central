function safe_tags(str) { //from stackoverflow, not mine
  if(str == null){
    return;
  }
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
}
