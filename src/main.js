document.addEventListener('DOMContentLoaded', () => {
    // custom tabs
    const tabsBuilder = (blockSelector, controlSelector, contentSelector, activeIndex = 0) => {
        const removeDots = (classStr) => classStr.replace('.', '');
        try {
            const tabBlockElement = document.querySelector(blockSelector);
            const controlElements = tabBlockElement.querySelectorAll(controlSelector);
            const contentElements = tabBlockElement.querySelectorAll(contentSelector);
            const classControlActive = removeDots(controlSelector + '_active');
            const classContentActive = removeDots(contentSelector + '_active');

            if (controlElements.length !== contentElements.length) throw new Error('Несоответствие вкладок');

            const closeAll = () => {
                controlElements.forEach((elem, index) => {
                    elem.classList.remove(classControlActive);
                    contentElements[index].classList.remove(classContentActive);
                });
            };
            const open = (event, index) => {
                event.preventDefault();
                const parent = event.target.closest(controlSelector);
                closeAll();
                parent.classList.add(classControlActive);
                contentElements[index].classList.add(classContentActive);
            };
            closeAll();
            controlElements[activeIndex].classList.add(classControlActive);
            contentElements[activeIndex].classList.add(classContentActive);
            controlElements.forEach((elem, index) => elem.addEventListener('click', (e) => open(e, index)));
        } catch (e) {
            console.log('Ошибка в DOM: ', e.message);
        }
    };

    tabsBuilder('.custom-tab', '.custom-tab__control', '.custom-tab__content');
});
