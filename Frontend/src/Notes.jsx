import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Notes = () => {

    const [noteData, setNoteData] = useState({
        name: "",
        desc: "",
    })
    const [notes, setNotes] = useState([])

    const [show, setshow] = useState(false);
    const handle = (note) => {
        setNoteData(note)
        setshow(true)
    }
    const getNotes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/notes', {
                headers: {
                    Authorization: 'Bearer itsmytoken'
                },
                params: {
                    status: 'pending',
                    page: 1,

                }
            })
            if (response.data.success) {
                setNotes(response.data.notes);
            }
            else {
                alert(response.data.message)
            }


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNotes();
    }, [])



    return (
        <div className='w-full'>
            <table className="w-full border border-gray-300 rounded-xl shadow-md text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Body</th>
                        <th className="px-4 py-2 border">WebHook URL</th>
                        <th className="px-4 py-2 border">Release At</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border font-semibold">{note.title}</td>
                            <td className="px-4 py-2 border">{note.body}</td>
                            <td className="px-4 py-2 border">{note.webHookUrl}</td>
                            <td className="px-4 py-2 border">{new Date(note.releaseAt)
                                .toLocaleString("en-IN", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}</td>
                            <td className="px-4 py-2 border">{note.status}</td>
                            <td className="px-4 py-2 border text-center"><button onClick={() => handle(note)} className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600" > View Note </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                show &&
                <div className='w-full fixed h-screen bg-black/50 top-0 left-0 flex items-center justify-center'>
                    <div className='bg-white max-w-md w-full px-5 py-2 relative space-y-3 '>
                        <h2 className='text-center text-xl font-bold'>{noteData.title}</h2>
                        <p className='px-5 text-center text-md leading-relaxed overflow-y-auto'>{noteData.body}</p>
                        <button onClick={() => setshow(false)} className='absolute top-4 right-8 hover:text-red-600 text-sm'>X</button>
                    </div>

                </div>

            }


        </div>

    )
}

export default Notes