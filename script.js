// =====================================================
// MAHDIA CARD — WEB EDITION
// =====================================================

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

const cat = document.getElementById("cat");
const card = document.getElementById("card");
const finalScreen = document.getElementById("final");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");


// =====================================================
// VARIABLES
// =====================================================

let stars = [];
let meteors = [];
let particles = [];

let noClicks = 0;
let noScale = 1;

let sadTimer = null;
let gameFinished = false;


// =====================================================
// CANVAS SIZE
// =====================================================

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createStars();
}

window.addEventListener(
    "resize",
    resizeCanvas
);


// =====================================================
// STARS
// =====================================================

function createStars() {

    stars = [];

    const amount = Math.min(
        220,
        Math.floor(
            canvas.width *
            canvas.height /
            7000
        )
    );

    for (let i = 0; i < amount; i++) {

        stars.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            size:
                Math.random() *
                1.8 + 0.3,

            alpha:
                Math.random() *
                0.7 + 0.2,

            twinkle:
                Math.random() *
                0.04 + 0.01
        });
    }
}


// =====================================================
// METEORS
// =====================================================

function createMeteor() {

    if (meteors.length >= 5) {
        return;
    }

    meteors.push({

        x:
            Math.random() *
            canvas.width + 200,

        y:
            Math.random() *
            canvas.height *
            0.45,

        length:
            Math.random() *
            100 + 60,

        speed:
            Math.random() *
            7 + 6,

        alpha: 1
    });
}


// =====================================================
// PARTICLES
// =====================================================

function createParticles(
    x,
    y,
    amount = 40
) {

    for (let i = 0; i < amount; i++) {

        const angle =
            Math.random() *
            Math.PI * 2;

        const speed =
            Math.random() *
            5 + 1;

        particles.push({

            x: x,
            y: y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life: 1,

            size:
                Math.random() *
                4 + 1
        });
    }
}


// =====================================================
// DRAW SPACE
// =====================================================

function drawSpace() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Background

    const gradient =
        ctx.createRadialGradient(

            canvas.width * 0.5,
            canvas.height * 0.45,
            0,

            canvas.width * 0.5,
            canvas.height * 0.45,

            Math.max(
                canvas.width,
                canvas.height
            )
        );

    gradient.addColorStop(
        0,
        "#19124d"
    );

    gradient.addColorStop(
        0.45,
        "#080624"
    );

    gradient.addColorStop(
        1,
        "#020208"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Stars

    for (const star of stars) {

        const glow =
            0.65 +
            Math.sin(
                Date.now() *
                star.twinkle
            ) *
            0.3;

        ctx.globalAlpha = glow;

        ctx.fillStyle = "#ffffff";

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    ctx.globalAlpha = 1;


    // Meteors

    for (
        let i = meteors.length - 1;
        i >= 0;
        i--
    ) {

        const meteor =
            meteors[i];

        meteor.x -= meteor.speed;
        meteor.y +=
            meteor.speed * 0.45;

        meteor.alpha -= 0.009;


        const meteorGradient =
            ctx.createLinearGradient(

                meteor.x,
                meteor.y,

                meteor.x +
                meteor.length,

                meteor.y -
                meteor.length * 0.45
            );

        meteorGradient.addColorStop(
            0,
            "rgba(255,255,255,0)"
        );

        meteorGradient.addColorStop(
            1,
            "rgba(170,150,255,0.9)"
        );

        ctx.strokeStyle =
            meteorGradient;

        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.moveTo(
            meteor.x,
            meteor.y
        );

        ctx.lineTo(
            meteor.x +
            meteor.length,

            meteor.y -
            meteor.length * 0.45
        );

        ctx.stroke();


        if (
            meteor.alpha <= 0 ||
            meteor.x < -300 ||
            meteor.y >
                canvas.height + 300
        ) {

            meteors.splice(i, 1);
        }
    }


    // Particles

    for (
        let i = particles.length - 1;
        i >= 0;
        i--
    ) {

        const p =
            particles[i];

        p.x += p.vx;
        p.y += p.vy;

        p.vy += 0.035;

        p.life -= 0.018;

        ctx.globalAlpha =
            Math.max(
                0,
                p.life
            );

        ctx.fillStyle =
            "#c9baff";

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fill();


        if (p.life <= 0) {

            particles.splice(i, 1);
        }
    }

    ctx.globalAlpha = 1;
}


// =====================================================
// METEOR TIMER
// =====================================================

setInterval(() => {

    if (
        Math.random() <
        0.65
    ) {

        createMeteor();
    }

}, 900);


// =====================================================
// NO BUTTON
// =====================================================

noBtn.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        if (gameFinished) {
            return;
        }

        noClicks++;

        // Shrink NO

        noScale *= 0.72;

        noScale =
            Math.max(
                0.22,
                noScale
            );

        noBtn.style.transform =
            `scale(${noScale})`;


        // Sad cat

        cat.classList.add("sad");


        // Particle effect

        const rect =
            noBtn.getBoundingClientRect();

        createParticles(

            rect.left +
            rect.width / 2,

            rect.top +
            rect.height / 2,

            22
        );


        // Return to normal

        clearTimeout(
            sadTimer
        );

        sadTimer =
            setTimeout(() => {

                cat.classList.remove(
                    "sad"
                );

            }, 1300);


        // After many NO clicks

        if (noClicks >= 4) {

            noBtn.style.opacity =
                Math.max(
                    0.45,
                    1 -
                    noClicks * 0.08
                );
        }
    }
);


// =====================================================
// YES BUTTON
// =====================================================

yesBtn.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        if (gameFinished) {
            return;
        }

        gameFinished = true;

        clearTimeout(
            sadTimer
        );


        // Explosion

        const rect =
            yesBtn.getBoundingClientRect();

        createParticles(

            rect.left +
            rect.width / 2,

            rect.top +
            rect.height / 2,

            100
        );


        // Card animation

        card.style.opacity = "0";

        card.style.transform =
            `
            translate(-50%, -50%)
            scale(0.65)
            rotateX(20deg)
            `;


        // Cat disappears

        cat.style.opacity = "0";

        cat.style.transform =
            `
            translate(-50%, -50%)
            scale(0.6)
            `;


        setTimeout(() => {

            card.style.display =
                "none";

            cat.style.display =
                "none";

            finalScreen.classList.remove(
                "hidden"
            );

        }, 700);
    }
);


// =====================================================
// FINAL → RESET
// =====================================================

finalScreen.addEventListener(
    "click",
    resetGame
);


// =====================================================
// RESET
// =====================================================

function resetGame() {

    gameFinished = false;

    noClicks = 0;

    noScale = 1;

    noBtn.style.transform =
        "scale(1)";

    noBtn.style.opacity =
        "1";


    cat.classList.remove(
        "sad"
    );


    cat.style.display =
        "block";

    cat.style.opacity =
        "1";

    cat.style.transform =
        `
        translate(-50%, -50%)
        scale(1)
        `;


    card.style.display =
        "block";

    card.style.opacity =
        "1";

    card.style.transform =
        `
        translate(-50%, -50%)
        `;


    finalScreen.classList.add(
        "hidden"
    );


    particles = [];
}


// =====================================================
// MAIN LOOP
// =====================================================

function animationLoop() {

    drawSpace();

    requestAnimationFrame(
        animationLoop
    );
}


// =====================================================
// START
// =====================================================

resizeCanvas();

animationLoop();