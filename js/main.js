$(function(){
    // 풀페이지 
    var fullPageCreated = false;
    var resizeControl = false;
    createFullpage();
    fullResize();
    function createFullpage() {
        if (fullPageCreated === false) {
            fullPageCreated = true;
            $("#fullpage").fullpage({
                // 풀페이지가 넘어갈 때 onLeave
                onLeave: function(index, nextIndex, direction){
                    $('.header').removeClass('scroll')
                    $('.fp_nav').removeClass('scroll')
                    $('.bar').removeClass('scroll')
                    $('.fp_nav .item li').removeClass('on')
                    $('.fp_nav .item li').eq(nextIndex - 1).addClass('on');
                    $('.section').eq(nextIndex - 1).addClass('ani')
                    //nextIndex = 다음페이지, 뭔지 정보를 숫자로 알려준다
                    if(nextIndex == 2){
                        console.log(nextIndex)
                        // member 일 때 이것들도 추가
                        $('.header').addClass('scroll')
                        $('.fp_nav').addClass('scroll')
                        $('.bar').addClass('scroll')
                    }
                    if(nextIndex == 4){
                        // news
                        $('.header').addClass('scroll')
                        $('.fp_nav').addClass('scroll')
                        $('.bar').addClass('scroll')
                    }
                    if(nextIndex == 5){
                        //푸터
                        $('.top_btn').addClass('on')
                        // 푸터 네비 사라지기
                        $('.fp_nav').stop().fadeOut()
                        $('.bar').stop().fadeOut()
                    }else{
                        $('.top_btn').removeClass('on')
                        $('.fp_nav').stop().fadeIn()
                        $('.bar').stop().fadeIn()
                    }
                },
            })
        }
    }
    var control02 = true;
        function fullResize(){
            if($(window).width() <= 1200){
                fullPageCreated = false;
                control02 = true;
                if(!resizeControl){
                    //풀페이지 아닐 때 풀페이지의 모든 기능 빼기
                    $.fn.fullpage.destroy('all');
                    resizeControl = true;
                    // 스크롤 이벤트
                   $(window).scroll(function(){
                        var windowH = $(this).height();
                        var percentage = windowH * 60 / 100; //창에서 몇퍼센트일 때 
                        var windowS = $(this).scrollTop() + percentage ;
                        //실행하고 싶은 클래스
                        // 풀페이지 아닐 때 에니메이션
                        $(".m_ani").each(function(){
                            var thisTop = $(this).offset().top;
                            if (thisTop < windowS) {
                                //실행하고 싶은 클래스에 on을 넣어준다.
                                $(this).addClass("on");
                            }
                        });
                        // 헤더 고정 될 때 색상 바꾸기
                        if($(this).scrollTop() > 10){
                            $('.header').addClass('on')
                        } else{
                            $('.header').removeClass('on')
                        }  
                    })
                    // 풀페이지 아닐 때 top 버튼
                    $('#btnGoTop').off().on("click",function () {
                       $('html,body').stop().animate({scrollTop:0}) // 이동하고싶은 값
                       console.log('스크롤')
                    });
                }
            }else {
                // 풀페이지 일 때
                createFullpage();
                resizeControl = false;
                if ($(window).width() >= 1200 && control02){
                    control02 = false;
                    $.fn.fullpage.moveTo('page01', 0);
                }
                //top버튼
                $('#btnGoTop').off().on("click",function () {
                    //$.fn.fullpage.setScrollingSpeed(0); 효과를 없애고싶을때
                    $.fn.fullpage.moveTo(1); // 이동하고싶은 페이지
                    // $.fn.fullpage.setScrollingSpeed(700); 효과를 없애고싶을때
                    console.log('풀페이지')
                });
            }
        }

    var timer = null;
    $(window).on("load resize", function(e){
        clearTimeout(timer);
        timer = setTimeout(resizeM , 150)
    })
    function resizeM(){
        fullResize();
    }

    $(".fp_nav .item li").on("click", function(){
        $.fn.fullpage.moveTo($(this).index() + 1)

    })

    // 메인1 슬라이드
    //$('선택자').on('원하는속성', function(){})
    // let = 변할수 있는 (재사용) 변수
    let num = 10;
    console.log(num,"1")
    num = 20; 
    console.log(num,"2")
    num = 100;
    console.log(num,"3")
      // const = 절대 변하지 않는 변수
    const mainCtn = $(".main .slide_wrap .slide_ctn");
    const mainTxt = $(".main .slide_wrap .slide_txt");
    mainCtn.slick({
        arrows:false,
        fade:true,
        asNavFor:mainTxt
    })
    //init slick 처음 만들어 질때 작동 *한번만
    mainTxt.on('init', function(){
        $('.main .slick-dots li button').stop().animate({
            width: 100 +"%"
        }, 5000)
        
    })
    mainTxt.slick({
        arrows:false,
        dots:true,
        autoplay:true,
        autoplaySpeed: 5000,
        asNavFor:mainCtn
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.main .slick-dots li button').stop().animate({
            width: 0 +"%"
        }, 0)
        var count = slick.slideCount;
        var selectors = [nextSlide, nextSlide - count, nextSlide + count].map(function(n){
        return '.main [data-slick-index="'+n+'"]'
        //한페이지에서 여러개 사용시 return '.부모클래스 추가하기(중복 방지) [data-slick-index="'+n+'"]'
        }).join(',');
        $('.main .slick_now').removeClass('slick_now');
        //한페이지에서 여러개 사용시  $('.부모 클래스 .slick_now').removeClass('slick_now');
        $(selectors).addClass('slick_now');
    }).on('afterChange', function(e, slick, current, next){
        $('.main .slick-dots li').eq(current).find('button').stop().animate({
            width: 100 +"%"
        }, 5000)
    })
    mainTxt.find($('.slick-slide[data-slick-index="0"]')).addClass('slick_now');
    // 푸터 .link를 클릭하면 li들을 찾아서 다음에 있는 ul 슬라이드 올라가고 다시 누르면 슬라이드 내려간다.
    $(".footer .footer_ctn .link").on("click", function(){
        $(this).find(">li").next().stop().slideToggle();
        // $('.header').toggleClass('hover')
    }) 

    // .m_btn 클릭하면 토글클래스"on" 생성되면
    $(".header .gnb .header_ui .m_btn").on("click", function(){
        $(this).toggleClass('on');
        // .m_gnb 에 토글클래스 "on" 생성 => 'right: 0'
        $(".header .gnb .header_ui .m_gnb").toggleClass('on');
    })

    // a 클릭 시 m_nav 슬라이드토글 해서 펼치기
    $(".header_ui .m_gnb .m_nav > ul > li > a").on("click", function(e){
        e.preventDefault()
        $(this).next().stop().slideToggle();
        $(".header_ui .m_gnb .m_nav > ul > li > a").not(this).next().stop().slideUp();
        // a누르면 .on클래스 붙어서 ::after가 사라지게 한다
        $(this).toggleClass("on");
        // 내가 클릭한 a가 아닌 다른 a에 있는 after는 on클래스가 사라져서 다시 생긴다        
        $(".header_ui .m_gnb .m_nav > ul > li > a").not(this).removeClass("on");
    })
    // fade,slide등은 block 속성이 정해지기 때문에
    // flex가 풀린다 그래서 실행"후"에 .css다시 flex로 바꿔준다
    $(".header .gnb .nav > ul > li").hover(function(){
        $(this).find(">ul").stop().fadeIn().css('display','flex');
        $(".header").addClass("on");
    }, function(){
        $(this).find(">ul").stop().fadeOut();
        $(".header").removeClass("on");
    })

    // members 슬릭 슬라이드 추가
    $('.members .slide_wrap .slide_ctn').slick({
        arrows:false,
        vertical:true, //수직 슬라이드
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover:false,
    });

    //beforeChange slick의 기능
    // 어떤기능? => 넘어갈'때' 뭔가를 하는 기능
    //넘어갈 '때' 니까 currentSlide => 현재(0)즉 0에서 넘어갈때니까 0
    //nextSlide 넘어갈때니까 내가 0에서 넘어갈때면?? -> 1
    $('.news .flex_box .content .slide_wrap .slide_ctn').slick({
        arrows:false,
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        //.tab li에 있는 모든on을 지운다
        $('.news .flex_box .content .tab li').removeClass('on');
        //.tab li에 nextSlide번째의 li에 on을 붙힌다
        //eq() 인덱스를 적는다 인덱스는?? 몇번째인지
        //eq(몇번째것) eq랑 인덱스는 모두 0부터 시작
      $('.news .flex_box .content .tab li').eq(nextSlide).addClass('on');
    });

    //tab li클릭하면
    $(".news .flex_box .content .tab li").on("click", function(){
        //index() > 몇번째인지 알려준다 (0부터)
        console.log($(this).index()) //내가 누른게 몇번째에 있는지.
        //$(this) < 내가 클릭한것의 .index() 몇번째에 있는지 알려준다
        $(".news .flex_box .content .slide_wrap .slide_ctn").slick('slickGoTo', $(this).index())
        //slickGoTo는 해당 슬라이드로 이동시켜준다
        //$(선택자).slick('slickGoTo', 몇번째로?)
    })

   
})



