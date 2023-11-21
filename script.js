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