export default {
    toggleNight(state) {
        state.nightMode = !state.nightMode;
    },
    changeTab(state, index) {
        state.tabIndex = index;
    }
}