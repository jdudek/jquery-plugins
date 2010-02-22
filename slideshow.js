/*
 * Copyright (c) 2010, Jan Dudek
 * Licensed under MIT license.
 *
 * Usage example:
 *		$("#slides").slideshow({
 *			elems: "> .slide",
 *			nums: "> ul.n",
 *			speed: 1000,
 *			interval: 2500
 *		})
 */
(function($) {
	$.fn.slideshow = function (opt) {
		return this.each(function () {
			var interval = null
			var $this = $(this);
			var elems = $this.find(opt.elems);
			var nums = $this.find(opt.nums);

			if (elems.length < 2) return;
			elems.hide().css({ position: "absolute", top: 0, left: 0 }).addClass("slide")
			     .eq(0).show().addClass("current");
			nums.find("li:first a").addClass("current");

			function switchTo(elem) {
				elems.filter(".current").fadeOut(opt.speed);
				elems.removeClass("current")
				elem.addClass("current").fadeIn(opt.speed);
				nums.find("li a")
					.removeClass("current")
					.filter(function() {
						return $(this).attr("href") == "#" + elem.attr("id")
					})
					.addClass("current")
			}
			function next() {
				var e = elems.filter(".current");
				if (e.next().is(".slide"))
					switchTo(e.next());
				else
					switchTo(elems.filter(":first"));
			}
			function prev() {
				var e = elems.filter(":visible");
				if (e.prev().is(".slide"))
					switchTo(e.prev());
				else
					switchTo(elems.filter(":last"));
			}
			nums.find("li a").click(function() {
				if (interval) clearInterval(interval)
				switchTo($($(this).attr("href")))
				return false
			});
			interval = setInterval(next, opt.interval)
		})
	}
})(jQuery);
