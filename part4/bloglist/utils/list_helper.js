const dummy = blogs => 1

const totalLikes = blogposts => {
	return blogposts.reduce((acc, cur) => acc + cur.likes, 0)
}
module.exports = { dummy, totalLikes }
