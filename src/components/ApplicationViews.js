import React from "react"
import { Route } from "react-router-dom"
import {ShowPrivatePost} from "./posts/PrivatePost"
import { ShowPost } from "./posts/SharedPost"
import { PostForm } from "./posts/CreatePost"
import { ShowThumbnails } from "./posts/SharedPost_Thumbnails"
import { ShowPrivateThumbnails } from "./posts/PrivatePost_Thumbnails"
import { UpdatePost } from "./posts/UpdatePost"
import { CommentForm } from "./comments/CommentForm"
import { Medium } from "./mediums/MediumsList"
import { Resource } from "./resource/Resource"
import { Watercolor } from "./resource/watercolor"
import { Ink } from "./resource/pen_ink"
import { Oil } from "./resource/oils"
import { Acrylic } from "./resource/acrylic"
import { Gauche } from "./resource/gauche"
import { Charcoal } from "./resource/charcoal"
import { Checklist } from "./checklists/CheckList_List"
import { ChecklistForm } from "./checklists/ChecklistForm"
import { CommentList } from "./comments/CommentList"
import { PrivatePostSingle } from "./posts/PrivatePostSingle"

export const ApplicationViews = () => {
	return (
		<>
			<Route exact path='/'>
				{/* parent */}
				<ShowPost />
			</Route>

			<Route exact path='/thumbnails'>
				<ShowThumbnails />
			</Route> 



			<Route exact path='/private_posts/:postId(\d+)'>
			<PrivatePostSingle />
			</Route>

			<Route exact path='/private_thumbnails'>
				<ShowPrivateThumbnails />
			</Route> 


			<Route exact path='/private_posts'>
				{/* child */}
				<ShowPrivatePost />
			</Route>
			{/* when the url is posts, display postId- capturing after : and storing */}
			{/* postId is the key post component! */}

			
			<Route exact path='/mediums'>
				{/* child */}
				<Medium />
			</Route>

			<Route exact path='/resources'>
				{/* child */}
				<Resource />
			</Route>
			
			<Route exact path='/createPost'>
				<PostForm />
			</Route>

			<Route exact path='/createPost'>
				<PrivatePostSingle />
			</Route>

			<Route exact path='/posts/:postId(\d+)/update'>
				<UpdatePost />
			</Route>

			<Route exact path='/comments/:postId(\d+)'>
				<CommentForm />
			</Route>

			<Route exact path='/posts/:postId(\d+)'>
				<CommentList />
			</Route>


			 <Route exact path='/watercolor'>
				<Watercolor />
			</Route> 

			<Route exact path='/ink'>
				<Ink />
			</Route> 

			<Route exact path='/oil'>
				<Oil />
			</Route> 

			<Route exact path='/acrylic'>
				<Acrylic />
			</Route> 

			<Route exact path='/gauche'>
				<Gauche />
			</Route> 

			<Route exact path='/charcoal'>
				<Charcoal />
			</Route> 


			<Route exact path='/checklists'>
				<Checklist />
			</Route> 

			<Route exact path='/checklistsform'>
				<ChecklistForm />
			</Route> 

			


			
		</>
	)
}

