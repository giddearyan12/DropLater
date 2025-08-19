import axios from 'axios'

const Notes = ({notes, getNotes}) => {

    const handle = async(note) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/notes/${note._id}/replay`,{}, {
                headers: {
                    Authorization: 'Bearer itsmytoken'
                },
            })
            if (response.data.success) {
                getNotes();
                alert("Done")
            }
            else {
                alert(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div className='w-full'>
            <table className="w-full border border-gray-300 rounded-xl shadow-md text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">WebHook URL</th>
                        <th className="px-4 py-2 border">Release At</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Delivered At</th>
                        <th className="px-4 py-2 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border font-semibold">{note.title}</td>
                            <td className="px-4 py-2 border">{note.webHookUrl}</td>
                            <td className="px-4 py-2 border">{new Date(note.releaseAt)
                                .toLocaleString("en-IN", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}</td>
                            <td className="px-4 py-2 border">{note.status}</td>
                            <td className="px-4 py-2 border">{note.deliveredAt !== null && new Date(note.deliveredAt)
                                .toLocaleString("en-IN", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}</td>
                                <td className="px-4 py-2 border text-center">
                                {
                                    note.status !== 'delivered' && <button onClick={() => handle(note)} className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600" > Replay </button>

                                }
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           


        </div>

    )
}

export default Notes