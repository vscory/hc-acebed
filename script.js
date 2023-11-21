function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();

          


        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;

      
    }
    
  }
  //헤더
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navlinks = document.querySelectorAll(".nav-links li");
  const body = document.body;

  const navAnimation = () => {
    navlinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 10 + 0.1}s`;
      }
    });
  };

  const handleNav = () => {
    nav.classList.toggle("nav-active");
    navAnimation();
    burger.classList.toggle("toggle");

    // 본문 스크롤 토글
    body.style.overflow = (body.style.overflow === "hidden") ? "" : "hidden";
  };

  const navSlide = () => {
    burger.addEventListener("click", handleNav);
  };

  const setNavTransition = (width) => {
    if (width > 768) {
      nav.style.transition = "";
    } else {
      nav.style.transition = "transform 0.5s ease-in";
    }
  };

  const handleResize = () => {
    const width = window.innerWidth;
    setNavTransition(width);
  };

  const init = () => {
    window.addEventListener("resize", handleResize);
    navSlide();
  };

  init();




  //검색창

  const searchInput = document.getElementById("search-input");
  const searchBox = document.getElementById("search-box");
  const closeButton = document.getElementById("close-button");

  searchInput.addEventListener("click", function () {
      searchBox.style.display = "block";
  });


  closeButton.addEventListener("click", function () {
      searchBox.style.display = "none";
  });
  searchInput.addEventListener("click", function () {
      
      searchBox.style.display = "block";
      document.body.style.overflow = "hidden";
  });

  closeButton.addEventListener("click", function () {
      searchBox.style.display = "none";
      document.body.style.overflow = "auto";
  });
};




//푸터 패밀리사이트

window.onload = function() {
  var btn = document.getElementById("familySiteButton");
  var list = document.getElementById("familySiteList");

  btn.addEventListener('click', function() {
      if(list.style.visibility === "visible") {
          list.style.opacity = "0";
          list.style.visibility = "hidden";
      } else {
          list.style.visibility = "visible";
          list.style.opacity = "1";
      }
  });

  window.addEventListener('click', function(e) {
      if (!e.target.matches('#familySiteButton')) {
          list.style.opacity = "0";
          list.style.visibility = "hidden";
      }
  });
}



//메인 슬라이드

document.addEventListener('DOMContentLoaded', function () {
  const slideWrap = document.querySelector('.slide_wrap');
  const slide = document.querySelector('.slide');
  const slideItems = document.querySelectorAll('.slide_item');
  const prevButton = document.querySelector('.slide_prev_button');
  const nextButton = document.querySelector('.slide_next_button');
  const pagination = document.querySelector('.slide_pagination');

  let currentIndex = 0;
  let intervalId;

  // 추가된 변수
  let isTransitioning = false;

  function updateSlide() {
      const itemWidth = slideWrap.clientWidth;
      slide.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  function updatePagination() {
      pagination.innerHTML = '';
      for (let i = 0; i < slideItems.length; i++) {
          const dot = document.createElement('li');
          dot.classList.add('pagination_dot');
          dot.addEventListener('click', () => {
              if (!isTransitioning) {
                  currentIndex = i;
                  updateSlide();
                  updatePagination();
              }
          });
          if (i === currentIndex) {
              dot.classList.add('active');
          }
          pagination.appendChild(dot);
      }
  }

  function goToNextSlide() {
      if (!isTransitioning) {
          if (currentIndex < slideItems.length - 1) {
              currentIndex++;
          } else {
              currentIndex = 0;
          }
          updateSlide();
          updatePagination();
      }
  }

  function startAutoSlide() {
      intervalId = setInterval(goToNextSlide, 3500); // 3.5초마다 슬라이드 변경
  }

  function stopAutoSlide() {
      clearInterval(intervalId);
  }

  prevButton.addEventListener('click', () => {
      if (!isTransitioning && currentIndex > 0) {
          currentIndex--;
          updateSlide();
          updatePagination();
          stopAutoSlide();
          startAutoSlide();
      }
  });

  nextButton.addEventListener('click', () => {
      if (!isTransitioning) {
          goToNextSlide();
          stopAutoSlide();
          startAutoSlide();
      }
  });

  slideWrap.addEventListener('mouseenter', stopAutoSlide);
  slideWrap.addEventListener('mouseleave', startAutoSlide);

  // 추가된 트랜지션 종료 핸들러
  function transitionEndHandler() {
      isTransitioning = false;
      slide.style.transition = ''; // 트랜지션 제거
  }

  slide.addEventListener('transitionend', transitionEndHandler);

  startAutoSlide();
  updateSlide();
  updatePagination();

  window.addEventListener('resize', () => {
      updateSlide();
  });
});

//매거진

$(document).ready(function () {
  var $slider = $('.fade');
  var $currentSlide = $('.current-slide');
  var $totalSlides = $('.total-slides');
  var $nextSlideButton = $('#next-slide'); // 이미지 클릭을 위한 ID

  $slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      var i = (currentSlide ? currentSlide : 0) + 1;
      var total = slick.slideCount;
      $currentSlide.text(i);
      $totalSlides.text(total);
  });

  var sliderSettings = {
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      prevArrow: null,
      nextArrow: null,
      autoplay: true,
      autoplaySpeed: 2000
  };

  $slider.slick(sliderSettings);

  $nextSlideButton.on('click', function () {
      $slider.slick('slickNext'); // 이미지 클릭으로 다음 슬라이드로 이동
  });

  // 마우스가 슬라이더에 진입하면 자동 재생 멈춤
  $slider.on('mouseenter', function () {
      $slider.slick('slickPause');
  });

  // 마우스가 슬라이더에서 나가면 자동 재생 다시 시작
  $slider.on('mouseleave', function () {
      $slider.slick('slickPlay');
  });
});


//리뷰

$('.review-box').slick({
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
  responsive: [
      {
          breakpoint: 768,
          settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
          }
      },
      {
          breakpoint: 480,
          settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '0px',
              slidesToShow: 1
          }
      }
  ]
});

$('.review-box').on('afterChange', function (event, slick, currentSlide) {
  // currentSlide는 현재 슬라이드 번호입니다.
  // 섹션 바 아이템을 갱신하여 현재 섹션을 강조 표시합니다.
  $('.section-bar-item').css('background-color', '#ccc'); // 모든 막대를 기본 색상으로 초기화
  $('.section-bar-item:eq(' + currentSlide + ')').css('background-color', '#408ebc'); // 현재 섹션 강조 표시
});

// 섹션 바 아이템을 클릭했을 때
$('.section-bar-item').on('click', function () {
  // 해당 섹션의 인덱스(순서)를 가져옵니다.
  var sectionIndex = $(this).data('section-index');

  // 슬라이더를 해당 섹션으로 이동시킵니다.
  $('.review-box').slick('slickGoTo', sectionIndex);
});

$(document).ready(function () {
// 화면 크기를 확인하고 섹션바를 초기화합니다.
checkScreenSize();

// 화면 크기가 변경될 때마다 섹션바를 확인하여 업데이트합니다.
$(window).resize(function () {
checkScreenSize();
});

function checkScreenSize() {
if ($(window).width() >= 768) {
$('.section-bar').hide(); // 섹션바 숨기기
} else {
$('.section-bar').show(); // 섹션바 보이기
}
}
});
