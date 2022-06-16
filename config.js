'use strict';
document.addEventListener('DOMContentLoaded', () => {

	const bannerLength = document.getElementById('rec378059527').querySelectorAll('.t-input')[0];							// Ширина баннера
	const bannerWidth = document.getElementById('rec378059527').querySelectorAll('.t-input')[1];								// Длинна баннера
	const bannerEyelets = document.getElementById('rec378059527').querySelectorAll('.t-select_bbonly')[0];				// Люверсы
	const bannerEyeletsSumm = document.getElementById('rec378059527').querySelectorAll('.t-calc')[0];						// Необходимое количество люверсов
	const bannerSizing = document.getElementById('rec378059527').querySelectorAll('.t-select_bbonly')[1];					// Проклейка
	const bannerQuantity = document.getElementById('rec378059527').querySelectorAll('.t-input')[2];							// Выберете количество (значение)
	const bannerQuantityBtns = document.getElementById('rec378059527').querySelectorAll('.t-inputquantity__btn');		// Выберете количество (кнопки)
	const bannerPrice = document.getElementById('rec378059527').querySelectorAll('.t-calc')[1];								// Стоимость
	const bannerPriceHidden = document.getElementById('rec378059527').querySelectorAll('.t-calc__hiddeninput')[1];		// Стоимость (скрытое поле)
	const bannerOrder = document.getElementById('rec378059527').querySelectorAll('.t-submit')[0];							// Заказать (кнопка)


	const posterLength =  document.getElementById('rec378059527').querySelectorAll('.t-input')[0];							// Ширина плаката
	const posterWidth = document.getElementById('rec378059527').querySelectorAll('.t-input')[1];								// Длинна баннера

	const timeout = 200;


	// bannerLength.setAttribute( 'type', 'number' );
	// bannerWidth.setAttribute( 'type', 'number' );


	function formCheck( element,  event ) {
		element.addEventListener( event, () => {
			elementHide( bannerEyeletsSumm );
			elementHide( bannerPrice.parentNode );
			// checkInput( element );
			if (e.which != 8 && e.which != 0 && e.which < 48 || e.which > 57) {
				e.preventDefault();
			}
			if( bannerEyelets.value === 'Нет') {
				let checkEyeletsSumm = setInterval(() => {
					if( parseInt(bannerEyeletsSumm.textContent) >= 0 ) {
						clearInterval(checkEyeletsSumm);
						bannerEyeletsSumm.innerHTML = '0';
						setTimeout(() => {
							bannerEyeletsSumm.innerHTML = '0';
							elementShow(bannerEyeletsSumm);
							elementShow(bannerPrice.parentNode);
						}, timeout);
					}
				}, timeout);
			}
			else {
				setTimeout(() => {
					bannerEyeletsSumm.innerHTML = Math.ceil( parseInt( bannerEyeletsSumm.textContent ) ) + 1;
					elementShow(bannerEyeletsSumm);
					elementShow(bannerPrice.parentNode);
				}, timeout);
			}

			let checkPrice = setInterval(() => {
				if( parseInt(bannerLength.value) < 1 || parseInt(bannerWidth.value) < 1 || bannerLength.value == '' || bannerWidth.value == '' ) {
					clearInterval(checkPrice);
					bannerPrice.innerHTML = '0';
				}
				else {
					clearInterval(checkPrice);
					bannerPrice.removeAttribute("data-calc-expr");
					setPrice();
				}
			}, timeout);
		});
	}

	function checkInput(element) {
		element.addEventListener("keypress", function (e) {
			if (e.which != 8 && e.which != 0 && e.which < 48 || e.which > 57) {
				e.preventDefault();
			}
		});
	}

	function quantityBtn(buttons) {
		for( let quantityBtn of buttons ) {
			quantityBtn.addEventListener('click', () => {
				elementHide(bannerPrice.parentNode);
				setPrice();
				elementShow(bannerPrice.parentNode);
			})
		}
	}

	function setPrice() {
		setTimeout(() => {
			bannerPrice.innerHTML = Math.ceil( parseInt( bannerPrice.textContent ) ) + 1;
			bannerPriceHidden.value = parseInt( bannerPrice.textContent );
			bannerOrder.setAttribute( 'href', `#order:${document.getElementById('rec378059527').querySelectorAll('.t-calc__hidden__prod_title')[0].value}=${parseInt( bannerPrice.textContent )}` );
		}, timeout);
	}

	function elementShow(element) {
		setTimeout(() => {
			element.style = 'visibility: visible;';
		}, timeout*2);
	}

	function elementHide(element) {
			element.style = 'visibility: hidden;';
	}

	formCheck(bannerLength, 'keypress');
	formCheck(bannerWidth, 'keypress');
	formCheck(bannerEyelets, 'change');
	formCheck(bannerSizing, 'change');
	formCheck(bannerQuantity, 'keypress');
	quantityBtn(bannerQuantityBtns);

});
