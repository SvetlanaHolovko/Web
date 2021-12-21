$(function () {

	var header = $("#header"),
		// переменная с высотой блока intro
		introH = $("#intro").innerHeight(),
		// текущий скрол при загрузке страницы
		scrollOffset = $(window).scrollTop();

	/* Fixed Header*/
	checkScroll(scrollOffset);

	// скролим страницу
	$(window).on("scroll resize", function () {
		// обновляем значение скрола на сколько проскролили
		scrollOffset = $(this).scrollTop();
		// передаем в функцию новое значение
		checkScroll(scrollOffset);
	});

	function checkScroll(scrollOffset) {
		// если высота скрола > intro, то header.fixed
		if (scrollOffset >= introH) {
			header.addClass("fixed");
		} else {
			header.removeClass("fixed");
		}
	}

	/* Smooth scroll */
	$("[data-scroll]").on("click", function (event) {
		event.preventDefault();
		// получаем значение id из data-scroll
		var $this = $(this),
			blockId = $this.data('scroll'),
			// получаем позицию элемента от верха страницы
			blockOffset = $(blockId).offset().top;
		// убираем класс у неактивных ссылок
		$("#nav a").removeClass("active");
		// придаем нашей ссылке класс active
		$this.addClass("active");
		// плавно переходим на страницу
		$("html, body").animate({
			scrollTop: blockOffset - 49
		}, 700);
	})
});

/* Бургер-меню */
const burgerMenu = document.querySelector(".header__burger");
const menuHeader = document.querySelector(".header__menu");
if (burgerMenu) {
	burgerMenu.addEventListener("click", function (e) {
		document.body.classList.toggle("lock");
		burgerMenu.classList.toggle("active");
		menuHeader.classList.toggle("active");
	});
}

/*========== ПЛАН ===========*/
/*
1. Сверстать слайдер - готово
2. Сделать переключение фотографий влево и вправо - готово
3. Сделать переключение фото по клику на нижнее фото - готово
4. При клике на большую картинку - увеличивать картинку
*/

var images = [
	"1.jpg",
	"2.jpg",
	"3.jpg",
	"4.jpg",
	"5.jpg",
	"6.jpg",
	"7.jpg",
	"8.jpg"
];

// Путь к картинке слайдера
var path = "img/sliders/";
// Текущая картинка
var currentImage = 0;

// Первая картинка
$("#main-slider img").attr("src", path + images[currentImage]);

// Клик по правой стрелке
$("#main-slider .slider__content-next").on('click', function () {
	// при клике увеличиваем на 1
	currentImage++;
	if (currentImage >= images.length) {
		currentImage = 0;
	}
	$("#main-slider img").attr("src", path + images[currentImage]);
	// Убираем класс active у всех нижних картинок
	$('#slides ul li').removeClass('active');
	// Присваиваем класс active у текущей нижней картинки		
	$("#slides ul li[data-id = '" + currentImage + "'] ").addClass("active");
});

// Клик по левой стрелке
$("#main-slider .slider__content-prev").on('click', function () {
	// при клике уменьшаем на 1
	currentImage--;
	if (currentImage < 0 || currentImage >= images.length) {
		currentImage = images.length - 1;
	}
	$("#main-slider img").attr("src", path + images[currentImage]);
	// Убираем класс active у всех нижних картинок
	$('#slides ul li').removeClass('active');
	// Присваиваем класс active у текущей нижней картинки		
	$("#slides ul li[data-id = '" + currentImage + "'] ").addClass("active");
});

// Создание карточек фотографий
for (var i = 0; i < images.length; i++) {
	// Добавляем элемент в блок с мини картинками
	$('#slides ul').append("<li data-id='" + i + "'>" +
		"<img src='" + path + images[i] + "'></li>");
	// Проверка - если это первая картинка, то добавляем класс active
	if (i == 0) {
		$('#slides ul li').addClass('active');
	}
}

// Делаем клик по слайдам
$('#slides ul li').on('click', function (e) {
	// Убираем у всех элементов класс active
	$('#slides ul li').removeClass('active');
	// На элементе по которому кликнули добавляем класс active
	$(this).addClass('active');
	// Получаем id элемента по которому кликнули
	var id = this.dataset.id;
	// Меняем картинку в слайдере
	$("#main-slider img").attr("src", path + images[id]);
});

// Увеличиваем картинку
$("#main-slider img").on('click', function () {
	console.log(this);
	$('#opacity').css({ 'display': 'block' });
	$('#full-image')
		.css({ 'display': 'block' })
		.append('<img src="' + $(this).attr('src') + '">');
});

// Уменьшаем картинку
$("#opacity").on('click', function () {
	$('#opacity').css({ 'display': 'none' });
	$('#full-image').css({ 'display': 'none' }).empty();
});
