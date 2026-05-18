document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('is-open');
    });
    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('is-open');
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav')) {
        links.classList.remove('is-open');
      }
    });
  }
});
