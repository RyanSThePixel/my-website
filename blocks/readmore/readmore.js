export default function createReadMore(block) {
    const container = document.createElement('div');
    container.classList.add('read-more-container');

    var rowIterator = 1;
    var divCounter = 0;
    [...block.children].forEach((row) => {
        const i = rowIterator++;
        const x = divCounter++;

        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');

        const fullContent = document.createElement('div');
        fullContent.id = 'content-' + i;
        fullContent.classList.add('full-content');

        // Set the innerHTML of fullContent to the block's innerHTML to preserve formatting
        fullContent.innerHTML = block.children[x].innerHTML;

        contentContainer.append(fullContent);

        // Add "Read More" functionality
        const readMoreButton = document.createElement('button');
        readMoreButton.innerText = 'Read More';
        readMoreButton.addEventListener('click', () => toggleReadMore(fullContent, readMoreButton));
        contentContainer.append(readMoreButton);

        container.append(contentContainer);
    });

    block.textContent = '';
    block.append(container);
}

function toggleReadMore(fullContent, readMoreButton) {
    if (fullContent.classList.contains('show-full-content')) {
        fullContent.classList.remove('show-full-content');
        readMoreButton.innerText = 'Read More';
    } else {
        fullContent.classList.add('show-full-content');
        readMoreButton.innerText = 'Show Less';
    }
}
