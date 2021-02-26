export const errorImg = {
  inserted(el, binding) {
    el.onerror = function() {
      console.log(binding)
      el.src = binding.value
    }
  }
}
