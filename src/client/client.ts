// TESTED ON DESKTOP CHROME - SAFARI iOS - CHROME iOS - INSTAGRAM - TWITTER - 01/08/2022
import * as THREE from "three";

// ==================================================== GLOBAL SCOPE DECLARATIONS ========================================================
let camera: THREE.PerspectiveCamera, scene: THREE.Scene, raycaster: THREE.Raycaster, renderer: THREE.WebGLRenderer;
let canvas_dom: any;
let intersects: any;
let controls;

let zoom = 1;

const isMobile = window.matchMedia("(max-width: 800px)");
const isMobileLandscape = window.matchMedia("(max-width: 900px) and (min-width: 640px)");
const isDesktop = window.matchMedia("(max-width: 3000px) and (min-width: 1000px)");

// for mobile browsing debugging
let version = document.getElementById("version");
let debugConsole = document.getElementById("debugConsole");
let stats = document.getElementById("stats");
let canvasSize = document.getElementById("canvasSize");

let viewportFunction = 'false';


// //// UNCOOMMENT FOR DEBUGGING ////
// devevelopment version
// version.innerHTML = '50';

// let viewportFunction = (<HTMLInputElement>document.getElementById("viewportFunction")).value;

// ============================================================ PAGE RULES ==============================================================
window.addEventListener('wheel', e => {
    e.preventDefault();
}, { passive: false });

// preventss user from scaling app
window.addEventListener(
    "touchmove" as any,
    function (event) {
        if (event.scale !== 1) {
            event.preventDefault();
        }
    },
    { passive: false }
);

window.addEventListener('gesturestart', e => e.preventDefault());
window.addEventListener('gesturechange', e => e.preventDefault());
window.addEventListener('gestureend', e => e.preventDefault());


// ============================================================ SCRIPT CALLS  ==============================================================

// //// UNCOMMENT FOR DEBUGGING - functions for displaying pages sizes ////
// window.onload = showViewport;
// window.onresize = showViewport;

// for debugging
// function showViewport() {

//     // //// UNCOOMMENT FOR DEBUGGING ////
//     stats.innerHTML = `IW = ${window.innerWidth} x ${window.innerHeight}`

// }

init();


// ============================================================ MAIN LOGIC STRUCTURE  =======================================================
async function init() {

    // //// UNCOOMMENT FOR DEBUGGING ////
    // canvasSize.innerHTML = `C = ${window.innerWidth} x ${window.innerHeight}`

    // ==================================================== CAMERA ========================================================
    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );


    // ==================================================== SCENE ========================================================
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0000ff);


    // ==================================================== RENDERER ========================================================
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    canvas_dom = renderer.domElement;
    document.body.appendChild(canvas_dom);

    document.getElementsByTagName('body')[0].classList.add('pageLock');


    // ==================================================== EVENT LISTENERS ========================================================
    // event listener for resize logic - delay so proper measurements are made
    window.addEventListener("resize", function () {
        // delay for innerwidth to be set first - bug resolved
        setTimeout(onWindowResize, 250)
    });

    document.getElementById("viewportFunction").addEventListener("click", toggleFunction);

    onWindowResize();

    animate();

}


// ==================================================== FUNCTIONS ========================================================
function toggleFunction() {

    $("#viewportFunction").on('change', function () {
        if ($(this).is(':checked')) {
            $(this).attr('value', 'false');
        } else {
            $(this).attr('value', 'true');
        }

    })

    viewportFunction = (<HTMLInputElement>document.getElementById("viewportFunction")).value;

    checkLandscape();
}

function onWindowResize() {

    // //// UNCOOMMENT FOR DEBUGGING ////
    // canvasSize.innerHTML = `C = ${window.innerWidth} x ${window.innerHeight}`

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (isMobile.matches) {

        console.log('mobile')

        document.getElementById("portraitMessage").classList.remove('displayNone')
        document.getElementById("portraitMessage").classList.add('display')

        document.getElementById("desktopMessage").classList.remove('display')
        document.getElementById("desktopMessage").classList.add('displayNone')

        document.getElementById("form").classList.remove('display')
        document.getElementById("form").classList.add('displayNone')

    }

    if (isDesktop.matches) {

        document.getElementById("desktopMessage").classList.remove('displayNone')
        document.getElementById("desktopMessage").classList.add('display')

        document.getElementById("portraitMessage").classList.remove('display')
        document.getElementById("portraitMessage").classList.add('displayNone')

        document.getElementById("form").classList.remove('display')
        document.getElementById("form").classList.add('displayNone')

    }

    if (isMobileLandscape.matches) {

        checkLandscape()

    }


    // //// UNCOMMENT FOR DEBUGGING - returns the innerwidth and the innerheight ////
    // showViewport();

}

function checkLandscape() {

    console.log(viewportFunction)

    document.getElementById("form").classList.remove('displayNone')
    document.getElementById("form").classList.add('display')

    document.getElementById("portraitMessage").classList.remove('display')
    document.getElementById("portraitMessage").classList.add('displayNone')

    document.getElementById("desktopMessage").classList.remove('display')
    document.getElementById("desktopMessage").classList.add('displayNone')

    if (viewportFunction === 'true') {

        console.log('viewport toggle')

        // chrome ios full width workaound
        if (isMobileLandscape.matches) {

            zoom = 1.5

            camera.position.z = 4;

            document.getElementsByTagName('body')[0].classList.remove('pageLock');
            document.getElementsByTagName('canvas')[0].classList.remove('canvasFixed');

            // canvas need to be in relative position forlandscape
            document.getElementsByTagName('body')[0].classList.add('pageUnlock');
            document.getElementsByTagName('canvas')[0].classList.add('canvasRelative');


            renderer.setSize(window.innerWidth * zoom, window.innerHeight * zoom);

            // //// UNCOMMENT FOR DEBUG - to check canvas is adjusted////
            // console.log(renderer.getSize(target2));

            let middleX = innerWidth * zoom / 6;
            let middleY = innerHeight * zoom / 6;

            // scroll to center for chrome ios full width workaoround
            setTimeout(function () {

                window.scrollTo(middleX, middleY);

                setTimeout(function () {

                    document.getElementsByTagName('body')[0].classList.remove('pageUnlock');
                    document.getElementsByTagName('body')[0].classList.add('pageLock');

                }, 250)


            }, 100);
        }

    } else {

        zoom = 1;
        document.getElementsByClassName('html')[0].setAttribute('style', 'zoom:1');

        document.getElementsByTagName('body')[0].classList.add('pageLock');
        document.getElementsByTagName('canvas')[0].classList.add('canvasFixed');

    }


};

function animate() {
    requestAnimationFrame(animate);

    render();

}


function render() {

    renderer.render(scene, camera);

}

