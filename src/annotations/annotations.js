import OpenSeadragon from 'OpenSeadragon';
import inject from '../context/inject';

export default {

    @inject('state', 'draw', 'controls', 'overlay')
    function initialize(state, draw, controls, overlay, options) {
        OpenSeadragon.extend(this, options);
        this.state = Object.create(state).initialize();
        this.controls = Object.create(controls).initialize({ imagePath: this.imagePath || '' })
        this.overlay = Object.create(overlay).initialize();
        this.controls.add('move', true).add('draw');
        this.controls.get('move').addHandler('click', this.setState.bind(this, state, true));
        this.controls.get('draw').addHandler('click', this.setState.bind(this, draw, true));
        this.viewer.addHandler('animation', this.overlay.adjust.bind(this.overlay));
        return this;
    },

    function setState(state, navigationEnabled) {
        this.viewer.setMouseNavEnabled(navigationEnabled);
        this.state = Object.create(state).initialize();
    },

    function addControl(button) {
        this.viewer.addControl(button.element, {
            anchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT
        });
    },

    function onMouseDown(e) {
        this.state.handleMouseDown(e, this.overlay);
    },

    function onMouseUp(e) {
        this.state.handleMouseUp(e, this.overlay);
    },

    function import() {
        // TODO
    },

    function export() {
        // TODO
    }

};