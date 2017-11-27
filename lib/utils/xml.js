'use strict';

const js2xmlparser = require('js2xmlparser');
const xml2js = require('xml2js');

const toJson = (xml) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, result) => {
      if (err !== null) return reject(err);
      resolve(result);
    });
  });
};

const toJsonArray = (xmls) => {
  const jsons = [];
  return new Promise((resolve, reject) => {
    xmls.reduce((seq, xml) => {
      return toJson(xml).then(json => {
        jsons.push(json);
      }).catch(e => {
        reject(e);
      });
    }, Promise.resolve()).then(
      () => resolve(jsons),
      (e) => reject(e)
    );
  });
};

const merge = (productName, licenceXmls) => {
  const product = {
    name: productName,
    projects: {
      project: []
    }
  };
  return new Promise((resolve, reject) => {
    toJsonArray(licenceXmls).then(jsons => {
      jsons.forEach(json => {
        product.projects.project = product.projects.project.concat(json);
      });
    }).then(
      () => resolve(js2xmlparser.parse(productName, product.projects)),
      (e) => reject(e)
    );
  });
};

module.exports = {
  merge,
  toJson,
  toJsonArray
};
