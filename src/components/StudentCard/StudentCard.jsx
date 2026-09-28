const StudentCard = ({ item, onEdit, onHapus }) => {
    return (
        <div>
            <h3>{item.nama}</h3>
            <p>Jurusan: {item.jurusan}</p>
            <button onClick={() => onEdit(item)}>Edit</button>
            <button onClick={() => onHapus(item.id)}>Hapus</button>
        </div>
    );
};

export default StudentCard;
