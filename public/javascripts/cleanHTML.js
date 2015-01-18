function safe_tags(str) { //from stackoverflow, not mine. but i modified it for array/object support

  if(str && str.constructor === Array){
    for(var i = 0; i < str.length; i++){
      str[i] = safe_tags(str[i]);
    }
    return str;
  }
  else if(typeof str == 'object'){
    for(property in str){
      str[property] = safe_tags(str[property]);
    }
    return str;
  }
  else if(typeof str == 'string'){
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  else{
    return str;
  }
}
