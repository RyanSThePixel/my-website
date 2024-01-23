export default function createPaging(block, pageSize = 1) {
    const container = document.createElement('div');
    container.classList.add('paging-container');

    var divCounter = 0;
    const pages = [];

    // Split content into pages
    [...block.children].forEach((row) => {
        const x = divCounter++;

        const fullContent = document.createElement('div');
        fullContent.id = 'content-' + x;
        fullContent.classList.add('full-content');
        fullContent.innerHTML = block.children[x].innerHTML;

        if (!pages[Math.floor(x / pageSize)]) {
            pages[Math.floor(x / pageSize)] = [];
        }
        pages[Math.floor(x / pageSize)].push(fullContent);
    });

    let currentPageIndex = 0;

    let maxPageCounters = 2 ;

    // Function to create buttons
    function createButtons() {
        // Add "Previous" button
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&#9666;'; // Unicode for left arrow
        prevButton.classList.add('arrow-button');
        prevButton.style.display = currentPageIndex === 0 ? 'none' : 'block';
        prevButton.addEventListener('click', () => {
            if (currentPageIndex > 0) {
                showPage(currentPageIndex - 1);
            }
            createButtons();
        });

        container.appendChild(prevButton);

        let ellipsesAdded = false;

        for (let i = 0; i < pages.length; i++) {
            const pageCounterButton = document.createElement('button');
            pageCounterButton.innerText = i + 1; // Page numbers start from 1
            pageCounterButton.classList.add('page-counter-button');
            pageCounterButton.addEventListener('click', () => {
                showPage(i);
                createButtons();
            });

            const isInRange = i <= currentPageIndex + maxPageCounters && i >= currentPageIndex - maxPageCounters;

            if (i === 0 || i === currentPageIndex || i === pages.length - 1 || isInRange) {
                container.appendChild(pageCounterButton);
                ellipsesAdded = false;
            } else if (!ellipsesAdded && i < currentPageIndex - maxPageCounters) {
                const ellipsisButton = document.createElement('button');
                ellipsisButton.innerText = '...';
                ellipsisButton.classList.add('ellipsis-button');
                container.appendChild(ellipsisButton);
                ellipsesAdded = true;
            } else if (!ellipsesAdded && i > currentPageIndex + maxPageCounters) {
                const ellipsisButton = document.createElement('button');
                ellipsisButton.innerText = '...';
                ellipsisButton.classList.add('ellipsis-button');
                container.appendChild(ellipsisButton);
                ellipsesAdded = true;
            }
        }

        const nextButton = document.createElement('button');
        nextButton.innerHTML = '&#8594;';
        nextButton.classList.add('arrow-button');
        nextButton.style.display = currentPageIndex === pages.length - 1 ? 'none' : 'block';
        nextButton.addEventListener('click', () => {
            if (currentPageIndex < pages.length - 1) {
                showPage(currentPageIndex + 1);
            }
            createButtons();
        });

        container.appendChild(nextButton);
    }

    // Initial display
    showPage(currentPageIndex);
    createButtons();

    // Function to show a specific page
    function showPage(pageIndex) {
        container.innerHTML = '';
        container.append(...pages[pageIndex]);
        currentPageIndex = pageIndex;
    }

    block.textContent = '';
    block.appendChild(container);
}
