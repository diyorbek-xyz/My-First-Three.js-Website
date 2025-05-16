const pointer = document.getElementById("pointer").style;
window.addEventListener("mousemove", (e) => {
	pointer.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
window.addEventListener("mouseover", () => {
	pointer.display = "block";
});
window.addEventListener("mouseout", () => {
	pointer.display = "none";
});
