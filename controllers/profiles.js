import { ObjectId } from 'mongodb'
import { formatAuthor } from '../utils/format-author.js'
import { formatDate } from '../utils/date-formatter.js'
import { Post } from '../models/post.js'
import { User } from '../zghost/db/User.js'

export const get_my_profile = async(req, res) => {
    const id = res.locals.user.id

    try {
        const user = await User.findById(id).select(
            'first_name last_name pictureUrl friends bannerUrl'
        )

        const posts = await Post.find({author: new ObjectId(id)}).populate(
            {
                path: 'author',
                select: 'first_name last_name pictureUrl _id'
            }
        )

        const userProfile = {
            id: id,
            name: `${user.first_name} ${user.last_name}`,
            pictureUrl: user.pictureUrl,
            bannerUrl: user.bannerUrl,
            friends: user.friends.length,
            posts: formattedPosts
        }

        const formattedPosts = posts.map(post =>({
            id: post._id.toString(),
            post_content: post.post_content,
            author: formatAuthor(post.author),
            comments: post.comments.length,
            likes: post.likes.length,
            reposts: post.reposts.length,
            createdAt: formatDate(post.createdAt)
        }))


        res.render('profile', { 
            title: 'My Profile', 
            heading: 'User Profile',
            profile: userProfile
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')  
    }
}

export const get_user_profile = async(req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id).select(
            'first_name last_name pictureUrl friends bannerUrl'
        )
        
        const posts = await Post.find({author: new ObjectId(id)}).populate(
            {
                path: 'author',
                select: 'first_name last_name pictureUrl _id'
            }
            )

            const formattedPosts = posts.map(post =>({
                id: post._id.toString(),
                content: post.post_content,
                author: formatAuthor(post.author),
                comments: post.comments.length,
                likes: post.likes.length,
                reposts: post.reposts.length,
                createdAt: formatDate(post.createdAt)
            }))
        
        const profile = {
            id: id,
            name: `${user.first_name} ${user.last_name}`,
            pictureUrl: user.pictureUrl,
            bannerUrl: user.bannerUrl,
            friends: user.friends.length,
        }
        
        res.render('profile', { 
            title: `${profile.name}`, 
            heading: `${profile.name} Profile`,
            profile: profile,
            posts: formattedPosts
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')  
    }
}

export const get_editing_form = async(req, res) =>{
    try {
        const user = await User.findById(res.locals.user.id).select(
            'first_name last_name pictureUrl friends bannerUrl'
        )
        const profile = {
            id: id,
            name: `${user.first_name} ${user.last_name}`,
            pictureUrl: user.pictureUrl,
            bannerUrl: user.bannerUrl,
            friends: user.friends.length,
            posts: formattedPosts
        }

        res.render('edit-profile', { 
            title: 'Edit Profile',
            heading: 'Edit Profile', 
            profile 
        })    
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
}

export const update_profile = async(req, res) =>{
   
    const {
        first_name, 
        last_name, 
        pictureUrl, 
        bannerUrl
    } = req.body

    try {
        await User.findByIdAndUpdate(res.locals.user.id, {
            first_name, last_name, pictureUrl, bannerUrl
        })

        res.redirect('/profiles/me')
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
}


