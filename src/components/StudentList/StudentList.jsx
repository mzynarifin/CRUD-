import StudentCard from "../StudentCard/StudentCard";

const StudentList = ({ mahasiswa, onEdit, onHapus }) => {
    return (
        <div>
            <div className="mb-4 flex items-end justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-zinc-950">
                        Daftar Mahasiswa
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                        {mahasiswa.length} mahasiswa terdaftar
                    </p>
                </div>
            </div>

            {mahasiswa.length === 0 ? (
                <div className="border border-dashed border-zinc-300 bg-white px-6 py-16 text-center">
                    <h3 className="font-medium text-zinc-800">
                        Belum ada mahasiswa
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                        Tambahkan mahasiswa melalui form di sebelah kiri.
                    </p>
                </div>
            ) : (
                <div className="max-h-150 overflow-y-auto space-y-3 ">
                    {mahasiswa.map((item) => (
                        <StudentCard
                            key={item.id}
                            item={item}
                            onEdit={onEdit}
                            onHapus={onHapus}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentList;
