import { Link } from "react-router-dom";

const StudentCard = ({ item, onEdit, onHapus }) => {
    return (
        <article className="flex items-center justify-between border border-zinc-200 bg-white px-5 py-4 transition hover:border-zinc-300">
            <div>
                <h3 className="font-medium text-zinc-950">{item.nama}</h3>
                <p className="mt-1 text-sm text-zinc-500">{item.jurusan}</p>
            </div>

            <div className="flex flex-col items-center gap-2 md:flex-row">
                <Link
                    to={`/mahasiswa/${item.id}`}
                    className="px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
                >
                    Detail
                </Link>

                <button
                    onClick={() => onEdit(item)}
                    className="px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
                >
                    Edit
                </button>

                <button
                    onClick={() => onHapus(item.id)}
                    className="px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                    Hapus
                </button>
            </div>
        </article>
    );
};

export default StudentCard;
