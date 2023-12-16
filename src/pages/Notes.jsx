import { useEffect } from "react";
import { Api } from "../utils/api";
import { Link } from "react-router-dom";
import { options } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../redux/user/selectors";
import { getNotes } from "../redux/notes/action";
import { selectNotesData, selectNotesLoading } from "../redux/notes/selector";

const Notes = () => {
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();
  const loading = useSelector(selectNotesLoading);
  const notes = useSelector(selectNotesData);

  useEffect(() => {
    dispatch(getNotes({ userId: user.id }));
  }, [user]);

  if (loading) return <div>Loading</div>;

  const handleDelete = async (id) => {
    await Api.deleteNote(id);
    dispatch(getNotes({ userId: user.id }));
  };

  return (
    <div>
      <h1 className="text-3xl text-center mb-5">Notes</h1>
      <span className="flex justify-center">
        <Link
          to="add"
          className="border-2 border-black px-2 py-1 text-2xl self-center rounded text-white bg-blue-500 hover:bg-blue-700"
        >
          Добавить новую заметку
        </Link>
      </span>

      {!!notes.length && (
        <div className="w-2/3 mx-auto my-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex justify-between items-center mb-3 p-3 bg-gray-200 rounded"
            >
              <Link to={`${note.id}`} className="flex-1">
                <span className="text-xl font-bold">{note.title}</span>
                <span className="ml-4 text-sm text-gray-500">
                  {new Date(note.createdAt).toLocaleDateString(
                    "ru-Ru",
                    options
                  )}
                </span>
              </Link>
              <span>
                <Link
                  to={`${note.id}/edit`}
                  className="text-2xl mr-2 text-blue-500 hover:text-blue-700"
                >
                  ✍️
                </Link>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-2xl text-red-500 hover:text-red-700"
                >
                  🗑
                </button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;