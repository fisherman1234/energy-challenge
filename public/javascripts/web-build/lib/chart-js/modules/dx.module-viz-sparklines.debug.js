if(!DevExpress.MOD_VIZ_SPARKLINES){if(!window.DevExpress)throw Error("Required module is not referenced: core");if(!DevExpress.MOD_VIZ_CORE)throw Error("Required module is not referenced: viz-core");(function(e,t){var n=t.viz.charts,r=100,i=10,s=6,o=200,u=1e3,a=Math,f=e.extend,l=setTimeout,c=clearTimeout,h=a.abs,p=String,d=Number,v=a.round,m=t.viz.core;t.viz.sparklines={},t.viz.sparklines.BaseSparkline=t.ui.Component.inherit({render:function(){return this._refresh(),this},_rendererType:t.viz.renderers.Renderer,_clean:function(){this._tooltipShown&&(this._tooltip.dispose(),this._tooltip=null,this._tooltipShown=null,this._tooltipGroup.clear()),this._tooltipContainer.detach(),this._cleanWidgetElements()},_optionChanged:function(e,t){if(e==="size"&&this._allOptions){this._clean(),this._canvas=this._calculateCanvas(),this._renderer.resize(this._canvas.width,this._canvas.height);if(!this._isContainerVisible())return;this._allOptions.size=t,this._redrawWidgetElements(),this._prepareTooltipContainer()}else e==="dataSource"?this._refreshDataSource():(this._invalidate(),this.callBase.apply(this,arguments))},_init:function(){this._renderer=new this._rendererType({cssClass:this._widgetClass+" "+this._widgetClass+"-"+this._widgetType}),this._renderer.recreateCanvas(1,1),this._createHtmlElements(),this._createTooltipGroups(),this._initTooltipEvents(),this._drawContainer()},_dispose:function(){this.callBase(),this._disposeWidgetElements(),this._disposeTooltipEvents(),this._renderer.killContainer(),this._tooltipRenderer.killContainer(),delete this._renderer,delete this._tooltipRenderer,delete this._tooltipTrackerGroup,delete this._tooltipGroup,delete this._tooltipContainer},_render:function(){this._canvas=this._calculateCanvas(),this._renderer.resize(this._canvas.width,this._canvas.height);if(!this._isContainerVisible())return;this._prepareOptions(),this._createWidgetElements(),this._drawWidgetElements()},_isContainerVisible:function(){var e=this,t=e._canvas,n=t.width-t.left-t.right>0,r=t.height-t.top-t.bottom>0;return t.height&&t.width&&r&&n},_createWidgetElements:function(){this._createRange(),this._createTranslator()},_prepareOptions:function(e){var t=this,n=t.option()||{},r,i,s;return i=m.findTheme("default"),i=i[this._widgetType],r=f(!0,{},e,n),typeof r.theme=="string"?(s=m.findTheme(r.theme),s=s[this._widgetType]):s=r.theme,f(!0,{},i,s,r)},_calculateCanvas:function(){var e=this,t={},n=e.option("size")||{},r=e.option("margin")||{},i=e._defaultSize,s=e._element(),o=n.width>=0?d(n.width):s.width(),u=n.height>=0?d(n.height):s.height();return!o&&d(n.width)!==0&&(o=i.width),!u&&d(n.height)!==0&&(u=i.height),{width:o,height:u,top:d(r.top)||i.top,bottom:d(r.bottom)||i.bottom,left:d(r.left)||i.left,right:d(r.right)||i.right}},_createTooltipGroups:function(){var t=this,n,r,i=t._widgetClass;t._tooltipRenderer=n=new t._rendererType({cssClass:i+" "+i+"-tooltip"}),n.recreateCanvas(1,1),t._tooltipContainer=e('<div style="position: relative">'),n.draw(t._tooltipContainer[0]),r=n.getRoot(),t._tooltipGroup=n.createGroup({"class":i+"-tooltip-group",style:{"z-index":"1"}}).append(r),t._tooltipTrackerGroup=n.createGroup({"class":i+"-tooltip-tracker-group"}).append(r),t._tooltipTracker=t._createTooltipTracker().append(t._tooltipTrackerGroup)},_createTooltipTracker:function(){return this._tooltipRenderer.createRect(0,0,0,0,0,{fill:"grey",opacity:0})},_initTooltipEvents:function(){var e=this,t={widget:e,container:e._tooltipTracker};e._showTooltipCallback=function(){e._showTooltipTimeout=null,e._tooltipShown||(e._tooltipShown=!0,e._showTooltip()),e._DEBUG_showCallback&&e._DEBUG_showCallback()},e._hideTooltipCallback=function(){e._hideTooltipTimeout=null,e._tooltipShown&&(e._tooltipShown=!1,e._hideTooltip()),e._DEBUG_hideCallback&&e._DEBUG_hideCallback()},e._disposeCallbacks=function(){e=e._showTooltipCallback=e._hideTooltipCallback=e._disposeCallbacks=null},e._tooltipTracker.on(y,t).on(N,t),e._tooltipTracker.on(g)},_disposeTooltipEvents:function(){c(this._showTooltipTimeout),c(this._hideTooltipTimeout),this._showTooltipTimeout=this._showTooltipTimeout=null,this._tooltipTracker.off(),this._disposeCallbacks()},_drawContainer:function(){this._renderer.draw(this._element()[0])},_createTranslator:function(){this._translator=new m.Translator2D(this._range,this._canvas)},_prepareTooltipOptions:function(){var t=this,n=t._canvas,r=t._allOptions.tooltip,i=t._getTooltipText(),o=t._getTooltipSize(!0),u={canvasWidth:o.width,canvasHeight:o.height,paddingLeftRight:r.paddingLeftRight,paddingTopBottom:r.paddingTopBottom,arrowLength:r.arrowLength,cloudHorizontalPosition:r.horizontalAlignment,cloudVerticalPosition:r.verticalAlignment,lineSpacing:r.font.lineSpacing!==undefined&&r.font.lineSpacing!==null?r.font.lineSpacing:s},a=e.extend(u,t._allOptions.tooltip);t._tooltipOptions={text:i,size:o,options:a}},_getTooltipText:function(){var e=this,t=e._allOptions.tooltip.customizeText,n=e._getTooltipData(),r,i;return typeof t=="function"?(i=t.call(n,n),i!==undefined&&i!==null&&i!==""?r=p(i):r=null,e._allOptions.tooltip._justify&&(r=r.split("<br/>"))):(r=this._getDefaultTooltipText(n),e._allOptions.tooltip._justify=!0),r},_prepareTooltipContainer:function(){var e=this,t=e._canvas,n=t.width,r=t.height,i=e._tooltipRenderer;e._updateTooltipSizeToNormal(),e._tooltipTracker.applySettings({width:n,height:r}),e._tooltipContainer.appendTo(e._element()),e._tooltipInitializated=!1,e._canShowTooltip=e._allOptions.tooltip.enabled},_isTooltipVisible:function(){var e=this,t=e._allOptions.tooltip.enabled,n=e._tooltipOptions.text!==null,r;return e._widgetType==="sparkline"?r=e._dataSource.length!==0:r=!0,t&&n&&r},_createTooltip:function(){var e=this,r,i,s;e._prepareTooltipOptions(),r=e._allOptions.tooltip._justify,i=r?t.viz.sparklines.SparklineTooltip:n.Tooltip,e._tooltip=s=new i({renderer:e._tooltipRenderer},e._tooltipGroup),e._isTooltipVisible()?(s.update(e._tooltipOptions.options),s.draw(),e._updateTooltipSizeToWide(),e._checkTooltipSize(),e._updateTooltipSizeToNormal(),s.cloud.applySettings({opacity:e._allOptions.tooltip.opacity})):e._canShowTooltip=!1},_doShowTooltip:function(e){var t=this;if(!t._canShowTooltip)return;++t._DEBUG_clearHideTooltipTimeout,c(t._hideTooltipTimeout),t._hideTooltipTimeout=null,c(t._showTooltipTimeout),++t._DEBUG_showTooltipTimeoutSet,t._showTooltipTimeout=l(t._showTooltipCallback,e)},_doHideTooltip:function(e){var t=this;if(!t._canShowTooltip)return;++t._DEBUG_clearShowTooltipTimeout,c(t._showTooltipTimeout),t._showTooltipTimeout=null,c(t._hideTooltipTimeout),++t._DEBUG_hideTooltipTimeoutSet,t._hideTooltipTimeout=l(t._hideTooltipCallback,e)},_getNormalTooltipSize:function(){var e={};return e.width=this._canvas.width,e.left=0,e.tooltipLeft=v(e.width/2),e},_getWideTooltipSize:function(e,t){var n=this,r=n._canvas,i=n._allOptions.tooltip.horizontalAlignment,s=e+t,o={};return o.width=r.width+s,o.left=-e,i==="right"?o.tooltipLeft=v(r.width/2):i==="left"?o.tooltipLeft=v(r.width/2)+s:o.tooltipLeft=v(o.width/2),o},_getTooltipSize:function(e,t,n,s){var o=this,u=o._canvas,a=o._allOptions.tooltip.verticalAlignment!=="bottom",f=!e&&(t||n)?o._getWideTooltipSize(t,n):o._getNormalTooltipSize(),l=s>0?s+r:r;return f.height=u.height+l,f.top=a?-f.height:-u.height,f.trackerY=a?l:0,f.tooltipY=a?v(u.height/2)+l-i:v(u.height/2),f},_checkTooltipSize:function(){var e=this,t=e._tooltipOptions.options,n=t.paddingLeftRight,i=t.paddingTopBottom,s=e._tooltip.text.getBBox(),o=s.x-n,u=o+s.width+2*n,a=s.height+2*i,f=e._allOptions.tooltip.allowContainerResizing,l=-o,c=u-e._canvas.width,h=a-r,p;if(l>0||c>0||h>0)f?(e._tooltipOptions.size=p=e._getTooltipSize(!1,l>0?l:0,c>0?c:0,h>0?h:0),e._tooltipOptions.options.canvasWidth=p.width,e._tooltipOptions.options.canvasHeight=p.height,e._tooltip.update(e._tooltipOptions.options),e._updateTooltipSizeToWide()):e._canShowTooltip=!1},_updateTooltipSizeToWide:function(){var e=this,t=e._tooltipOptions.size,n=e._tooltipRenderer;n.resize(t.width,t.height),n.getRoot().applySettings({style:{left:t.left,top:t.top,position:"absolute"}}),e._tooltipTracker.applySettings({y:t.trackerY,x:-t.left}),e._tooltip.move(t.tooltipLeft,t.tooltipY,0,e._tooltipOptions.text)},_updateTooltipSizeToNormal:function(){var e=this,t=e._tooltipRenderer,n=e._canvas;t.resize(n.width,n.height),t.getRoot().applySettings({style:{left:0,top:-n.height,position:"absolute"}}),e._tooltipTracker.applySettings({y:0,x:0})},_showTooltip:function(){if(!this._tooltipInitializated){this._createTooltip(),this._tooltipInitializated=!0;if(!this._canShowTooltip)return}this._updateTooltipSizeToWide(),this._tooltip.show()},_hideTooltip:function(){this._updateTooltipSizeToNormal(),this._tooltip.hide()}}).include(m.widgetMarkupMixin);var g={"contextmenu.sparkline-tooltip":function(e){(t.ui.events.isTouchEvent(e)||t.ui.events.isPointerEvent(e))&&e.preventDefault()},"MSHoldVisual.sparkline-tooltip":function(e){e.preventDefault()}},y={"mouseover.sparkline-tooltip":function(e){T=!1;var t=e.data.widget;t._x=e.pageX,t._y=e.pageY,t._tooltipTracker.off(b).on(b,e.data),t._doShowTooltip(o)},"mouseout.sparkline-tooltip":function(e){if(T)return;var t=e.data.widget;t._tooltipTracker.off(b),t._doHideTooltip(o)}},b={"mousemove.sparkline-tooltip":function(e){var t=e.data.widget;t._showTooltipTimeout&&(h(t._x-e.pageX)>3||h(t._y-e.pageY)>3)&&(t._x=e.pageX,t._y=e.pageY,t._doShowTooltip(o))}},w=null,E=function(e){e.preventDefault();var t=w;t&&t!==e.data.widget&&t._doHideTooltip(o),t=w=e.data.widget,t._doShowTooltip(u),t._touch=!0},S=function(){var e=w;e&&(e._touch||(e._doHideTooltip(o),w=null),e._touch=null)},x=function(){var e=w;e&&e._showTooltipTimeout&&(e._doHideTooltip(o),w=null)},T=!1,N={"pointerdown.sparkline-tooltip":function(e){E(e)},"touchstart.sparkline-tooltip":function(e){E(e)}};e(document).on({"pointerdown.sparkline-tooltip":function(){T=!0,S()},"touchstart.sparkline-tooltip":function(){S()},"pointerup.sparkline-tooltip":function(){x()},"touchend.sparkline-tooltip":function(){x()}}),t.viz.sparklines.BaseSparkline._DEBUG_reset=function(){w=null}})(jQuery,DevExpress),function(e,t){var n=t.viz.charts,r=1,i=50,s=4,o=250,u=30,a=5,f=3,l="dxsl-first-last-points",c="dxsl-min-point",h="dxsl-max-point",p="dxsl-positive-points",d="dxsl-negative-points",v={theme:"default",dataSource:[],size:{},margin:{},type:"line",argumentField:"arg",valueField:"val",winlossThreshold:0,showFirstLast:!0,showMinMax:!1},m={line:!0,spline:!0,stepline:!0,area:!0,steparea:!0,splinearea:!0,bar:!0,winloss:!0},g=e.map,y=e.extend,b=Math.abs,w=Math.round,E=isFinite,S=Number,x=String,T=t.formatHelper;t.viz.sparklines.Sparkline=t.viz.sparklines.BaseSparkline.inherit({_widgetType:"sparkline",_widgetClass:"dxsl",_defaultSize:{width:o,height:u,left:a,right:a,top:f,bottom:f},_init:function(){this.callBase(),this._refreshDataSource()},_handleDataSourceChanged:function(){this._initialized&&(this._clean(),this._createWidgetElements(),this._drawWidgetElements())},_dataSourceOptions:function(){return{paginate:!1,_preferSync:!0}},_redrawWidgetElements:function(){this._createTranslator(),this._correctPoints(),this._series.draw(this._translator),this._seriesGroup.append(this._renderer.getRoot())},_disposeWidgetElements:function(){delete this._seriesGroup,delete this._seriesLabelGroup},_cleanWidgetElements:function(){this._seriesGroup.detach(),this._seriesLabelGroup.detach(),this._seriesGroup.clear(),this._seriesLabelGroup.clear()},_createWidgetElements:function(){this._createSeries(),this.callBase()},_drawWidgetElements:function(){this._dataSource&&this._dataSource.isLoaded()&&this._drawSeries()},_prepareOptions:function(){this._allOptions=this.callBase(v),this._allOptions.type=x(this._allOptions.type).toLowerCase(),m[this._allOptions.type]||(this._allOptions.type="line")},_createHtmlElements:function(){this._seriesGroup=this._renderer.createGroup({"class":"dxsl-series"}),this._seriesLabelGroup=this._renderer.createGroup({"class":"dxsl-series-labels"})},_createSeries:function(){var e=this,t=e._renderer,r;e._prepareDataSource(),e._prepareSeriesOptions(),e._series=n.factory.createSeries(e._seriesOptions.type,t,e._seriesOptions),r=n.factory.createDataValidator(e._simpleDataSource,[[e._series]],null,{checkTypeForAllData:!1,convertToAxisDataType:!0,sortingMethod:!0}),e._simpleDataSource=r.validate(),e._series.options.customizePoint=e._getCustomizeFunction(),e._series.reinitData(e._simpleDataSource)},_parseNumericDataSource:function(e,t,n){return g(e,function(e,r){var i=null,s;return e!==undefined&&(i={},s=E(e),i[t]=s?x(r):e[t],i[n]=s?S(e):S(e[n]),i=i[t]!==undefined&&i[n]!==undefined?i:null),i})},_parseWinlossDataSource:function(e,t,n){var r=-1,i=0,s=1,o=1e-4,u=this._allOptions.winlossThreshold;return g(e,function(e){var a={};return a[t]=e[t],b(e[n]-u)<o?a[n]=i:e[n]>u?a[n]=s:a[n]=r,a})},_prepareDataSource:function(){var e=this,t=e._allOptions,n=t.argumentField,r=t.valueField,i=e._dataSource?e._dataSource.items():[],s=e._parseNumericDataSource(i,n,r);t.type==="winloss"?(e._winlossDataSource=s,e._simpleDataSource=e._parseWinlossDataSource(s,n,r)):e._simpleDataSource=s},_prepareSeriesOptions:function(){var e=this,t=e._allOptions,n={border:{},hoverStyle:{border:{}},selectionStyle:{border:{}}},r={size:t.pointSize,symbol:t.pointSymbol,border:{visible:!0,width:2},color:t.pointColor};e._seriesOptions={argumentField:t.argumentField,valueField:t.valueField,color:t.lineColor,width:t.lineWidth},e._seriesOptions.type=t.type==="winloss"?"bar":t.type;if(t.type==="winloss"||t.type==="bar")e._seriesOptions.argumentAxisType="discrete";e._seriesOptions.seriesGroup=e._seriesGroup,e._seriesOptions.seriesLabelsGroup=e._seriesLabelGroup,e._seriesOptions.point=y(n,r),e._seriesOptions.point.visible=!1,e._seriesOptions.border={color:e._seriesOptions.color,width:e._seriesOptions.width,visible:!0}},_createBarCustomizeFunction:function(e){var t=this,n=t._allOptions,r=t._winlossDataSource;return function(){var t=this.index,i=n.type==="winloss",s=i?n.winlossThreshold:0,o=i?r[t][n.valueField]:this.value,u=i?n.winColor:n.barPositiveColor,a=i?n.lossColor:n.barNegativeColor,f;o>=s?f=u:f=a;if(t===e.first||t===e.last)f=n.firstLastColor;return t===e.min&&(f=n.minColor),t===e.max&&(f=n.maxColor),{color:f}}},_createLineCustomizeFunction:function(e){var t=this,n=t._allOptions;return function(){var t,r=this.index;if(r===e.first||r===e.last)t=n.firstLastColor;return r===e.min&&(t=n.minColor),r===e.max&&(t=n.maxColor),t?{visible:!0,border:{color:t}}:{}}},_getCustomizeFunction:function(){var e=this,t=e._allOptions,n=e._winlossDataSource||e._simpleDataSource,r=e._getExtremumPointsIndexes(n),i;return t.type==="winloss"||t.type==="bar"?i=e._createBarCustomizeFunction(r):i=e._createLineCustomizeFunction(r),i},_getExtremumPointsIndexes:function(e){var t=this,n=t._allOptions,r=e.length-1,i={};return t._minMaxIndexes=t._findMinMax(e),n.showFirstLast&&(i.first=0,i.last=r),n.showMinMax&&(i.min=t._minMaxIndexes.minIndex,i.max=t._minMaxIndexes.maxIndex),i},_findMinMax:function(e){var t=this,n=t._allOptions.valueField,r=e[0]||{},i=r[n]||0,s=i,o=i,u=0,a=0,f=e.length,l,c;for(c=1;c<f;c++)l=e[c][n],l<s&&(s=l,u=c),l>o&&(o=l,a=c);return{minIndex:u,maxIndex:a}},_createRange:function(){var e=this,t=e._series,r=t.type==="bar",i=.15,s=r?.1:0,o={stickX:!r&&t.points.length>1,keepValueMarginsY:!0,minValueMarginY:i,maxValueMarginY:i,minValueMarginX:s,maxValueMarginX:s};e._range=new n.Range(o),e._range.getBoundRange(t.getRangeData()),e._range.applyValueMargins()},_getBarWidth:function(e){var t=this,n=t._canvas,o=e*s,u=n.width-n.left-n.right-o,a=w(u/e);return a<r&&(a=r),a>i&&(a=i),a},_preparePointsClasses:function(){var t=this,n=t._allOptions,r=n.type==="bar",i=r||n.type==="winloss",s=t._series.getAllPoints(),o=0,u=s.length-1,a=t._minMaxIndexes.minIndex,f=t._minMaxIndexes.maxIndex,v=r?0:n.winlossThreshold,m="";i&&(m=" dxsl-bar-point",e.each(s,function(e,t){var n;t.value>=v?n=p:n=d,s[e].options.attributes["class"]=n})),n.showFirstLast&&(s[o].options.attributes["class"]=l+m,s[u].options.attributes["class"]=l+m),n.showMinMax&&(s[a].options.attributes["class"]=c+m,s[f].options.attributes["class"]=h+m)},_correctPoints:function(){var e=this,t=e._allOptions.type,n=e._series.getPoints(),r=n.length,i,s;if(t==="bar"||t==="winloss"){i=e._getBarWidth(r);for(s=0;s<r;s++)n[s].correctCoordinates({width:i,offset:0})}},_drawSeries:function(){var e=this;e._simpleDataSource.length!==0&&(e._correctPoints(),e._series._segmentPoints(),e._series.styles.area&&(e._series.styles.area.opacity=e._allOptions.areaOpacity),e._preparePointsClasses(),e._series.createPatterns=function(){},e._series.draw(e._translator),e._seriesGroup.append(e._renderer.getRoot()),e._prepareTooltipContainer())},_getTooltipData:function(){var e=this,t=e._allOptions,n=t.tooltip.format,r=t.tooltip.precision,i=e._winlossDataSource||e._simpleDataSource;if(i.length===0)return{};var s=e._minMaxIndexes,o=t.valueField,u=i[0][o],a=i[i.length-1][o],f=i[s.minIndex][o],l=i[s.maxIndex][o],c=T.format(u,n,r),h=T.format(a,n,r),p=T.format(f,n,r),d=T.format(l,n,r),v={firstValue:c,lastValue:h,minValue:p,maxValue:d,originalFirstValue:u,originalLastValue:a,originalMinValue:f,originalMaxValue:l};return t.type==="winloss"&&(v.originalThresholdValue=t.winlossThreshold,v.thresholdValue=T.format(t.winlossThreshold,n,r)),v},_getDefaultTooltipText:function(e){return["Start:",e.firstValue,"End:",e.lastValue,"Min:",e.minValue,"Max:",e.maxValue]}}).include(t.ui.DataHelperMixin)}(jQuery,DevExpress),function(e,t,n){var r=15,i=Math.max,s=Math.round;t.viz.sparklines.SparklineTooltip=t.viz.charts.Tooltip.inherit({_createTextContent:function(){return this._textGroup=this.renderer.createGroup(),this._textGroup},dispose:function(){this._tooltipTextArray=null,this._textGroup=null,this.callBase()},_checkWidthText:function(){},_getTextContentParams:function(){var e=this,t,n,r,i=e.tooltipText,s=i.length,o={width:[],height:[]};e._tooltipTextArray=[];for(t=0;t<s;t++)n=e.renderer.createText(i[t],0,0,e.textStyle).append(this._textGroup),e._tooltipTextArray.push(n),r=n.getBBox(),o.width.push(r.width);return e._lineHeight=-2*r.y-r.height,o},_calculateTextContent:function(){var e=this,t=e.tooltipText,n=t.length,s,o,u=[],a=[],f=[],l;s=e._getTextContentParams();for(l=0;l<n;l+=2)s.width[l+1]?o=s.width[l]+r+s.width[l+1]:o=s.width[l],f.push(o);e._textContentWidth=i.apply(null,f)},_locateTextContent:function(e,t,n){var r=this,i=r._tooltipTextArray.length,o=r._textContentWidth,u=r.options.lineSpacing,a=u>0?u+r._lineHeight:r._lineHeight,f=t,l,c,h;n==="left"?l=e:n==="right"?l=e-o:l=s(e-o/2),c=l+o;for(h=i-1;h>=0;h-=2)r._tooltipTextArray[h].applySettings({x:c,y:f,align:"right"}),r._tooltipTextArray[h-1]&&r._tooltipTextArray[h-1].applySettings({x:l,y:f,align:"left"}),f-=a},_updateTextContent:function(){this._textGroup.clear(),this._calculateTextContent(),this._locateTextContent(0,0,"center")},_correctYTextContent:function(e){this._locateTextContent(0,e,"center");var t=this._textGroup.getBBox();return e-(t.y+t.height-e)},_adjustTextContent:function(e){this._locateTextContent(e.text.x,e.text.y,e.text.align)}})}(jQuery,DevExpress),function(e,t){var n=t.viz.charts,r=.02,i=.98,s=.1,o=.9,u=300,a=30,f=1,l=2,c={theme:"default",size:{},margin:{}},h=t.formatHelper,p=String,d=Number,v=Math.round,m=isFinite;t.viz.sparklines.Bullet=t.viz.sparklines.BaseSparkline.inherit({_widgetType:"bullet",_widgetClass:"dxb",_defaultSize:{width:u,height:a,left:f,right:f,top:l,bottom:l},_disposeWidgetElements:function(){delete this._zeroLevelPath,delete this._targetPath,delete this._barValuePath},_redrawWidgetElements:function(){this._createTranslator(),this._drawBarValue(),this._drawTarget(),this._drawZeroLevel()},_cleanWidgetElements:function(){this._zeroLevelPath.detach(),this._targetPath.detach(),this._barValuePath.detach()},_drawWidgetElements:function(){this._drawBullet()},_createHtmlElements:function(){var e=this._renderer;this._zeroLevelPath=e.createPath(undefined,{"class":"dxb-zero-level"}),this._targetPath=e.createPath(undefined,{"class":"dxb-target"}),this._barValuePath=e.createPath(undefined,{"class":"dxb-bar-value"})},_prepareOptions:function(){var e=this,t,n,r,i,s,o;e._allOptions=t=e.callBase(c),e._allOptions.value===undefined&&(e._allOptions.value=0),e._allOptions.target===undefined&&(e._allOptions.target=0),t.value=s=d(t.value),t.target=o=d(t.target),e._allOptions.startScaleValue===undefined&&(e._allOptions.startScaleValue=o<s?o:s,e._allOptions.startScaleValue=e._allOptions.startScaleValue<0?e._allOptions.startScaleValue:0),e._allOptions.endScaleValue===undefined&&(e._allOptions.endScaleValue=o>s?o:s),t.startScaleValue=n=d(t.startScaleValue),t.endScaleValue=r=d(t.endScaleValue),r<n&&(i=r,e._allOptions.endScaleValue=n,e._allOptions.startScaleValue=i,e._allOptions.inverted=!0)},_createRange:function(){var e=this,t=e._allOptions;e._range={invertX:t.inverted,minX:t.startScaleValue,maxX:t.endScaleValue,minY:0,maxY:1}},_drawBullet:function(){var e=this,t=e._allOptions,n=t.startScaleValue!==t.endScaleValue,r=m(t.startScaleValue),i=m(t.endScaleValue),s=m(t.value),o=m(t.target);n&&i&&r&&o&&s&&(this._drawBarValue(),this._drawTarget(),this._drawZeroLevel(),this._prepareTooltipContainer())},_getTargetParams:function(){var e=this,t=e._allOptions,n=e._translator,s=n.translateY(r),o=n.translateY(i),u=n.translateX(t.target),a=[{x:u,y:s},{x:u,y:o}];return{points:a,stroke:t.targetColor,strokeWidth:t.targetWidth}},_getBarValueParams:function(){var e=this,t=e._allOptions,n=e._translator,r=t.startScaleValue,i=t.endScaleValue,u=t.value,a=n.translateY(s),f=n.translateY(o),l,c;return u>0?(l=r<=0?0:r,c=u>=i?i:u):(l=i>=0?0:i,c=u>=r?u:r),l=n.translateX(l),c=n.translateX(c),{points:[{x:l,y:f},{x:c,y:f},{x:c,y:a},{x:l,y:a}],fill:t.color}},_getZeroLevelParams:function(){var e=this,t=e._allOptions,n=e._translator,s=n.translateY(r),o=n.translateY(i),u=n.translateX(0);return{points:[{x:u,y:s},{x:u,y:o}],stroke:t.targetColor,strokeWidth:1}},_drawZeroLevel:function(){var e=this,t=e._allOptions,n;if(0>t.endScaleValue||0<t.startScaleValue||!t.showZeroLevel)return;n=e._getZeroLevelParams(),e._zeroLevelPath.applySettings(n),e._zeroLevelPath.append(e._renderer.getRoot())},_drawTarget:function(){var e=this,t=e._allOptions,n=t.target,r=t.startScaleValue,i=t.endScaleValue,s;if(n>i||n<r||!t.showTarget)return;s=e._getTargetParams(),e._targetPath.applySettings(s),e._targetPath.append(e._renderer.getRoot())},_drawBarValue:function(){var e=this,t=e._getBarValueParams();e._barValuePath.applySettings(t),e._barValuePath.append(e._renderer.getRoot())},_getTooltipData:function(){var e=this,t=e._allOptions,n=t.tooltip.format,r=t.tooltip.precision,i=t.valueField,s=t.value,o=t.target,u=h.format(s,n,r),a=h.format(o,n,r);return{originalValue:s,originalTarget:o,value:u,target:a}},_getDefaultTooltipText:function(e){return["Actual Value:",e.value,"Target Value:",e.target]},_getNormalTooltipSize:function(){var e={},t=this._barValuePath.getBBox();return e.width=this._canvas.width,e.left=0,e.tooltipLeft=t.x+v(t.width/2),e},_getWideTooltipSize:function(e,t){var n=this,r=n._barValuePath.getBBox(),i=n._allOptions.tooltip.horizontalAlignment,s={};return s.width=e+t+n._canvas.width,s.left=-e,i==="right"?s.tooltipLeft=r.x+v(r.width/2):i==="left"?s.tooltipLeft=v(r.width/2)+e+t+r.x:s.tooltipLeft=v(r.width/2)+r.x+e,s}})}(jQuery,DevExpress),function(e,t,n){var r=t.ui,i=t.viz;r.registerComponent("dxSparkline",i.sparklines.Sparkline)}(jQuery,DevExpress),function(e,t,n){var r=t.ui,i=t.viz;r.registerComponent("dxBullet",i.sparklines.Bullet)}(jQuery,DevExpress),DevExpress.MOD_VIZ_SPARKLINES=!0};