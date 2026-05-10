const menuButton = document.querySelector(".menu");
const sidebar = document.querySelector(".sidebar");

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("active");
  sidebar.classList.toggle("active");
});
