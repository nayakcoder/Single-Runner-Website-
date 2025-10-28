import * as framerMotion from 'https://esm.run/framer-motion';

const { animate, spring } = framerMotion;

export function heroEntrance() {
    animate('.title-reveal', { y: [30, 0], opacity: [0, 1] }, { duration: 0.8, delay: 0.2 });
    animate('.subtitle-reveal', { y: [30, 0], opacity: [0, 1] }, { duration: 0.8, delay: 0.4 });
    animate('.cta-reveal', { y: [30, 0], opacity: [0, 1] }, { duration: 0.8, delay: 0.6 });
    animate('#hero-bg', { scale: [1.1, 1], opacity: [0, 0.3] }, { duration: 2, ease: "easeOut" });
}

export function forgeCrest(element) {
    if (!element) return;
    animate(
        element,
        {
            scale: [0.8, 1.05, 1],
            opacity: [0.5, 1],
            filter: ['blur(10px)', 'blur(0px)'],
        },
        {
            duration: 1.5,
            ease: 'easeOut',
            times: [0, 0.8, 1],
        }
    );
     animate(
        element,
        {
            boxShadow: [
                "0 0 0px 0px rgba(0, 191, 255, 0)",
                "0 0 50px 10px rgba(0, 191, 255, 0.5)",
                "0 0 20px 5px rgba(0, 191, 255, 0.3)",
            ]
        },
        {
            duration: 1.5,
            ease: 'easeOut'
        }
    );
}

export function updateScrollLine(element, progress) {
     animate(element, { scaleY: progress }, { duration: 0, ease: 'linear' });
}

export function typewriterEffect(element, text) {
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            let char = text.charAt(i);
            
            if (char === 'E' && text.substring(i, i+4) === 'Eris') {
                element.innerHTML += `<strong class="text-noise-red font-bold">Eris</strong>`;
                i += 3;
            } else if (char === 'S' && text.substring(i, i+6) === 'SIGNAL') {
                 element.innerHTML += `<code class="text-signal-blue bg-signal-blue/10 px-1 rounded">SIGNAL</code>`;
                 i += 5;
            } else if (char === 'N' && text.substring(i, i+5) === 'NOISE') {
                 element.innerHTML += `<code class="text-noise-red bg-noise-red/10 px-1 rounded">NOISE</code>`;
                 i += 4;
            } else {
                 element.innerHTML += char;
            }

            i++;
        } else {
            clearInterval(typing);
        }
    }, 20);
}
