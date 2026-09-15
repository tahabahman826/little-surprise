/* =========================================================
   LITTLE SURPRISE
   I'M SORRY — MAHDIA
   MAIN JAVASCRIPT
   ========================================================= */

const cardWrapper = document.getElementById("cardWrapper");
const openButton = document.getElementById("openButton");
const typedText = document.getElementById("typedText");
const signature = document.getElementById("signature");

const finalScreen = document.getElementById("finalScreen");
const restartButton = document.getElementById("restartButton");

const particlesContainer =
    document.getElementById("particles");


/* =========================================================
   LETTER TEXT
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
let typingTimer = null;


/* =========================================================
   OPEN LETTER
   ========================================================= */

openButton.addEventListener("click", openLetter);


function openLetter() {

    if (isOpen) return;

    isOpen = true;

    openButton.disabled = true;

    /* Open the 3D card */
    cardWrapper.classList.add("open");

    /* Magic particles */
    createMagicBurst();

    /* Start typing after the card opens */
    setTimeout(() => {

        typeLetter();

    }, 850);
}


/* =========================================================
   TYPEWRITER
   ========================================================= */

function typeLetter() {

    typedText.textContent = "";

    let index = 0;

    clearInterval(typingTimer);

    typingTimer = setInterval(() => {

        if (index < letterText.length) {

            typedText.textContent += letterText[index];

            index++;

        } else {

            clearInterval(typingTimer);

            showSignature();

            setTimeout(() => {

                showFinalScreen();

            }, 3500);
        }

    }, 32);
}


/* =========================================================
   SIGNATURE
   ========================================================= */

function showSignature() {

    signature.classList.add("visible");
}


/* =========================================================
   MAGIC PARTICLE BURST
   ========================================================= */

function createMagicBurst() {

    const amount = window.innerWidth < 600 ? 35 : 65;

    for (let i = 0; i < amount; i++) {

        const particle =
            document.createElement("div");

        particle.className = "particle";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            80 + Math.random() * 300;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        const startX =
            50 + (Math.random() - .5) * 10;

        const startY =
            50 + (Math.random() - .5) * 10;

        particle.style.left =
            startX + "%";

        particle.style.top =
            startY + "%";

        particle.style.width =
            (2 + Math.random() * 5) + "px";

        particle.style.height =
            particle.style.width;

        particle.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(.2)",
                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        ) scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    900 + Math.random() * 1100,

                delay:
                    Math.random() * 250,

                easing:
                    "cubic-bezier(.16,1,.3,1)"
            }
        );

        particlesContainer.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        }, 2500);
    }
}


/* =========================================================
   FLOATING HEARTS
   ========================================================= */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.textContent = "♥";

    heart.style.position = "fixed";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.bottom = "-30px";

    heart.style.fontSize =
        (12 + Math.random() * 18) + "px";

    heart.style.color =
        "rgba(195,180,255,.65)";

    heart.style.pointerEvents =
        "none";

    heart.style.zIndex = "25";

    document.body.appendChild(heart);

    const drift =
        (Math.random() - .5) * 150;

    heart.animate(
        [
            {
                transform:
                    "translate(0,0) scale(.6) rotate(0deg)",
                opacity: 0
            },

            {
                transform:
                    "translate(0,-80px) scale(1) rotate(15deg)",
                opacity: .8
            },

            {
                transform:
                    `translate(
                        ${drift}px,
                        -${window.innerHeight + 100}px
                    )
                    scale(.5)
                    rotate(-20deg)`,
                opacity: 0
            }
        ],
        {
            duration:
                4500 + Math.random() * 3000,

            easing:
                "ease-out"
        }
    );

    setTimeout(() => {

        heart.remove();

    }, 8000);
}


/* Create occasional hearts */

setInterval(() => {

    if (!isOpen) return;

    createHeart();

}, 900);


/* =========================================================
   FINAL SCREEN
   ========================================================= */

function showFinalScreen() {

    if (!isOpen) return;

    finalScreen.classList.add("show");

    createFinalParticles();
}


/* =========================================================
   FINAL PARTICLES
   ========================================================= */

function createFinalParticles() {

    for (let i = 0; i < 30; i++) {

        const particle =
            document.createElement("div");

        particle.className = "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            60 + Math.random() * 30 + "%";

        particle.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        particlesContainer.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        }, 5500);
    }
}


/* =========================================================
   RESTART
   ========================================================= */

restartButton.addEventListener(
    "click",
    restartExperience
);


function restartExperience() {

    clearInterval(typingTimer);

    isOpen = false;

    /* Hide final screen */
    finalScreen.classList.remove("show");

    /* Reset card */
    cardWrapper.classList.remove("open");

    /* Reset text */
    typedText.textContent = "";

    signature.classList.remove("visible");

    /* Enable button */
    openButton.disabled = false;

    /* Small pause before allowing another opening */
    setTimeout(() => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 100);
}


/* =========================================================
   EXTRA STAR EFFECT
   ========================================================= */

const stars =
    document.querySelectorAll(".stars");

stars.forEach((layer, layerIndex) => {

    const starCount =
        layerIndex === 0 ? 45 :
        layerIndex === 1 ? 30 :
        20;

    for (let i = 0; i < starCount; i++) {

        const star =
            document.createElement("span");

        star.style.position =
            "absolute";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        const size =
            1 + Math.random() * 2.5;

        star.style.width =
            size + "px";

        star.style.height =
            size + "px";

        star.style.borderRadius =
            "50%";

        star.style.background =
            "white";

        star.style.opacity =
            .15 + Math.random() * .85;

        star.style.boxShadow =
            "0 0 7px rgba(255,255,255,.8)";

        star.style.animation =
            `twinkle ${
                2 + Math.random() * 5
            }s ease-in-out infinite`;

        star.style.animationDelay =
            Math.random() * 5 + "s";

        layer.appendChild(star);
    }
});


/* =========================================================
   TWINKLE ANIMATION
   ========================================================= */

const dynamicStyle =
    document.createElement("style");

dynamicStyle.textContent = `

@keyframes twinkle {

    0%, 100% {
        opacity: .15;
        transform: scale(.7);
    }

    50% {
        opacity: 1;
        transform: scale(1.4);
    }

}

`;

document.head.appendChild(dynamicStyle);


/* =========================================================
   CURSOR MAGIC
   ========================================================= */

document.addEventListener(
    "mousemove",
    (event) => {

        if (Math.random() > .92) {

            createCursorParticle(
                event.clientX,
                event.clientY
            );

        }
    }
);


function createCursorParticle(x, y) {

    const particle =
        document.createElement("div");

    particle.style.position =
        "fixed";

    particle.style.left =
        x + "px";

    particle.style.top =
        y + "px";

    particle.style.width = "3px";
    particle.style.height = "3px";

    particle.style.borderRadius =
        "50%";

    particle.style.background =
        "#d8ceff";

    particle.style.boxShadow =
        "0 0 10px #b8a5ff";

    particle.style.pointerEvents =
        "none";

    particle.style.zIndex =
        "50";

    document.body.appendChild(particle);

    particle.animate(
        [
            {
                transform:
                    "translate(-50%,-50%) scale(1)",
                opacity: .8
            },

            {
                transform:
                    "translate(-50%,-100px) scale(0)",
                opacity: 0
            }
        ],
        {
            duration: 700,
            easing: "ease-out"
        }
    ).onfinish = () => {

        particle.remove();

    };
}