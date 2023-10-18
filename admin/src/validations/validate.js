function getEleSpan(id) {
  return document.getElementById(id);
}
function kiemTraRong(value, mess, idSpan) {
  var span = getEleSpan(idSpan);
  if (value == "") {
    span.innerHTML = mess;
    return false;
  } else {
    span.innerHTML = "";
    return true;
  }
}

function kiemTraRegex(regex, value, span, mess) {
  if (regex.test(value)) {
    span.innerHTML = "";
    return true;
  } else {
    span.innerHTML = mess;
    return false;
  }
}
function kiemTraSelect(mess, idSpan, id) {
  var span = getEleSpan(idSpan);
  var domSelectedIndex = document.getElementById(id).selectedIndex;
  if (domSelectedIndex == 0) {
    span.innerHTML = mess;
    return false;
  } else {
    span.innerHTML = "";
    return true;
  }
}

function kiemTraSoKyTu(value, mess, idSpan) {
  var span = getEleSpan(idSpan);
  var regex = /^\d{1,6}$/;
  return kiemTraRegex(regex, value, span, mess);
}
function kiemTraTen(value, mess, idSpan) {
  var span = getEleSpan(idSpan);
  var regex = /^[a-zA-Z]+$/;
  return kiemTraRegex(regex, value, span, mess);
}
