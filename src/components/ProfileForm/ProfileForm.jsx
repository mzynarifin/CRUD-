import { useState, useEffect } from "react";

const ProfileForm = () => {
    const [formData, setFormData] = useState({
        nama: "",
        jurusan: "",
    });
    const [mahasiswa, setMahasiswa] = useState(() => {
        const data = localStorage.getItem("mahasiswa");
        return data ? JSON.parse(data) : [];
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        localStorage.setItem("mahasiswa", JSON.stringify(mahasiswa));
    }, [mahasiswa]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nama || !formData.jurusan) {
            alert("Form wajib di isi");
            return;
        }

        if (editId !== null) {
            setMahasiswa((prev) =>
                prev.map((item) => {
                    if (item.id === editId) {
                        return {
                            ...item,
                            ...formData,
                        };
                    }
                    return item;
                }),
            );
            setEditId(null);
        } else {
            const dataBaru = {
                id: Date.now(),
                ...formData,
            };
            setMahasiswa((prev) => [...prev, dataBaru]);
        }
        setFormData({
            nama: "",
            jurusan: "",
        });
        console.log(mahasiswa);
    };

    const handleHapus = (id) => {
        setMahasiswa((prev) => prev.filter((item) => item.id !== id));
    };

    const handleEdit = (item) => {
        setFormData({
            nama: item.nama,
            jurusan: item.jurusan,
        });

        setEditId(item.id);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Tambah mahasiswa</h2>
                <label htmlFor="nama">Nama : </label>
                <input
                    type="text"
                    name="nama"
                    id="nama"
                    onChange={handleChange}
                    value={formData.nama}
                />
                <label htmlFor="jurusan">Jurusan: </label>
                <input
                    type="text"
                    name="jurusan"
                    id="jurusan"
                    onChange={handleChange}
                    value={formData.jurusan}
                />
                <button type="submit">
                    {editId !== null ? "Update" : "Simpan"}
                </button>
            </form>
            <div>
                <h2>Daftar mahasiswa</h2>
                {mahasiswa.length === 0 ? (
                    <h3>Belum ada mahasiswa</h3>
                ) : (
                    mahasiswa.map((item) => (
                        <div key={item.id}>
                            <h3>Nama : {item.nama}</h3>
                            <p>Jurusan : {item.jurusan}</p>
                            <button onClick={() => handleEdit(item)}>
                                Edit
                            </button>
                            <button onClick={() => handleHapus(item.id)}>
                                Hapus
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProfileForm;
