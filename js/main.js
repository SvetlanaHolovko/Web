/*========== ПЛАН ===========*/
/*
1. Сверстать слайдер - готово
2. Сделать переключение фотографий влево и вправо
3. Сделать переключение фото по клику на нижнее фото
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
var path = "img/works/";
// Текущая картинка
var currentImage = 0;

// Первая картинка
$("#maine-slider img").attr("src", path + images[currentImage]);
// Перелистываем вправо next
$("#maine-slider .next").click(function() {
	// при клике увеличиваем на 1
	currentImage++;
	if(currentImage >= images.length) {
		currentImage = 0;
	}

	$("#maine-slider img").attr("src", path + images[currentImage]);

	// Убираем класс active у всех нижних картинок
	$('#slides ul li').removeClass('active');
	// Присваиваем класс active у текущей нижней картинки		
	$("#slides ul li[data-id = '" + currentImage + "'] ").addClass("active");
});

// Перелистываем влево pref
$("#maine-slider .pref").click(function() {
	// при клике уменьшаем на 1
	currentImage--;

	if(currentImage < 0 || currentImage >= images.length) {
		currentImage = images.length-1;
	}

	$("#maine-slider img").attr("src", path + images[currentImage]);
	// Убираем класс active у всех нижних картинок
	$('#slides ul li').removeClass('active');
	// Присваиваем класс active у текущей нижней картинки		
	$("#slides ul li[data-id = '" + currentImage + "'] ").addClass("active");
});

// Создание карточек фотографий
for (var i = 0; i < images.length; i++) {
	// Добавляем элемент в блок с мини картинками
	$('#slides ul').append("<li data-id='" + i + "'>" + 
		"<img src='" + 
		path + images[i] + 
		"'></li>");
	// Проверка - если это первая картинка, то добавляем класс active
	if (i == 0) {
		$('#slides ul li').addClass('active');
	}
}

// Делаем клик по слайдам
$('#slides ul li').on('click', function(e) {
	// Убираем у всех элементов класс active
	$('#slides ul li').removeClass('active');
	// На элементе по которому кликнули добавляем класс active
	$(this).addClass('active');
	// Получаем id элемента по которому кликнули
	var id = this.dataset.id;

	// Меняем картинку в слайдере
	$("#maine-slider img").attr("src", path + images[id]);
});

// Увеличиваем картинку
$("#maine-slider img").on('click', function() {
	$('#opacity').css({'display':'block'});
	$('#full-image')
		.css({'display':'block'})
		.append('<img src="' + $(this).attr('src') + '">');
});
// Уменьшаем картинку
$("#opacity").on('click', function() {
	$('#opacity').css({'display':'none'});
	$('#full-image').css({'display':'none'}).empty();
});