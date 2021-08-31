function printHighscores() {
    // either get scores from localstorage or set to empty array
    var scoresJSON = localStorage.getItem("scores");
    // console.log(scoresJSON);
    scores = JSON.parse(scoresJSON);
  if (scores == undefined) {
      scores = [];
  }

    // (optional) sort highscores by score property in descending order
    scores.sort((a,b) => (a.score < b.score) ? 1 : -1);
    // for each score
    scores.sort((a,b) => (a.score < b.score) ? 1 : -1); {
      // create li tag for each high score
      liEl = document.createElement("li");
      liEl.textContent = scores[i].user + " - " + scores[i].score;
      // display on page
      document.getElementById("highscores").appendChild(liEl);
    }
  }
  
  function clearHighscores() {
    // (and reload)
    localStorage.clear();
    window.location.href = "index.html";
  }

  
  // attache clear event to clear score button
  document.getElementById("clear").onclick = clearHighscores;
  
  // run printhighscore when page loads
  window.onload = printHighscores;
  