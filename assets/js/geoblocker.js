const validCodes = ["Yqcne2", "Omv46U", "L3v2I0", "fxFl6s", "ZlO3Gy", "t760kv", "006I09", "7cu2ZG", "U9P0Nl", "mjzRK3", "XXXXXX", "bob", "67", "rkjlj4rio"];
const blank = [""];

if (window.location.pathname.endsWith("blocked.html") && localStorage.getItem("accessGranted") !== "true") {
  showAuthDiv();
} else if (window.location.pathname.endsWith("blocked.html") && localStorage.getItem("accessGranted") === "true") {
  window.location.href = "/";
} else if (!window.location.pathname.endsWith("blocked.html") && localStorage.getItem("accessGranted") !== "true") {
  window.location.href = "blocked.html";
}

document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('searchButton');
  if (searchButton) {
    searchButton.addEventListener('click', checkInviteCode);
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkInviteCode();
    } 
  });

  const inputField = document.getElementById("invite-code");
  const tooltip = document.getElementById("tooltip");

  if (inputField && tooltip) {
      inputField.addEventListener("mouseover", () => {
        tooltip.style.display = "block";
      });

      inputField.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
      });
  }
});


function showAuthDiv() {
  const authDiv = document.getElementById("auth");
  if (authDiv) {
    authDiv.style.display = "block";
  }
}

function checkInviteCode() {
  const inputCode = document.getElementById("invite-code").value.trim();
  const iframe = document.getElementById("myIframe");

  if (validCodes.includes(inputCode)) {
    localStorage.setItem("accessGranted", "true");
    window.location.href = "../../index.html";
  } else if (blank.includes(inputCode)) {
    console.log("blank");
  } else {
    localStorage.setItem("accessGranted", "bob");
    toggleFullscreen();
    
    // MODIFIED: Added a small delay to fix the timing issue.
    // This ensures the iframe is ready before the message is sent.
    setTimeout(() => {
        iframe.contentWindow.postMessage('startSequence', '*');
    }, 100); // 100ms delay
  }

}




