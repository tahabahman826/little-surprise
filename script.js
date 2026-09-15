/* =========================================================
   LITTLE SURPRISE
   I'M SORRY, MAHDIA
   CINEMATIC JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
   ========================================================= */

const cardWrap = document.getElementById("cardWrap");
const openButton = document.getElementById("openButton");

const typedText = document.getElementById("typedText");
const typingCursor = document.getElementById("typingCursor");

const signature = document.getElementById("signature");

const finalScreen = document.getElementById("finalScreen");
const restartButton = document.getElementById("restartButton");

const particleLayer =
    document.getElementById("particleLayer");

const bottomHint =
    document.getElementById("bottomHint");

const shootingStars =
    document.querySelector(".shooting-stars");

const starLayers =
    document.querySelectorAll(".stars");


/* =========================================================
   LETTER
   ========================================================= */

const letterText =
`I know I made a mistake.

And I'm truly sorry.

I never wanted to make you feel bad.
You mean a lot to me.

Sometimes saying "I'm sorry"
isn't enough...

So I made this little surprise
just to say it properly. 💜`;


/* =========================================================
   STATE
   ========================================================= */

let isOpen = false;
let isTyping = false;

let typingTimer = null;

let floatingHeartTimer = null;
let cometTimer = null;


/* =========================================================
   STAR FIELD
   ========================================================= */

function createStars() {

    starLayers.forEach((layer, layerIndex) => {

        const amount =
            layerIndex === 0
                ? 65
                : layerIndex === 1
                    ? 45
                    : 30;


        for (let i = 0; i < amount; i++) {

            const star =
                document.createElement("span");

            star.className = "star";

            star.style.left =
                `${Math.random() * 100}%`;

            star.style.top =
                `${Math.random() * 100}%`;

            star.style.setProperty(
                "--duration",
                `${2 + Math.random() * 5}s`
            );

            star.style.animationDelay =
                `${Math.random() * 5}s`;


            const size =
                layerIndex === 2
                    ? 1 + Math.random() * 2
                    : 0.7 + Math.random() * 1.4;

            star.style.width =
                `${size}px`;

            star.style.height =
                `${size}px`;


            layer.appendChild(star);
        }

    });
}


/* =========================================================
   SHOOTING STARS
   ========================================================= */

function createComet() {

    if (!shootingStars) return;


    const comet =
        document.createElement("span");

    comet.className = "comet";


    comet.style.left =
        `${65 + Math.random() * 35}%`;

    comet.style.top =
        `${5 + Math.random() * 45}%`;


    comet.style.animationDuration =
        `${2.2 + Math.random() * 1.8}s`;


    shootingStars.appendChild(comet);


    setTimeout(() => {

        comet.remove();

    }, 4500);
}


function startComets() {

    createComet();

    cometTimer =
        setInterval(
            createComet,
            4800
        );
}


/* =========================================================
   PARTICLES
   ========================================================= */

function createParticle(
    x,
    y,
    symbol = null
) {

    if (!particleLayer) return;


    const particle =
        document.createElement("span");

    particle.className =
        "particle";


    if (symbol) {

        particle.textContent = symbol;

        particle.style.width = "auto";
        particle.style.height = "auto";

        particle.style.background =
            "transparent";

        particle.style.boxShadow =
            "none";

        particle.style.fontSize =
            `${10 + Math.random() * 13}px`;
    }


    particle.style.left =
        `${x}px`;

    particle.style.top =
        `${y}px`;


    const angle =
        Math.random() * Math.PI * 2;

    const distance =
        70 + Math.random() * 150;


    particle.style.setProperty(
        "--x",
        `${Math.cos(angle) * distance}px`
    );

    particle.style.setProperty(
        "--y",
        `${Math.sin(angle) * distance}px`
    );


    particle.style.animationDuration =
        `${1 + Math.random() * .8}s`;


    particleLayer.appendChild(particle);


    setTimeout(() => {

        particle.remove();

    }, 2200);
}


/* =========================================================
   BURST
   ========================================================= */

function particleBurst(
    x,
    y,
    amount = 22
) {

    for (let i = 0; i < amount; i++) {

        createParticle(x, y);

    }


    for (let i = 0; i < 5; i++) {

        createParticle(
            x,
            y,
            "♥"
        );
    }
}


/* =========================================================
   BUTTON BURST
   ========================================================= */

function buttonBurst(button) {

    const rect =
        button.getBoundingClientRect();


    particleBurst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        18
    );
}


/* =========================================================
   TYPEWRITER
   ========================================================= */

