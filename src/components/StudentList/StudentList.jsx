import StudentCard from "../StudentCard/StudentCard";

const StudentList = ({ mahasiswa, onEdit, onHapus }) => {
    return (
        <div>
            <h2>Daftar Mahasiswa</h2>

            {mahasiswa.length === 0 ? (
                <h3>Belum ada mahasiswa</h3>
            ) : (
                mahasiswa.map((item) => (
                    <StudentCard
                        key={item.id}
                        item={item}
                        onEdit={onEdit}
                        onHapus={onHapus}
                    />
                ))
            )}
        </div>
    );
};

export default StudentList;
