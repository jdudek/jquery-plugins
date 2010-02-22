/*
 * Copyright (c) 2010, Jan Dudek
 * Licensed under MIT license.
 *
 * Usage example:
 * var totalWidth = $("#list li").reduce(0, function (r) { return r + $(this).outerWidth(true) })
 */
jQuery.fn.reduce = function (c, fn) {
	this.each(function (i) { c = fn.apply(this, [c]) })
	return c
}
