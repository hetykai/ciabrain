"use strict";
var Topic = require('../../db/models').Topic;
var express = require('express');
var router = express.Router();

router.route('/topics')
  //获得所有沪深市场数据
  .get(function(req, res) {
      Topic.findAll({order: 'frequence DESC'}).then(function(topic){
        res.json(topic);
      }).catch(function(err){
      	res.json(err);
      });
  });

module.exports = router;
