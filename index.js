const circleProgressContainer = document.querySelector('.circle-slider-progress');
const sliderRightMoveBtn = document.querySelector('.arrow-moves-container:nth-of-type(2)');
const sliderLeftMoveBtn = document.querySelector('.arrow-moves-container:first-of-type');
const sliderImgsContainer = document.querySelector('.slider-imgs-container');
const sliderImgs = document.querySelectorAll('.slider-imgs-container>figure>img');

// help dynamically add photos circle Progress
circleProgressContainer.innerHTML += `
<svg xmlns="http://www.w3.org/2000/svg" width='1rem' height='1rem' fill="currentColor"
class="bi bi-circle-fill" viewBox = "0 0 16 16" >
<circle cx="8" cy="8" r="8" />
</svg >
`
for (let i = 0; i < sliderImgs.length - 1; i++) {
    circleProgressContainer.innerHTML += `            <svg xmlns="http://www.w3.org/2000/svg" width='.8rem' height='.8rem' fill="currentColor"
    class="bi bi-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
    </svg>
    `
}
// end of help dynamically add photos circle Progress

const sliderProgressCircles = document.querySelectorAll('.circle-slider-progress>svg');

// arrow moves 

let moveSize = 0;
let imageIndex = 0;
// move right 
sliderRightMoveBtn.addEventListener('click', () => {
    if (sliderImgs.length - 1 > imageIndex) {
        imageIndex++
        moveSize += window.innerWidth;
        sliderImgsContainer.style.left = `-${moveSize}px`;
        circleReset(imageIndex);
    } else {
        moveSize = 0;
        imageIndex = 0;
        sliderImgsContainer.style.left = `-${moveSize}px`;
        circleReset(imageIndex);
    }
})
// end of move right 

// move left 
sliderLeftMoveBtn.addEventListener('click', () => {
    if (imageIndex > 0) {
        imageIndex--
        moveSize -= window.innerWidth;
        sliderImgsContainer.style.left = `-${moveSize}px`;
        circleReset(imageIndex);
    } else {
        imageIndex = sliderImgs.length - 1;
        moveSize = (sliderImgs.length - 1) * window.innerWidth;
        sliderImgsContainer.style.left = `-${moveSize}px`;
        circleReset(imageIndex);
    }
})
// end of move left 

// end of arrow moves 


// circle moves

sliderProgressCircles.forEach((circle, index) => {
    circle.addEventListener('click', () => {
        imageIndex = index;
        moveSize = window.innerWidth * index;
        sliderImgsContainer.style.left = `-${moveSize}px`;
        circleReset(index);
    })
})

function circleReset(index) {
    sliderProgressCircles.forEach(circle => {
        circle.setAttribute('width', '.8rem');
        circle.setAttribute('height', '.8rem');
        circle.innerHTML.includes('<circle') && (circle.innerHTML = '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />');
    });
    sliderProgressCircles[index].setAttribute('width', '1rem');
    sliderProgressCircles[index].setAttribute('height', '1rem');
    sliderProgressCircles[index].innerHTML = '<circle cx="8" cy="8" r="8" />';
}

// end of circle moves 


// Automatic moves

const slider = document.querySelector('.slider');
let autoMove;
autoMoves();

function autoMoves() {
    autoMove = setInterval(() => {
        if (sliderImgs.length - 1 > imageIndex) {
            imageIndex++
            moveSize = window.innerWidth * imageIndex;
            sliderImgsContainer.style.left = `-${moveSize}px`;
            circleReset(imageIndex);
        } else {
            imageIndex = 0;
            moveSize = window.innerWidth * imageIndex;
            sliderImgsContainer.style.left = `-${moveSize}px`;
            circleReset(imageIndex);
        }
    }, 5000)
}

slider.addEventListener('mouseout', () => {
    autoMoves()
})
slider.addEventListener('mouseover', () => {
    clearInterval(autoMove)
})

// end of Automatic moves 