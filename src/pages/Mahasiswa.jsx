import { useEffect, useState } from "react";

import ProfileForm from "../components/ProfileForm/ProfileForm";
import StudentList from "../components/StudentList/StudentList";

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
        <section>
            <div className="mb-8">
                <p className="mb-2 text-sm font-medium text-emerald-700">
                    Student Management
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
                    Data Mahasiswa
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                    Kelola data mahasiswa, tambahkan data baru, atau perbarui
                    informasi yang sudah tersedia.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
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
        </section>
    );
};

export default Mahasiswa;
