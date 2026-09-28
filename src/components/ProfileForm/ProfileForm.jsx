import { useState } from "react";

const ProfileForm = ({ setMahasiswa, selectedStudent, setSelectedStudent }) => {
    const [formData, setFormData] = useState({
        nama: selectedStudent?.nama ?? "",
        jurusan: selectedStudent?.jurusan ?? "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.nama || !formData.jurusan) {
            alert("Form wajib diisi");
            return;
        }
        if (selectedStudent) {
            setMahasiswa((prev) =>
                prev.map((item) => {
                    if (item.id === selectedStudent.id) {
                        return {
                            ...item,
                            ...formData,
                        };
                    }
                    return item;
                }),
            );
            setSelectedStudent(null);
        } else {
            const dataBaru = {
                id: Date.now(),
                ...formData,
            };
            setMahasiswa((prev) => [...prev, dataBaru]);
            setFormData({
                nama: "",
                jurusan: "",
            });
        }
    };

    const handleBatal = () => {
        setSelectedStudent(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{selectedStudent ? "Edit Mahasiswa" : "Tambah Mahasiswa"}</h2>
            <div>
                <label htmlFor="nama">Nama: </label>
                <input
                    id="nama"
                    name="nama"
                    type="text"
                    value={formData.nama}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="jurusan">Jurusan: </label>
                <input
                    id="jurusan"
                    name="jurusan"
                    type="text"
                    value={formData.jurusan}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">
                {selectedStudent ? "Update" : "Simpan"}
            </button>

            {selectedStudent && (
                <button type="button" onClick={handleBatal}>
                    Batal
                </button>
            )}
        </form>
    );
};

export default ProfileForm;
