var test = require('ava');
var fs = require('fs');

test('All JSON files should parse correctly', function (t) {
  var blurbs = fs.readFileSync('../app/assets/data/blurbs.json');
  var oilfields = fs.readFileSync('../app/assets/data/oilfields.geojson');
  var info = fs.readFileSync('../app/assets/data/info.json');
  var metadata = fs.readFileSync('../app/assets/data/metadata.json');
  var prices = fs.readFileSync('../app/assets/data/prices.json');
  var related = fs.readFileSync('../app/assets/data/related.json');
  [ blurbs, oilfields, prices, related, metadata, info ].forEach(function (file) {
    t.notThrows(function () { JSON.parse(file); });
  });
});

test('All possible runs should be readable', function (t) {
  // Load all data based on metadata
  var metadata = JSON.parse(fs.readFileSync('../app/assets/data/metadata.json'));
  var gi = metadata.gwp.split(',');
  var wi = metadata.water.split(',');
  var fi = metadata.flare.split(',');
  var ri = metadata.refinery.split(',');
  var li = [1, 0];
  var yi = metadata.year.split(','); 
  var zi = [1, 0];

  gi.forEach(function (_, g) {
    wi.forEach(function (_, w) {
      fi.forEach(function (_, f) {
        yi.forEach(function (_, y) {
          t.notThrows(function () { JSON.parse(fs.readFileSync('../app/assets/data/opgee/opgee_run' + g + w + f + y + '.json')); });
        });
      });
    });
  });
  zi.forEach(function (_, z) {
    ri.forEach(function (_, r) {
      li.forEach(function (_, l) {
        t.notThrows(function () { JSON.parse(fs.readFileSync('../app/assets/data/prelim/prelim_run' + z + r + l + '.json')); });
      });
    });
  });
});
