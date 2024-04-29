document.addEventListener('DOMContentLoaded', function() {
  var cube = document.getElementById('cube');
  var currentX = -30;
  var currentY = -45;

  document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
      case 37: // left
        currentY -= 10;
        break;
      case 38: // up
        currentX += 10;
        break;
      case 39: // right
        currentY += 10;
        break;
      case 40: // down
        currentX -= 10;
        break;
    }
    cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
  });
});
