import { useState, useEffect } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Gagal mengambil data");
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.name.trim() || !formData.email.trim()) {
            alert("Semua data harus diisi");
            return;
        }

        try {
            if (editId !== null) {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${editId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    },
                );
                if (!response.ok) {
                    throw new Error("Gagal mengupdate user");
                }
                await response.json();
                setUsers((prev) =>
                    prev.map((user) => {
                        if (user.id === editId) {
                            return {
                                ...user,
                                ...formData,
                            };
                        }
                        return user;
                    }),
                );
                setEditId(null);
            } else {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    },
                );
                if (!response.ok) {
                    throw new Error("Gagal menambahkan user");
                }
                const data = await response.json();
                setUsers((prev) => [...prev, data]);
            }

            setFormData({
                name: "",
                email: "",
            });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users/${id}`,
                {
                    method: "DELETE",
                },
            );
            if (!response.ok) {
                throw new Error("Gagal menghapus user");
            }

            setUsers((prev) => prev.filter((user) => user.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (user) => {
        setFormData({
            name: user.name,
            email: user.email,
        });
        setEditId(user.id);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="name"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email"
                />
                <button type="submit">Simpan</button>
            </form>
            <h1>Daftar User</h1>
            {users.map((item) => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>{item.email}</p>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Hapus</button>
                </div>
            ))}
        </div>
    );
};

export default Users;
