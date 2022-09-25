$(".autoplay").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  centerMode: true,
  focusOnSelect: true,
  autoplaySpeed: 2000,
  prevArrow: "",
  nextArrow: "",
  variableWidth: true,
  responsive: [
    {
      breakpoint: 640,
      settings: {
        centerMode: false,
        focusOnSelect: false,
      },
    },
  ],
});
