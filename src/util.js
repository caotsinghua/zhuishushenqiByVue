let util = {
  setCookie: function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },
  getCookie: function (name) {
    let cookie = document.cookie.split(";");
    //console.log(document.cookie);
    let ans = '';
    cookie.forEach(function (item) {
      if (item.indexOf(name) != -1) {
        ans = item.split("=")[1];
        return;
      }
    })
    return ans;
  },
  deleteCookie: function (name) {
    this.setCookie(name, '', -1);
  }
}

export default util;
