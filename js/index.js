/*****************************************************************
File: index.js
Author: Jake Oh
Description:
Here is the sequence of logic for the app
- Once Device ready, will read localStorage
Version: 0.0.1
Updated: Mar 14, 2017
- Datas what I need should be definded
- Person Object is composed of name,BOD,items
- Item Object is made up of name of idea, store, URL,cost
- When the app start, read localStorage and make unorderded List

*****************************************************************/
//import {
//	hello
//} from "firstModule";
//console.log(hello);

"use strict"
//const CustomObject = require('./CustomObject');
var PATTERN = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

const INVALID_ID = 0;
const MYKEY = "giftr-oh000024";
const GIFTSHTML = "gifts.html";

//var magicnumber = 0;
let globalPersonId = 0;
// For datas
//let lists = [];
//let people = [];

var PERSON = {
	id: '',
	name: '',
	dob: '',
	ideas: null,
	getIdeas: function () {

	}
};

var IDEA = {
	"idea": "",
	"at": "",
	"cost": "",
	"url": ""
};

const GSTORAGE = {
	storage: "",
	gdata: null,
	init: function () {
		try {
			this.gdata = [];
			this.storage = localStorage.getItem(MYKEY);
			//console.trace(this.storage);
			if (this.storage === null) {
				this.storage = "";
			}
			if (this.storage.length > 0) {
				this.gdata = JSON.parse(this.storage);
				console.log("FIRST DATA: " + this.gdata);
				this.sortData(this.gdata);
				console.log("LATER DATA: " + this.gdata);
			}
		} catch (e) {
			console.log(e.message);
		}
	},
	addPerson: function (person) {
		try {
			if (INVALID_ID == person.id) {
				person.id = Date.now();;
				this.gdata.push(person);
				this.sortData(this.gdata);
				localStorage.setItem(MYKEY, JSON.stringify(this.gdata));
				console.log("Add New Person: " + person.name + "," + person.dob);
			}
		} catch (e) {
			console.log(e.message);
		}
	},

	// for when name or dob updated...
	updatePerson: function (person) {
		try {
			for (let i = 0, j = this.gdata.length; i < j; i++) {
				if (person.id == this.gdata[i].id) {
					console.log("Update person name: " + this.gdata[i].name + ", to :" + person.name + "," + "ID: " + this.gdata[i].id);
					this.gdata[i] = person;
					this.sortData(this.gdata);
					localStorage.setItem(MYKEY, JSON.stringify(this.gdata));
					break;
				}
				console.log("Contine");
			}
		} catch (e) {
			console.log(e.message);
		}
	},
	sortData: function () {
		this.gdata.sort(function (a, b) {
			if (a.dob < b.do) {
				return -1;
			} else if (a.dob > b.dob) {
				return 1;
			} else {
				return 0;
			}
		})
	},
	delete: function () {
		console.log("")
	},

	// When Gifts was updated..
	deleteIdea: function (person, idea) {
		try {
			for (let i = 0, j = this.gdata.length; i < j; i++) {
				if (person.id == this.gdata[i].id) {
					console.log("BEFORE: " + this.gdata[i].ideas);
					this.gdata[i].ideas = this.gdata[i].ideas.filter(function (p) {
						return p.idea != idea;
					});
					localStorage.setItem(MYKEY, JSON.stringify(this.gdata));
					console.log("AFTER: " + this.gdata[i].ideas);
					break;
				}
				console.log("Contine");
			}
		} catch (e) {
			console.log(e.message);
		}
	},
	find: function (name) {
		for (let i = 0, count = this.gdata.length; i <= count; i++) {
			console.debug(this.gdata[i].name + ", " + this.gdata[i]);
			if (this.gdata[i].name == name) {
				console.log("Found Name: " + this.gdata[i].name);
				console.trace(this.gdata[i].ideas);
				return this.gdata[i];
			}
		}
	},
	findbyID: function (globalPersonId) {
		for (let i = 0, count = this.gdata.length; i <= count; i++) {
			console.debug(this.gdata[i].name + ", " + this.gdata[i]);
			if (this.gdata[i].id == globalPersonId) {
				console.log("Found Name: " + this.gdata[i].name);
				return this.gdata[i];
			}
		}
	},
	updateData: function (person) {
		for (let i = 0, count = this.gdata.length; i <= count; i++) {
			console.debug(this.gdata[i].name + ", " + this.gdata[i]);
			if (this.gdata[i].id == person.id) {
				console.log("Found Name: " + this.gdata[i].name);
				console.trace("Before Update: " + this.gdata[i]);
				this.gdata[i] = person;
				console.trace("After Update: " + this.gdata[i]);
				localStorage.setItem(MYKEY, JSON.stringify(this.gdata));
				console.trace(localStorage.getItem(MYKEY));
				console.trace(this.gdata);
				break;
				//return this.gdata[i];
			}
		}
	}
}

