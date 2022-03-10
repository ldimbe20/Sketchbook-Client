import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { createPost, getPosts } from "./PostManager"
import Multiselect from "multiselect-react-dropdown";




export const PostForm = () => {
	// const [moods, setMoods] = useState({})
	const [mediums, setMediums] = useState([])
	const history = useHistory()

	// Below code allows users to upload their own photos 

	// const getBase64 = (file, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(file);
    //   }
    
    //   const createImageString = (event) => {
    //     getBase64(event.target.files[0], (base64ImageString) => {
    //         console.log("Base64 of file is", base64ImageString);
    //         // Update a component state variable to the value of base64ImageString
    //         setString(base64ImageString)
    //     });
    //   }
  

	const [post, setPost] = useState({
		// Declaring State variable
		user_id: "",
		mood_id: 1,
		title: "",
		publication_date: "",
		image_url: "",
		notes: "",
		private: "",
		mediums_used: [],
		
	})



//! need to fetch moods data


	const fetchMediums = () => {
		return (
			fetch("http://localhost:8000/mediums", {
				method: "GET",
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			})
				.then((res) => res.json())
				//taking json string and parsing into js
				.then((data) => {
					// data = categories converted from string to array, setting that response with showCategories
					setMediums(data)
				})
		)
	}

  

	useEffect(() => {
		fetchMediums()
	}, [])



	// useEffect(() => {
	// 	fetch(`http://localhost:8000/categories`, {
	// 		method: "GET",
	// 		headers: {
	// 			Authorization: `Token ${localStorage.getItem("token")}`,
	// 		},
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			updateCategories(data)
	// 		})
	// }, [])

	const changePostState = (event) => {
		const copy = { ...post }
		copy[event.target.name] = event.target.value
		setPost(copy)
	}

	return (
		<div className='container'>
			<form className='Column'>
				<h2 className='title'>Create New Post</h2>



				<div className='field my-5'>
					<label htmlFor='image'>Image:</label>
					<input
						type='url'
						name='image_url'
						placeholder='URL of img'
						className='input'
						value={post.image_url}
						onChange={changePostState}
					/>
				</div>
				{/* <input type="file" id="post_image" onChange={createImageString} />
				<input type="hidden" name="post_id" value={post.id} /> */}
				<button onClick={() => {
					// Upload the stringified image that is stored in state
				}}>Upload</button>









				<div className="field my-5">
					<label className="label">Title </label>
					<div className="control">
						<input
							required
							autoFocus
							type='text'
							name='title'
							className='input'
							placeholder='Title'
							value={post.title}
							onChange={changePostState}
						/>
					</div>
				</div>
				
				

					{/* <div className="field my-5">
						<label htmlFor='mood-select'> Choose a mood:</label>
						<select
							name='mood'
							id='mood-select'
							onChange={(evt) => {
								const copy = { ...post }
								copy.mood_id = parseInt(evt.target.value)
								setPost(copy)
							}}>
							<option value=''>--Please choose a mood-</option>
							{Moods.map((mood) => (
								<option key={mood.id} value={mood.id}>
									{mood.mood_type}
								</option>
							))}
						</select>
					</div> */}


					<div className='field my-5'>
						<label className="label">Notes:</label>
						<input
							required
							autoFocus
							type='text'
							name='name'
							className='input'
							placeholder='Name'
							value={post.name}
							onChange={changePostState}
						/>
					</div>
				
				<div className="field my-5">
					<label className="label">Add Materials Below </label>
					<Multiselect
						isObject={false}
						onRemove={(array_of_mediums) => {
							const copy = { ...post }
							setPost({
								...copy,
								mediums_used: array_of_mediums,
							})
						}}
						//when item is clicked the event is recorded(array_of_mediums) 
						onSelect={(array_of_mediums) => {
							//below we are making a copy of post object then resetting the setPost to the post object, but changing the mediums_used with recorded event
							//on line 164
							const copy = { ...post }
							setPost({
								...copy,
								mediums_used: array_of_mediums,
							})
						}}
						options={mediums.map((medium) => medium.name)}
					/>
				</div>

				<button
					type='submit'
					onClick={(evt) => {
						evt.preventDefault()

						const newPost = {
							user_id: post.user_id,
							mood_id: post.mood_id,
							title: post.title,
							publication_date: Date.now(),
							image_url: post.image_url,
							notes: post.notes,
							private: 1,
							mediums: Array.from(post.mediums),
						}

						createPost(newPost)
							.then(() => history.push("/posts"))
							.then(getPosts)
					}}
					className='btn btn-primary'>
					Create
				</button>
			</form>

		</div>
	)
}