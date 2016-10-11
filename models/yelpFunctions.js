const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const _ = require('lodash');

const filename = path.join(__dirname, '../data/yelpData.json');

exports.favourites = (business) => new Promise ((res, rej) => {
  console.log('business in yelpFunctions: ')
  fs.readFile(filename, (err, buffer) => {
    if (err) return rej(err);
    try {
      var data = JSON.parse(buffer);
    } catch(e) {
      var data = [];
      return rej('failed');
    }
    data.push(business.business)
    data.sort((a, b) => {
      return a.id.localeCompare(b.id)
    })
    for (var i = 0; i < data.length - 1; ) {
            if (data[i].id == data[i + 1].id) {
                data.splice(i, 1);
            } else {
                i++;
            }
        }
    const json = JSON.stringify(data);
    fs.writeFile(filename, json, (err) => {
      if (err) throw err;
    });
    res(data);
  })
})

exports.unfavourites = (business) => new Promise ((res, rej) => {
  console.log('yelpFunctions unfavourites')
  fs.readFile(filename, (err, buffer) => {
    if (err) return rej(err);
    try {
      var data = JSON.parse(buffer);
    } catch(e) {
      var data = [];
      return rej('failed');
    }
    console.log('business: ', business)
    let id = business.id
    console.log('id: ', id)
    // let index = data.findIndex(x => x.id === business.id)
    let index = _.findIndex(data, {id: id})
    data.splice(index, 1)
    const json = JSON.stringify(data);
    fs.writeFile(filename, json, (err) => {
      if (err) throw err;
    });
    res(data);
  })
})

exports.allFavourites = () => new Promise ((res, rej) => {
  console.log('business in yelpFunctions: ')
  fs.readFile(filename, (err, buffer) => {
    if (err) return rej(err);
    try {
      var data = JSON.parse(buffer);
    } catch(e) {
      var data = [];
      return rej('failed');
    }
    data.sort((a, b) => {
      return a.id.localeCompare(b.id)
    })
    for (var i = 0; i < data.length - 1; ) {
            if (data[i].id == data[i + 1].id) {
                data.splice(i, 1);
            } else {
                i++;
            }
        }
    const json = JSON.stringify(data);
    fs.writeFile(filename, json, (err) => {
      if (err) throw err;
    });
    res(data);
  })
})
