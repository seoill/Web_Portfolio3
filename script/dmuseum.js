(($,window,document,undefined)=>{
  class Obj {
    init(){
      this.header();
      this.section1();
      this.section2();
      this.section3();
      this.goTop();
    }
    header(){
      let btnClick=false;
      let click=false;

      headerSizeFn();
      
      $(window).scroll(()=>{
        if($(window).scrollTop()===0){
          if($(window).width()<=1000){
            $('.menu-btn').show();
            return;
          }
          $('#header').removeClass('on');
          $('.on-hide').show();
          $('.menu-btn').hide();
          btnClick=false;
        }
        else{
          if(btnClick===true){
            return;
          }
          else{
            $('#header').addClass('on');
            $('.on-hide').hide();
            $('.menu-btn').show();
          }
        }
      });

      $('.menu-btn').on({
        click:function(e){
          e.preventDefault();
          $('.on-hide').toggle();
          btnClick=true;
        }
      });

      $('.main-menu').on({
        mouseenter:function(){
          $(this).children('.sub').stop().slideDown(300);
        },
        mouseleave:function(){
          $(this).children('.sub').stop().slideUp(300);
        },
        mousedown:function(){
          $(this).children('.sub').stop().slideToggle(300);
        },
        focusin:function(){
          $(this).children('.sub').stop().slideDown(300);
        },
        focusout:function(){
          $(this).children('.sub').stop().slideUp(300);
        },

      });

      $(window).resize(function(){
        headerSizeFn();
      });

      function headerSizeFn(){
        if($(window).width()<=1000){
          $('#header').addClass('on');
          $('.menu-btn').show();
        }
        else{
          $('#header').removeClass('on');
        }
      }

    }
    section1(){
      const section = $('#section1');
      const slide = $('#section1 .slide');
      let cnt=0;
      let t = false;

      section.addClass('animation');

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          section.removeClass('animation');
          t=false;
        }
        if(t===false){
          if($(window).scrollTop()>0){
            section.addClass('animation');
            t=true;
          }
        };
      });

      //???????????? ?????? ???????????? ???
      function mainSlide(){
        cnt>2?cnt=0:cnt;
        slide.css({zIndex:1}).animate({opacity:1},0);
        slide.eq(cnt==3?0:cnt).css({zIndex:2});
        slide.eq(cnt==0?2:cnt-1).css({zIndex:3}).stop().animate({opacity:0},2000);
      };
      function nextCount(){
        cnt++;
        mainSlide();
      };
      function autoCount(){
        setInterval(nextCount, 5000);
      };
      autoCount();


    }
    section2(){
      const section = $('#section2')
      const slide = $('#section2 .slide-wrap');
      const prevBtn = $('.sec2-prev-btn');
      const nextBtn = $('.sec2-next-btn');

      const cate1 = '??????';
      const cate2 = '??????';
      const cate3 = '??????';
      
      let cnt = 0;
      let touchStart = null;
      let touchEnd = null;
      let dragStart = null;
      let dragEnd = null;
      let result = '';
      let mouseDown = false;
      let slideLeft = slide.offset().left;

      let secTop = section.offset().top-$(window).height();
      let t=false;


      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          section.removeClass('animation');
          t=false;
        }
        if(t===false){
          if($(window).scrollTop()>secTop){
            section.addClass('animation');
            t=true;
          }
        };
      });

       //???????????? ??????
       function slideAni(){
        slide.stop().animate({left:cnt*-780}, 500, 'easeInQuart');
        $('#section2 .now-page').html('0'+(cnt+1));
        switch(cnt){
          case 0 :
            $('#section2 .slide-category').html(cate2);
            $('#section2 .slide-title').html('???????????? ?????? ????????? : oceanfromtheblue');
            $('#section2 .period').html('2022.06.04 SAT 6PM');
            $('#section2 .place').html('????????????');
            break;
          case 1 :
            $('#section2 .slide-category').html(cate3);
            $('#section2 .slide-title').html('[????????? ?????? ??????] ??????????????? ?????? ???????????? ??????');
            $('#section2 .period').html('2022.06.05 SUN ');
            $('#section2 .place').html('???????????????');
            break;
          case 2:
            $('#section2 .slide-category').html(cate1);
            $('#section2 .slide-title').html('CLASS 7PM');
            $('#section2 .period').html('2022.06.17 ~ 2022.06.24');
            $('#section2 .place').html('????????????');
            break;
          case 3:
            $('#section2 .slide-category').html(cate1);
            $('#section2 .slide-title').html('Culture English Club');
            $('#section2 .period').html('2022.06.08 ~ 2022.07.27');
            $('#section2 .place').html('????????????');
            break;
          case 4:
            $('#section2 .slide-category').html(cate1);
            $('#section2 .slide-title').html('??????????????? : ??????????????? ????????????(??????)');
            $('#section2 .period').html('2022.04.01 ~ 2022.07.31');
            $('#section2 .place').html('????????????');
            break;
          case 5:
            $('#section2 .slide-category').html(cate1);
            $('#section2 .slide-title').html('??? ??? : ????????? ?????? ???.???(???????????? ????????????)');
            $('#section2 .period').html('2022.03.16 ~ 2022.10.30');
            $('#section2 .place').html('????????????');
            break;
        }
      }

      function nextCount(){
        cnt++;
        if(cnt>5){
          cnt=5;
          return;
        }
        else{
          slideAni();
        }
      }
      function prevCount(){
        cnt--;
        if(cnt<0){
          cnt=0;
          return;
        }
        else{
          slideAni();
        }
      }



      slide.on({
        mousedown:function(e){
          touchStart = e.clientX;
          dragStart = e.clientX-(slide.offset().left-$('.slide-box').offset().left); //?????? ?????????????????? "?????? ????????? ?????????"??? ????????????
          //?????? ?????? ???????????? ?????? ?????? ????????? (796.6875)
          mouseDown = true;
        },
        mouseup:function(e){
          touchEnd = e.clientX;
          result = touchStart-touchEnd>0?'next':'prev';
          mouseDown = false;
          if(result==='next'){
            nextCount();
          }
          if(result==='prev'){
            prevCount();
          }
        },
        mouseleave:function(e){
          if(mouseDown===false){
            return;
          }
          touchEnd = e.clientX;
          result = touchStart-touchEnd>0?'next':'prev';
          mouseDown = false;
          if(result==='next'){
            nextCount();
          }
          if(result==='prev'){
            prevCount();
          }
        },
        mousemove:function(e){
          if(slide.offset().left>$('.slide-box').offset().left){
            return;
          }
          if(mouseDown===false){return;}
          dragEnd = e.clientX;
          slide.css({left:dragEnd-dragStart});
        }
      })

      prevBtn.on({
        click:function(e){
          e.preventDefault();
          prevCount();
        }
      });
      nextBtn.on({
        click:function(e){
          e.preventDefault();
          nextCount();
        }
      });



    }
    section3(){

      const goods = [
        "[?????????, ??????] ????????? ????????????",
        "[?????????, ??????] ????????? ????????? ?????? ??????",
        "[?????????, ??????] ????????? ????????????",
        "../img/goods1.jpg",
        "../img/goods2.jpg",
        "../img/goods3.jpg"
      ]
      const prints = [
        "[?????????, ??????] ?????? ????????? 4??? (??????, ??????, ?????????)",
        "[?????????, ??????] ?????? ?????? 7??? (??????, ??????, ?????????)",
        "[I draw] ???????????? ??????",
        '../img/prints1.jpg',
        '../img/prints2.jpg',
        '../img/prints3.jpg'
      ]
      const editions = [
        "[Collabo] ???????????? ??????",
        "[Collabo] ????????? ?????????",
        "[Collabo] ????????? ????????? ??????",
        "../img/editions1.jpg",
        "../img/editions2.jpg",
        "../img/editions3.jpg"
      ]
      const section = $('#section3')
      let secTop = section.offset().top-$(window).height();
      let t=false;


      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          section.removeClass('animation');
          t=false;
        }
        if(t===false){
          if($(window).scrollTop()>secTop){
            section.addClass('animation');
            t=true;
          }
        };
      });

      $('.shop-btn').each(function(i){
        $(this).on({
          click:function(e){
            e.preventDefault();
            $('.shop-btn').removeClass('on');
            $(this).addClass('on');
            switch(i){
              case 0:
                $('.box1-title').html(goods[0]);
                $('.box2-title').html(goods[1]);
                $('.box3-title').html(goods[2]);
                $('.box1').removeClass('prints editions');
                $('.box2').removeClass('prints editions');
                $('.box3').removeClass('prints editions');
                $('.box1').addClass('goods');
                $('.box2').addClass('goods');
                $('.box3').addClass('goods');
                break;
              case 1:
                $('.box1-title').html(prints[0]);
                $('.box2-title').html(prints[1]);
                $('.box3-title').html(prints[2]);
                $('.box1').removeClass('goods editions');
                $('.box2').removeClass('goods editions');
                $('.box3').removeClass('goods editions');
                $('.box1').addClass('prints');
                $('.box2').addClass('prints');
                $('.box3').addClass('prints');
                break;
              case 2:
                $('.box1-title').html(editions[0]);
                $('.box2-title').html(editions[1]);
                $('.box3-title').html(editions[2]);
                $('.box1').removeClass('goods prints');
                $('.box2').removeClass('goods prints');
                $('.box3').removeClass('goods prints');
                $('.box1').addClass('editions');
                $('.box2').addClass('editions');
                $('.box3').addClass('editions');
                break;
            }
          }
        });
      });
    }
    goTop(){
      $(window).scroll(function(){
        if($(window).scrollTop()>0){
          $('.gotop-btn').stop().fadeIn(300);
        }
        else{
          $('.gotop-btn').stop().fadeOut(100);
        }
      });
      $('.gotop-btn').on({
        click:function(){
          $('html, body').stop().animate({scrollTop:0}, 500)
        }
      })
    }
  }
  const newObj = new Obj;
  newObj.init();

})(jQuery,window,document)