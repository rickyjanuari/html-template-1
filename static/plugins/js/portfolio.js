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
