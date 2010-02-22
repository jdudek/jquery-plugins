/*
 * Copyright (c) 2010, Jan Dudek
 * Licensed under MIT license.
 *
 * Usage example:
 * $(function () { $("input[type=text]").placeholder(); })
 */
(function ($) {
	var html5 = ("placeholder" in document.createElement("input"))
	$.fn.placeholder = function () {
		return this.each(function () {
			if (!html5) {
				if ($(this).val() == "") $(this).val($(this).attr("placeholder"))
				$(this).focus(function () {
					if ($(this).val() == $(this).attr("placeholder")) $(this).val("")
				})
				$(this).blur(function () {
					if ($(this).val() == "") $(this).val($(this).attr("placeholder"))
				})
			}
		})
	}
})(jQuery);
