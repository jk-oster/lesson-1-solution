'use strict';

/**
 * KWM_Component
 *
 * A component is a class / HTMLELement that can be rendered into the DOM.
 * Every component has a template function that returns a string of HTML, that describes how the component looks like.
 * The template function is called every time the component is rendered.
 *
 * @author Jakob Osterberger - 2024
 */
export default class KWM_Component extends HTMLElement {
    // Important: WebComponent constructor does not allow any arguments!
    // Use html attributes to pass in data
    constructor() {
        super();
        this._mounted = false;
        this._container = null;
    }

    connectedCallback() {
        this.render();

        // (Optional) Lifecycle-Hook function for first render
        if (!this._mounted) {
            this.onFirstRender();
            this._mounted = true;
        }
    }

    // Hook function running after rendering
    onRender() {
        // onRender: override me - I run every time the component is rendered
        return;
    }

    // (Optional) Hook function running only once after rendering the first time
    onFirstRender() {
        // onFirstRender: override me - I run only once after the component is rendered the first time
        return;
    }

    render(container) {
        // Compile the component template
        // Pass the all the component into the template to access all its functions and properties
        this.innerHTML = this.template(this);

        // If a container is passed, render the component into the container
        if (container) {
            // Store the container
            this._container = container;
            // Remove all children from the container
            this._container.innerHTML = '';
            // Append the component to the container -> preserve the component instance (setting innerHTML would create a new instance)
            this._container.appendChild(this);
        }

        // Lifecycle-Hook function that runs every time the component is rendered
        this.onRender();
    }


    template(templateData) {
        throw new Error('template: override me - return a string of HTML that describes how the component looks like');
    }
}