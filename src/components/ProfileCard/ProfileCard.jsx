const ProfileCard = ({nama, jurusan, universitas}) => {
    return (
        <div>
            <h2>{nama}</h2>
            <p>{jurusan}</p>
            <p>{universitas}</p>
        </div>
    );
};

export default ProfileCard;
