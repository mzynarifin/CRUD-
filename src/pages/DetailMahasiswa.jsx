import { useParams } from "react-router-dom";

const DetailMahasiswa = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Detail Mahasiswa</h1>
            <p>ID Mahasiswa: {id}</p>
        </div>
    );
};

export default DetailMahasiswa;
