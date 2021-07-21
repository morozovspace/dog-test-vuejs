export const state = () => ({
  favorites: [],
})

export const mutations = {
  addFavorite(state, source) {
    state.favorites.push(source)
    localStorage.setItem("favorites", JSON.stringify(state.favorites))
  },
  removeFavorite(state, index) {
    state.favorites.splice(index, 1)
    localStorage.setItem("favorites", JSON.stringify(state.favorites))
  },
  initFavorites(state) {
    const f = JSON.parse(localStorage.getItem("favorites"))
    if (f) {
      state.favorites = f
    } else {
      localStorage.setItem("favorites", JSON.stringify(state.favorites))
    }
  },
}