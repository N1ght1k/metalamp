var toggler = document.getElementsByClassName("expandable-checkbox-list__title");
var i;

for (i = 0; i < toggler.length; i++) {
	toggler[i].addEventListener("click", function() {
		this.parentElement.querySelector(".expandable-checkbox-list__content").classList.toggle("expandable-checkbox-list__content--active");
		this.classList.toggle("expandable-checkbox-list__title--active");
	});
}