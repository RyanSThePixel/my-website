export default function createReadMore(block) {
    /* --Main container element-- */
    const container = document.createElement('div');
    container.classList.add('read-more-container');

    /* --Iterator to identify each row-- */
    var rowIterator = 1;
    var divCounter = 0;
    [...block.children].forEach((row) => {
        /* --Incrementing the iterator for each row-- */
        const i = rowIterator++;
        const x = divCounter++;

        /* --Main content container-- */
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');

        /* --Container for the main content-- */
        const fullContent = document.createElement('div');
        fullContent.id = 'content-' + i;
        fullContent.classList.add('full-content');

        // Set aria-hidden initially based on the content index
        fullContent.setAttribute('aria-hidden', x === 2 ? 'true' : 'false');

        // Set the innerText of fullContent to the block's innerText
        fullContent.innerText = block.children[x].innerText;

        contentContainer.append(fullContent);
        container.append(contentContainer);
    });

    /* --Re-setting the auto-generated block-- */
    block.textContent = '';

    /* --Attaching the newly created element to the block-- */
    block.append(container);
    toggleReadMore();
}

function toggleReadMore() {
    /* --All "read more" buttons-- */
    const readMoreButtons = document.querySelectorAll('[id^="read-more-control-"]');
    readMoreButtons.forEach((button) => {
        button.addEventListener('click', function (e) {
            var control = this;
            var contentId = control.getAttribute('aria-controls');

            var isAriaExp = control.getAttribute('aria-expanded');
            var newAriaExp = (isAriaExp === "false") ? "true" : "false";
            control.setAttribute('aria-expanded', newAriaExp);

            /* --Getting the content and checking its visibility-- */
            var isAriaHid = document.getElementById(contentId).getAttribute('aria-hidden');
            var contentElement = document.getElementById(contentId);

            /* --Toggling the special classes for styling purposes-- */
            contentElement.classList.toggle('active');

            /*Setting accessibility properties according to the current state*/
            if (isAriaHid === "true") {
                contentElement.setAttribute('aria-hidden', "false");
            } else {
                contentElement.setAttribute('aria-hidden', "true");
            }
        });
    });
}
