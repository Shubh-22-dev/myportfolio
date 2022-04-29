const sapicon = document.querySelector(".sapicon")
const sapbutton = document.querySelector(".sapbutton")

sapbutton.addEventListener("mouseover", (event) => {
    sapicon.src = "images/sap-white.png";
})
sapbutton.addEventListener("mouseout", (event) => {
    sapicon.src = "images/sap.png";
})