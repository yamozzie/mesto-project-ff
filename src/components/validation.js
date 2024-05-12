const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity('')
    };

	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, validationConfig, inputElement.validationMessage)
	} else {
		hideInputError(formElement, inputElement, validationConfig)
	};
};

const showInputError = (formElement, inputElement, validationConfig, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(validationConfig.inputErrorClass);
	errorElement.classList.add(validationConfig.errorClass);
	errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, validationConfig) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(validationConfig.inputErrorClass);
	errorElement.classList.remove(validationConfig.errorClass);
	errorElement.textContent = "";
}

const hasValidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid
	})
}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
	if (hasValidInput(inputList)) {
		buttonElement.classList.add(validationConfig.inactiveButtonClass)
	} else {
		buttonElement.classList.remove(validationConfig.inactiveButtonClass)
	}
}

const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector('.popup__button')
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig)
        });
    });
}

export {validationConfig, setEventListeners}