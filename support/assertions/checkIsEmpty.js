import {checkContainsAnyText} from './checkContainsAnyText';

export function checkIsEmpty (elementType, element, falseCase) {
    let newFalseCase = true;

    if (typeof falseCase === 'function') {
        newFalseCase = false;
    } else if (falseCase === ' not') {
        newFalseCase = false;
    }

    checkContainsAnyText(elementType, element, newFalseCase);
};
