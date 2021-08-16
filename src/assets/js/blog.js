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
