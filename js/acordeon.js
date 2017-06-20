(function() {
	let acordeon = document.getElementById("acordeon");
	let acordeonParts = acordeon.querySelectorAll(".part_acordeon");
	let allTitleItems = acordeon.querySelectorAll(".title_item_acordeon");
	let amountOpen = 0;
	let repository = {	oneAlwaysOpen	: true,
						oneOnlyOpen		: true,
						items			: []};
	for (let item of acordeon.querySelectorAll(".item_acordeon")) {
		let objectItem = {item: item};
		Object.defineProperty(	objectItem, "open", {configurable: true, enumerable: true, get: ()=>{return item.querySelector(".part_acordeon").classList.contains("open_acordeon")}})
		repository.items.push(objectItem);
	}

	if (repository.oneAlwaysOpen) {
		acordeonParts[0].classList.add("open_acordeon");
		allTitleItems[0].classList.add("selected_item_acordeon");
		amountOpen++;
	}

	function controlOpenItems(elem) {
		for (let i=0; i<repository.items.length; i++) {
			if (acordeonParts[i].classList.contains("open_acordeon") && !elem.classList.contains("selected_item_acordeon")) {
				acordeonParts[i].classList.remove("open_acordeon");
				acordeonParts[i].parentElement.querySelector(".title_item_acordeon").classList.remove("selected_item_acordeon");
				amountOpen--;
			}
		}
	}

	acordeon.addEventListener("click", event=>{
		let target = event.target;
		let partTarget = target.parentElement.querySelector(".part_acordeon");
		if (repository.oneAlwaysOpen && amountOpen===1 && target.classList.contains("selected_item_acordeon")) {
			return;
		}
		if (repository.oneOnlyOpen && amountOpen>0) {
			controlOpenItems(target);
		}
		if (target.classList.contains("title_item_acordeon")) {
			partTarget.classList.toggle("open_acordeon");
			target.classList.toggle("selected_item_acordeon");
			if (partTarget.classList.contains("open_acordeon")) {
				amountOpen++;
			} else {
				amountOpen--;
			}
		}
	})
})();