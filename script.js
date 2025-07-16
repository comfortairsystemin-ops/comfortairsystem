/* style.css */

body {
    font-family: 'Montserrat', sans-serif;
    overflow-x: hidden;
}
.premium-black-bg {
    background: #0a0a0a;
    position: relative;
}
.content-overlay {
    position: relative;
    z-index: 10;
}
#particle-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}
.logo-container {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 2s ease-in-out;
}
.countdown-box {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.countdown-box:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}
.animate-fade-in-up {
    animation: fadeInUp 1.5s ease-in-out forwards;
    opacity: 0;
}
.animate-fade-in {
    animation: fadeIn 2s ease-in-out forwards;
    opacity: 0;
}
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
@keyframes pulse {
    0%, 100% { stroke: rgba(255, 255, 255, 0.2); transform: scale(1); }
    50% { stroke: rgba(147, 197, 253, 0.6); transform: scale(1.02); }
}
.logo-pulse {
    animation: pulse 4s ease-in-out infinite;
    transform-origin: center;
}
#get-in-touch-trigger {
    cursor: pointer;
}
#contact-email, #contact-phone {
    transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
#contact-details.swapped #contact-email {
    transform: translateX(var(--email-translate-x, 0px));
}
#contact-details.swapped #contact-phone {
    transform: translateX(var(--phone-translate-x, 0px));
}
.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }
.delay-4 { animation-delay: 0.8s; }
.delay-5 { animation-delay: 1s; }
.delay-6 { animation-delay: 1.2s; }
.delay-7 { animation-delay: 1.4s; }
