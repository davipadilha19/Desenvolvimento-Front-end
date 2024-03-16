function mostrarAnimacao() {
    var checkAnimation = document.getElementById("checkAnimation");
    checkAnimation.style.display = "block";
    checkAnimation.addEventListener("animationend", function() {
      checkAnimation.style.display = "none";
  })
}

  