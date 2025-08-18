import React, { useState } from 'react'
import Navbar from './Navbar'
import Notes from './Notes'
import axios from 'axios'

const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    body: "",
    webHookUrl: "",
    releaseAt: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      const response = await axios.post('http://localhost:8000/api/notes',{formData},{
        headers:{
          Authorization: 'Bearer itsmytoken'
        }
      })
      if(response.data.success){
        alert("Done")
      }
      else{
        alert(response.data.message)
      }
      
      
    } catch (error) {
      console.log(error)
    }
    setShowModal(false);
  }
  
  return (
    <div>
      <Navbar />
      <div className='flex justify-between items-center px-5 py-5'>
        <h2 className='text-2xl font-bold text-blue-400'>Your Notes</h2>
        <button onClick={() => setShowModal(true)} className='bg-blue-300 py-3 px-5 border-none rounded-xl'>Create Note</button>
      </div>
      <div className='w-full px-5'>
        <Notes />
      </div>
      {
        showModal && <div className='w-full h-screen fixed bg-black/60 top-0 left-0 z-10 flex items-center justify-center'>
          <div className='max-w-md w-full relative bg-white rounded-xl shadow-2xl'>
            <h3 className='text-center font-bold text-2xl py-5 px-5 gap-2 text-black '>Create A Note</h3>
            <form onSubmit={handleSubmit} className='flex flex-col px-10 py-3 mb-5 gap-5'>
              <label className='text-xl' htmlFor="name">Name :</label>
              <input onChange={handleChange} className='w-full border border-gray-500 px-5 py-2 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500' name='name' type="text" required />
              <label className='text-xl' htmlFor="body">Note :</label>
              <textarea onChange={handleChange} className='w-full h-40 border border-gray-500 px-5 py-2 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500' name="body" id="body" required />
              <div className='flex gap-4'>
                <input onChange={handleChange} placeholder='webHookUrl' className='w-full border border-gray-500 px-5 py-2 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500' name='webHookUrl' type="text" required />
                <input onChange={handleChange} placeholder='releaseAt' className='w-full border border-gray-500 px-3 py-2 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500' name='releaseAt' type="datetime-local" required />
              </div>
              <button type='submit' className='bg-blue-300 py-3 px-5 w-full border-none rounded-xl cursor-pointer'>Submit</button>
              <button onClick={() => setShowModal(false)} className='absolute top-6 right-5 text-xl cursor-pointer'>X</button>
            </form>
          </div>
        </div>
      }
    </div>
  )
}

export default App