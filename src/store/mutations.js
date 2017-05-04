export default {
    toggleNight(state) {
        state.nightMode = !state.nightMode;
    },
    changeTab(state, index) {
        state.tabIndex = index;
    },
    login(state){
        state.logged=true
    },
    logout(state){
        state.logged=false
    }

}