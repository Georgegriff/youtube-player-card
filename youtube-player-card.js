import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `youtube-player-card`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class YoutubePlayerCard extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'youtube-player-card',
      },
    };
  }
}

window.customElements.define('youtube-player-card', YoutubePlayerCard);
