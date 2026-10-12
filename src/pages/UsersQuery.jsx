import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// GET USERS
const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
        throw new Error("Gagal mengambil data");
    }
    return response.json();
};

// POST USER
const addUsers = async (formData) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    if (!response.ok) {
        throw new Error("Gagal menambahkan user");
    }
    return response.json();
};

// PATCH USER
const updateUser = async ({ id, formData }) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
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
    return response.json();
};

// COMPONENT
const UsersQuery = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const [editId, setEditId] = useState(null);

    const queryClient = useQueryClient();

    // GET
    const {
        data: users = [],
        isPending: isUsersPending,
        error: usersError,
    } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    // POST MUTATION
    const addUserMutation = useMutation({
        mutationFn: addUsers,
        onSuccess: (data) => {
            console.log(data);
            queryClient.setQueryData(["users"], (oldUsers = []) => [
                ...oldUsers,
                data,
            ]);
            setFormData({
                name: "",
                email: "",
            });
        },
    });

    // PATCH MUTATION
    const updateUserMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            queryClient.setQueryData(["users"], (oldUsers = []) =>
                oldUsers.map((user) => (user.id === data.id ? data : user)),
            );
            setEditId(null);
            setFormData({
                name: "",
                email: "",
            });
        },
    });

    // INPUT CHANGE
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // SUBMIT
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.name.trim() || !formData.email.trim()) {
            alert("Semua data harus diisi");
            return;
        }

        if (editId !== null) {
            updateUserMutation.mutate({
                id: editId,
                formData: formData,
            });
            return;
        }

        // Kalau tambah user baru
        addUserMutation.mutate(formData);
    };

    const handleEdit = (user) => {
        setFormData({
            name: user.name,
            email: user.email,
        });
        setEditId(user.id);
    };

    const handleCancle = () => {
        setEditId(null);
        setFormData({
            name: "",
            email: "",
        });
    };

    // LOADING GET
    if (isUsersPending) {
        return <p>Loading...</p>;
    }
    // ERROR GET
    if (usersError) {
        return <p>Error: {usersError.message}</p>;
    }

    return (
        <div>
            <h1>{editId !== null ? "Edit User" : "Tambah User"}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="nama"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email"
                />
                <button
                    type="submit"
                    disabled={
                        addUserMutation.isPending ||
                        updateUserMutation.isPending
                    }
                >
                    {editId !== null
                        ? updateUserMutation.isPending
                            ? "Mengupdate..."
                            : "Update"
                        : addUserMutation.isPending
                            ? "Menyimpan..."
                            : "Simpan"}
                </button>

                {editId !== null && (
                    <button 
                        type='button'
                        onClick={handleCancle}>
                        Batal
                    </button>
                )}
            </form>

            {addUserMutation.isError && (
                <p>Error tambah: {" "} {addUserMutation.error.message}</p>
            )}
            {updateUserMutation.isError && (
                <p>Error update: {" "} {updateUserMutation.error.message}</p>
            )}

            <h1>Daftar User</h1>
            {users.map((item) => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>{item.email}</p>
                    <button onClick={() => handleEdit(item)}>
                        Edit
                    </button>
                </div>
            ))}
        </div>
    );
};

export default UsersQuery;
