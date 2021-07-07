// const button = document.querySelector('.like-button')

// button.addEventListener('click', () => {
//     button.classList.toggle('liked')
// })

$(function(){
	$(document).one('click', '.like-button', function(e) {
		$(this).addClass('liked')
		document.querySelector('.like-button__icon').textContent='favorite';
		document.querySelector('.like-button__content').textContent='3';
		$(this).children('.like-button__icon').addClass('like-button__icon--liked');
		$(this).children('.like-button__content').addClass('like-button__content--liked');
	});
});