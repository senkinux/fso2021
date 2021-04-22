const dummy = blogs => 1

const totalLikes = blogposts => {
	return blogposts.reduce((acc, cur) => acc + cur.likes, 0)
}

const favoriteBlog = blogs => {
	const favoriteBlog = blogs.reduce((prev, cur) =>
		prev.likes < cur.likes ? cur : prev
	)
	delete favoriteBlog.__v
	delete favoriteBlog._id
	return favoriteBlog
}

const mostBlogs = blogs => {
	const arrOfAuthors = blogs.map(item => item.author)
	const total = {}
	arrOfAuthors.map(author => {
		if (author in total) {
			total[author] = total[author] + 1
		} else {
			total[author] = 1
		}
	})

	let maxPerson = {}
	let val = 0
	for (key in total) {
		if (total[key] > val) {
			maxPerson.author = key
			maxPerson.blogs = total[key]
			val = total[key]
		}
	}
	return maxPerson
}

const mostLikes = blogs => {
	const cache = {}
	blogs.map(item => {
		if (item.author in cache) {
			cache[item.author] += item.likes
		} else {
			cache[item.author] = item.likes
		}
	})

	let val = 0
	let maxPerson = {}
	for (key in cache) {
		if (val < cache[key]) {
			maxPerson.author = key
			maxPerson.likes = cache[key]
			val = cache[key]
		}
	}

	return maxPerson
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
