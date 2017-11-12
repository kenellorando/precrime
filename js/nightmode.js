$(document).ready(function() {
    $("#nightmodeCheck").on("change", function() {
        if (document.getElementById("nightmodeCheck").checked === true) {
            document.getElementById("theme").href = "./css/base-night.css";
        } else {
            document.getElementById("theme").href = "./css/base-day.css";
        }
    })
    
})