// script.js

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 1.5) + 0.5;
        let x = Math.random() * (innerWidth - size * 2) + size * 2;
        let y = Math.random() * (innerHeight - size * 2) + size * 2;
        let directionX = (Math.random() * .4) - .2;
        let directionY = (Math.random() * .4) - .2;
        let color = 'rgba(255, 255, 255, 0.15)';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    particlesArray.forEach(p => p.update());
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    initParticles();
});

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
let countdownInterval;

function getLaunchDate() {
    const storedDate = localStorage.getItem('launchDate');
    if (storedDate && new Date(storedDate) > new Date()) return new Date(storedDate);
    const newDate = new Date();
    const randomDays = Math.floor(Math.random() * 8) + 7;
    newDate.setDate(newDate.getDate() + randomDays);
    localStorage.setItem('launchDate', newDate.toISOString());
    return newDate;
}

function startCountdown() {
    const launchDate = getLaunchDate();
    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = launchDate.getTime() - now;
        if (distance < 0) {
            clearInterval(countdownInterval);
            localStorage.removeItem('launchDate');
            startCountdown();
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = String(days).padStart(2, '0');
        hoursEl.innerText = String(hours).padStart(2, '0');
        minutesEl.innerText = String(minutes).padStart(2, '0');
        secondsEl.innerText = String(seconds).padStart(2, '0');
    }, 1000);
}

startCountdown();

const getInTouchTrigger = document.getElementById('get-in-touch-trigger');
const contactDetails = document.getElementById('contact-details');
const emailLink = document.getElementById('contact-email');
const phoneLink = document.getElementById('contact-phone');
let swapInterval = null;

function setSwapValues() {
    if (!emailLink || !phoneLink || !contactDetails) return;
    if (window.innerWidth < 768) {
        contactDetails.style.setProperty('--email-translate-x', '0px');
        contactDetails.style.setProperty('--phone-translate-x', '0px');
        return;
    }
    const emailWidth = emailLink.offsetWidth;
    const phoneWidth = phoneLink.offsetWidth;
    const gap = 32;
    contactDetails.style.setProperty('--email-translate-x', `${phoneWidth + gap}px`);
    contactDetails.style.setProperty('--phone-translate-x', `-${emailWidth + gap}px`);
}

window.addEventListener('load', setSwapValues);
window.addEventListener('resize', setSwapValues);

getInTouchTrigger.addEventListener('mouseenter', () => {
    if (swapInterval) clearInterval(swapInterval);
    if (window.innerWidth < 768) return;
    swapInterval = setInterval(() => {
        contactDetails.classList.toggle('swapped');
    }, 1200);
});

getInTouchTrigger.addEventListener('mouseleave', () => {
    if (swapInterval) clearInterval(swapInterval);
    swapInterval = null;
});
