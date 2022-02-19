const left = document.querySelector('.wrapper_l_col');
const right = document.querySelector('.wrapper_r_col');
const age = document.querySelector('.age');
const hamburger = document.querySelector('.hamburger-menu');
const header = document.querySelector('header');
const menu = document.querySelector('.menu__box');
const trans = 'transparent';
const white = 'white';
age.innerHTML =
	((new Date().getTime() - new Date(1985, 03, 27)) /
		(24 * 3600 * 365.25 * 1000)) |
	0;
changeAnimation(left, right);

function changeAnimation(a, b) {
	if (!a || !b) {
		return;
	}
	let isPlay = true;
	setTimeout(function tick() {
		if (isPlay === true) {
			animationLeft(a);
			isPlay = false;
			setTimeout(tick, 3000);
		} else {
			animationRight(b);
			isPlay = true;
			setTimeout(tick, 3000);
		}
	}, 1000);
}

function animationLeft(el) {
	if (window.innerWidth < 768) return;
	el.animate(
		[
			// keyframes
			{
				borderTopColor: white,
				borderRightColor: trans,
				borderBottomColor: trans,
				borderLeftColor: trans,
			},
			{
				borderTopColor: trans,
				borderLeftColor: white,
				borderBottomColor: trans,
				borderRightColor: trans,
			},
			{
				borderTopColor: trans,
				borderRightColor: trans,
				borderBottomColor: white,
				borderLeftColor: trans,
			},
		],
		{
			// timing options
			duration: 3000,
			iterations: 1,
			easing: 'cubic-bezier(0.12, 0, 0.39, 0)',
		}
	);
}

function animationRight(el) {
	if (window.innerWidth < 768) return;
	el.animate(
		[
			// keyframes
			{
				borderTopColor: trans,
				borderRightColor: trans,
				borderBottomColor: white,
				borderLeftColor: trans,
			},
			{
				borderTopColor: trans,
				borderBottomColor: trans,
				borderLeftColor: trans,
				borderRightColor: white,
			},
			{
				borderBottomColor: trans,
				borderTopColor: white,
				borderRightColor: trans,
				borderLeftColor: trans,
			},
		],
		{
			// timing options
			duration: 3000,
			iterations: 1,
			easing: 'linear',
		}
	);
}
const resize = ({ target }) => {
	if (target.innerWidth > 410) {
		hamburger.style.display = 'none';
		menu.style.display = 'none';
	} else {
		hamburger.style.display = 'block';
		menu.style.display = 'block';
	}
};

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	let innerWidth = window.innerWidth;
	let currentScrollPos = window.pageYOffset;
	if (prevScrollpos > currentScrollPos) {
		header.style.top = '0';
		if (innerWidth <= 410) {
			hamburger.style.display = 'block';
			menu.style.display = 'block';
		}
	} else {
		header.style.top = '-5em';
		if (innerWidth <= 410) {
			hamburger.style.display = 'none';
			menu.style.display = 'none';
		}
	}
	prevScrollpos = currentScrollPos;
};
window.addEventListener('resize', resize, true);