function createList(intype, inlabel, inplaceholder) {

	return function () {
		let from = document.querySelector(".input-group");
		let div = document.createElement("div");
		let label = document.createElement("label");
		let input = document.createElement("input");

		div.classList.add("input-row");
		label.textContent = inlabel;
		input.setAttribute = intype;
	}
}
const GAPP = {
	content: '',
	ul: '',
	gdatas: '',
	getUL: function () {
		return this.ul;
	},

	init: function () {
		//this.content = document.getElementById()
		this.ul = document.querySelector(".table-view");

	},

	clearEvent: function () {
		let names = document.querySelectorAll("data-id");
		for (let i = 0, j = names.length; i < j; i++) {
			names[i].removeEventListener('touchstart', this.onClickName);
		};
	},
	onClickName: function (aName, e) {

		var a = e.currentTarget;

		globalPersonId = aName.getAttribute("data-id");

		if (0 != globalPersonId) {
			let _person = GSTORAGE.findbyID(globalPersonId);
			document.getElementById("name").value = _person.name;
			document.getElementById("dob").value = _person.dob;
		} else {
			globalPersonId = 0;
			console.log("Can not find person");
		}
	},
	createHtml4Peple: function (person) {

		try {
			//this.ul = document.querySelector(".table-view");
			let li = document.createElement("li");
			let spanName = document.createElement("span");
			let spanDate = document.createElement("span");
			let aName = document.createElement("a");
			let aDod = document.createElement("a");
			let sbadges =  document.createElement("span");
			

			li.classList.add("table-view-cell");
			spanName.classList.add("name");

			aName.href = "#personModal";
			aName.textContent = person.name;

			aDod.classList.add("navigate-right","pull-right");
			aDod.href = GIFTSHTML;

			sbadges.classList.add("badge","badge-primary","pull-right");
			sbadges.textContent = person.ideas.length;
			
			//aDod.appendChild(sbadges);
			let att = document.createAttribute("data-id");
			att.value = person.id;
			aName.setAttributeNode(att);
			
			// For Testing Event
			aName.addEventListener("touchstart", function (ev) {
				GAPP.onClickName(aName, ev)
			});


			aDod.addEventListener("touchstart", function (ev) {
				var a = ev.currentTarget;
				globalPersonId = aName.getAttribute("data-id");
			});
			spanDate.classList.add("dob");
			spanDate.textContent = person.dob;
			spanDate.appendChild(sbadges);

			spanName.appendChild(aName);
			spanName.appendChild(aDod);
			
			aDod.appendChild(spanDate);

			li.appendChild(spanName);
			li.appendChild(spanDate);
			//li.appendChild(sbadges);
			//li.appendChild(abadges);
			this.ul.appendChild(li);
		} catch (e) {

			console.log(e.message);
		}
	},

	updatePersonHtml: function (person) {

		let names = document.querySelectorAll("data-id");
		for (let name of names) {

			if (globalPersonId == name.getAttribute("data-id")) {
				console.log("Find ID: " + id + " " + "Person: " + name.textContent);
				name.textContent = person.name;
				let _dob = name.parent.nextSibling;
				console.log("DOB: " + _dob.textContent);
				_dob.value = person.dob;
			}
		}
	},
	//	GiftIdea : createList(text,datd,"idea"),
	//	Store : createList(text,datd,"where to find it"),
	//	URL : createList(text,datd,data),
	//	Cost : createList(text,datd,data),

	createHtml4Gifts: function (person) {

		//		let spans = document.querySelectorAll(".icon-trash");
		//		for (let span of spans) {
		//			span.removeEventListener('click', this.deleteGift);
		//		}

		document.querySelector(".title").textContent = "Lists for " + person.name;
		let ideas = person.ideas;
		this.ul = document.querySelector(".table-view");
		this.ul.innerHTML = "";

		for (let idea of ideas) {
			let li = document.createElement("li");
			let spanName = document.createElement("span");
			let div = document.createElement("div");

			li.classList.add("table-view-cell", "media");
			spanName.classList.add("pull-right", "icon", "icon-trash", "midline");

			spanName.addEventListener('touchstart', this.deleteGift(li, this.ul, person, idea['idea']));

			Object.keys(idea).forEach(function (key) {

				let value = idea[key];
				console.log("Key: " + key + "," + "value: " + value);
				if (key === "idea") {
					div.classList.add("media-body");
					div.textContent = value;
				} else {
					let p = document.createElement("p");
					if(key=="url" && value.length!=0){
						let aurl = document.createElement("a");
						aurl.href=value;
						aurl.textContent=value;
						p.appendChild(aurl);
					}
					else{
					p.textContent = value;
					}
					div.appendChild(p);
				}
			});
			li.appendChild(spanName);
			li.appendChild(div);
			this.ul.appendChild(li);
		}
	},
	deleteGift: function (li, ul, person, idea) {
		return function () {
			GSTORAGE.deleteIdea(person, idea);
			ul.removeChild(li);
		}
	},
	deleteList: function () {

	},

	buildList: function () {
		this.clearEvent();
		this.ul = document.querySelector(".table-view");
		this.ul.innerHTML = "";
		try {
			for (let person of GSTORAGE.gdata) {
				this.createHtml4Peple(person);
			}
		} catch (e) {
			alert(e.message);
		}
	}
}
const MODALHANDLER = {
	init: function () {
		window.document.querySelector('.btn.btn-primary.btn-block').addEventListener('touchstart', this.addPersonOK);

		window.document.querySelector('.btn.btn-block').addEventListener('touchstart', this.addPersonCancel);
	},

	addPersonOK: function (ev) {
		try {
			console.log('called addPerson');
			let isNew = false;

			let name = document.getElementById("name").value;
			let dob = document.getElementById("dob").value; //.toString();

			if (name.length == 0 || dob.length == 0) {
				alert("Incorrect input data name or Birtdate");
				return;
			}

			//If getting base information, process a next step
			let modal = document.getElementById('personModal');
			modal.classList.remove('active');

			let person = null;
			// If New Person
			if (0 == globalPersonId) {
				isNew = true;
				person = Object.create(PERSON);
				person.id = 0;
				person.ideas = [];
			} else {
				person = GSTORAGE.findbyID(globalPersonId);
			}

			person.name = document.getElementById("name").value;
			person.dob = document.getElementById("dob").value; //.toString();


			if (isNew) {
				GSTORAGE.addPerson(person);
			} else {
				GSTORAGE.updatePerson(person);
			}
			GAPP.buildList();

		} catch (e) {
			console.log(e.message);
		} finally {
			document.getElementById("name").value = "";
			document.getElementById("dob").value = "";
			globalPersonId = 0;
		}

	},
	addPersonCancel: function () {
		let modal = document.getElementById('personModal');
		modal.classList.remove('active');
		document.getElementById("name").value = "";
		document.getElementById("dob").value = "";
		globalPersonId = 0;
	},

	addIdeaOK: function (person, ev) {

		console.log("addIdeaOK" + person);
		return function () {
			try {
				console.log('called addIdeaOK');
				let idea = document.getElementById("giftidea").value;
				let at = document.getElementById("at").value;
				let url = document.getElementById("url").value;
				let cost = document.getElementById("cost").value;

				if (idea.length == 0) {
					alert("Incorrect input data.");
					return;
				}

				//console.log(REGEX_URL.test(url));

				//REGUALEXP
				//var re = new RegExp('\\w+');
				let ret = PATTERN.test(url);
				console.log(ret)
				if(!ret){
					throw new Error("URL is invalid!");
				}
							//
				let newidea = Object.create(IDEA);
				newidea.idea = idea;
				newidea.at = at;
				newidea.url = url;
				newidea.cost = cost.length!=0?"$"+cost:cost;

				person.ideas.push(newidea);
				person.say = function () {
					console.log("MY Name is " + this.name);
				}

				let modal = document.getElementById('giftModal');
				modal.classList.remove('active');

				let event = new CustomEvent(person.name);
				document.addEventListener(person.name, person.say);
				document.dispatchEvent(event);

				GSTORAGE.updateData(person);
				GAPP.createHtml4Gifts(person, globalPersonId);
				MODALHANDLER.clearInput();
				globalPersonId = 0;

			} catch (e) {
				alert(e.message);
			}
		} 
		
	},
	clearInput:function(){
		let modal = document.getElementById('giftModal');
		modal.classList.remove('active');
		document.getElementById("giftidea").value = "";
		document.getElementById("at").value = "";
		document.getElementById("url").value = "";
		document.getElementById("cost").value = "";
	},
	addIdeaCancel: function () {
			this.clearInput();
			globalPersonId = 0;
	}
}
const HANDLER = {
	init: function () {
		console.log('called init')
	},
}

