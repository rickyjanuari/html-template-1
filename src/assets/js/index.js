// Importing JavaScript
//
// You have two choices for including Bootstrap's JS files—the whole thing,
// or just the bits that you need.


// Option 1
//
// Import Bootstrap's bundle (all of Bootstrap's JS + Popper.js dependency)

// import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


// Option 2
//
// Import just what we need

// If you're importing tooltips or popovers, be sure to include our Popper.js dependency
//import "../../node_modules/@popperjs/core/dist/umd/popper.min.js";

// Import the required DOM management plugins first
//import "../../node_modules/bootstrap/js/dist/dom/data.js";
//import "../../node_modules/bootstrap/js/dist/dom/event-handler.js";
//import "../../node_modules/bootstrap/js/dist/dom/manipulator.js";
//import "../../node_modules/bootstrap/js/dist/dom/selector-engine.js";
//import "../../node_modules/bootstrap/js/dist/base-component.js";

// Then your specific components
//import "../../node_modules/bootstrap/js/dist/dropdown.js";
//import "../../node_modules/bootstrap/js/dist/offcanvas.js";

// Preloader


window.addEventListener('load', function () {
	document.querySelector('.preloader').classList.add("off")
  });

document.querySelector('.revealator-delay1').classList.add("no-transform")

var url = "data/portfolio.json"
new Vue({
	el: "#grid",
	created: function () {
		this.getPortfolios();
	},
	data: {
		porfolio: [],
		isAddClass: false,
		isShowModal: false,
		current: false,
		currentActiveSlide: 0,
	},
	computed: {
		nextActiveSlide() {
			return this.currentActiveSlide + 1 >= this.porfolio.length ? 0 : this.currentActiveSlide + 1;
		}
	},
	methods: {
		handleSlideChange(val) {
			let direction;
			const calculatedNextSlide = this.currentActiveSlide + val;
			if (val > 0) {
				direction = "next";
			} else {
				direction = "previous";
			}
			if (direction === "next" && calculatedNextSlide < this.porfolio.length) {
				this.currentActiveSlide += val;
			} else if (direction === "next") {
				this.currentActiveSlide = 0;
			} else if (direction === "previous" && calculatedNextSlide < 0) {
				this.currentActiveSlide = this.porfolio.length - 1;
			} else {
				this.currentActiveSlide += val;
			}
		},
		itemClicked: function (item) {
			this.currentActiveSlide = item.id - 1;
			this.isShowModal = true;
			this.current = true;
		},
		addClass: function () {
			this.isAddClass = true;
		},
		closeSlideShow: function () {
			this.isShowModal = false;
		},
		getPortfolios: function () {
			axios.get(url)
				.then(res => {
					//console.log(JSON.stringify(res.data.results))
					this.porfolio = res.data.portfolios;
				})
				.catch(function (error) {
					console.log(error)
				})
		},
	}
})

var url = "data/blog.json"
new Vue({
	el: "#blog",
	created: function () {
		this.getBlogs();
	},
	data: {
		posts: [],
		page: 1,
		perPage: 6,
		pages: [],
	},
	methods: {
		getBlogs: function () {
			axios.get(url)
				.then(res => {
					//console.log(JSON.stringify(res.data.results))
					this.posts = res.data.blogs;
				})
				.catch(function (error) {
					console.log(error)
				})
		},
		setPages() {
			let numberOfPages = Math.ceil(this.posts.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate(posts) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return posts.slice(from, to);
		},
	},
	computed: {
		displayedPosts() {
			return this.paginate(this.posts);
		}
	},
	watch: {
		posts() {
			this.setPages();
		}
	}
})

