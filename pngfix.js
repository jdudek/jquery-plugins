/**
 *
 * jQuery-Plugin "pngFix"
 * Version: 1.2, 09.03.2009
 * by Andreas Eberhard, andreas.eberhard@gmail.com
 *                      http://jquery.andreaseberhard.de/
 *
 * Copyright (c) 2007 Andreas Eberhard
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php)
 *
 * Modified by Jan Dudek, Oct 2009
 */

(function ($) {
	var fixNeeded = $.browser.msie && parseInt($.browser.version) <= 6

	$.fn.pngFixImage = function () {
		if (!fixNeeded) return this
		return this.each(function () {
			var img = this
			var loader = new Image()
			loader.onload = function () {

				var w = loader.width
				var h = loader.height

				var prevStyle = '';
				var strNewHTML = '';
				var imgId = ($(img).attr('id')) ? 'id="' + $(img).attr('id') + '" ' : '';
				var imgClass = ($(img).attr('class')) ? 'class="' + $(img).attr('class') + '" ' : '';
				var imgTitle = ($(img).attr('title')) ? 'title="' + $(img).attr('title') + '" ' : '';
				var imgAlt = ($(img).attr('alt')) ? 'alt="' + $(img).attr('alt') + '" ' : '';
				var imgAlign = ($(img).attr('align')) ? 'float:' + $(img).attr('align') + ';' : '';
				var imgHand = ($(img).parent().attr('href')) ? 'cursor:hand;' : '';
				if (img.style.border) {
					prevStyle += 'border:'+img.style.border+';';
					img.style.border = '';
				}
				if (img.style.padding) {
					prevStyle += 'padding:'+img.style.padding+';';
					img.style.padding = '';
				}
				if (img.style.margin) {
					prevStyle += 'margin:'+img.style.margin+';';
					img.style.margin = '';
				}
				var imgStyle = (img.style.cssText);

				strNewHTML += '<span '+imgId+imgClass+imgTitle+imgAlt;
				strNewHTML += 'style="white-space:pre-line;display:inline-block;background:transparent;'+imgAlign+imgHand;
				strNewHTML += 'width:' + w + 'px;' + 'height:' + h + 'px;';
				strNewHTML += 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + $(img).attr('src') + '\', sizingMethod=\'scale\');';
				strNewHTML += imgStyle+'"></span>';
				if (prevStyle != ''){
					strNewHTML = '<span style="display:inline-block;'+prevStyle+imgHand+'width:' + $(img).width() + 'px;' + 'height:' + $(img).height() + 'px;'+'">' + strNewHTML + '</span>';
				}

				$(img).hide();
				$(img).after(strNewHTML);
			}
			loader.src = $(img).attr('src')
		})
	}
	
	$.fn.pngFixInput = function (settings) {
		if (!fixNeeded) return this
		return this.each(function () {
			var bgIMG = $(this).attr('src');
			$(this).get(0).runtimeStyle.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + bgIMG + '\', sizingMethod=\'scale\');';
	   		$(this).attr('src', settings.blank)
		})
	}
	
	$.fn.pngFix = function (settings) {
		if (!fixNeeded) return this
		settings = $.extend({ blank: 'blank.gif' }, settings);
		return this.each(function () {
			$(this).find("img[src$=.png]").pngFixImage()
			$(this).find("input[src$=.png]").pngFixInput(settings)
		})
	}

})(jQuery);

