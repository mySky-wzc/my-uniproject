const actions = {
    changeUserName(state) {
        state.commit("set_username","wzc")
    },
    changeAge(state) {
        state.commit("set_age","23")
    }
}
export default actions