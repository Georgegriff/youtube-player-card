import { LitElement, html } from "@polymer/lit-element";

class MaterialCard extends LitElement {
    _render() {
        return html `<div>hello</div>`;
    }
}

window.customElements.define('youtube-material-card', MaterialCard);