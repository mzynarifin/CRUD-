import { useEffect, useState } from "react";

import ProfileForm from "./components/ProfileForm/ProfileForm";
import StudentList from "./components/StudentList/StudentList";

const Mahasiswa = () => {
    const [mahasiswa, setMahasiswa] = useState(() => {
        const data = localStorage.getItem("mahasiswa");
        return data ? JSON.parse(data) : [];
    });
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        localStorage.setItem("mahasiswa", JSON.stringify(mahasiswa));
    }, [mahasiswa]);

    const handleEdit = (item) => {
        setSelectedStudent(item);
    };

    const handleHapus = (id) => {
        setMahasiswa((prev) => prev.filter((item) => item.id !== id));
        if (selectedStudent?.id === id) {
            setSelectedStudent(null);
        }
    };

    return (
        <div>
            <h1>Data Mahasiswa</h1>
            <ProfileForm
                key={selectedStudent?.id ?? "new"}
                setMahasiswa={setMahasiswa}
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
            />

            <StudentList
                mahasiswa={mahasiswa}
                onEdit={handleEdit}
                onHapus={handleHapus}
            />
        </div>
    );
};

export default Mahasiswa;

