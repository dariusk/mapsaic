var _ = require('underscore');
_.mixin( require('underscore.deferred') );
var request = require('request');
var url = "http://maps.googleapis.com/maps/api/streetview?size=SIZExSIZE&location=LAT,LON&fov=FOV&heading=HEAD&pitch=PITCH&sensor=false&key=INSERTKEY";
var out = '';
 
Array.prototype.pick = function() {
  return this[Math.floor(Math.random()*this.length)];
};

Array.prototype.pickRemove = function() {
  var index = Math.floor(Math.random()*this.length);
  return this.splice(index,1)[0];
};

function getUrl(pit, ord, size, fov, head) {
  size = size || 240;
  fov = fov || Math.random()*110 + 10;
  head = head | Math.random()*360;
  var dfd = new _.Deferred();
  function doit() {
    var lat = ''+((Math.random()*0.003488)+42.349807),
        lon = ''+(-1*((Math.random()*0.00957) + 71.071354)),
        pitch = pit || ''+Math.random()*180;
    var ret = url.replace('LAT',lat).replace('LON',lon).replace('PITCH',pitch).replace(/SIZE/g,size).replace('FOV',fov).replace('HEAD',head);
    request(ret, function(err, resp, body) {
      var clen = resp.headers['content-length'];
      if (clen === '1859' || clen === '1969' || clen === '1994' || clen === '2887') {
        doit(pit, ord);
      }
      else {
        dfd.resolve({
          src: ret,
          ord: ord
        });
      }
    });
  }
  doit();
  return dfd.promise();
}
 
_.when(
  getUrl(90,null,null,120,331),
  getUrl(90,null,null,120,331),
  getUrl(90,null,null,120,331),
  getUrl(90,null,null,120,331),
  getUrl(90,null,null,120,331),
  getUrl(90,null,null,120,331),
  getUrl(90,null,null,120,331),
  getUrl(90,null,null,120,331),
  getUrl(90,null,null,120,331),
  getUrl(90,null,null,120,331),
  getUrl(90,null,null,120,331),
  getUrl(90,null,null,120,331),
  getUrl(90,null,null,120,331),
  getUrl(90,null,null,120,331),
  getUrl(90,null,null,120,331),
  getUrl(90,null,null,120,331)
  ).done(function() {
  var res = _.chain(arguments)
    .toArray()
    .pluck('src')
    .reduce(function(memo, el) {
      return memo + '<img src="' + el + '">';
    }, '')
    .value();
  console.log(res);
});
