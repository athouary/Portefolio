"use strict";

const mixin = function (mixin) {
    let returnObject = {};
    const config = mixin;
    if(config.gridBreakpoints.get('xl')){
        var mediaXl = '(min-width: '+ (config.gridBreakpoints.get('lg')+1)+'px)';
        var mediaMaxXl = '(max-width: '+ (config.gridBreakpoints.get('xl'))+'px)';
        var mediaMinXl = '(min-width: '+ (config.gridBreakpoints.get('xl')+1)+'px)';
    }
    if(config.gridBreakpoints.get('lg')){
        var mediaLg = '(min-width: '+ (config.gridBreakpoints.get('md')+1)+'px) and (max-width: '+config.gridBreakpoints.get('lg')+'px)';
        var mediaMaxLg = '(max-width: '+ (config.gridBreakpoints.get('lg'))+'px)';
        var mediaMinLg = '(min-width: '+ (config.gridBreakpoints.get('lg')+1)+'px)';
    }
    if(config.gridBreakpoints.get('md')){
        var mediaMd = '(min-width: '+ (config.gridBreakpoints.get('sm')+1)+'px) and (max-width: '+config.gridBreakpoints.get('md')+'px)';
        var mediaMaxMd = '(max-width: '+ (config.gridBreakpoints.get('md'))+'px)';
        var mediaMinMd = '(min-width: '+ (config.gridBreakpoints.get('md')+1)+'px)';
    }
    if(config.gridBreakpoints.get('sm')){
        var mediaSm = '(min-width: '+ (config.gridBreakpoints.get('xs')+1)+'px) and (max-width: '+config.gridBreakpoints.get('sm')+'px)';
        var mediaMaxSm = '(max-width: '+ (config.gridBreakpoints.get('sm'))+'px)';
        var mediaMinSm = '(min-width: '+ (config.gridBreakpoints.get('sm')+1)+'px)';
    }
    if(config.gridBreakpoints.get('xs')){
        var mediaXs = '(min-width: '+ (config.gridBreakpoints.get('xs')+1)+'px)';
        var mediaMaxXs = '(max-width: '+ (config.gridBreakpoints.get('xs'))+'px)';
        var mediaMinXs = '(min-width: '+ (config.gridBreakpoints.get('xs')+1)+'px)';
    }
    const temp = {
        '.container': {
            'max-width': config.gridMaxWidth,
            'margin-left': 'auto',
            'margin-right': 'auto',
            'padding-left': (config.gridGutterSize / 2)+"px",
            'padding-right': (config.gridGutterSize / 2)+"px",
            ['@media'+mediaMaxXs]: {
                'margin': '0 -'+(config.gridOuterSpacing)+'px'
            }
        },
        '.area': {
            'margin-left': "-"+(config.gridGutterSize / 2)+"px",
            'margin-right': "-"+(config.gridGutterSize / 2)+"px",
            '.area': {
                'margin': 0
            },
            ['@media'+mediaMaxXs]: {
                'margin': '0 -'+(config.gridOuterSpacing)+'px'
            }
        }
    }
    Object.assign(returnObject, temp);
    config.gridWidths.forEach(function(value) {
        const temp = {
            [`.w-`+ Math.floor(value)]: {
                width: `${value}%`
            }
        }
        Object.assign(returnObject, temp);
    });
    config.gridBreakpoints.forEach(function(valueBreakpoint, key) {
        const returnWidth = {};
        config.gridWidths.forEach(function(value) {
            const tempWidth = {
                [`.w-`+ Math.floor(value) + "--" + key]: {
                    width: `${value}%`
                }
            }
            Object.assign(returnWidth, tempWidth);
        });
        const temp = {
            ['@media (max-width: ' + valueBreakpoint + 'px)']: returnWidth
        }
        Object.assign(returnObject, temp);
    });
    if(config.gridBreakpoints.get('xl')){
        const temp = {
            ['@media '+mediaXl]: {
                '.hidden-xl': {
                    'display': 'none'
                }
            }
        }
        Object.assign(returnObject, temp);
    }
    if(config.gridBreakpoints.get('lg')){
        const temp = {
            ['@media '+mediaLg]: {
                '.hidden-lg': {
                    'display': 'none'
                }
            }
        }
        Object.assign(returnObject, temp);
    }
    if(config.gridBreakpoints.get('md')){
        const temp = {
            ['@media '+mediaMd]: {
                '.hidden-md': {
                    'display': 'none'
                }
            }
        }
        Object.assign(returnObject, temp);
    }
    if(config.gridBreakpoints.get('sm')){
        const temp = {
            ['@media '+mediaSm]: {
                '.hidden-sm': {
                    'display': 'none'
                }
            }
        }
        Object.assign(returnObject, temp);
    }
    if(config.gridBreakpoints.get('xs')){
        const temp = {
            ['@media '+mediaXs]: {
                '.hidden-xs': {
                    'display': 'none'
                }
            }
        }
        Object.assign(returnObject, temp);
    }
    return returnObject;
}

module.exports = mixin
