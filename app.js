'use strict';
import HomeComponent from "./components/HomeComponent.js";
import NotFoundComponent from "./components/NotFoundComponent.js";
import ContactComponent from "./components/ContactComponent.js";
import AboutComponent from "./components/AboutComponent.js";
import HeroTeaserComponent from "./components/HeroTeaserComponent.js";

import KWM_Route from './core/kwm-route.js';
import KWM_Router from './core/kwm-router.js';

const myRouter = new KWM_Router({
    container: document.getElementById("kwmJS"),
    routes: [
        new KWM_Route({ slug: "/", name: "Home", component: new HomeComponent() }),
        new KWM_Route({ slug: "/about", name: "About", component: new AboutComponent() }),
        new KWM_Route({ slug: "/contact", name: "Contact", component: new ContactComponent() }),
        new KWM_Route({ slug: "/404", name: "Not Found", component: new NotFoundComponent() }),
    ],
    slugHome: "/",
    slugNotFound: "/404"
});

myRouter.init();

// Navigating to the home page should display the Hero-Teaser similar like in the example picture