// Меню

$('.topnav li a').click(function(){
    var str=$(this).attr('href');
    $.scrollTo(str, 500, {offset:-140 });
    return false;
});

$(function($){
    var topnav = $('.top');
    var label = $('.label');
    $h = label.offset().top;

    $(window).scroll(function(){
        // Если прокрутили скролл ниже макушки блока, включаем фиксацию

        if ( $(window).scrollTop() > $h) {
            topnav.addClass('fix-top');
        }else{
            //Иначе возвращаем всё назад. Тут вы вносите свои данные
            topnav.removeClass('fix-top');
        }
    });
});


//  Modal

$(".btn-modal").fancybox({
    'padding'    : 0,
    'tpl'        : {
        closeBtn : '<a title="Close" class="btn_close" href="javascript:;"></a>'
    }
});


$('.review').slick({
    arrows: true,
    autoplay: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<span class="review-nav prev">',
    nextArrow: '<span class="review-nav next">'
});


$('.faq').slick({
    arrows: false,
    autoplay: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1
});

$('.slideup').click(function(e){
    e.preventDefault();
    $('.text-hide').show();
});

$(document).ready(function() {

    $('.btn-send').click(function() {

        $('body').find('form:not(this)').children('div').removeClass('red'); //удаление всех сообщение об ошибке(валидатора)
        var answer = checkForm($(this).closest('form').get(0)); //ответ от валидатора
        if(answer != false)
        {
            var $form = $(this).closest('form'),
                type    =     $('input[name="type"]', $form).val(),
                name    =     $('input[name="name"]', $form).val(),
                phone   =     $('input[name="phone"]', $form).val(),
                email   =     $('input[name="email"]', $form).val(),
                message =     $('textarea[name="message"]', $form).val();
            console.log(name, phone, email, type, message);
            $.ajax({
                type: "POST",
                url: "form-handler.php",
                data: {name: name, phone: phone, email:email, type:type, message:message}
            }).done(function(msg) {
                $('form').find('input[type=text], textarea').val('');
                console.log('удачно');
                document.location.href = "http://aromads.ru/done.html";
            });
        }
    });


    $('.btn-order').click(function() {

        var $form = $(this).closest('form'),
            color   =     $('input:radio[name=color]:checked', $form).val(),
            memory  =     $('input:radio[name=memory]:checked', $form).val();


        $('#order input[name="colors"]').val(color);
        $('#order input[name="mem"]').val(memory);


        var color2   =     $('#order input[name="colors"]').val(),
            memory2  =     $('#order input[name="mem"]').val();

        console.log(color2, memory2);
        $.fancybox.open('#order');
    });

    // tabs
});

$('.detail-nav li a').click(function(e) {
    e.preventDefault();
    var tab = $($(this).attr("data-target"));
    var box = $(this).closest('.detail');
    $(this).closest('.detail-nav').find('li').removeClass('active');
    $(this).closest('li').addClass('active');

    box.find('.detail-content').removeClass('active');
    box.find(tab).addClass('active');
});


$('.timer-one').countdown_sg(03);
$('.timer-two').countdown_sg(03);
$('.timer-three').countdown_sg(03);



/* Анимация  */

document.body.onmousemove=function(e) {
    // Получить событие
    var e = e || window.event;

    var doc = document.documentElement;
    var body = document.body;

    // Получить текущие координаты мыши
    if ("\v" == "v") {
        var mouse_x = e.clientX;
        if (doc.clientLeft) { mouse_x -= doc.clientLeft; }
        if (doc && doc.scrollLeft) { mouse_x += doc.scrollLeft; }
        if (body && body.scrollLeft) { mouse_x += body.scrollLeft; }
        var mouse_y = e.clientY;
        if (doc.clientTop) { mouse_y -=doc.clientTop; }
        if (doc && doc.scrollTop) { mouse_y += doc.scrollTop; }
        if (body && body.scrollTop) { mouse_y += body.scrollTop; }
    }
    else {
        var mouse_x=e.pageX;
        var mouse_y=e.pageY;
    }
    // Параллакс
    do_parallax(mouse_x, mouse_y);
};


function do_parallax(mouse_x, mouse_y) {
    var body = document.body;
    var shift1, shift2, elem;

    // Пропорциональные коэффициенты сдвига для слоев
    var sh_1=20;
    var sh_2=100;


    // Вертикальный и горизонтальный сдвиг для первого слоя
    shift1=Math.round(sh_1*mouse_x*2/body.clientWidth);
    shift2=Math.round(10*mouse_y*20/body.clientHeight);

    elem=document.getElementById('bg01');
    elem.style.left=shift1+'px';
    elem.style.top=shift2+'px';

    // Вертикальный и горизонтальный сдвиг для второго слоя
    shift3=-20+Math.round(sh_2*mouse_x/body.clientWidth);
    shift4=10+Math.round(10*mouse_y*10/body.clientHeight);

    elem=document.getElementById('bg02');
    elem.style.left=shift3+'px';
    elem.style.top=shift4+'px';


    elem=document.getElementById('bg03');
    elem.style.left=shift1+'px';
    elem.style.top=shift2+'px';

    elem=document.getElementById('bg04');
    elem.style.left=shift3+'px';
    elem.style.top=shift4+'px';

    elem=document.getElementById('bg05');
    elem.style.left=shift1+'px';
    elem.style.top=shift2+'px';

    elem=document.getElementById('bg06');
    elem.style.left=shift3+'px';
    elem.style.top=shift4+'px';
}
