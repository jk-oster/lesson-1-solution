'use strict';

/**
 * KWM_Component
 *
 * A component is a class / HTMLELement that can be rendered into the DOM.
 * Every component has a template function that returns a string of HTML, that describes how the component looks like.
 * The template function is called every time the component is rendered.
 *
 * @author Jakob Osterberger - 2025
 */
export default class KWM_Component extends HTMLElement {
    // Important: WebComponent / HTMLElement constructor does not allow any arguments!
    // Use html attributes to pass in data
    constructor() {
        super();
        this._mounted = false;
        this._container = null;
    }

    // This function is part of the HTMLElement class and is called in the background
    connectedCallback() {
        this.render();
    }

    // Life-Cycle function running after rendering
    onRender() {
        // onRender: override me - I run every time after component is rendered
        return;
    }

    // (Bonus) Life-Cycle function running only once after rendering the first time
    onFirstRender() {
        // onFirstRender: override me - I run only once after the component is rendered the very first time
        return;
    }

    // This function does the displaying magic
    render(container) {
        // If a container is passed, render the component into the container
        if (container) {
            // Save the container
            this._container = container;
            // Remove all children from the container
            this._container.innerHTML = '';
            // Append the component to the container -> preserve the component instance
            // (setting innerHTML would create a new instance of the component -> endless Loop!)
            this._container.appendChild(this);
        }

        // Compile the component template
        // Pass the all the component into the template to access all its functions and properties
        // Here is where the actual displaying happens
        this.innerHTML = this.template(this);

        // (Bonus) Lifecycle-Hook function for first render
        if (!this._mounted) {
            this.onFirstRender();
            this._mounted = true;
        }

        // Lifecycle-Hook function that runs every time the component is rendered
        this.onRender();
    }


    template(templateData) {
        throw new Error('template: override me - return a string of HTML that describes how the component looks like');
    }
}