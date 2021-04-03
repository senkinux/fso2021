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

module.exports = { dummy, totalLikes, favoriteBlog }
