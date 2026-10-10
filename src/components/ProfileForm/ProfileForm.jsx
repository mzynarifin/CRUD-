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
        <form
            onSubmit={handleSubmit}
            className="h-fit border border-zinc-200 bg-white"
        >
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-zinc-950">
                    {selectedStudent ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                    {selectedStudent
                        ? "Perbarui informasi mahasiswa."
                        : "Masukkan informasi mahasiswa baru."}
                </p>
            </div>

            <div className="space-y-5">
                <div>
                    <label
                        htmlFor="nama"
                        className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                        Nama
                    </label>

                    <input
                        id="nama"
                        name="nama"
                        type="text"
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Masukkan nama"
                        className="w-full border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                </div>

                <div>
                    <label
                        htmlFor="jurusan"
                        className="mb-2 block text-sm font-medium text-zinc-700"
                    >
                        Jurusan
                    </label>

                    <input
                        id="jurusan"
                        name="jurusan"
                        type="text"
                        value={formData.jurusan}
                        onChange={handleChange}
                        placeholder="Masukkan jurusan"
                        className="w-full border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                </div>
            </div>

            <div className="mt-6 flex gap-3">
                <button
                    type="submit"
                    className="bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                >
                    {selectedStudent ? "Update" : "Simpan"}
                </button>

                {selectedStudent && (
                    <button
                        type="button"
                        onClick={handleBatal}
                        className="border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                    >
                        Batal
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProfileForm;
