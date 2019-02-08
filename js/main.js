$(document).ready(function(){
	$('.main-header__icon-menu-bars').click(function(){
		$('.main-header').toggleClass('open-block');
	});

	// $('.main-portfolio__category-item').click(function(){
	// 	event.preventDefault();
	// 	$(".main-portfolio__category-item.active").removeClass('active');
	// 	$(this).addClass('active');
	// 	initCurentCategory();
	// });

	$('.main-portfolio__category-item').click(function(){
		event.preventDefault();
		var thisEl = $(this);
		$(".main-portfolio__category-item.active").removeClass('active');
		thisEl.addClass('active');
		initCurentCategory(thisEl);
	});

	$('.main-portfolio__subcategory-item').click(function(){
		event.preventDefault();
		var thisEl = $(this);
		thisEl.parents('.main-portfolio__subcategory-list').find('.active').removeClass('active');
		thisEl.addClass('active');
		initCurentCategory(thisEl);
	});

	initCurentCategory($('.main-portfolio__category-item.active'));
});

function initCurentCategory(thisEl){
	var slider = $('.main-portfolio__photos'),
		cat = $('.main-portfolio__category-item'),
		sub = $('.main-portfolio__subcategory-list'),
		photosList;

	if(thisEl.hasClass('main-portfolio__category-item')) {
		var curIndex = thisEl.parent().index(),
			dataTitle = thisEl.parent().attr('data-title'),
			dataDscr = thisEl.parent().attr('data-dscr'),
			blkName = $('.main-portfolio__blc-name');

		blkName.find('.main-portfolio__title span').text(dataTitle);
		blkName.find('.main-portfolio__subtitle').text(dataDscr);

		sub.hide().removeClass('active-sub');
		var curentSub = $('.main-portfolio__subcategory-list:eq('+curIndex+')');
		curentSub.show().addClass('active-sub');
		if(!curentSub.find('.active').length) {
			curentSub.find('li:eq(1) a').addClass('active');
		}
	}

	if(slider.hasClass('slick-initialized')){
		slider.slick('unslick');
		slider.find('> div').remove();
		slider.hide();

		$.getJSON("json/data.json", function(json) {
			var curentPhotosId = sub.parent().find('.active-sub .active').attr('data-photos');
			var curentPics = json[curentPhotosId];
				counth = curentPics.length;

			for(var i = 0; i < counth; i++) {
				slider.append('<div><img src="' + curentPics[ i ] + '" alt=""></div>');
			}

			slider.fadeIn();
			
			slider.slick({
				// autoplay:true,
				dots:true
			});
		});
	} else {
		slider.slick({
			// autoplay:true,
			dots:true
		});
	}

};