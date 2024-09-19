

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const navBarSection = ['Section 1', 'Section 2', 'Section 3'];
const ul = document.querySelector('#navbar__list');

// Build the navigation dynamically

for (let i = 0; i < navBarSection.length; i++) {
    const li = document.createElement('li');
    const linkItem = document.createElement('a');
    const sectionId = `section${i + 1}`; 
    linkItem.href = `#${sectionId}`;
    linkItem.textContent = navBarSection[i];
    
    // Add class to link
    linkItem.classList.add('menu__link');

    // Add click event listener for smooth scrolling
    linkItem.addEventListener('click', function(event) {
        event.preventDefault(); 
        document.querySelector(linkItem.getAttribute('href')).scrollIntoView({
            behavior: 'smooth' // Smooth scrolling
        });
    });

    li.appendChild(linkItem); 
    ul.appendChild(li); 
}

// Scroll detection function to set active section
function setActiveSection() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.menu__link');

    let currentSection = '';

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        
        // Add 'active' class to the section when it is near the top of the viewport
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            currentSection = section.id;
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    // Remove 'active' class from all nav items
    navItems.forEach(nav => nav.classList.remove('active'));

    // Add 'active' class to the corresponding nav item
    const activeNavItem = Array.from(navItems).find(nav => nav.getAttribute('href') === `#${currentSection}`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}
window.addEventListener('scroll', setActiveSection);




////////////Hide fixed navigation bar while not scrolling (it should still be present on page load).
let isScrolling;
const navBar = document.querySelector('.page__header'); 
function hideNavBar() {
    navBar.style.opacity = '0';  
    navBar.style.pointerEvents = 'none';  
}

function showNavBar() {
    navBar.style.opacity = '1';  
    navBar.style.pointerEvents = 'auto'; 
}

window.addEventListener('scroll', function() {
    showNavBar();

    clearTimeout(isScrolling);

    isScrolling=setTimeout(() => {
        hideNavBar(); 
    }, 2000);

});

showNavBar();



// Add a scroll to top button on the page that’s only visible when the user scrolls below the fold of the page.
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', ()=> {
    if (window.scrollY > window.innerHeight / 2) {
        scrollToTopBtn.style.display = 'block'; 
    } else {
        scrollToTopBtn.style.display = 'none';  
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});



// Select all sections on the page
const sections = document.querySelectorAll('section');

sections.forEach((section) => {
    // Create the collapse/expand button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'collapse-toggle';
    toggleButton.textContent = 'Collapse Section';

    // Insert the button at the top of each section
    section.insertBefore(toggleButton, section.firstChild);

    // Add a wrapper div for the section content
    const sectionContent = document.createElement('div');
    sectionContent.className = 'section-content';

    // Move all child nodes of the section (except the toggle button) into the content wrapper
    while (section.childNodes.length > 1) {
        sectionContent.appendChild(section.childNodes[1]);
    }
    section.appendChild(sectionContent);

    // Event listener for toggling collapse/expand
    toggleButton.addEventListener('click', function() {
        // Toggle the 'collapsed' class to show/hide content
        sectionContent.classList.toggle('collapsed');

        // Update button text based on the state
        if (sectionContent.classList.contains('collapsed')) {
            toggleButton.textContent = 'Expand Section';
        } else {
            toggleButton.textContent = 'Collapse Section';
        }
    });
});

const style = document.createElement('style');
style.textContent = `
    /* Initially, the content is visible */
    .section-content {
        overflow: hidden;
        transition: max-height 0.4s ease-out;
        max-height: 1000px; /* A large enough value to display all content */
    }

    /* When collapsed, set max-height to 0 to hide the content */
    .section-content.collapsed {
        max-height: 0;
    }

    /* Styling for the collapse/expand button */
    .collapse-toggle {
        display: inline-block;
        background-color: #cccc11;
        color: white;
        border: none;
        padding: 5px 10px;
        margin-bottom: 10px;
        cursor: pointer;
        border-radius: 3px;
    }

    .collapse-toggle:hover {
        background-color: #5c5c28 ;
    }
`;
document.head.appendChild(style);

