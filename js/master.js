// Check If There's Colors On LocalStorage
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {  
    document.documentElement.style.setProperty('--main-color', mainColors)

    // Remove Active Class From All Childrens
    // e.target.parentElement.querySelectorAll('.colors-list li').forEach(element => {
    //     element.classList.remove('active');
        // Add Active Class On Element With Data Color === LocalStorage Item
        // if(element.dataset.color === mainColors){
            // Add Active Class
            // element.classList.add('active')
    //     }
    // })
} 

// Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgroundInterval;

// Toggle Sping Class On Icon
document.querySelector('.toggle-settings i').onclick = function () {
    // Toggle Class Fa-spin For Rotation On Self
    this.classList.toggle('fa-spin');
    // Toggle Class Open On Main Settings Box
    document.querySelector('.settings-box').classList.toggle("open")
}

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li")
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        // Set Root Color
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
        // Set Color On LocalStorage
        localStorage.setItem("color_option", e.target.dataset.color)

        
        colorsLi.forEach(li => {
            li.classList.remove('active')
            e.target.classList.add('active')
        })
    })
})

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// Loop On All Spans
randomBackEl.forEach(span => {
    // Click On Every Span 
    span.addEventListener("click", (e) => {
        // Remove Active Class From All Spans
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove('active')
        })
        // Add Active Class On Self
        e.target.classList.add('active')
        if(e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
        }
    })
})

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function To Randomize Imgs
function randomizeImgs() {
    if(backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            // Change Background Image Url
            landingPage.style.backgroundImage = `url('imgs/${imgsArray[randomNumber]}')`;
        }, 10000);
    }
}
randomizeImgs();


// Select Skills Selector 
let ourSkills = document.querySelector('.skills');

window.onscroll = function() {
    // Skills Offset Top 
    let skillsOffseTop =  ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeihgt = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;
    
    // Window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOffseTop + skillsOuterHeihgt - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })
    }
}

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        // Create Overlay Element
        let overlay = document.createElement('div');
        // Add Class To Overlay
        overlay.className = 'popup-overlay';
        // Append Overlay To The Body
        document.body.appendChild(overlay); 
        // Create The Popup
        let popupBox = document.createElement('div');
        // Add Class To The Popup Box
        popupBox.className = 'popup-box';
        if(img.alt !== null) {
            // Create Heading
            let imgHeading = document.createElement("h3");
            // Create Text For Heading
            let imgText = document.createTextNode(img.alt);
            // Append The Text To The Heaing
            imgHeading.appendChild(imgText);
            // Append The Heading To Popup Box
            popupBox.appendChild(imgHeading);
        }
        // Create The Image 
        let popupImage = document.createElement("img");
        // Set Image Source
        popupImage.src = img.src;
        // Add Image To Popup Box
        popupBox.appendChild(popupImage);
        // Append The Popup Box To The Body
        document.body.appendChild(popupBox);
        // Create Close Span
        let closeButton = document.createElement('span');
        // Create The Close Button Text
        let closeButtonText = document.createTextNode('X');
        // Append Text To Close Button 
        closeButton.appendChild(closeButtonText);
        // Add Class To Close Button 
        closeButton.className = 'close-button';
        // Add Close Button To Popup Box
        popupBox.appendChild(closeButton)
    })
})

// Close Popup
document.addEventListener("click", function (e) {
    if(e.target.className == 'close-button') {
        // Remove The Current Popup
        e.target.parentNode.remove();
        // Remove Overlay
        document.querySelector(".popup-overlay").remove()
    }
})

const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");
function scrollToSomeWhere(elements) {
    elements.forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}
scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

let bulletsSpan = document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets');

let bulletLocalItem = localStorage.getItem("bullets_option");
if(bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove('active');
    })
    if(bulletLocalItem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector('.bullets-option .yes').classList.add('active');
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector('.bullets-option .no').classList.add('active');
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {    
        if(span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option", 'block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option", 'none');
        }
        bulletsSpan.forEach(span => {
            span.classList.remove('active')
            e.target.classList.add('active')
        })
    })

})

// Reset Button 
document.querySelector('.reset-options').onclick = function () {
    localStorage.clear();
    window.location.reload()
}

// Toggle Menu
let toggleButton = document.querySelector('.toggle-menu');
let link = document.querySelector(".links");
toggleButton.onclick = function (e) {
    // Stop Propagation
    e.stopPropagation()
    // Toggle Class "menu-active" On Button 
    this.classList.toggle('menu-active');
    // Toggle Class "open" On Links
    link.classList.toggle('open');
}

// Click Any Where Outside Menu And Toggle Button
document.addEventListener('click', (e) => {
    if(e.target !== toggleButton && e.target !== link) {
        // Check if menu is opened
        if(link.classList.contains("open")) {
            // Toggle Class "menu-active" On Button 
            toggleButton.classList.toggle('menu-active');
            // Toggle Class "open" On Links
            link.classList.toggle('open');
        }
    }
}) 

// Stop Propagtion On Menu
link.onclick = function(e) {
    e.stopPropagation()
} 