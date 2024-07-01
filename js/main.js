(function($) {
	"use strict";
  
	$(window).stellar({
	  responsive: true,
	  parallaxBackgrounds: true,
	  parallaxElements: true,
	  horizontalScrolling: false,
	  hideDistantElements: false,
	  scrollProperty: 'scroll'
	});
  
	var fullHeight = function() {
	  $('.js-fullheight').css('height', $(window).height());
	  $(window).resize(function() {
		$('.js-fullheight').css('height', $(window).height());
	  });
	};
	fullHeight();
  
	var loader = function() {
	  setTimeout(function() {
		if ($('#ftco-loader').length > 0) {
		  $('#ftco-loader').removeClass('show');
		}
	  }, 1);
	};
	loader();
  
	$.Scrollax();
  
	var burgerMenu = function() {
	  $('.js-colorlib-nav-toggle').on('click', function(event) {
		event.preventDefault();
		var $this = $(this);
  
		if ($('body').hasClass('offcanvas')) {
		  $this.removeClass('active');
		  $('body').removeClass('offcanvas');
		} else {
		  $this.addClass('active');
		  $('body').addClass('offcanvas');
		}
	  });
	};
	burgerMenu();
  
	var mobileMenuOutsideClick = function() {
	  $(document).click(function(e) {
		var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
		  if ($('body').hasClass('offcanvas')) {
			$('body').removeClass('offcanvas');
			$('.js-colorlib-nav-toggle').removeClass('active');
		  }
		}
	  });
  
	  $(window).scroll(function() {
		if ($('body').hasClass('offcanvas')) {
		  $('body').removeClass('offcanvas');
		  $('.js-colorlib-nav-toggle').removeClass('active');
		}
	  });
	};
	mobileMenuOutsideClick();
  
	var carousel = function() {
	  $('.home-slider').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 0,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		nav: false,
		autoplayHoverPause: false,
		items: 1,
		navText: ["<span class='ion-md-arrow-back'></span>", "<span class='ion-chevron-right'></span>"],
		responsive: {
		  0: {
			items: 1
		  },
		  600: {
			items: 1
		  },
		  1000: {
			items: 1
		  }
		}
	  });
  
	  $('.author-slider').owlCarousel({
		autoplay: true,
		loop: true,
		items: 1,
		margin: 30,
		stagePadding: 0,
		nav: true,
		dots: true,
		navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
		responsive: {
		  0: {
			items: 1
		  },
		  600: {
			items: 1
		  },
		  1000: {
			items: 1
		  }
		}
	  });
	};
	carousel();
  
	var contentWayPoint = function() {
	  var i = 0;
	  $('.ftco-animate').waypoint(function(direction) {
		if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
		  i++;
		  $(this.element).addClass('item-animate');
		  setTimeout(function() {
			$('body .ftco-animate.item-animate').each(function(k) {
			  var el = $(this);
			  setTimeout(function() {
				var effect = el.data('animate-effect');
				if (effect === 'fadeIn') {
				  el.addClass('fadeIn ftco-animated');
				} else if (effect === 'fadeInLeft') {
				  el.addClass('fadeInLeft ftco-animated');
				} else if (effect === 'fadeInRight') {
				  el.addClass('fadeInRight ftco-animated');
				} else {
				  el.addClass('fadeInUp ftco-animated');
				}
				el.removeClass('item-animate');
			  }, k * 50, 'easeInOutExpo');
			});
		  }, 100);
		}
	  }, { offset: '95%' });
	};
	contentWayPoint();
  
	var counter = function() {
	  $('#section-counter').waypoint(function(direction) {
		if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
		  var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
		  $('.number').each(function() {
			var $this = $(this),
			  num = $this.data('number');
			console.log(num);
			$this.animateNumber({
			  number: num,
			  numberStep: comma_separator_number_step
			}, 7000);
		  });
		}
	  }, { offset: '95%' });
	}
	counter();
  
	// Function to fetch and display folder content in a lightbox
	function fetchAndDisplayContent(folder) {
	  $.ajax({
		url: 'list_files.php',
		type: 'GET',
		data: { folder: folder },
		success: function(data) {
		  try {
			var files = JSON.parse(data);
			var items = [];
			files.forEach(function(file) {
			  var ext = file.split('.').pop().toLowerCase();
			  var filePath = folder + '/' + file;
			  if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
				items.push({ src: filePath, type: 'image' });
			  } else if (['mp4', 'webm'].includes(ext)) {
				items.push({ 
				  src: `<video controls style="width: 80%; height: auto;"><source src="${filePath}" type="video/${ext}"></video>`, 
				  type: 'inline' 
				});
			  }
			});
  
			if (items.length > 0) {
			  $.magnificPopup.open({
				items: items,
				gallery: { enabled: true },
				type: 'inline'
			  });
			} else {
			  alert('No media files found in the folder.');
			}
		  } catch (e) {
			console.error('Error parsing JSON:', e, data);
			alert('Error loading folder contents.');
		  }
		},
		error: function() {
		  alert('Error loading folder contents.');
		}
	  });
	}
  
	// Event listener for anchor links
	$('.portfolio-wrap a').on('click', function(event) {
	  event.preventDefault();
	  var folder = $(this).attr('href');
	  fetchAndDisplayContent(folder);
	});
  
  })(jQuery);
  