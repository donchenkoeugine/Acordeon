(function() {
	let accordion = document.getElementById("accordion");
	let accordionParts = accordion.querySelectorAll(".part_accordion");
	let allTitleItems = accordion.querySelectorAll(".title_item_accordion");
	let amountOpen = 0;
	let repository = {	oneAlwaysOpen	: false,
						oneOnlyOpen		: false,
						items			: []};
	for (let item of accordion.querySelectorAll(".item_accordion")) {
		let objectItem = {item: item};
		Object.defineProperty(	objectItem, "open", {configurable: true, enumerable: true, get: ()=>{return item.querySelector(".part_accordion").classList.contains("open_accordion")}})
		repository.items.push(objectItem);
	}
	if (accordion.getAttribute("data-onealwaysopen")=="true") {
		repository.oneAlwaysOpen = accordion.getAttribute("data-onealwaysopen");
	}
	if (accordion.getAttribute("data-oneonlyopen")=="true") {
		repository.oneOnlyOpen = true;
	}

	if (repository.oneAlwaysOpen) {
		accordionParts[0].classList.add("open_accordion");
		allTitleItems[0].classList.add("selected_item_accordion");
		amountOpen++;
	}

	function controlOpenItems(elem) {
		for (let i=0; i<repository.items.length; i++) {
			if (accordionParts[i].classList.contains("open_accordion") && !elem.classList.contains("selected_item_accordion")) {
				accordionParts[i].classList.remove("open_accordion");
				accordionParts[i].parentElement.querySelector(".title_item_accordion").classList.remove("selected_item_accordion");
				amountOpen--;
			}
		}
	}

	accordion.addEventListener("click", event=>{
		let target = event.target;
		let partTarget = target.parentElement.querySelector(".part_accordion");
		if (repository.oneAlwaysOpen && amountOpen===1 && target.classList.contains("selected_item_accordion")) {
			return;
		}
		if (repository.oneOnlyOpen && amountOpen>0) {
			controlOpenItems(target);
		}
		if (target.classList.contains("title_item_accordion")) {
			partTarget.classList.toggle("open_accordion");
			target.classList.toggle("selected_item_accordion");
			if (partTarget.classList.contains("open_accordion")) {
				amountOpen++;
			} else {
				amountOpen--;
			}
		}
	})
})();