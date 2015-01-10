function safe_tags(str) { //from stackoverflow, not mine
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
}
