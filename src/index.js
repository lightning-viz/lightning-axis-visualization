'use strict';

var LightningVisualization = require('lightning-visualization');
var d3 = require('d3');
var moment = require('moment');
var _ = require('lodash');

var LightningAxis = LightningVisualization.extend({

  axisPadding: 5,

  coerceValue: function(val, scaleType) {
    scaleType = scaleType || 'linear';
    if(scaleType === 'time') {
      return moment(val).toDate();
    }

    return val;
  },


  getXScale: function(domain) {
    var scaleType = this.data.xscale || 'linear';
    var scale;
    if(scaleType === 'time') {
      scale = d3.time.scale();
    } else {
      scale = d3.scale[scaleType]();
    }
    return scale.domain(this.data.xlim || [domain[0], domain[1]])
                .range([this.axisPadding, this.width - this.margin.left - this.margin.right - this.axisPadding]);
  },

  getYScale: function(domain) {
    var scaleType = this.data.yscale || 'linear';
    var scale;
    if(scaleType === 'time') {
      scale = d3.time.scale();
    } else {
      scale = d3.scale[scaleType]();
    }
    return scale.domain(this.data.ylim || [domain[0], domain[1]])
            .range([this.height - this.margin.top - this.margin.bottom - this.axisPadding, this.axisPadding]);
  },

  getXAxis: function(scale) {
    var tickFormat = null;

    if(this.data.xTickFormat) {
      var format = this.data.xTickFormat;
      tickFormat = function(d) {
        return parseFloat(d3.format(format)(d))
      }
    }

    return d3.svg.axis()
        .scale(scale)
        .orient('bottom')
        .ticks(this.data.xticks || 5)
        .tickFormat(tickFormat);
  },

  getYAxis: function(scale) {
    var tickFormat = null;

    if(this.data.yTickFormat) {
      var format = this.data.yTickFormat;
      tickFormat = function(d) {
        return parseFloat(d3.format(format)(d))
      }
    }

    return d3.svg.axis()
        .scale(scale)
        .orient('left')
        .ticks(this.data.yticks || 5)
        .tickFormat(tickFormat);
  }

});


module.exports = LightningAxis;