var app = {
	localNote: null,
	init: function () {
		try {
			document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		} catch (e) {
			document.addEventListener('DOMContentLoaded', this.onDeviceReady.bind(this), false);
			console.log('failed to find deviceready');
		}
	},
	onDeviceReady: function () {
		GSTORAGE.init();
		GAPP.init();

		console.log("called onDeviceReady");
		//MODALHANDLER.init();

		window.addEventListener('push', app.pageChanged);
		app.showPersonList();
	},
	pageChanged: function (ev) {
		console.log('pageChanged' + " ");
		let contentDiv = ev.currentTarget.document.querySelector(".content");
		let id = contentDiv.id;
		var a = ev.currentTarget;

		console.trace(globalPersonId);
		switch (id) {
			case "personPage":
				app.showPersonList();
				break;
			case "giftPage":
				let fields = document.URL.split('#');
				//console.log(document.URL + " " + fields[0] + " " + fields[1]);
				app.showGifts(globalPersonId);
				break;
		}
		window.addEventListener('beforeunload', function (event) {
			console.log('I am the 1st one.');
		});
	},
	showPersonList: function () {
		console.log("Here is First Page");
		//GAPP.init();
		window.document.querySelector('.btn.btn-primary.btn-block').addEventListener('touchstart', MODALHANDLER.addPersonOK);

		window.document.querySelector('.btn.btn-block').addEventListener('touchstart', MODALHANDLER.addPersonCancel);
		GAPP.buildList();
	},
	showGifts: function (id) {

		try {
			let person = GSTORAGE.findbyID(id);
			if (person.ideas === undefined) {
				person.ideas = [];
			} else {
				GAPP.createHtml4Gifts(person);
			}
			let okbut = document.querySelector('.btn.btn-primary.btn-block');
			okbut.addEventListener('touchstart', MODALHANDLER.addIdeaOK(person));

			let cancbut = document.querySelector('.btn.btn-block');
			cancbut.addEventListener('touchstart', MODALHANDLER.addIdeaCancel);

		} catch (e) {
			console.log(e.message);
		}

	}
};

app.init();
