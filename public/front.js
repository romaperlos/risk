function myFunction() {
  let array = document.querySelectorAll('.dropdown-content');
  for (let i = 0; i < array.length; i += 1) {
    array[i].classList.toggle('show');
  }
}
