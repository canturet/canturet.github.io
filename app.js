var mainCharacter = document.getElementById("mainCharacter");
var board = document.getElementById("board");

window.addEventListener("keydown", (e) => {
  
  /* Sol ve sağ yön tuşlarına basıldığı zaman karakterin ilgili yönde hareket etmesi sağlanıyor. Aynı zamanda karakterin oyun alanından çıkmaması için gerekli kontroller yapılıyor. */
  var left = parseInt(window.getComputedStyle(mainCharacter).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > 0) {
    mainCharacter.style.left = left - 10 + "px";
  }
  else if (e.key == "ArrowRight" && left <= 460) {
    mainCharacter.style.left = left + 10 + "px";
  }

  /* Space tuşuna basıldığı zaman karakterin ateş etmesi sağlanıyor. Merminin ve düşman karakterlerin konumları karşılaştırılarak düşman karakterin yok edilmesi sağlanıyor. Aynı zamanda merminin oyun alanından çıkarsa yok
	 edilmesi sağlanıyor. */
  if (e.keyCode == 32) {
    var bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);
    var movebullet = setInterval(() => {
    var enemies = document.getElementsByClassName("enemies");
      for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];
        if (enemy != undefined) {
          var enemybound = enemy.getBoundingClientRect();
          var bulletbound = bullet.getBoundingClientRect();
          if (
            bulletbound.left >= enemybound.left &&
            bulletbound.right <= enemybound.right &&
            bulletbound.top <= enemybound.top &&
            bulletbound.bottom <= enemybound.bottom
          ) {
            enemy.parentElement.removeChild(enemy);
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
          }
        }
      }
      var bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );
      if (bulletbottom >= 500) {
        clearInterval(movebullet);
      }
      bullet.style.left = left + "px";
      bullet.style.bottom = bulletbottom + 3 + "px";
    });
  }
});

/* Oyun alanı içerisinde rastgele bir konumda belirlediğimiz sürede düşman karakter oluşturulması sağlanıyor. */
var generateenemies = setInterval(() => {
  var enemy = document.createElement("div");
  enemy.classList.add("enemies");
  var enemyleft = parseInt(
    window.getComputedStyle(enemy).getPropertyValue("left")
  );
  enemy.style.left = Math.floor(Math.random() * 450) + "px";
  board.appendChild(enemy);
}, 1500);

/* Düşman karakterlerin aşağı yönde hareket etmesi sağlanıyor. Aynı zamanda düşman karakter oyun alanının sonuna kadar gelirse oyunun bitmesi sağlanıyor. */
var moveenemies = setInterval(() => {
  var enemies = document.getElementsByClassName("enemies");
  if (enemies != undefined) {
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      var enemytop = parseInt(
        window.getComputedStyle(enemy).getPropertyValue("top")
      );
      if (enemytop >= 420) {
        alert("Oyun bitti.");
        clearInterval(moveenemies);
        window.location.reload();
      }
      enemy.style.top = enemytop + 25 + "px";
    }
  }
}, 450);
