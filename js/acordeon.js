(function() {
	let acordeon = document.getElementById("acordeon");

	acordeon.addEventListener("click", event=>{
		let target = event.target;
		if (target.classList.contains("title_item_acordeon")) {
			target.parentElement.querySelector(".part_acordeon").classList.toggle("open_acordeon");
			target.classList.toggle("selected_item_acordeon");
	}
	})
})();