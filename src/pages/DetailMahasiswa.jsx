import { useParams, useNavigate} from 'react-router-dom'

const DetailMahasiswa = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const data = localStorage.getItem("mahasiswa");
    const mahasiswa = data ? JSON.parse(data) : [];

    const student = mahasiswa.find(
        (item) => item.id === Number(id)
    );

    const handleKembali = () => {
        navigate(-1)
    }

    if (!student) {
        return (
            <div>
                <h1>Mahasiswa Tidak Ditemukan</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Detail mahasiswa</h1>
            <p>ID: {student.id}</p>
            <button onClick={handleKembali}>Kembali</button>
            <p>Nama: {student.nama}</p>
            <p>Jurusan: {student.jurusan}</p>
        </div>
    )
}

export default DetailMahasiswa;