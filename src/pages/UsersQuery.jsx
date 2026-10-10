import { useQuery } from "@tanstack/react-query";

const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
        throw new Error("Gagal mengambil data");
    }
    return response.json();
};

const UsersQuery = () => {
    const {
        data: users = [],
        isPending,
        error,
    } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });
    if (isPending) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h1>Daftar User TanStack Query</h1>

            {users.map((item) => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>{item.email}</p>
                </div>
            ))}
        </div>
    );
};

export default UsersQuery;
