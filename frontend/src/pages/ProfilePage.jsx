import React, { useContext, useState } from 'react'
import {useNavigate} from "react-router-dom"
import assets from "../assets/assets.js"
import { AuthContext } from '../../context/AuthContext.jsx'

const ProfilePage = () => {

  const {authUser, updateProfile} = useContext(AuthContext)

  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setIsLoading(true)
    
    try {
      if (!selectedImg) {
        await updateProfile({fullName: name, bio});
        navigate('/'); 
        setIsLoading(false)
      } else { 
      const reader = new FileReader();
      reader.readAsDataURL(selectedImg);
      reader.onload = async () => {
        try {
         const base64Image = reader.result;
         await updateProfile({profilePic: base64Image, fullName: name, bio})
         navigate('/');  
        } catch (error) {
          console.error('Error updating profile:', error);
        } finally {
          setIsLoading(false)
        }
      }
     }
    } catch (error) {
      console.error('Error updating profile:', error);
    } 
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
         <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600
                         flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
            <form onSubmit={handleSubmit}
            className='flex flex-col gap-5 p-10 flex-1'>
              <h3 className='text-lg'>Profile details</h3>
              <label htmlFor="avatar" className='flex items-center gap-3 cursor pointer'>
                <input 
                onChange={(e)=> setSelectedImg(e.target.files[0])} 
                type="file" id='avatar' accept='.png, .jpg, .jpeg,' hidden
                disabled={isLoading}/>
                <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt=""
                    className={`w-12 h-12 ${selectedImg && 'rounded-full'} ${isLoading ? 'opacity-50' : ''}`} />
                    upload profile Image
              </label>

              <input onChange={(e) => setName(e.target.value)} value={name}
              type="text" required placeholder='Your name' className='p-2 border border-gray-500 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-violet-500'
              disabled={isLoading}/>
              <textarea onChange={(e) => setBio(e.target.value)} value={bio} required placeholder='Write a bio' rows={4}
                className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
                disabled={isLoading}>
                </textarea>
              <button type="submit" className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer flex items-center justify-center gap-2' disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : 'Save'}
              </button>
            </form>
             <img className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg && 'rounded-full'} ${isLoading ? 'opacity-50' : ''}`} src={authUser?.profilePic || assets.logo_icon} alt="" />
         </div>
    </div>
  )
}

export default ProfilePage