function startTyping() {

    if (isTyping) return;


    isTyping = true;

    typedText.textContent = "";

    signature.classList.remove("show");


    let index = 0;


    function typeNext() {

        if (!isOpen) return;


        if (index < letterText.length) {

            typedText.textContent +=
                letterText[index];

            index++;


            const speed =
                letterText[index - 1] === "\n"
                    ? 180
                    : letterText[index - 1] === "."
                        ? 180
                        : 30;


            typingTimer =
                setTimeout(
                    typeNext,
                    speed
                );

        } else {

            isTyping = false;

            typingCursor.style.display =
                "none";


            setTimeout(() => {

                signature.classList.add(
                    "show"
                );

            }, 350);

            setTimeout(() => {

                showFinal();

            }, 4000);
        }
    }


    typeNext();
}


/* =========================================================
   OPEN LETTER
   ========================================================= */

function openLetter() {

    if (isOpen) return;


    isOpen = true;


    buttonBurst(openButton);


    cardWrap.classList.add("open");


    if (bottomHint) {

        bottomHint.style.opacity = "0";

    }


    openButton.disabled = true;


    setTimeout(() => {

        if (!isOpen) return;

        startTyping();

    }, 850);


    startFloatingHearts();
}


/* =========================================================
   FLOATING HEARTS
   ========================================================= */

function createFloatingHeart() {

    if (!particleLayer) return;


    const heart =
        document.createElement("span");

    heart.textContent =
        Math.random() > .5
            ? "♥"
            : "✦";


    heart.style.position =
        "absolute";


    heart.style.left =
        `${20 + Math.random() * 60}%`;

    heart.style.top =
        `${70 + Math.random() * 20}%`;


    heart.style.color =
        Math.random() > .5
            ? "#bda8ff"
            : "#f0d9ff";


    heart.style.fontSize =
        `${9 + Math.random() * 12}px`;


    heart.style.opacity =
        `${0.25 + Math.random() * .45}`;


    heart.style.pointerEvents =
        "none";


    heart.style.animation =
        "heartRise 3.5s ease-out forwards";


    particleLayer.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 4000);
}


function startFloatingHearts() {

    if (floatingHeartTimer) return;


    floatingHeartTimer =
        setInterval(
            createFloatingHeart,
            900
        );
}


/* =========================================================
   FINAL SCREEN
   ========================================================= */

function showFinal() {

    if (!isOpen) return;


    finalScreen.classList.add("show");

    finalScreen.setAttribute(
        "aria-hidden",
        "false"
    );


    particleBurst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        35
    );


    for (let i = 0; i < 8; i++) {

        setTimeout(() => {

            createFloatingHeart();

        }, i * 130);
    }
}


/* =========================================================
   RESTART
   ========================================================= */

function restart() {

    clearTimeout(typingTimer);


    isOpen = false;
    isTyping = false;


    if (floatingHeartTimer) {

        clearInterval(
            floatingHeartTimer
        );

        floatingHeartTimer = null;
    }


    typedText.textContent = "";


    signature.classList.remove(
        "show"
    );


    typingCursor.style.display =
        "inline-block";


    cardWrap.classList.remove(
        "open"
    );


    finalScreen.classList.remove(
        "show"
    );


    finalScreen.setAttribute(
        "aria-hidden",
        "true"
    );


    openButton.disabled = false;


    if (bottomHint) {

        bottomHint.style.opacity = "1";

    }


    particleLayer.innerHTML = "";
}


/* =========================================================
   EVENTS
   ========================================================= */

openButton.addEventListener(
    "click",
    openLetter
);


restartButton.addEventListener(
    "click",
    restart
);


/* =========================================================
   KEYBOARD SUPPORT
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            !isOpen &&
            !openButton.disabled
        ) {

            openLetter();

        }


        if (
            event.key === "Escape" &&
            finalScreen.classList.contains("show")
        ) {

            restart();

        }

    }
);


/* =========================================================
   MOUSE PARTICLES
   ========================================================= */

let lastMouseParticle = 0;


document.addEventListener(
    "pointermove",
    (event) => {

        const now =
            performance.now();


        if (
            now - lastMouseParticle < 90
        ) {

            return;

        }


        lastMouseParticle = now;


        if (
            Math.random() > .55
        ) {

            createParticle(
                event.clientX,
                event.clientY,
                "✦"
            );
        }

    }
);


/* =========================================================
   ADD EXTRA ANIMATION
   ========================================================= */

const style =
    document.createElement("style");


style.textContent = `

@keyframes heartRise {

    0% {
        transform:
            translateY(0)
            scale(.7)
            rotate(0deg);

        opacity: 0;
    }

    15% {
        opacity: .65;
    }

    100% {
        transform:
            translateY(-190px)
            translateX(
                calc(
                    (var(--random-x, 0) * 1px)
                )
            )
            scale(1.15)
            rotate(18deg);

        opacity: 0;
    }
}

`;


document.head.appendChild(style);


/* =========================================================
   INITIALIZATION
   ========================================================= */

createStars();

startComets();