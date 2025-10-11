// --- Configuration ---
// List of valid access codes
const validCodes = ["Yqcne2", "Omv46U", "L3v2I0", "fxFl6s", "ZlO3Gy", "t760kv", "006I09", "7cu2ZG", "U9P0Nl", "mjzRK3", "XXXXXX", "dadish3", "bob", "Michael"];

// --- Redirection Logic ---
// This runs immediately to protect pages.
// If on the blocked page but already granted access, go to the homepage.
if (window.location.pathname.endsWith("blocked.html") && localStorage.getItem("accessGranted") === "true") {
  window.location.href = "/";
} 
// If NOT on the blocked page and access is NOT granted, redirect to the blocked page.
else if (!window.location.pathname.endsWith("blocked.html") && localStorage.getItem("accessGranted") !== "true") {
  window.location.href = "blocked.html";
}

// --- Event Listeners for the Access Page ---
// We wait for the page to fully load before trying to find elements.
document.addEventListener('DOMContentLoaded', () => {
    const inviteCodeInput = document.getElementById('invite-code');
    const submitBtn = document.getElementById('submit-btn'); // Corrected button ID
    const errorMessage = document.getElementById('error-message');
    
    // Only add listeners if we are on the blocked page and the elements exist
    if (inviteCodeInput && submitBtn) {
        // Handle button click
        submitBtn.addEventListener('click', checkInviteCode);

        // Handle 'Enter' key press
        inviteCodeInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                checkInviteCode();
            }
        });
    }
});

// --- Core Functions ---
/**
 * Checks the entered invite code and acts accordingly.
 */
function checkInviteCode() {
    const inviteCodeInput = document.getElementById("invite-code");
    const errorMessage = document.getElementById('error-message');
    const inputCode = inviteCodeInput.value.trim();
    const iframe = document.getElementById("myIframe");

    if (validCodes.includes(inputCode)) {
        // If the code is valid, grant access and redirect to the homepage.
        localStorage.setItem("accessGranted", "true");
        window.location.href = "/";
    } else if (inputCode === "") {
        // Do nothing if the input is blank.
        console.log("Input is blank.");
    } else {
        // If the code is invalid, show an error and potentially trigger the easter egg.
        if (errorMessage) errorMessage.style.display = 'block';
        localStorage.setItem("accessGranted", "bob"); // As in the original script
        
        // This part is for the "banana.html" easter egg iframe
        if (iframe) {
            toggleFullscreen();
            setTimeout(() => {
                iframe.contentWindow.postMessage('startSequence', '*');
            }, 100);
        }
    }
}

/**
 * Toggles fullscreen for the iframe element.
 */
function toggleFullscreen() {
    const iframe = document.getElementById("myIframe");
    if (!iframe) return;

    if (iframe.requestFullscreen) iframe.requestFullscreen();
    else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen(); // Safari
    else if (iframe.mozRequestFullscreen) iframe.mozRequestFullscreen(); // Firefox
    else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen(); // IE11
}

// --- Iframe Communication for Fullscreen Management ---
window.addEventListener('message', function(event) {
    if (event.data === 'sequenceFinished') {
        if (document.fullscreenElement) document.exitFullscreen();
    }
});

document.addEventListener('fullscreenchange', function() {
    const iframe = document.getElementById("myIframe");
    if (!document.fullscreenElement && iframe) {
        iframe.contentWindow.postMessage('resetSequence', '*');
    }
});
