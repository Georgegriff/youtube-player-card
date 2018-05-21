import { LitElement, html } from '@polymer/lit-element';
import '@polymer/iron-icon/iron-icon';
import './youtube-player-icons';
import '@polymer/paper-card/paper-card';
import { camelToDashCase } from '@polymer/polymer/lib/utils/case-map';

/**
 * `youtube-player-card`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class YoutubePlayerCard extends LitElement {

    styling() {
        return html `<style>
        :host {
                display: block;
            }

             :host .card-component {
                width: var(--youtube-player-card-width, 240px);
            }

             :host .card-content {
                width: var(--youtube-player-card-width, 240px);
                height: var(--youtube-player-card-height, 135px);
                padding: 0 !important;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }

            button.play-btn {
                background: var(--youtube-player-play-background-color, white);
                border: none;
                outline: none;
                width: 75px;
                height: 75px;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 99;
                border-radius: 100%;
                cursor: pointer;
                transition: opacity .3s ease-in-out;
            }

             :host #contentVideo:hover .play-btn {
                opacity: 0.9;
            }

             :host .play-button {
                color: var(--youtube-player-play-button-color, #7f7f7f);
                width: 54px;
                height: 54px;
                z-index: 100;
            }

             :host .video {}

            #video {
                position: absolute;
                top: 0;
                left: 0;
            }
            


            .thumb-cont {
                width: var(--youtube-player-card-width, 240px);
                height: var(--youtube-player-card-height, 135px);
                transition: opacity .4s linear;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 51;
                pointer-events: none;

            }

            .thumb-colour {
                background: var(--youtube-card-thumbnail-background, #ff0000);
            }

            .thumb-colour-hide {
                opacity: 0;
            }

            .thumb-opacity { 
                opacity: 1;
            }

            .thumb-hide {
                opacity: 0;
            }

            .thumbnail-overlay { 
                background: var(--youtube-player-overlay-background, rgba(0,0,0,0.5));
                transition: opacity .9s linear;
                height:100%;
                z-index: 52;
            }

            .thumbnail {
                position: absolute;
                top: 0;
                left: 0;
                width: var(--youtube-player-card-width, 240px);
                height: var(--youtube-player-card-height, 135px);
                background-repeat: no-repeat;
                background-position: center center;
                background-size: cover;
                transition: opacity .3s linear;
                z-index: 50;
                background-image: var(--thumbnail-image);
            }

             :host .video-title {
                font-size: 1.25rem;
                font-weight: 500;
                letter-spacing: .0125em;
                line-height: 2rem;
                flex: 1;
                margin-right: 15px;
                -webkit-font-smoothing: antialiased;
                color: var(--youtube-player-video-title-color, rgba(0,0,0,1));

            }

            .ellipsis {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .channel-title {
                font-size: .875rem;
                line-height: 1.375rem;
                font-weight: 500;
                letter-spacing: .00714em;
                margin-right: 15px;
                text-decoration: none;
                color: var(--youtube-player-channel-color,rgba(0,0,0,0.54));
                display: inherit;
            }

            .channel-title:hover {
                color: var(--youtube-player-channel-color-hover,rgba(0,0,0,0.64));
            }

            .title-wrap {
                text-align: left;
                padding-bottom: 5px;
                padding-left: 5px;
            }

            .actions-top {
                padding: 1%;
            }

            .card-actions {
                padding: 0 !important;
            }

            .actions {
                display: flex;
                color: #757575;
                padding: 4px 16px;
            }

            .open-yt {
                border: none;
                outline: none;
                background: none;
                cursor: pointer;
                padding: 6px;
                position: relative;
            }
            .open-yt:before {
                transition: opacity 15ms linear;
                top: 0%;
                left: 0%;
                width: 100%;
                height: 100%;
                opacity: 0;
                pointer-events: none;
                border-radius: 50%;
                position: absolute;
                background:#000;
                content: '';
            }
            .open-yt:hover:before {
                opacity: 0.04;
            }

            .views {
                display: flex;
                flex-direction: row;
                align-items: center;
                border-top: 1px solid #e8e8e8;
                padding: 2%;
                font-size: 0.9em;
            }

            .duration {
                flex: 1;
            }

            iron-icon {
              padding: 5px;
                
            }

            .duration,
            .views .view {
                display: flex;
                align-items: center;
                margin: 0 3px 0 3px;
            }

            .view-icon {
                color: var(--youtube-player-card-view-count-color, rgba(0,0,0,0.5));
            }

            .views,
            .open-yt,
            .duration {
                color: rgba(0,0,0,0.5);
                font-weight:500;
            }

            .yt-card-wrap {
                padding: 10px;
            }
        </style>`;
    }

    _render() {
        return html `${this.styling()}${this._card(
            this._cardVideo(),
            this._cardActions()
        )}`;
    }

    _cardVideo() {
        return html `${this._videoPlayButton()}${this._videoContainer()}`;
    }

    _cardActions() {
        return html `<div class="actions-top">
            <div class="title-wrap">
                <div title$="${this.videoTitle}" class="video-title ellipsis">${this.videoTitle}</div>
                <a title$="${this.channelTitle}" class="channel-title ellipsis" rel="noopener" target="_blank" href="${this._openInYoutube(this._youtubeChannel, this.channelId)}">${this.channelTitle}</a>
            </div>
        </div>
        <div class="views">
            <div class="view">
                ${this.viewCount > 0 ? this._viewCount(this.viewCount) : ''}
            </div>
            ${this.duration ? this._duration(this.duration) : ''}
            <a target="_blank" rel="noopener" title="${this.openExternal}" class="open-yt" href="${this._openVideoYoutube(this.videoId)}">
                <iron-icon icon="icons:exit-to-app"></iron-icon>
            </a>
        </div>
        `;
    }


    _viewCount(viewCount) {
        return html `<iron-icon class="view-icon" icon="icons:visibility"></iron-icon>${viewCount}`;
    }

    _duration(duration) {
        return html `<div class="duration">
            <iron-icon icon="icons:query-builder"></iron-icon>
            ${this._convertDuration(this.duration)}
        </div>`;
    }

    _videoPlayButton() {
        return html ` <button id="playBtn" on-click="${this.playVideo.bind(this)}" class="play-btn">
                        <iron-icon class="play-button" icon="icons:play-arrow"></iron-icon>
                     </button>`;
    }

    _videoContainer() {
        return html `${this._updateThumb(this.thumbnail, this.showThumb)}
                    <div id="videoElement">
                        <div class="video" id="video"></div>
                    </div>`;
    }

    _card(contents, actions) {
        return html `<div class="yt-card-card">
            <paper-card class="card-component">
                <div class="card-content" id="contentVideo">${contents}</div>
                <div class="card-actions">${actions}</div>
            </paper-card>
        </div>`;
    }

    static attributeNameForProperty(property) {
        return camelToDashCase(property);
    }

    static get properties() {
        return {
            videoId: String,
            videoTitle: String,
            channelTitle: String,
            channelId: String,
            viewCount: String,
            duration: String,
            openExternal: String,
            thumbnail: String,
            videoKind: String,
            isFullScreen: Boolean,
            playAttempted: Boolean,
            showThumb: Boolean,
            _hasThumbImage: Boolean
        };
    }

    constructor() {
        super();
        if (window.YT) {
            this.YT = window.YT;
            this.onLoad(this.YT);
        } else {
            window.onYouTubeIframeAPIReady = () => {
                this.YT = window.YT;
                this.onLoad(this.YT);
            };
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        this.openExternal = 'Open in YouTube';
        this.isFullScreen = false;
        this.playAttempted = false;
        this.showThumb = true;

        // api urls
        this._youtubeVideo = '//youtube.com/watch?v=';
        this._youtubeChannel = '//youtube.com/channel/';
        this._youtubePlaylist = '//youtube.com/playlist?list';

        // youtube api
        this.player = null;
    }

    stop() {
        if (this.player) {
            this.player.stopVideo();
        }
    }

    _openInYoutube(link, id) {
        return link + id;
    }

    _openVideoYoutube(id) {
        if (this.videoKind === 'youtube#playlist') {
            return this._openInYoutube(this._youtubePlaylist, id);
        } else {
            return this._openInYoutube(this._youtubeVideo, id);
        }
    }

    _updateThumb(thumbnail, showThumb) {
        const hide = !showThumb ? 'thumb-hide' : '';
        return this._waitForThumb(thumbnail, hide);

    }

    _waitForThumb(thumbnail, hide) {
        this.style.setProperty('--thumbnail-image', `url('${thumbnail}')`);
        setTimeout(() => {
            this._hasThumbImage = true;
        }, 300);
        return this._defaultThumb(hide);
    }

    _defaultThumb(hide) {
        const hideColor = this._hasThumbImage ? 'thumb-colour-hide' : '';
        return html `<div class$="thumbnail-overlay thumb-cont ${hide}"></div><div class$="thumb-cont thumb-colour ${hideColor} ${hide}"></div>
        <div id="imageCont" class$="thumb-cont thumb-opacity thumbnail ${hide}"></div>`;
    }

    _convertDuration(input) {
        let reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        let timeString = '';

        if (reptms.test(input)) {
            let matches = reptms.exec(input);
            if (matches[1]) hours = Number(matches[1]);
            if (matches[2]) minutes = Number(matches[2]);
            if (matches[3]) seconds = Number(matches[3]);
        }
        if (hours) {
            hours = hours < 10 ? '0' + hours : hours;
            timeString += hours + ':';
        }
        minutes = minutes < 10 ? '0' + minutes : minutes;
        timeString += minutes + ':';
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timeString += seconds;
        return timeString;
    }

    loadVideo(type, width, height, callback) {
        // check if ready first...
        if (this.YT) {
            this.player = new this.YT.Player(this.shadowRoot.querySelector('#video'), {
                height: height,
                width: width,
                playerVars: {
                    'autoplay': 0,
                    'controls': 1,
                    hd: 1,
                    'showinfo': 0
                },
                events: {
                    'onReady': function(e) {
                        if (type === 'playlist') {
                            this.player.cuePlaylist({
                                listType: "playlist",
                                list: this.videoId
                            });
                        } else {
                            this.player.loadVideoById(this.videoId);
                            this.attachFSEvents();

                        }
                    }.bind(this),
                    'onStateChange': function(e) {
                        this.onPlayerStateChange(e, function() {
                            return callback();
                        }.bind(this));
                    }.bind(this)
                },
            });
        } else {
            this.playAttempted = true;
        }
    }

    onPlayerStateChange(event, callback) {
        if (event.data === this.YT.PlayerState.CUED) {
            if (callback) {
                return callback();
            }
        }
    }

    attachFSEvents() {
        document.addEventListener("fullscreenchange", function(e) {
            this.isFullScreen = !!document.fullscreenElement;
        }.bind(this), false);

        document.addEventListener("msfullscreenchange", function(e) {
            this.isFullScreen = !!document.msFullscreenElement;
        }.bind(this), false);

        document.addEventListener("mozfullscreenchange", function(e) {
            this.isFullScreen = document.mozFullScreen;
        }.bind(this), false);

        document.addEventListener("webkitfullscreenchange", function(e) {
            this.isFullScreen = !!document.webkitFullscreenElement;
        }.bind(this), false);
    }

    getPlayerSize() {
        const contentVideo = this.shadowRoot.querySelector('#contentVideo');
        var video = getComputedStyle(contentVideo);
        if (video) {
            return {
                width: video.width,
                height: video.height
            }
        }
    }

    playVideo() {
        this.showThumb = false;
        this.shadowRoot.querySelector('#playBtn').style.opacity = 0;
        this.shadowRoot.querySelector('#playBtn')['pointer-events'] = 'none';
        var size = this.getPlayerSize();
        this.loadVideo('video', size.width, size.height, function() {
            console.log('stopped');
        });
    }

    onLoad() {
        if (this.playAttempted) {
            var size = this.getPlayerSize();
            this.loadVideo('video', size.width, size.height, function() {
                console.log('stopped');
            });
        }
    }



}

window.customElements.define('youtube-player-card', YoutubePlayerCard);