export default function decorate(block) {

    [...block.children].forEach((row) => {

        const contentHeight = 100;
        const fullHeight = contentCol.scrollHeight;

        if (fullHeight > contentHeight) {
            const readMoreLink = document.createElement('a');
            readMoreLink.href = '#';
            readMoreLink.textContent = 'Read More';
            readMoreLink.classList.add('read-more-link');

            contentCol.style.maxHeight = contentHeight + 'px';
            contentCol.style.overflow = 'hidden';
            titleCol.appendChild(readMoreLink);
            readMoreLink.addEventListener('click', function (event) {
                event.preventDefault();

                if (contentCol.style.maxHeight === contentHeight + 'px') {
                    contentCol.style.maxHeight = fullHeight + 'px';
                } else {
                    contentCol.style.maxHeight = contentHeight + 'px';
                }
            });
        }
    });
}
