function safe_tags(str) { //from stackoverflow, not mine
  if(typeof str != "string"){
    return;
  }
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
}
