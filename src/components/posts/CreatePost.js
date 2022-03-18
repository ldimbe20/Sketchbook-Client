import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import {createPost } from "./PostManager"
import Multiselect from "multiselect-react-dropdown";
import {getMoods} from "../moods/MoodManager"
import {getMediums} from "../mediums/MediumsManager"


export const PostForm = () => {
	const [mediums, setMediums] = useState([])
	const [moods, setMoods] = useState([])
	const history = useHistory()

	// Below code allows users to upload their own photos 


  

	const [post, setPost] = useState({
		// Declaring State variable
		user_id: "",
		mood_id: 1,
		title: "",
		publication_date: "",
		image_url: "",
		notes: "",
		private: false,
		mediums_used: [],
		
	})

	const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
      }
    
    const createImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
			const copy = { ...post }
			copy.image_url = base64ImageString, 
			setPost(copy)
        });
      }

	useEffect(()=> {
        getMoods().then(m => setMoods(m))
    }, [])
	
	useEffect(()=> {
        getMediums().then(m => setMediums(m))
    }, [])
	
	const changePostState = (event) => {
		const copy = { ...post }
		copy[event.target.name] = event.target.value, 
		setPost(copy)
	}
	

	return (
		<div className='container'>
			<form className='Column'>
				<h2 className='title'>Create New Post</h2>



				{/* <div className='field my-5'>
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
				
				<button onClick={() => {
				}}>Upload</button> */}

                <div className="field my-5">
					<p>Upload Image Post Here</p>
					<input type="file" id="imgdata" onChange={createImageString} placeholder='Upload Image'/>
					<input type="hidden" name="post_id" value={post.id} />
                </div>

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
					<label className="label">Date </label>
					<div className="control">
						<input
							required
							autoFocus
							type='Date'
							name='Date'
							className='input'
							placeholder='Choose Date'
							value={post.publication_date}
							onChange={changePostState}
						/>
					</div>
				</div> */}
				

					<div className="field my-5">
						<label htmlFor='mood-select'> Choose a mood:</label>
						<select
							name='mood'
							className='input'
							id='mood-select'
							onChange={(evt) => {
								const copy = { ...post }
								copy.mood_id = parseInt(evt.target.value)
								setPost(copy)
							}}>
							<option value=''>--Please choose a mood-</option>
							{moods.map((mood) => (
								<option key={mood.id} value={mood.id}>
									{mood.mood_type}
								</option>
							))}
						</select>
					</div>


					<div className='field my-5'>
						<label className="label">Notes:</label>
						<input
							required
							autoFocus
							type='text'
							name='notes'
							className='input'
							placeholder='Name'
							value={post.notes}
							onChange={changePostState}
						/>
					</div>
				
				<div className="field my-5">
					<label className="label">Add Materials Below </label>
					<Multiselect
					    displayValue="key"
						isObject={true}
						onRemove={(array_of_mediums) => {
							const array_of_newMediums = array_of_mediums.map((medium) =>(medium.id))

							const copy = { ...post }
							setPost({
								...copy,
								mediums_used: array_of_newMediums,
							})
						}}
						//when item is clicked the event is recorded(array_of_mediums) 
						onSelect={(array_of_mediums) => {
							//below we are making a copy of post object then resetting the setPost to the post object, but changing the mediums_used with recorded event
							//on line 164
							const array_of_newMediums = array_of_mediums.map((medium) =>(medium.id))

							const copy = { ...post }
							setPost({
								...copy,
								mediums_used: array_of_newMediums,
							})
						}}

						options={mediums.map((medium) => ({id:medium.id, key:medium.name}))
						}

					/>
				</div>
             

			
				<div className="Private">
                    <label className="checkbox">Check Here If Post Is Private:</label>
                    <input type="checkbox"
                         onChange={ 
                             (event) => {
                                 const copy ={...post}     
                                 copy.private = event.target.checked  
                                 setPost(copy)
                                 }      
                         }/>
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
							private: post.private,
							mediums_used: post.mediums_used
						
						}
                        

							createPost(newPost)
							if(newPost.private === false) {
							(history.push("/posts"))}
							else{
							{(history.push("/private_posts"))}}


							

				}}
					className='btn btn-primary is-small'>
					Create
				</button>
			</form>
		</div>

	)
}

